import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { ScheduleDto } from './dto/schedule.interface';

@Roles(Role.ADMIN)
@Controller('schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService
    ) { }

    @Get()
    async find() {
        return this.scheduleService.find();
    }

    @Roles(Role.STUDENT)
    @Get('student')
    getStudentSchedule(@Req() req) {
        return this.scheduleService.getStudentSchedule(req.user.id);
    }

    @Roles(Role.TEACHER)
    @Get('teacher')
    getTeacherSchedule(@Req() req) {
        return this.scheduleService.getTeacherSchedule(req.user.id);
    }

    @Post('create')
    create(@Req() req, @Body() data: ScheduleDto) {
        return this.scheduleService.create(req.user.id, data);
    }

    @Patch('update/:id')
    update(@Param('id', ParseIntPipe) scheduleId: number, @Req() req, @Body() data: ScheduleDto) {
        return this.scheduleService.update(req.user.id, scheduleId, data);
    }

    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) scheduleId: number) {
        return this.scheduleService.delete(scheduleId);
    }
}
