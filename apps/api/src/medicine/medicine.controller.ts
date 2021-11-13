import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../app/auth/jwt-auth.guard';
import { IsOwnerGuard } from './is-owner.guard';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicationDto } from './medication.dto';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly service: MedicineService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.service.findAll();
  }
}
