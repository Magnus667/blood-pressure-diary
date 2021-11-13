import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodPressureDataModule } from '../blood-pressure-data/blood-pressure-data.module';
import { BloodPressureDataEntity } from '../entities/blood-pressure-data.entity';
import { UserEntity } from '../entities/user.entity';
import { AuthModule } from '../app/auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { MedicineModule } from '../medicine/medicine.module';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicineEntity } from '../entities/medicine.entity';

// '..'    is used for NODE_ENV = 'prod' (heroku)
// '../..' is used for NODE_ENV = 'development'
const pathFix = process.env.NODE_ENV === 'development' ? '../..' : '..';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, pathFix, '/blood-pressure-diary'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        BloodPressureDataEntity,
        UserEntity,
        MedicationEntity,
        MedicineEntity,
      ],
    }),
    AuthModule,
    BloodPressureDataModule,
    MedicineModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
