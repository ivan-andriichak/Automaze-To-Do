import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskEntity } from '../../../database/entities/task.entity';
import { TaskRepository } from '../../repository/services/task.repository';
import { CreateTaskReqDto } from '../dto/req/create-task.req.dto';
import { TaskListReqDto } from '../dto/req/task-list.req.dto';
import { UpdateTaskReqDto } from '../dto/req/update-task.req.dto';
import { TaskResDto } from '../dto/res/task.res.dto';
import { TaskListResDto } from '../dto/res/task-list.res.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  private mapTaskToResDto(task: TaskEntity): TaskResDto {
    return {
      id: task.id,
      created_at: task.created_at,
      updated_at: task.updated_at,
      title: task.title,
      description: task.description,
      done: task.done,
      priority: task.priority,
    };
  }

  async getAllTasks(query: TaskListReqDto, userId: string): Promise<TaskListResDto> {
    const [tasks, total] = await this.taskRepository.getAllTasks(query, userId);

    return {
      tasks: tasks.map(this.mapTaskToResDto),
      total,
      page: query.page ?? 1,
      limit: query.limit ?? 10,
    };
  }

  async createTask(createTaskDto: CreateTaskReqDto, userId: string): Promise<TaskResDto> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      done: false,
      userId,
    });
    const savedTask = await this.taskRepository.save(task);
    return this.mapTaskToResDto(savedTask);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskReqDto, userId: string): Promise<TaskResDto> {
    const task = await this.taskRepository.findOneBy({ id, userId });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updated = await this.taskRepository.save({ ...task, ...updateTaskDto });
    return this.mapTaskToResDto(updated);
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
