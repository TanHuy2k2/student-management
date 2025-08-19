import { Column, CreateDateColumn, UpdateDateColumn, UpdateEvent } from 'typeorm';

export abstract class AbstractEntity {
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: number;

    beforeUpdate(event: UpdateEvent<AbstractEntity>) {
        if (event.entity) {
            event.entity.updatedAt = new Date();
        }
    }
}
