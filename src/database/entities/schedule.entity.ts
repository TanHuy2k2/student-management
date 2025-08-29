import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { SubjectEntity } from './subject.entity';
import { TeacherEntity } from './teacher.entity';
import { RoomEntity } from './room.entity';
import { DayOfWeek } from '../../commons/enums/day.enum';
import { StudentEntity } from './student.entity';

@Entity({ name: 'schedules' })
export class ScheduleEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentEntity, (student) => student.schedule, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;

    @ManyToOne(() => SubjectEntity, (subject) => subject.schedule, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;

    @ManyToOne(() => TeacherEntity, (teacher) => teacher.schedule, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @ManyToOne(() => RoomEntity, (room) => room.schedule, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'room_id' })
    room: RoomEntity;

    @Column({ name: 'day_of_week', type: 'enum', enum: DayOfWeek })
    dayOfWeek: DayOfWeek;

    @Column({ name: 'start_time', type: 'time' })
    startTime: string;

    @Column({ name: 'end_time', type: 'time' })
    endTime: string;
}
