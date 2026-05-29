import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
    //nombre obligatorio para departamento
    @IsString()
    @IsNotEmpty()
    @MaxLength(80)
    name!: string;
}