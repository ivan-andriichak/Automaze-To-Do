import {ApiProperty} from '@nestjs/swagger';

export class Task {
  @ApiProperty({ type: String, description: `Task ID` })
  id: string;

  @ApiProperty({ type: String, description: `Task title` })
  title: string;

  @ApiProperty({ type: Boolean, description: `Task completion status` })
  done: boolean;

  @ApiProperty({ type: Number, description: `Task priority (1-10)` })
  priority: number;
}

export class TaskResDto extends Task {
  @ApiProperty({ type: Date, description: `Creation timestamp` })
  createdAt: Date;

  @ApiProperty({ type: Date, description: `Last update timestamp` })
  updatedAt: Date;
}
