import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { QueryEmployee } from '../dtos/query-employee.dto';
import { GeneralRepository } from '@/common/repositories/repository';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeRepository extends GeneralRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(); 
  }
  
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.save(createEmployeeDto);
  }

  async findAll(query: QueryEmployee): Promise<{ data: Employee[], pagination: any }> {
    const qb = this.employeeRepository.createQueryBuilder('employee');
    
    if (query.name) qb.andWhere('employee.name ILIKE :name', { name: `%${query.name}%` });
    if (query.number) qb.andWhere('employee.number = :number', { number: query.number });
    if (query.position) qb.andWhere('employee.position ILIKE :position', { position: `%${query.position}%` });
    if (query.department) qb.andWhere('employee.department ILIKE :department', { department: `%${query.department}%` });
    if (query.joinDate) qb.andWhere('employee.joinDate = :joinDate', { joinDate: query.joinDate });
    if (query.status) qb.andWhere('employee.status ILIKE :status', { status: `%${query.status}%` });

    if (query.search) {
      qb.andWhere(
        'employee.name ILIKE :search OR employee.number ILIKE :search OR employee.position ILIKE :search OR employee.department ILIKE :search OR employee.joinDate::text ILIKE :search OR employee.status ILIKE :search', 
        { search: `%${query.search}%` }
      );
    }

    return this.paginateAndSorting(query, qb);
  }

  async findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
