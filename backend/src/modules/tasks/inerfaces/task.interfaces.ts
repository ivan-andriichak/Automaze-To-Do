 export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: number;
}


export interface TaskResDto extends Task {
  createdAt: Date;
  updatedAt: Date;
}