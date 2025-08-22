import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [
        AccountModule,
        JwtModule.register({}),
        RedisModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule { }
