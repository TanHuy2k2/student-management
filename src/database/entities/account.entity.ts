import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { Role } from '../../commons/enums/role.enum';

@Entity({ name: 'accounts' })
export class AccountsEntity extends AbstractEntity {
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
}
