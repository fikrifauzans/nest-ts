import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { QueryEmployee } from '../dtos/query-employee.dto';
import { EmployeeRepository } from '../repositories/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.create(createEmployeeDto)
  }

  async findAll(query: QueryEmployee): Promise<any> {
    return await this.employeeRepository.findAll(query)
  }

  async findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    return await this.employeeRepository.update(id,updateEmployeeDto)
  }

  async remove(id: number): Promise<void> {
    return await this.employeeRepository.remove(id)
  }
}
