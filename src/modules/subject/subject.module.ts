import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/database/entities/subject.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubjectEntity])
    ],
    controllers: [SubjectController],
    providers: [SubjectService],
    exports: [TypeOrmModule, SubjectService]
})
export class SubjectModule { }
