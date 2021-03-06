import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';
import { BloodPressureDataService } from './blood-pressure-data.service';
import { BloodPressureDataController } from './blood-pressure-data.controller';

@Module({
  providers: [BloodPressureDataService],
  imports: [
    TypeOrmModule.forFeature([BloodPressureDataEntity])
  ],
  controllers: [BloodPressureDataController]
})
export class BloodPressureDataModule {}
