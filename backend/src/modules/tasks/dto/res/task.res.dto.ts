import {ApiProperty} from '@nestjs/swagger';

import {CreateUpdateModel} from '../../../../database/entities/models/create-update.model';

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
}
