import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';

// '..' is used for heroku. '../..' is used for development.
// TODO: Use NODE_ENV = prod for this.
const pathFix = process.env.npm_lifecycle_event !== "start" ? '../..' : '..';
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
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
