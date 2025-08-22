import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTaskReqDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Buy bread',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'A brief description of the task',
    example: 'Buy fresh bread from the bakery',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The priority of the task (integer from 1 to 10)',
    example: 5,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  priority?: number = 1;
}
