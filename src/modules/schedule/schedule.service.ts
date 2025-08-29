import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/database/entities/schedule.entity';
import { ScheduleInterface } from './interface/schedule.interface';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import { SubjectService } from '../subject/subject.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { ScheduleDto } from './dto/schedule.interface';
import { RoomService } from '../room/room.service';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(ScheduleEntity)
        private scheduleRepository: Repository<ScheduleEntity>,
        private subjectService: SubjectService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private roomService: RoomService
    ) { }

    async find(): Promise<ScheduleInterface[]> {
        return await this.scheduleRepository.find({
            relations: ['subject', 'teacher', 'teacher.account', 'student', 'student.account'],
            select: {
                id: true,
                subject: {
                    id: true,
                    name: true
                },
                teacher: {
                    id: true,
                    account: {
                        name: true,
                    }
                },
                student: {
                    id: true,
                    account: {
                        name: true,
                    }
                },
                dayOfWeek: true,
                startTime: true,
                endTime: true
            }
        })
    }

    async findById(id: number) {
        return await this.scheduleRepository.findOne({
            where: { id },
            relations: ['subject', 'teacher', 'room', 'teacher.account', 'student', 'student.account']
        });
    }

    async checkRoomValid(data: ScheduleDto): Promise<ScheduleInterface | null> {
        const { roomId, dayOfWeek, startTime, endTime } = data;
        return await this.scheduleRepository.findOneBy({
            room: { id: roomId },
            dayOfWeek,
            startTime: LessThan(endTime),
            endTime: MoreThan(startTime),
        })
    }

    async getStudentSchedule(accountId: number): Promise<ScheduleInterface[]> {
        const student = await this.studentService.findByAccount({ id: accountId });
        if (!student) {
            throw new NotFoundException(`No have student schedule with account id=${accountId}`);
        }

        return await this.scheduleRepository.find({
            where: accountId ? {
                student: {
                    account: { id: accountId }
                }
            } : {},
            relations: ['subject', 'teacher', 'teacher.account'],
            select: {
                id: true,
                subject: {
                    id: true,
                    name: true
                },
                teacher: {
                    id: true,
                    account: {
                        name: true,
                    }
                },
                dayOfWeek: true,
                startTime: true,
                endTime: true
            }
        })
    }

    async getTeacherSchedule(accountId: number): Promise<ScheduleInterface[]> {
        const teacher = await this.teacherService.findOne({ id: accountId });
        if (!teacher) {
            throw new NotFoundException(`No have teacher schedule with account id=${accountId}`);
        }

        return await this.scheduleRepository.find({
            where: accountId ? {
                teacher: {
                    account: { id: accountId }
                }
            } : {},
            relations: ['subject'],
            select: {
                id: true,
                subject: {
                    id: true,
                    name: true
                },
                dayOfWeek: true,
                startTime: true,
                endTime: true
            }
        })
    }

    async validateScheduleData(data: ScheduleDto) {
        const { studentId, subjectId, teacherId, roomId, startTime, endTime } = data;
        const student = await this.studentService.findById(studentId);
        if (!student) throw new NotFoundException(`Not found student with ID = ${studentId}`);

        const subject = await this.subjectService.findById(subjectId);
        if (!subject) throw new NotFoundException(`Not found subject with ID = ${subjectId}`);

        const teacher = await this.teacherService.findById(teacherId);
        if (!teacher) throw new NotFoundException(`Not found teacher with ID = ${teacherId}`);

        const room = await this.roomService.findById(roomId);
        if (!room) throw new NotFoundException(`Not found room with ID = ${roomId}`);

        if (startTime > endTime) {
            throw new BadRequestException('startTime must be earlier than endTime');
        }

        const checkRoomValid = await this.checkRoomValid(data);
        if (checkRoomValid) {
            throw new ConflictException(`Schedule time conflict in this room ${checkRoomValid.room}!`);
        }
    }

    async create(userId: number, data: ScheduleDto): Promise<ScheduleInterface> {
        await this.validateScheduleData(data);
        const { studentId, subjectId, teacherId, roomId, dayOfWeek, startTime, endTime } = data;
        const schedule = {
            createdBy: userId,
            updatedBy: userId,
            student: { id: studentId },
            subject: { id: subjectId },
            teacher: { id: teacherId },
            room: { id: roomId },
            dayOfWeek,
            startTime,
            endTime
        };

        return await this.scheduleRepository.save(schedule);
    }

    async update(userId: number, scheduleId: number, data: ScheduleDto): Promise<ScheduleInterface> {
        const schedule = await this.findById(scheduleId);
        if (!schedule) throw new NotFoundException(`Schedule with id = ${scheduleId} not found`);

        const studentId = data.studentId ?? schedule.student.id;
        const subjectId = data.subjectId ?? schedule.subject.id;
        const teacherId = data.teacherId ?? schedule.teacher.id;
        const roomId = data.roomId ?? schedule.room.id;
        const dayOfWeek = data.dayOfWeek ?? schedule.dayOfWeek;
        const startTime = data.startTime ?? schedule.startTime;
        const endTime = data.endTime ?? schedule.endTime;

        await this.validateScheduleData(data);

        const updateSchedule = {
            id: scheduleId,
            updatedBy: userId,
            student: { id: studentId },
            subject: { id: subjectId },
            teacher: { id: teacherId },
            room: { id: roomId },
            dayOfWeek,
            startTime,
            endTime
        };

        return await this.scheduleRepository.save(updateSchedule);
    }

    async delete(scheduleId: number) {
        try {
            const scheduleById = await this.findById(scheduleId);
            if (!scheduleById) {
                throw new NotFoundException(`No have schedule with id = ${scheduleId}`);
            }
            return await this.scheduleRepository.delete(scheduleId);
        } catch (error) {
            throw error
        }
    }
}
