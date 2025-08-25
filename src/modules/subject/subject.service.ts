import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/database/entities/subject.entity';
import { Repository } from 'typeorm';
import { SubjectInterface } from './interface/subject.interface';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.sto';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private subjectRepository: Repository<SubjectEntity>,
    ) { }

    async find(): Promise<SubjectInterface[]> {
        return await this.subjectRepository.find();
    }

    async findByName(subjectName): Promise<SubjectInterface | null> {
        return await this.subjectRepository.findOneBy({ name: subjectName });
    }

    async findById(id): Promise<SubjectInterface | null> {
        return await this.subjectRepository.findOneBy({ id });
    }

    async create(data: CreateSubjectDto): Promise<SubjectInterface> {
        try {
            const subject = await this.findByName(data.name);
            if (subject) {
                throw new ConflictException(`This subject name already exists!`);
            }
            return await this.subjectRepository.save(data);
        } catch (error) {
            throw error
        }
    }

    async update(id, data: UpdateSubjectDto): Promise<SubjectInterface> {
        try {
            const subjectById = await this.findById(id);
            if (!subjectById) {
                throw new NotFoundException(`No have subject with id = ${id}`);
            }

            const subjectByName = await this.findByName(data.name);
            if (subjectByName) {
                throw new ConflictException(`This subject name already exists!`);
            }
            return await this.subjectRepository.save({ id, ...data });
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const subjectById = await this.findById(id);
            if (!subjectById) {
                throw new NotFoundException(`No have subject with id = ${id}`);
            }
            return await this.subjectRepository.delete(id);
        } catch (error) {
            throw error
        }
    }
}
