import { Column, Entity, OneToMany } from 'typeorm';

import { CreateUpdateModel } from './models/create-update.model';
import { TaskEntity } from './task.entity';

@Entity('users')
export class UserEntity extends CreateUpdateModel {
  @Column('text')
  email: string;

  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column('text', { select: false })
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user, { cascade: true })
  tasks: TaskEntity[];
}
