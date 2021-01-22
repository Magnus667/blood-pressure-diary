import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule} from '@nestjs/typeorm';

// '..' is used for heroku. '../..' is used for development.
// TODO: Use NODE_ENV = prod for this.
const pathFix = process.env.npm_lifecycle_event !== "start" ? '../..' : '..';
console.log(__dirname, pathFix, '/blood-pressure-diary');
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, pathFix, '/blood-pressure-diary')
    })
    // ,TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: "postgres://mgzttogsricjhf:e3f74f05d946dade9dce26a14ec460eab8943ca87f3dbab2c99120b97898ef22@ec2-3-251-0-202.eu-west-1.compute.amazonaws.com:5432/d5bs7skqi5l420",
    //   // host: process.env.DB_HOST ? process.env.DB_HOST : "ec2-3-251-0-202.eu-west-1.compute.amazonaws.com",
    //   // database: process.env.DB_DATABASE ? process.env.DB_DATABASE : "d5bs7skqi5l420",
    //   // username: process.env.DB_USER ? process.env.DB_USER : "mgzttogsricjhf",
    //   // port: +process.env.DB_PORT | 5432,
    //   // password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "e3f74f05d946dade9dce26a14ec460eab8943ca87f3dbab2c99120b97898ef22",
    //   // ssl: true

    //   // url: process.env.DATABASE_URL,
    //   ssl: {
    //     rejectUnauthorized: false
    //   }
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
