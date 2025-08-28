import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { ScoreEntity } from './score.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => ScoreEntity, (score) => score.subject)
    score: ScoreEntity[];

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.subject)
    schedule: ScheduleEntity[];
}
