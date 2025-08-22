import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get()
    getHello(@Req() req): string {
        return "Hello, " + req.user.username;
    }

    @Public()
    @Post('login')
    async login(@Body() data: LoginDto, @Req() req) {
        const result = await this.authService.login(data, req);
        return { accessToken: result.accessToken, refreshToken: result.refreshToken };
    }

    @Public()
    @Post('refresh')
    async refresh(@Req() req) {
        const refreshToken = req.headers['refreshtoken'];
        const result = await this.authService.refreshToken(refreshToken, req);

        return result;
    }

    @Get('logout')
    async logout(@Req() req) {
        const userId = req.user.id;
        return await this.authService.logout(userId);
    }
}
