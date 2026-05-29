import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateAreaDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    name?: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    departmentId?: number;
}