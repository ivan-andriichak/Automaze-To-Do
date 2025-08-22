import { ApiProperty } from '@nestjs/swagger';

import { TaskResDto } from './task.res.dto';

export class TaskListResDto {
  @ApiProperty({ type: [TaskResDto], description: 'List of tasks' })
  tasks: TaskResDto[];

  @ApiProperty({ type: Number, description: 'Total number of tasks' })
  total: number;

  @ApiProperty({ type: Number, description: 'Current page number' })
  page: number;

  @ApiProperty({ type: Number, description: 'Number of tasks per page' })
  limit: number;
}
