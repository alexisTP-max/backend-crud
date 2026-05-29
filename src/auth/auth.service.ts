import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) throw new ConflictException('Email already registered');

        const hashedPassword = await hash(dto.password, 10);

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return {
            accessToken: await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                role: user.role,
            }),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}