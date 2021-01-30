import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../app/auth/jwt-auth.guard';
import { BloodPressureData } from '../entities/blood-pressure-data.entity';
import { BloodPressureDataService } from './blood-pressure-data.service';

@Controller('blood-pressure-data')
export class BloodPressureDataController {

    constructor(private readonly service: BloodPressureDataService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findData(@Request() request){
        const data = await this.service.findAll(request.user.id);
        return data;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async save(@Request() request, @Body() body): Promise<BloodPressureData>{
        const entity: BloodPressureData = {
            Systolic: body.Systolic,
            Diastolic: body.Diastolic,
            Pulse: body.Pulse,
            Date: body.Date,
            UserId: request.user.id,
            Id: 0
        }

        return await this.service.save(entity);
    }

}
