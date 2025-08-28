import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from '../accounts/accounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/database/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { AccountEntity } from 'src/database/entities/account.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentInterface } from './interface/student.interface';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: Repository<StudentEntity>,
        private accountService: AccountService
    ) { }

    getHello(): string {
        return 'Hello student!';
    }

    async findByAccount(account): Promise<StudentInterface | null> {
        const student = await this.studentRepository.findOneBy({ account });
        return student;
    }

    async findById(id: number): Promise<StudentInterface | null> {
        const student = await this.studentRepository.findOneBy({ id });
        return student;
    }

    async register(data: CreateStudentDto) {
        try {
            const account = await this.accountService.create(data);
            const student = {
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                account: account as AccountEntity,
            }
            return await this.studentRepository.save(student);
        } catch (error) {
            throw error
        }
    }

    async update(accountId, data: UpdateStudentDto) {
        try {
            const studentById = await this.findByAccount({ id: accountId } as AccountEntity);
            if (!studentById) {
                throw new NotFoundException(`Student with account id=${accountId} not found`);
            }

            const account = await this.accountService.update(accountId, data);
            const student = {
                id: studentById.id,
                updatedBy: data.updatedBy,
                account: account as AccountEntity,
            }
            return await this.studentRepository.save(student);
        } catch (error) {
            throw error
        }
    }

    async delete(accountId) {
        const account = { id: accountId } as AccountEntity;
        const studentById = await this.findByAccount(account);
        if (!studentById) {
            throw new NotFoundException(`Student with account id=${accountId} not found`);
        }
        return await this.studentRepository.delete({ account });
    }
}
