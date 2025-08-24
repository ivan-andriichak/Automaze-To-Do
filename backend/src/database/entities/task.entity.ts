import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

import { CreateUpdateModel } from './models/create-update.model';

@Entity('tasks')
export class TaskEntity extends CreateUpdateModel {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ default: false })
  done: boolean;

  @Column({ type: 'int', default: 1 })
  priority: number;

  @CreateDateColumn()
  declare created_at: Date;

  @UpdateDateColumn()
  declare updated_at: Date;
}
