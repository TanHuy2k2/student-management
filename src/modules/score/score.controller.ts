import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { ScoreDto } from './dto/score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Controller('score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService
    ) { }

    @Roles(Role.STUDENT)
    @Get('student')
    getStudentScore(@Req() req) {
        return this.scoreService.getStudentScore(req.user.id);
    }

    @Roles(Role.STUDENT)
    @Post('register-subject')
    registerSubject(@Req() req, @Body() data: ScoreDto) {
        return this.scoreService.registerSubject(req.user.id, data);
    }

    @Roles(Role.TEACHER)
    @Patch('update/:id')
    updateScore(@Param('id', ParseIntPipe) scoreId, @Req() req, @Body() data: UpdateScoreDto) {
        return this.scoreService.updateScore(req.user.id, scoreId, data)
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    deleteScore(@Param('id', ParseIntPipe) scoreId) {
        return this.scoreService.delete(scoreId)
    }
}
