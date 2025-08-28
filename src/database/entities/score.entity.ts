import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { SubjectEntity } from './subject.entity';
import { StudentEntity } from './student.entity';

@Entity({ name: 'scores' })
export class ScoreEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0, type: 'float' })
    attendance: number;

    @Column({ default: 0, type: 'float' })
    midterm: number;

    @Column({ default: 0, type: 'float' })
    final: number;

    @ManyToOne(() => SubjectEntity, (subject) => subject.score, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;

    @ManyToOne(() => StudentEntity, (student) => student.score, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: StudentEntity;
}
