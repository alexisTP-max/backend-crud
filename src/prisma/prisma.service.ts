import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    //conecta prisma al iniciar NestJS.
    async onModuleInit() {
        await this.$connect();
    }
}