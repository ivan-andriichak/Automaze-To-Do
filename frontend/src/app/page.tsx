'use client';

import React, {useCallback, useEffect, useState} from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import {Task, TaskListResponse} from '@/types/task';
import {createTask, deleteTask, getTasks, updateTask} from '@/lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [limit] = useState(30);

  const fetchTasks = useCallback(async () => {
    try {
      const data: TaskListResponse = await getTasks({ search, status, sort,  limit });
      setTasks(data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [limit,  search, sort, status]);

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
      setTasks(tasks =>
        tasks.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
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
   <main className="flex min-h-screen flex-col items-center p-1 sm:p-8 md:p-4 lg:p-6">
      <div className="text-gray-500">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
     <header className="mb-10 flex items-center">
       <div>
         <p className="text-2xl font-light">My To-Do</p>
       </div>
       <TaskFilter
         search={search}
         setSearch={setSearch}
         status={status}
         setStatus={setStatus}
         sort={sort}
         setSort={setSort}
       />
     </header>

     <div
       className="w-full max-w-full overflow-auto"
       style={{
         maxHeight: '70vh',
         scrollbarWidth: 'thin',
         scrollbarColor: 'auto',
         overscrollBehavior: 'contain'
       }}
       >
        <div className="bg-transparent dark:bg-transparent rounded-lg shadow-md" >

          <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        </div>
      </div>

      <TaskForm onAdd={handleAddTask} />
    </main>
  );
}