import {IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {TaskStatus} from "../../enums/task-status.enum";

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'buy bread',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A brief description of the task (optional)',
    example: 'Buy fresh bread from the bakery',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The status of the task (e.g., all, done, undone)',
    example: 'undone',
    enum: TaskStatus,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'The priority of the task (integer from 1 to 10)',
    example: 5,
    required: true,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  priority: number;
}