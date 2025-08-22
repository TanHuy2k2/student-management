import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { Role } from '../../commons/enums/role.enum';
import { StudentEntity } from './student.entity';

@Entity({ name: 'accounts' })
export class AccountEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
    role: Role;

    @Column({ nullable: true })
    image: string;

    @OneToOne(() => StudentEntity, (student) => student.account)
    student: StudentEntity;
}
