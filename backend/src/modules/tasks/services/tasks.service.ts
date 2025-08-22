import {Injectable, NotFoundException} from '@nestjs/common';

import {TaskRepository} from '../../repository/services/task.repository';
import {CreateTaskReqDto} from '../dto/req/create-task.req.dto';
import {TaskListQueryDto} from '../dto/req/task-list.query.dto';
import {UpdateTaskReqDto} from '../dto/req/update-task.req.dto';
import {TaskListResDto} from '../dto/res/task-list.res.dto';
import {TaskResDto} from '../inerfaces/task.interfaces';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(query: TaskListQueryDto): Promise<TaskListResDto> {
    const { page = 1, limit = 10 } = query;
    const [tasks, total] = await this.taskRepository.getAllTasks(query);

    return {
      tasks: tasks.map((task) => ({
        id: task.id,
        title: task.title,
        done: task.done,
        priority: task.priority,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      })),
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async createTask(createTaskDto: CreateTaskReqDto): Promise<TaskResDto> {
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      priority: createTaskDto.priority,
      done: false,
    });
    const savedTask = await this.taskRepository.save(task);
    return {
      id: savedTask.id,
      title: savedTask.title,
      done: savedTask.done,
      priority: savedTask.priority,
      createdAt: savedTask.created_at,
      updatedAt: savedTask.updated_at,
    };
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskReqDto): Promise<TaskResDto> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      done: updatedTask.done,
      priority: updatedTask.priority,
      createdAt: updatedTask.created_at,
      updatedAt: updatedTask.updated_at,
    };
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
