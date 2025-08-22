import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { UpdateTaskReqDto } from './dto/req/update-task.req.dto';
import { TaskListQueryDto } from './dto/req/task-list.query.dto';
import { TaskListResDto } from './dto/res/task-list.res.dto';

import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {TaskResDto} from "./inerfaces/task.interfaces";
import {CreateTaskDto} from "./dto/req/create-task.req.dto";

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all tasks',
    type: TaskListResDto,
  })
  @ApiBody({
    description: 'Query parameters for filtering and pagination',
    type: TaskListQueryDto,
  })
  public async getAllTasks(@Query() query: TaskListQueryDto): Promise<TaskListResDto> {
    return this.tasksService.getAllTasks(query);
  }

@Post()
@ApiBody({
  description: 'Task data to create',
  type: CreateTaskDto,
})
@ApiOkResponse({
  description: 'Create a new task',
})
createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskResDto> {
  return this.tasksService.createTask(createTaskDto);
}

  @Put(':id')
  @ApiOkResponse({
    description: 'Update a task',
  })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskReqDto): Promise<TaskResDto> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete a task',
  })
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}