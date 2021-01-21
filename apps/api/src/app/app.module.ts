import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// '..' is used for heroku. '../..' is used for development.
// TODO: Use NODE_ENV = prod for this.
const pathFix = process.env.npm_lifecycle_event !== "start" ? '../..' : '..';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, pathFix, '/apps/blood-pressure-diary')
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
