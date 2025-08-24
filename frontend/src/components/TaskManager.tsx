'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task, TaskListResponse } from '@/types/task';
import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api';
import EditTaskModal from '@/components/EditTaskModal';
import Sidebar from '@/components/Sidebar';
import MenuButton from './MenuButton';

interface TaskManagerProps {
  initialSearch: string;
  initialStatus: string;
  initialSort: 'asc' | 'desc';
}

const SIDEBAR_BREAKPOINT = 1024;
const MODAL_BREAKPOINT = 768;

export default function TaskManager({
  initialSearch,
  initialStatus,
  initialSort,
}: TaskManagerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [sort, setSort] = useState<'asc' | 'desc'>(initialSort);
  const [limit] = useState(30);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const username = 'ivan-andriichak';

  const handleOpenModal = (task: Task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setShowMenuButton(screenWidth < MODAL_BREAKPOINT);
      if (screenWidth < MODAL_BREAKPOINT) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const noResults = tasks.length === 0 && !!search;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        username={username}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden min-w-0">
        <header className="mb-5 flex items-center shrink-0">
          {showMenuButton && <MenuButton onClick={toggleSidebar} />}
          <div className={`${showMenuButton ? 'ml-4' : ''}`}>
            <p className="text-2xl font-bold text-gray-800">My Day</p>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </header>

        {noResults ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>No tasks found for your search.</p>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 h-full overflow-y-auto pr-4 min-w-0">
              <TaskList
                tasks={tasks.filter(task => !task.done)}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onEdit={handleOpenModal}
                selectedTaskId={selectedTask?.id}
              />
              {tasks.filter(task => task.done).length > 0 && (
                <button
                  className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-white  text-left"
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

            <div
              className={`transition-all duration-300 ease-in-out
            ${selectedTask ? 'fixed inset-0 bg-black bg-opacity-25 z-20' : ''}
            ${showMenuButton && isSidebarOpen ? 'fixed inset-0 bg-black bg-opacity-25 z-10' : ''}
            md:relative md:bg-transparent md:z-auto`}>
              <div
                className="absolute top-0 right-0 h-full w-[90%] max-w-md md:w-auto md:relative transition-transform duration-300 ease-in-out"
                style={{
                  transform: selectedTask
                    ? 'translateX(0)'
                    : 'translateX(100%)',
                }}>
                {selectedTask && (
                  <EditTaskModal
                    task={selectedTask}
                    onClose={handleCloseModal}
                    onSave={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mt-auto pt-6 shrink-0">
          <TaskForm onAdd={handleAddTask} />
        </div>
      </main>
    </div>
  );
}
