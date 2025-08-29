import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/database/entities/teacher.entity';
import { AccountModule } from '../accounts/accounts.module';

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([TeacherEntity])
    ],
    controllers: [TeacherController],
    providers: [TeacherService],
    exports: [TypeOrmModule, TeacherService]
})
export class TeacherModule { }
