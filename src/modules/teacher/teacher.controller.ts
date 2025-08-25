import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Roles(Role.ADMIN)
@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService
    ) { }

    @Get()
    async find() {
        const teachers = await this.teacherService.find()
        return teachers;
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Post('register')
    register(@Req() req, @Body() data: CreateTeacherDto, @UploadedFile() file: Express.Multer.File) {
        const userId = req.user.id;
        const image = file ? `/uploads/${file.filename}` : '';
        return this.teacherService.register({ ...data, image: image, createdBy: userId, updatedBy: userId, role: Role.TEACHER });
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Patch('update/:accountId')
    update(@Req() req, @Param('accountId', ParseIntPipe) accountId: number, @Body() data: UpdateTeacherDto, @UploadedFile() file: Express.Multer.File) {
        const userId = req.user.id;
        const image = file ? `/uploads/${file.filename}` : '';
        return this.teacherService.update(accountId, { ...data, image: image, updatedBy: userId });
    }

    @Delete('delete/:accountId')
    delete(@Param('accountId', ParseIntPipe) accountId: number) {
        return this.teacherService.delete(accountId);
    }
}
