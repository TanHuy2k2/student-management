import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreEntity } from 'src/database/entities/score.entity';
import { Not, Repository } from 'typeorm';
import { ScoreInterface } from './interface/score.interface';
import { ScoreDto } from './dto/score.dto';
import { StudentService } from '../student/student.service';
import { SubjectService } from '../subject/subject.service';
import { UpdateScoreDto } from './dto/update-score.dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(ScoreEntity)
        private scoreRepository: Repository<ScoreEntity>,
        private studentService: StudentService,
        private subjectService: SubjectService
    ) { }

    async findOne(id: number): Promise<ScoreInterface | null> {
        return await this.scoreRepository.findOneBy({ id });
    }

    async findDuplicate(studentId: number, subjectId: number, scoreId?: number): Promise<ScoreInterface | null> {
        return await this.scoreRepository.findOneBy({
            student: { id: studentId },
            subject: { id: subjectId },
            ...(scoreId ? { id: Not(scoreId) } : {}),
        })
    }

    async getStudentScore(accountId: number): Promise<ScoreInterface[]> {
        return await this.scoreRepository.find({
            relations: ['student', 'subject'],
            where: {
                student: {
                    account: { id: accountId },
                },
            },
            select: {
                attendance: true,
                midterm: true,
                final: true,
                student: {
                    id: true
                },
                subject: {
                    id: true,
                    name: true
                }
            }
        });
    }

    async registerSubject(accountId: number, data: ScoreDto): Promise<ScoreInterface> {
        const { subjectId } = data;
        const student = await this.studentService.findByAccount(accountId);
        if (!student) {
            throw new NotFoundException(`Not found student with account ID = ${accountId}`);
        }

        const studentId = student.id;
        const subject = await this.subjectService.findById(subjectId);
        if (!subject) {
            throw new NotFoundException(`Not found subject with ID = ${subjectId}`)
        }

        const duplicate = await this.findDuplicate(studentId, subjectId);
        if (duplicate) {
            throw new ConflictException(`StudentId, subjectId already exist in student-subject!`);
        }

        const score = {
            createdBy: studentId,
            updatedBy: studentId,
            student: { id: studentId },
            subject: { id: subjectId },
        }
        return await this.scoreRepository.save(score);
    }

    async updateScore(accountId: number, scoreId: number, data: UpdateScoreDto) {
        const { attendance, midterm, final } = data;
        const current = await this.findOne(scoreId);
        if (!current) {
            throw new NotFoundException(`Score with id = ${scoreId} not found`);
        }

        const score = {
            id: scoreId,
            updatedBy: accountId,
            attendance,
            midterm,
            final
        }
        return await this.scoreRepository.save(score);
    }

    async delete(scoreId: number) {
        try {
            const current = await this.findOne(scoreId);
            if (!current) {
                throw new NotFoundException(`Score with id = ${scoreId} not found`);
            }
            return await this.scoreRepository.delete({ id: scoreId });
        } catch (error) {
            throw error
        }
    }
}
