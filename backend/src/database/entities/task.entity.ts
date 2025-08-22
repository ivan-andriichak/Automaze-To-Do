import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {CreateUpdateModel} from "./models/create-update.model";

@Entity()
export class TaskEntity extends CreateUpdateModel{
  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  @Column({ type: 'int', default: 1 })
  priority: number;
}
