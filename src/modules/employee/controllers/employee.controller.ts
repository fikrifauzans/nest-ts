import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, NotFoundException, Query, Request, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { QueryEmployee } from '../dtos/query-employee.dto';
import { formatResponse } from '@/common/handler/response/response-format';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('api/v1/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createEmployeeDto: CreateEmployeeDto) { 
    const employee = await this.employeeService.create(createEmployeeDto);    
    return formatResponse(HttpStatus.CREATED, 'Employee created successfully', employee);
  }


  @Get()
  async findAll(@Query() query: QueryEmployee) {
    const { data, pagination } = await this.employeeService.findAll(query);
    return formatResponse(HttpStatus.OK, 'Employees retrieved successfully', data, {pagination});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return formatResponse(HttpStatus.OK, 'Employee retrieved successfully', employee);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.employeeService.update(id, updateEmployeeDto);
    if (!updatedEmployee) {
      throw new NotFoundException('Employee not found');
    }
    return formatResponse(HttpStatus.OK, 'Employee updated successfully', updatedEmployee);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.employeeService.remove(id);
    return formatResponse(HttpStatus.OK, 'Employee deleted successfully', null);
  }


}
