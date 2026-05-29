import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(120)
  email?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  hireDate?: Date;

  @IsInt()
  @IsOptional()
  @Min(1)
  departmentId?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  areaId?: number;
}