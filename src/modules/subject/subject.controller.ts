import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Role } from 'src/commons/enums/role.enum';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.sto';

@Roles(Role.ADMIN)
@Controller('subject')
export class SubjectController {
    constructor(
        private readonly subjectService: SubjectService
    ) { }

    @Get()
    find() {
        return this.subjectService.find();
    }

    @Post('create')
    create(@Req() req, @Body() data: CreateSubjectDto) {
        const userId = req.user.id;
        return this.subjectService.create({ ...data, createdBy: userId, updatedBy: userId });
    }

    @Patch('update/:id')
    update(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateSubjectDto) {
        return this.subjectService.update(id, { ...data, updatedBy: req.user.id });
    }

    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.subjectService.delete(id);
    }
}
