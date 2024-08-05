import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])], 
  providers: [EmployeeRepository, EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeRepository, EmployeeService], 
})
export class EmployeeModule {}
