import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { AreasModule } from './areas/areas.module';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DepartmentsModule,
    AreasModule,
    EmployeesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }