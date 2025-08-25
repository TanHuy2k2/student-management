import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../accounts/accounts.service';
import { TeacherInterface } from './interface/teacher.interface';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { AccountEntity } from 'src/database/entities/account.entity';
import { TeacherEntity } from 'src/database/entities/teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(TeacherEntity)
        private teacherRepository: Repository<TeacherEntity>,
        private accountService: AccountService
    ) { }

    async find(): Promise<TeacherInterface[]> {
        const teachers = await this.teacherRepository.find({ relations: ['account'] });
        return teachers;
    }

    async findOne(account): Promise<TeacherInterface | null> {
        const teacher = await this.teacherRepository.findOneBy({ account });
        return teacher;
    }

    async register(data: CreateTeacherDto) {
        try {
            const account = await this.accountService.create(data);
            const teacher = {
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                account: account as AccountEntity,
            }
            return await this.teacherRepository.save(teacher);
        } catch (error) {
            throw error
        }
    }

    async update(accountId, data: UpdateTeacherDto) {
        try {
            const teacherById = await this.findOne({ id: accountId } as AccountEntity);
            if (!teacherById) {
                throw new NotFoundException(`Teacher with account id=${accountId} not found`);
            }

            const account = await this.accountService.update(accountId, data);
            const teacher = {
                id: teacherById.id,
                updatedBy: data.updatedBy,
                updatedAt: new Date(),
                account: account as AccountEntity,
            }
            return await this.teacherRepository.save(teacher);
        } catch (error) {
            throw error
        }
    }

    async delete(accountId) {
        const account = { id: accountId } as AccountEntity;
        const teacherById = await this.findOne(account);
        if (!teacherById) {
            throw new NotFoundException(`Teacher with account id=${accountId} not found`);
        }
        return await this.teacherRepository.delete({ account });
    }
}
