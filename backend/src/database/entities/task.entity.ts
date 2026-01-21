import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';

import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
