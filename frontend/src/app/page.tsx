'use client';

import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import { Task, TaskListResponse } from '@/types/task';
import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api';

export default function Home() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [limit] = useState(30);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const data: TaskListResponse = await getTasks({
        search,
        status,
        sort,
        limit,
      });
      setTasks(data.tasks);
      if (search) {
        setHasSearched(true);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [limit, search, sort, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (
    title: string,
    description: string | null,
    priority: number,
  ) => {
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
      console.error('Failed to update task:', { id, updates, error });
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

  const noResults = hasSearched && tasks.length === 0;

  return (
    <main className="flex min-h-screen flex-col p-1 sm:p-8 md:p-4 lg:p-6 bg-transparent max-w-7xl mx-auto">
      <div className="text-gray-500">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <header className="mb-5 flex items-center">
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

      {noResults ? (
        <div className="w-full max-w-full text-center text-gray-500 mt-10">
          <p>No tasks found for your search.</p>
        </div>
      ) : (
        <>
          <div
            className="w-full max-w-full overflow-y-auto"
            style={{
              maxHeight: '70vh',
              minHeight: '200px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'inherit',
              overscrollBehavior: 'contain',
            }}>
            <div className="bg-transparent dark:bg-transparent rounded-lg shadow-md">
              <TaskList
                tasks={tasks.filter(task => !task.done)}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            </div>
            {tasks.filter(task => task.done).length > 0 && (
              <button
                className="mt-1.5 px-4 py-2  bg-gray-100 rounded hover:bg-white"
                onClick={() => setShowCompleted(v => !v)}>
                Completed {tasks.filter(task => task.done).length}
                <span
                  className={`ml-2 transition-transform inline-block ${showCompleted ? 'rotate-90' : ''}`}
                  style={{ cursor: 'pointer' }}>
                  ⮞
                </span>
              </button>
            )}
            {showCompleted && (
              <div className="w-full max-w-full overflow-auto mt-2">
                <div className="bg-transparent dark:bg-transparent rounded-lg shadow-md">
                  <TaskList
                    tasks={tasks.filter(task => task.done)}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full  fixed bottom-10 left-0 flex justify-center bg-transparent z-10">
            <TaskForm onAdd={handleAddTask} />
          </div>
        </>
      )}
    </main>
  );
}
