import {ApiPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsEnum, IsIn, IsInt, IsOptional, IsString, Min} from 'class-validator';

import {TaskStatus} from '../../enums/task-status.enum';

export class TaskListReqDto {
  @ApiPropertyOptional({ description: 'Page number for pagination', example: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Limit of items per page', example: 10, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Search term for filtering tasks by title', example: 'meeting' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Task status filter',
    enum: TaskStatus,
    example: TaskStatus.All,
    default: TaskStatus.All,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.All;

  @ApiPropertyOptional({ description: 'Sort order by priority', enum: ['asc', 'desc'], example: 'asc' })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sort?: 'asc' | 'desc';
}
