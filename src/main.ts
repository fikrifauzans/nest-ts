import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './ormconfig'; // Import the configured DataSource
import bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });

  // Initialize TypeORM DataSource
  await AppDataSource.initialize();
  // the next two lines did the trick

  console.log((join(__dirname, '', 'public')));
  
  app.use('/public', express.static(join(__dirname, '', 'public')));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
