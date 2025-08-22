import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateStudentDto } from './dto/update-student.dto';

@Roles(Role.ADMIN)
@Controller('student')
export class StudentController {
    constructor(
        private studentService: StudentService,
    ) { }

    @Get()
    getHello(): string {
        return this.studentService.getHello();
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Post('register')
    register(@Req() req, @Body() data: CreateStudentDto, @UploadedFile() file: Express.Multer.File) {
        const userId = req.user.id;
        const image = file ? `/uploads/${file.filename}` : '';
        return this.studentService.register({ ...data, image: image, createdBy: userId, updatedBy: userId });
    }

    @UseInterceptors(UploadImageInterceptor('image'))
    @Patch('update/:accountId')
    update(@Req() req, @Param('accountId', ParseIntPipe) accountId: number, @Body() data: UpdateStudentDto, @UploadedFile() file: Express.Multer.File) {
        const userId = req.user.id;
        const image = file ? `/uploads/${file.filename}` : '';
        return this.studentService.update(accountId, { ...data, image: image, updatedBy: userId });
    }

    @Delete('delete/:accountId')
    delete(@Param('accountId', ParseIntPipe) accountId: number) {
        return this.studentService.delete(accountId);
    }
}
