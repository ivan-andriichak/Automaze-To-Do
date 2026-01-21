import { CreateTaskDto, Task, TaskListQueryDto, TaskListResponse, UpdateTaskDto, } from '@/interfaces/task';

import API_BASE_URL from '@/api/apiConfig';

function getAuthHeaders(): HeadersInit | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : null;
}

export async function getTasks(
  query: TaskListQueryDto = {},
): Promise<TaskListResponse> {
  const params = new URLSearchParams(query as never).toString();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const auth = getAuthHeaders();
  if (auth) Object.assign(headers, auth);

  const response = await fetch(`${API_BASE_URL}/tasks?${params}`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

export async function createTask(data: CreateTaskDto): Promise<Task> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const auth = getAuthHeaders();
  if (auth) Object.assign(headers, auth);

  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers,
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
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const auth = getAuthHeaders();
  if (auth) Object.assign(headers, auth);

  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const headers: HeadersInit = {};
  const auth = getAuthHeaders();
  if (auth) Object.assign(headers, auth);

  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}
