export interface Task {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string | null;
  priority?: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string | null;
  done?: boolean;
  priority?: number;
}

export interface TaskListQueryDto {
  search?: string;
  status?: string;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
