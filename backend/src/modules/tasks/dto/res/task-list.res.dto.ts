import {TaskResDto} from "../../inerfaces/task.interfaces";
import {ApiProperty} from "@nestjs/swagger";

export class TaskListResDto {
  @ApiProperty({ type: [TaskListResDto], description: `List of tasks` })
  tasks: TaskResDto[];


  @ApiProperty({ type: Number, description: `Total number of tasks` })
  total: number;


  @ApiProperty({ type: Number, description: `Current page number` })
  page: number;

  @ApiProperty({ type: Number, description: `Number of tasks per page` })
  limit: number;
}