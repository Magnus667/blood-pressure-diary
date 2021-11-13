import {
  IsNumber,
  IsPositive,
  IsDate,
  IsAlpha,
  IsIn,
  IsOptional,
} from 'class-validator';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';
import { MedicationEntity } from '../entities/medication.entity';

/**
 * Data Transfer Object for creating record.
 * In comparison with the entity:
 *   Excludes user id (This is taken from the JWT Token instead)
 *   Excludes id (Does not exist when creating a new record and is used extracted from the routes param for updates)
 *
 * TODO?: It could be possible to use class-transformer to simplify the DTO and Entity to one single class.
 */
export class MedicationDto {
  /**
   * Dosage [mm]
   */
  @IsNumber()
  @IsPositive()
  MedicineId: number;

  /**
   * Dosage [mm]
   */
  @IsNumber()
  @IsPositive()
  Dosage: number;

  /**
   * Date of measurement
   */
  @IsDate()
  Timestamp: Date;
}


export class MedicationPageDto {
  @IsNumber()
  pageNumber: number;

  @IsNumber()
  pageSize: number;

  @IsIn(["ASC", "DESC"])
  sortOrder: "ASC" | "DESC";

  sortProperty: keyof MedicationEntity;

  @IsOptional()
  @IsNumber()
  MedicineId: number;

  @IsOptional()
  @IsNumber()
  Dosage: number;

  @IsOptional()
  @IsDate()
  Timestamp: Date;
}