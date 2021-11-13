import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../app/auth/jwt-auth.guard';
import { MedicationEntity } from '../entities/medication.entity';
import { IsOwnerGuard } from './is-owner.guard';
import { MedicationDto, MedicationPageDto } from './medication.dto';
import { MedicineService } from './medicine.service';

@Controller('medication')
export class MedicationController {
  constructor(private readonly service: MedicineService) {}

  @UseGuards(JwtAuthGuard)
  @Get('page')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async getPage(@Request() request, @Query() query: MedicationPageDto) {
    const where: Partial<MedicationEntity> = { UserId: request.user.id };
    if (query.MedicineId) {
      where['MedicineId'] = query.MedicineId;
    }
    if (query.Dosage) {
      where['Dosage'] = query.Dosage;
    }
    if (query.Timestamp) {
      where['Timestamp'] = query.Timestamp;
    }

    return this.service.page(
      query.pageNumber,
      query.pageSize,
      query.sortOrder,
      query.sortProperty,
      where
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async post(
    @Request() request,
    @Body() dto: MedicationDto
  ): Promise<MedicationEntity> {
    // TODO: Implement automatic mapping between dto and entity
    const entity: MedicationEntity = new MedicationEntity();
    entity.Id = 0;
    entity.UserId = request.user.id;
    entity.MedicineId = dto.MedicineId;
    entity.Dosage = dto.Dosage;
    entity.Timestamp = dto.Timestamp;

    return this.service.save(entity);
  }

  // @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async put(
    @Request() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MedicationDto
  ) {
    // TODO: Implement automatic mapping between dto and entity
    const entity: MedicationEntity = new MedicationEntity();
    entity.Id = id;
    entity.UserId = request.user.id;
    entity.MedicineId = dto.MedicineId;
    entity.Dosage = dto.Dosage;
    entity.Timestamp = dto.Timestamp;

    return this.service.save(entity);
  }

  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @Delete(':id')
  async delete(@Request() request, @Param('id', ParseIntPipe) id: number) {
    return this.service.deleteMedication(id, request.user.id);
  }
}
