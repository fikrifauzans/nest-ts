import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class TableDto {
  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;

 
}
    