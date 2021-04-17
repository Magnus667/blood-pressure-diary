import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Page } from '../app/util/page';
import { Where } from '../app/util/where';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';

@Injectable()
export class BloodPressureDataService {

    constructor(@InjectRepository(BloodPressureDataEntity) private readonly repository: Repository<BloodPressureDataEntity>){ }

    /**
     * Selects exactly one record identified by its id or returns undefined when this record does not exist
     * @param id Id of the record
     */
    public async findOne(id: number): Promise<BloodPressureDataEntity | undefined>{
        return this.repository.findOne(id);
    }

    /**
     * Selects all records belonging to the user
     * @param userId Id of the user
     */
    public async findAllForUser(userId: number){
        return await this.repository.find({where: { UserId: userId } });
    }

    /**
     * Selects paginated data with possibility to sort and filter the data before
     * @param pageNumber The number of the page to fetch (0 is first page)
     * @param pageSize The number of records on a page
     * @param sortOrder The order type (ascending or descinding) for sorting
     * @param sortProperty The property to sort on
     * @param query Optional query params for filtering
     */
    public async page(pageNumber: number, pageSize: number, sortOrder: 'ASC' | 'DESC', sortProperty: keyof BloodPressureDataEntity, query: Partial<BloodPressureDataEntity>): Promise<Page<BloodPressureDataEntity>>{

        // NOTE: At this point it is not necessary to declare the where of type Where
        //       This is for other filtering scenarios like: where = { ColumnName: `Like '%Parameter%'` }
        const where: Where<BloodPressureDataEntity> = query;

        const result = await this.repository.findAndCount({
            skip: pageNumber * pageSize,
            take: pageSize,
            order: {
                [sortProperty]: sortOrder
            },
            where
        });

        const page: Page<BloodPressureDataEntity> = {
            content: result[0],
            totalElements: result[1],
            size: result[0].length,
            number: pageNumber
        }

        return page;

    }


    /**
     * Saves the given entity. Either create a new record (data.id = 0) or update a record (data.id > 0)
     * @param entity The data to be stored
     */
    public async save(entity: BloodPressureDataEntity){
        return this.repository.save(entity);
    }

    /**
     * Deletes the given entity.
     * @param id Id of the entity
     * @param userId The id of the user, that requests the deletion
     */
    public async delete(id: number, userId: number): Promise<BloodPressureDataEntity>{

        const isOwner = await this.isOwner(id, userId);
        if(isOwner){
            const record: BloodPressureDataEntity = await this.repository.findOne(id);
            if(record){
                // Use .remove() here, not .delete(), because remove returns the entity. So the frontend can use this result (e.g. to present a message to the user)
                return this.repository.remove(record)
            } else {
                throw new NotFoundException();
            }
        }
    }

    /**
     * Checks if a dataset was created by the given user
     * @param id The id of the record
     * @param userId The is of the user, that tries to manipulate the data
     */
    public async isOwner(id: number, userId: number): Promise<boolean>{
        const record: BloodPressureDataEntity = await this.repository.findOne(id);
        return record && record.UserId === userId;
    }
}
