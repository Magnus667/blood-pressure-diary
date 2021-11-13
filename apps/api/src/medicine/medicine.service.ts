import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../app/util/page';
import { Where } from '../app/util/where';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicineEntity } from '../entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly repository: Repository<MedicineEntity>,
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>
  ) {}

  public async findAll(): Promise<MedicineEntity[]> {
    return this.repository.find();
  }

  /**
   * Saves the given entity. Either create a new record (data.id = 0) or update a record (data.id > 0)
   * @param entity The data to be stored
   */
  public async save(entity: MedicationEntity) {
    return this.medicationRepository.save(entity);
  }

  /**
   * Checks if a dataset was created by the given user
   * @param id The id of the record
   * @param userId The is of the user, that tries to manipulate the data
   */
  public async isOwner(id: number, userId: number): Promise<boolean> {
    const record: MedicationEntity = await this.medicationRepository.findOne(
      id
    );
    return record && record.UserId === userId;
  }

  /**
   * Selects paginated data with possibility to sort and filter the data before
   * @param pageNumber The number of the page to fetch (0 is first page)
   * @param pageSize The number of records on a page
   * @param sortOrder The order type (ascending or descinding) for sorting
   * @param sortProperty The property to sort on
   * @param query Optional query params for filtering
   */
  public async page(
    pageNumber: number,
    pageSize: number,
    sortOrder: 'ASC' | 'DESC',
    sortProperty: keyof MedicationEntity,
    query: Partial<MedicationEntity>
  ): Promise<Page<MedicationEntity>> {
    // NOTE: At this point it is not necessary to declare the where of type Where
    //       This is for other filtering scenarios like: where = { ColumnName: `Like '%Parameter%'` }
    const where: Where<Omit<MedicationEntity, 'medicine'>> = query;

    const result = await this.medicationRepository.findAndCount({
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        [sortProperty]: sortOrder,
      },
      relations: ['medicine'],
      where,
    });

    const page: Page<MedicationEntity> = {
      content: result[0],
      totalElements: result[1],
      size: result[0].length,
      number: pageNumber,
    };

    return page;
  }
}
