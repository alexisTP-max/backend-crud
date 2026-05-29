import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
        });
    }

    async validate(payload: { sub: number; email: string; role: string }) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}