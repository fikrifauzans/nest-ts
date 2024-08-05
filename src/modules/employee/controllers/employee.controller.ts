import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, NotFoundException, Query, UseInterceptors, Req } from '@nestjs/common';
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
  async create(@Body() body: any, @Req() req: any) {
    let employee: any;
    try {
      if (body.photoPath) {
        const { filePath, fileName } = (await this.employeeService.getFileService()).saveBase64File(body.photoPath);
        const photo: string = `${req.protocol}://${req.get('Host')}/public/${fileName}`;
        const createEmployeeDto: CreateEmployeeDto = { ...body, photo, photoPath: filePath };
        employee = await this.employeeService.create(createEmployeeDto);
      } else {
        employee = await this.employeeService.create(body);
      }
      console.log('Employee created:', employee);
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new Error('Failed to create employee');
    }
    return formatResponse(HttpStatus.CREATED, 'Employee created successfully', employee);
  }


  @Get()
  async findAll(@Query() query: QueryEmployee) {
    const { data, pagination } = await this.employeeService.findAll(query);
    return formatResponse(HttpStatus.OK, 'Employees retrieved successfully', data, { pagination });
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
  async update(@Param('id') id: number, @Body() body: any, @Req() req: any) {

    if (body.photoPath) {
      const { filePath, fileName } = (await this.employeeService.getFileService()).saveBase64File(body.photoPath)
      const photo: string = (`${req.protocol}://${req.get('Host')}/public/${fileName}`);
      const updateEmployeeDto: UpdateEmployeeDto = { ...body, photo, photoPath: filePath }
      const updatedEmployee = await this.employeeService.update(id, updateEmployeeDto);
      if (!updatedEmployee) throw new NotFoundException('Employee not found');

      return formatResponse(HttpStatus.OK, 'Employee updated successfully', updatedEmployee);
    } else {
      return formatResponse(HttpStatus.OK, 'Employee updated successfully', body);
    }


  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.employeeService.remove(id);
    return formatResponse(HttpStatus.OK, 'Employee deleted successfully', null);
  }


}
