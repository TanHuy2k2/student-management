import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreEntity } from 'src/database/entities/score.entity';
import { StudentModule } from '../student/student.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
    imports: [
        StudentModule,
        SubjectModule,
        TypeOrmModule.forFeature([ScoreEntity])
    ],
    controllers: [ScoreController],
    providers: [ScoreService],
})
export class ScoreModule { }
