import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'teachers' })
export class TeacherEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AccountEntity, (account) => account.teacher, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;
}
