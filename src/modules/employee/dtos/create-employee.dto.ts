import { Base64Interface } from '@/common/interface/base64.interface';
import { IsString, IsInt, IsDate, IsOptional, isObject } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsInt()
  number: number;

  @IsString()
  position: string;

  @IsString()
  department: string;

  @IsDate()
  joinDate: Date;

  @IsOptional()
  photo?: string;

  @IsOptional()
  photoPath?: any;

  @IsString()
  status: string;
}
