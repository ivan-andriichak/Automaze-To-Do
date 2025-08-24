'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task, TaskListResponse } from '@/types/task';
import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api';
import EditTaskModal from '@/components/EditTaskModal';
import Sidebar from '@/components/Sidebar';

interface TaskManagerProps {
  initialSearch: string;
  initialStatus: string;
  initialSort: 'asc' | 'desc';
}

export default function TaskManager({
  initialSearch,
  initialStatus,
  initialSort,
}: TaskManagerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [sort, setSort] = useState<'asc' | 'desc'>(initialSort);
  const [limit] = useState(30);
  const [hasSearched, setHasSearched] = useState(!!initialSearch);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const username = 'ivan-andriichak';

  const handleOpenModal = (task: Task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status !== 'all') params.set('status', status);
    if (sort !== 'desc') params.set('sort', sort);
    router.replace(`${pathname}?${params.toString()}`);
  }, [search, status, sort, pathname, router]);

  const fetchTasks = useCallback(async () => {
    try {
      const data: TaskListResponse = await getTasks({
        search,
        status,
        sort,
        limit,
      });
      setTasks(data.tasks);
      if (search) setHasSearched(true);
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
      if (selectedTask && selectedTask.id === id) {
        setSelectedTask(prevTask =>
          prevTask ? { ...prevTask, ...updates } : null,
        );
      }
    } catch (error) {
      console.error('Failed to update task:', { id, updates, error });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      handleCloseModal();
      await fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const noResults = hasSearched && tasks.length === 0;

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        username={username}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="mb-5">
          <p className="text-2xl font-bold text-gray-800">My Day</p>
          <p className="text-gray-500 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>
        {noResults ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>No tasks found for your search.</p>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <div
              className={`flex-1 transition-all duration-300 overflow-y-auto pr-4`}>
              <TaskList
                tasks={tasks.filter(task => !task.done)}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onEdit={handleOpenModal}
                selectedTaskId={selectedTask?.id}
              />
              {tasks.filter(task => task.done).length > 0 && (
                <button
                  className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-white w-full text-left"
                  onClick={() => setShowCompleted(v => !v)}>
                  Completed {tasks.filter(task => task.done).length}
                  <span
                    className={`ml-2 transition-transform inline-block ${showCompleted ? 'rotate-90' : ''}`}>
                    ⮞
                  </span>
                </button>
              )}
              {showCompleted && (
                <div className="mt-2">
                  <TaskList
                    tasks={tasks.filter(task => task.done)}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenModal}
                    selectedTaskId={selectedTask?.id}
                  />
                </div>
              )}
            </div>
            {selectedTask && (
              <div className="fixed inset-0 bg-black bg-opacity-25 z-20 md:relative md:inset-auto md:z-auto md:bg-transparent md:w-1/3 md:ml-4 transition-all duration-300">
                <EditTaskModal
                  task={selectedTask}
                  onClose={handleCloseModal}
                  onSave={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-auto pt-6">
          <TaskForm onAdd={handleAddTask} />
        </div>
      </main>
    </div>
  );
}
