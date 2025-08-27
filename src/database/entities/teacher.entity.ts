import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { AccountEntity } from './account.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'teachers' })
export class TeacherEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AccountEntity, (account) => account.teacher, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.teacher)
    schedule: ScheduleEntity[];
}
