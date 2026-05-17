import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

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
    @MaxLength(120)
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    position!: string;

    @IsInt()
    @Min(1)
    departmentId!: number;
}