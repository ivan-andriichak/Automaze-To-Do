import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsIn, IsNumberString, IsOptional} from 'class-validator';

export class TaskListQueryDto {
  @ApiPropertyOptional({ description: 'Page number for pagination', type: Number, example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({ description: 'Limit of items per page', type: Number, example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({ description: 'Search term for filtering tasks', type: String, example: 'meeting' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Task status filter', enum: ['all', 'done', 'undone'], example: 'all' })
  @IsOptional()
  @IsIn(['all', 'done', 'undone'])
  status?: string;

  @ApiPropertyOptional({ description: 'Sort order', enum: ['asc', 'desc'], example: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
