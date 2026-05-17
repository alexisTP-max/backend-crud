import { IsEmail, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

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

  @IsString()
  @IsOptional()
  @MaxLength(100)
  position?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  departmentId?: number;
}