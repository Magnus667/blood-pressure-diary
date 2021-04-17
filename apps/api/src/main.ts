/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // In development mode the frontend is not delivered by the backend but is executed by an angular node js process (port 4200)
  // So it is neccessary to enable CORS for this setup
  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }

  // Use a global validation pipe to ensure all endpoints receive the correct data
  // (see https://docs.nestjs.com/techniques/validation#auto-validation)
  app.useGlobalPipes(new ValidationPipe({transform: true, transformOptions: { enableImplicitConversion: true }}));

  // Set a global prefix on all routes
  // All api routes will start with 'api'. Other routes will be redirected to the angular frontend
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
