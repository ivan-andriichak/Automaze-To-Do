import { Injectable } from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {TaskEntity} from "../../../database/entities/task.entity";
import {TaskListQueryDto} from "../../tasks/dto/req/task-list.query.dto";

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  public async getAllTasks(query: TaskListQueryDto): Promise<[TaskEntity[], number]> {
    const { search, status, sort, page = 1, limit = 10 } = query;

    const queryBuilder = this.createQueryBuilder('task');

    if (search) {
      queryBuilder.andWhere('task.title ILIKE :search', { search: `%${search}%` });
    }

    if (status === 'done') {
      queryBuilder.andWhere('task.done = true');
    } else if (status === 'undone') {
      queryBuilder.andWhere('task.done = false');
    }

    if (sort) {
      queryBuilder.orderBy('task.priority', sort.toUpperCase() as 'ASC' | 'DESC');
    }

    const offset = (page - 1) * limit;
    queryBuilder.offset(offset).limit(limit);

    return queryBuilder.getManyAndCount();
  }
}