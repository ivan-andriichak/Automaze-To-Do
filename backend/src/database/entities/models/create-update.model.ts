import {ApiProperty} from '@nestjs/swagger';
import {PrimaryGeneratedColumn} from 'typeorm';

export class CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The timestamp when the task was created',
    example: '2025-08-22T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the task was last updated',
    example: '2025-08-22T10:00:00.000Z',
  })
  updatedAt: Date;
}
