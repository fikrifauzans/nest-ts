import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './modules/employee/employee.module';
import { AppDataSource } from './ormconfig';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    TypeOrmModule.forRoot(AppDataSource.options), // Using the options from AppDataSource
    EmployeeModule,
  ],
})
export class AppModule {}
