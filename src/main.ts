import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './ormconfig'; // Import the configured DataSource
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });

  // Initialize TypeORM DataSource
  await AppDataSource.initialize();
  app.use(bodyParser.json())
  await app.listen(8080);
}
bootstrap();
