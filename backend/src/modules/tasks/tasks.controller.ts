import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

import {CreateTaskReqDto} from './dto/req/create-task.req.dto';
import {TaskListReqDto} from './dto/req/task-list.req.dto';
import {UpdateTaskReqDto} from './dto/req/update-task.req.dto';
import {TaskResDto} from './dto/res/task.res.dto';
import {TaskListResDto} from './dto/res/task-list.res.dto';
import {TasksService} from './services/tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({
    description: 'A list of tasks with pagination information.',
    type: TaskListResDto,
  })
  public async getAllTasks(@Query() query: TaskListReqDto): Promise<TaskListResDto> {
    return await this.tasksService.getAllTasks(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The task has been successfully created.', type: TaskResDto })
  @ApiBody({
    description: 'Data for creating a new task.',
    type: CreateTaskReqDto,
  })
  createTask(@Body() createTaskDto: CreateTaskReqDto): Promise<TaskResDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
    type: TaskResDto,
  })
  @ApiParam({ name: 'id', description: 'The ID of the task to update.', type: 'string' })
  @ApiBody({
    description: 'Data for updating the task. All fields are optional.',
    type: UpdateTaskReqDto,
  })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskReqDto): Promise<TaskResDto> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The task has been successfully deleted.' })
  @ApiParam({ name: 'id', description: 'The ID of the task to delete.', type: 'string' })
  async deleteTask(@Param('id') id: string): Promise<void> {
    await this.tasksService.deleteTask(id);
  }
}
