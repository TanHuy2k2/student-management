import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { SALT_OF_ROUND } from 'src/constants/constant';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private accountServive: AccountsService,
        private jwtService: JwtService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) { }

    async login(data: LoginDto, req: Request) {
        const { email, password } = data;
        const account = await this.accountServive.findOne(email);
        if (!account) throw new UnauthorizedException('Account not activated!');

        const match = await bcrypt.compare(password, account.password);
        if (!match) throw new UnauthorizedException("Password isn't correct!");

        const payload = { id: account.id, username: account.name, roles: account.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '5m'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d'
        });

        await this.redis.set(
            `session:${account.id}`,
            JSON.stringify({
                refreshToken: await bcrypt.hash(refreshToken, SALT_OF_ROUND),
                userAgent: req.headers['user-agent'],
                ip: req.ip,
                createdAt: Date.now(),
            }),
            'EX',
            7 * 24 * 60 * 60,
        );

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string, req: Request) {
        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        let payload: any;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch (err) {
            throw new UnauthorizedException('Expired or invalid refresh token');
        }

        const userId = payload.id;
        const session = await this.redis.get(`session:${userId}`);
        if (!session) throw new UnauthorizedException('Session not found');

        const parsed = JSON.parse(session);
        const match = await bcrypt.compare(refreshToken, parsed.refreshToken);
        if (!match) throw new ForbiddenException('Token mismatch');

        const currentIp = req.ip;
        if (parsed.ip !== currentIp) {
            throw new ForbiddenException('IP mismatch');
        }

        const currentUA = req.headers['user-agent'];
        if (parsed.userAgent !== currentUA) {
            throw new ForbiddenException('Device mismatch');
        }

        const newPayload = {
            id: payload.id,
            username: payload.username,
            roles: payload.roles,
        };
        const newAccessToken = await this.jwtService.signAsync(newPayload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '5m',
        });

        return { accessToken: newAccessToken };
    }

    async logout(userId) {
        await this.redis.del(`session:${userId}`);
    }
}
