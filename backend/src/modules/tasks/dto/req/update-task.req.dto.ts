import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTaskReqDto {
  @ApiPropertyOptional({
    description: 'The new title of the task',
    example: 'Buy whole grain bread',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'A new description for the task',
    example: 'Buy fresh whole grain bread from the local bakery',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The completion status of the task',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @ApiPropertyOptional({
    description: 'The new priority of the task (integer from 1 to 10)',
    example: 8,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  priority?: number;
}
