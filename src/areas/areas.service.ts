import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Injectable()
export class AreasService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateAreaDto) {
        const department = await this.prisma.department.findUnique({
            where: { id: dto.departmentId },
        });

        if (!department) {
            throw new NotFoundException('Department not found');
        }

        const exists = await this.prisma.area.findFirst({
            where: {
                name: dto.name.trim(),
                departmentId: dto.departmentId,
            },
        });

        if (exists) {
            throw new ConflictException('Area already exists in this department');
        }

        return this.prisma.area.create({
            data: {
                name: dto.name.trim(),
                departmentId: dto.departmentId,
            },
            include: {
                department: true,
            },
        });
    }

    findAll(departmentId?: number) {
        return this.prisma.area.findMany({
            where: departmentId ? { departmentId } : undefined,
            orderBy: { name: 'asc' },
            include: {
                department: true,
            },
        });
    }
}