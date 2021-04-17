import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../app/auth/jwt-auth.guard';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';
import { BloodPressureDataService } from './blood-pressure-data.service';
import { BloodPressureDataDto, BloodPressurePageDto } from './bood-pressure-data.dto';
import { IsOwnerGuard } from './is-owner.guard';

@Controller('blood-pressure-data')
export class BloodPressureDataController {

    constructor(private readonly service: BloodPressureDataService){}

    @UseGuards(JwtAuthGuard)
    @Get('page')
    @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
    async getPage(@Request() request, @Query() query: BloodPressurePageDto){
        const where: Partial<BloodPressureDataEntity> = { UserId: request.user.id };
        if(query.Systolic){ where['Systolic'] = query.Systolic; }
        if(query.Diastolic){ where['Diastolic'] = query.Diastolic; }
        if(query.Pulse){ where['Pulse'] = query.Pulse; }
        
        return this.service.page(query.pageNumber, query.pageSize, query.sortOrder, query.sortProperty, where);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number){
        return this.service.findOne(id);
    }

    // CAUTION: This is the base route and need to be defined after the more specific routes (GET(/page) and GET(:id))
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Request() request){
        return this.service.findAllForUser(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async post(@Request() request, @Body() dto: BloodPressureDataDto): Promise<BloodPressureDataEntity>{
        // TODO: Implement automatic mapping between dto and entity
        const entity: BloodPressureDataEntity = new BloodPressureDataEntity();
        entity.Id = 0;
        entity.UserId = request.user.id;
        entity.Systolic = dto.Systolic;
        entity.Diastolic = dto.Diastolic;
        entity.Pulse = dto.Pulse;
        entity.Date = dto.Date;

        return this.service.save(entity);
    }

    
    @UseGuards(JwtAuthGuard, IsOwnerGuard)
    @Put(':id')
    async put(@Request() request, @Param('id', ParseIntPipe) id: number, @Body() dto: BloodPressureDataDto){
        // TODO: Implement automatic mapping between dto and entity
        const entity: BloodPressureDataEntity = new BloodPressureDataEntity();
        entity.Id = id;
        entity.UserId = request.user.id;
        entity.Systolic = dto.Systolic;
        entity.Diastolic = dto.Diastolic;
        entity.Pulse = dto.Pulse;
        entity.Date = dto.Date;

        return this.service.save(entity);
    }

    @UseGuards(JwtAuthGuard, IsOwnerGuard)
    @Delete(':id')
    async delete(@Request() request, @Param('id', ParseIntPipe) id: number){
        return this.service.delete(id, request.user.id);
    }

}
