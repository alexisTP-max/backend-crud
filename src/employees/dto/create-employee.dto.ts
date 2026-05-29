import { Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    lastName!: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(120)
    email!: string;

    @Type(() => Date)
    @IsDate()
    hireDate!: Date;

    @IsInt()
    @Min(1)
    departmentId!: number;

    @IsInt()
    @Min(1)
    areaId!: number;
}