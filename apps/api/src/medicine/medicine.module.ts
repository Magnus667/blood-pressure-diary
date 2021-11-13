import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicineEntity } from '../entities/medicine.entity';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { MedicationController } from './medication.controller';

@Module({
  controllers: [MedicineController, MedicationController],
  imports: [TypeOrmModule.forFeature([MedicineEntity, MedicationEntity])],
  providers: [MedicineService],
})
export class MedicineModule {}
