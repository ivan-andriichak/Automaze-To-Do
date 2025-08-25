import {
  CreateTaskDto,
  Task,
  TaskListQueryDto,
  TaskListResponse,
  UpdateTaskDto,
} from '@/types/task';

import API_BASE_URL from '@/lib/apiConfig';

export async function getTasks(
  query: TaskListQueryDto = {},
): Promise<TaskListResponse> {
  const params = new URLSearchParams(query as never).toString();
  const response = await fetch(`${API_BASE_URL}/tasks?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

export async function createTask(data: CreateTaskDto): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
}

export async function updateTask(
  id: string,
  data: UpdateTaskDto,
): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}
