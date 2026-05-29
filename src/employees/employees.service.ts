import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(private readonly prisma: PrismaService) { }

    private async validateDepartmentAndArea(departmentId: number, areaId: number) {
        const department = await this.prisma.department.findUnique({
            where: { id: departmentId },
        });

        if (!department) {
            throw new NotFoundException('Department not found');
        }

        const area = await this.prisma.area.findUnique({
            where: { id: areaId },
        });

        if (!area) {
            throw new NotFoundException('Area not found');
        }

        if (area.departmentId !== departmentId) {
            throw new BadRequestException('Area does not belong to the selected department');
        }
    }

    async create(dto: CreateEmployeeDto) {
        await this.validateDepartmentAndArea(dto.departmentId, dto.areaId);

        const exists = await this.prisma.employee.findUnique({
            where: { email: dto.email.trim().toLowerCase() },
        });

        if (exists) {
            throw new ConflictException('Employee email already exists');
        }

        return this.prisma.employee.create({
            data: {
                firstName: dto.firstName.trim(),
                lastName: dto.lastName.trim(),
                email: dto.email.trim().toLowerCase(),
                hireDate: dto.hireDate,
                departmentId: dto.departmentId,
                areaId: dto.areaId,
            },
            include: {
                department: true,
                area: true,
            },
        });
    }

    findAll() {
        return this.prisma.employee.findMany({
            orderBy: { id: 'asc' },
            include: {
                department: true,
                area: true,
            },
        });
    }

    async findOne(id: number) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: {
                department: true,
                area: true,
            },
        });

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return employee;
    }

    async update(id: number, dto: UpdateEmployeeDto) {
        const currentEmployee = await this.findOne(id);

        const departmentId = dto.departmentId ?? currentEmployee.departmentId;
        const areaId = dto.areaId ?? currentEmployee.areaId;

        await this.validateDepartmentAndArea(departmentId, areaId);

        if (dto.email && dto.email.trim().toLowerCase() !== currentEmployee.email) {
            const exists = await this.prisma.employee.findUnique({
                where: { email: dto.email.trim().toLowerCase() },
            });

            if (exists) {
                throw new ConflictException('Employee email already exists');
            }
        }

        return this.prisma.employee.update({
            where: { id },
            data: {
                firstName: dto.firstName?.trim(),
                lastName: dto.lastName?.trim(),
                email: dto.email?.trim().toLowerCase(),
                hireDate: dto.hireDate,
                departmentId: dto.departmentId,
                areaId: dto.areaId,
            },
            include: {
                department: true,
                area: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.employee.delete({
            where: { id },
        });
    }
}