import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { AccountEntity } from './account.entity';
import { ScoreEntity } from './score.entity';

@Entity({ name: 'students' })
export class StudentEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AccountEntity, (account) => account.student, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @OneToMany(() => ScoreEntity, (score) => score.student)
    score: ScoreEntity[];
}
