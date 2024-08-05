import { TableDto } from '@/common/dtos/table.dto';
import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class QueryEmployee extends TableDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  joinDate?: Date;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  photoPath?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
