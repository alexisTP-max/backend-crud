import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(private readonly prisma: PrismaService) { }

    private async ensureDepartmentExists(departmentId: number) {
        const department = await this.prisma.department.findUnique({
            where: { id: departmentId },
        });

        if (!department) {
            throw new NotFoundException('Department not found');
        }
    }

    async create(dto: CreateEmployeeDto) {
        await this.ensureDepartmentExists(dto.departmentId);

        return this.prisma.employee.create({
            data: dto,
            include: { department: true },
        });
    }

    findAll() {
        return this.prisma.employee.findMany({
            orderBy: { id: 'asc' },
            include: { department: true },
        });
    }

    async findOne(id: number) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: { department: true },
        });

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return employee;
    }

    async update(id: number, dto: UpdateEmployeeDto) {
        await this.findOne(id);

        if (dto.departmentId !== undefined) {
            await this.ensureDepartmentExists(dto.departmentId);
        }

        return this.prisma.employee.update({
            where: { id },
            data: dto,
            include: { department: true },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.employee.delete({
            where: { id },
        });
    }
}