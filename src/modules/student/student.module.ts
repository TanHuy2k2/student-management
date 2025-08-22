import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/database/entities/student.entity';
import { AccountModule } from '../accounts/accounts.module';

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([StudentEntity])
    ],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule { }
