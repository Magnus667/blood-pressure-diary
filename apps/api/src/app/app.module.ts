import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { BloodPressureDataModule } from '../blood-pressure-data/blood-pressure-data.module';
import { BloodPressureData } from '../entities/blood-pressure-data.entity';
import { UserEntity } from '../entities/user.entity'
import { AuthModule } from '../app/auth/auth.module';
import { AuthController } from './auth/auth.controller';


// '..' is used for heroku. '../..' is used for development.
// TODO: Use NODE_ENV = prod for this.
const pathFix = process.env.NODE_ENV === "development" ? '../..' : '..';
console.log(__dirname, pathFix, '/blood-pressure-diary');
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, pathFix, '/blood-pressure-diary')
    })
    ,TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [
        BloodPressureData,
        UserEntity
        // "entities/*.ts"
      ]
    }),
    AuthModule,
    BloodPressureDataModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
