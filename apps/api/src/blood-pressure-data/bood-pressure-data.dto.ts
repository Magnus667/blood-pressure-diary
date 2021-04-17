import { IsNumber, IsPositive, IsDate, IsAlpha, IsIn, IsOptional } from 'class-validator';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';

/**
 * Data Transfer Object for creating record.
 * In comparison with the entity:
 *   Excludes user id (This is taken from the JWT Token instead)
 *   Excludes id (Does not exist when creating a new record and is used extracted from the routes param for updates)
 * 
 * TODO?: It could be possible to use class-transformer to simplify the DTO and Entity to one single class.
 */
export class BloodPressureDataDto {
    /**
     * Systolic blood pressure [mmHg]
     */
    @IsNumber()
    @IsPositive()
    Systolic: number;

    /**
     * Diastolic blood pressure [mmHg]
     */
    @IsNumber()
    @IsPositive()
    Diastolic: number;

    /**
     * Pulse [bpm]
     */
    @IsNumber()
    @IsPositive()
    Pulse: number;

    /**
     * Date of measurement
     */
    @IsDate()
    Date: Date;
}

export class BloodPressurePageDto {
    @IsNumber()
    pageNumber: number;

    @IsNumber()
    pageSize: number;

    @IsIn(["ASC", "DESC"])
    sortOrder: "ASC" | "DESC";

    sortProperty: keyof BloodPressureDataEntity;

    @IsOptional()
    @IsNumber()
    Systolic: number;

    @IsOptional()
    @IsNumber()
    Diastolic: number;

    @IsOptional()
    @IsNumber()
    Pulse: number;
}