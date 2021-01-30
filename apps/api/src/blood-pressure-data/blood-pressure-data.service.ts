import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodPressureData } from '../entities/blood-pressure-data.entity';

@Injectable()
export class BloodPressureDataService {

    constructor(@InjectRepository(BloodPressureData) private readonly repository: Repository<BloodPressureData>){ }

    public async findAll(userid: number){
        return await this.repository.find({where: { UserId: userid } });
    }

    public async save(data: BloodPressureData){
        return this.repository.save(data);
    }
}
