import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    getHello(@Req() req): string {
        return "Hello, " + req.user.username;
    }

    @Post('login')
    async login(@Body() data: LoginDto, @Req() req) {
        const result = await this.authService.login(data, req);

        return { accessToken: result.accessToken, refreshToken: result.refreshToken };
    }

    @Post('refresh')
    async refresh(@Req() req) {
        const refreshToken = req.headers['refreshtoken'];
        const result = await this.authService.refreshToken(refreshToken, req);

        return result;
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(@Req() req, @Res() res) {
        const userId = req.user.id;
        await this.authService.logout(userId);

        return { message: 'Logged out' };
    }
}
