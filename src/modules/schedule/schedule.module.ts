import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/database/entities/schedule.entity';
import { SubjectModule } from '../subject/subject.module';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
import { RoomModule } from '../room/room.module';

@Module({
    imports: [
        SubjectModule,
        TeacherModule,
        StudentModule,
        RoomModule,
        TypeOrmModule.forFeature([ScheduleEntity])
    ],
    controllers: [ScheduleController],
    providers: [ScheduleService],
})
export class ScheduleModule { }
