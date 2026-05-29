import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Controller('areas')
export class AreasController {
    constructor(private readonly areasService: AreasService) { }

    @Post()
    create(@Body() dto: CreateAreaDto) {
        return this.areasService.create(dto);
    }

    @Get()
    findAll(@Query('departmentId') departmentId?: string) {
        return this.areasService.findAll(
            departmentId ? Number(departmentId) : undefined,
        );
    }
}