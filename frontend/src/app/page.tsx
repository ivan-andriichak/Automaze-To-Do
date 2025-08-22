'use client';

import React, {useCallback, useEffect, useState} from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import {Task, TaskListResponse} from '@/types/task';
import {createTask, deleteTask, getTasks, updateTask} from '@/lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchTasks = useCallback(async () => {
    try {
      const data: TaskListResponse = await getTasks({ search, status, sort, page, limit });
      setTasks(data.tasks);
      setTotal(data.total);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [limit, page, search, sort, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (title: string, description: string | null, priority: number) => {
    try {
      await createTask({ title, description, priority });
      await fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await updateTask(id, updates);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600">My To-Do</h1>
          <p className="text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <TaskForm onAdd={handleAddTask} />

          <TaskFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
          />

          <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />

          {total > limit && (
            <div className="p-4 flex justify-center space-x-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>Page {page} of {Math.ceil(total / limit)}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * limit >= total}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}