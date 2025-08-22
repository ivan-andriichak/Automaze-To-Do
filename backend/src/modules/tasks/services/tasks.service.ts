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
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      title: task.title,
      description: task.description,
      done: task.done,
      priority: task.priority,
    };
  }

  async getAllTasks(query: TaskListReqDto): Promise<TaskListResDto> {
    const [tasks, total] = await this.taskRepository.getAllTasks(query);

    return {
      tasks: tasks.map(this.mapTaskToResDto),
      total,
      page: query.page ?? 1,
      limit: query.limit ?? 10,
    };
  }

  async createTask(createTaskDto: CreateTaskReqDto): Promise<TaskResDto> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      done: false,
    });
    const savedTask = await this.taskRepository.save(task);
    return this.mapTaskToResDto(savedTask);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskReqDto): Promise<TaskResDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updated = await this.taskRepository.save({ ...task, ...updateTaskDto });
    return this.mapTaskToResDto(updated);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
