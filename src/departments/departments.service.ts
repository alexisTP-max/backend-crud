import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
    constructor(private readonly prisma: PrismaService) { }

    create(dto: CreateDepartmentDto) {
        return this.prisma.department.create({ data: dto });
    }

    findAll() {
        return this.prisma.department.findMany({
            orderBy: { id: 'asc' },
            include: { employees: false },
        });
    }

    async findOne(id: number) {
        const department = await this.prisma.department.findUnique({ where: { id } });
        if (!department) throw new NotFoundException('Department not found');
        return department;
    }

    async update(id: number, dto: UpdateDepartmentDto) {
        await this.findOne(id);
        return this.prisma.department.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number) {
        const employeesCount = await this.prisma.employee.count({
            where: { departmentId: id },
        });

        if (employeesCount > 0) {
            throw new ConflictException('Department has employees assigned');
        }

        await this.findOne(id);
        return this.prisma.department.delete({ where: { id } });
    }
}