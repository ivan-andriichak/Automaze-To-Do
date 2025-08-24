import { ApiProperty } from '@nestjs/swagger';

import { CreateUpdateModel } from '../../../../database/entities/models/create-update.model';

export class TaskResDto extends CreateUpdateModel {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy bread',
  })
  title: string;

  @ApiProperty({
    description: 'A brief description of the task',
    example: 'Buy fresh bread from the bakery',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'The completion status of the task',
    example: false,
  })
  done: boolean;

  @ApiProperty({
    description: 'The priority of the task (1-10)',
    example: 5,
  })
  priority: number;

  @ApiProperty({
    description: 'The timestamp when the task was created',
    example: '2025-08-22T10:00:00.000Z',
  })
  declare created_at: Date;

  @ApiProperty({
    description: 'The timestamp when the task was last updated',
    example: '2025-08-22T10:00:00.000Z',
  })
  declare updated_at: Date;
}
