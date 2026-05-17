import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDepartmentDto {
    @IsString()
    @IsOptional()
    @MaxLength(80)
    name?: string;
}