import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TaskEntity } from '../../../database/entities/task.entity';
import { TaskListReqDto } from '../../tasks/dto/req/task-list.req.dto';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  public async getAllTasks(query: TaskListReqDto): Promise<[TaskEntity[], number]> {
    const { search, status, sort } = query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('task');

    if (search) {
      queryBuilder.andWhere('task.title ILIKE :search', { search: `%${search}%` });
    }

    if (status === 'done') {
      queryBuilder.andWhere('task.done = :isDone', { isDone: true });
    } else if (status === 'undone') {
      queryBuilder.andWhere('task.done = :isDone', { isDone: false });
    }

    if (sort) {
      const order = sort.toUpperCase() as 'ASC' | 'DESC';
      if (order === 'ASC' || order === 'DESC') {
        queryBuilder.orderBy('task.priority', order);
      }
    } else {
      queryBuilder.orderBy('task.created_at', 'DESC');
    }

    queryBuilder.offset(offset).limit(limit);

    return await queryBuilder.getManyAndCount();
  }
}
