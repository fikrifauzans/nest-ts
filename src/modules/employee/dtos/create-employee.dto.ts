import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

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
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  photoPath?: string;

  @IsString()
  status: string;
}
