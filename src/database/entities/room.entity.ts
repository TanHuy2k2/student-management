import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'rooms' })
export class RoomEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.room)
    schedule: ScheduleEntity[];
}
