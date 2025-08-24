'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task, TaskListResponse } from '@/types/task';
import { createTask, deleteTask, getTasks, updateTask } from '@/lib/api';
import EditTaskModal from '@/components/EditTaskModal';
import Sidebar from '@/components/Sidebar';
import MenuButton from './MenuButton';
import BackgroundSwitcher from './BackgroundSwitcher';

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
  const isInitialMount = useRef(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [sort, setSort] = useState<'asc' | 'desc'>(initialSort);
  const [limit] = useState(30);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [background, setBackground] = useState('bg-white');

  const username = 'ivan-andriichak';

  useEffect(() => {
    const savedBg = localStorage.getItem('app-background');
    if (savedBg) {
      setBackground(savedBg);
    }
  }, []);

  const handleBackgroundChange = (newBgClass: string) => {
    setBackground(newBgClass);
    localStorage.setItem('app-background', newBgClass);
  };

  const handleOpenModal = (task: Task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const SIDEBAR_BREAKPOINT = 1024;
      const screenWidth = window.innerWidth;
      setShowMenuButton(screenWidth < SIDEBAR_BREAKPOINT);
      if (screenWidth >= SIDEBAR_BREAKPOINT) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
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
  }, [search, status, sort, limit]);

  useEffect(() => {
    void fetchTasks();
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
        setSelectedTask(prev => (prev ? { ...prev, ...updates } : null));
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
    <div className={`flex h-screen overflow-hidden ${background}`}>
      <Sidebar
        {...{
          isOpen: isSidebarOpen,
          onClose: closeSidebar,
          username,
          search,
          setSearch,
          status,
          setStatus,
          sort,
          setSort,
        }}
      />
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden min-w-0 bg-transparent relative">
        <header className="mb-5 flex items-center justify-between shrink-0">
          <div className="flex items-center">
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
          </div>
          <BackgroundSwitcher onBackgroundChange={handleBackgroundChange} />
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 h-full overflow-y-auto pr-4 min-w-0">
            <TaskList
              tasks={tasks.filter(t => !t.done)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onEdit={handleOpenModal}
              selectedTaskId={selectedTask?.id}
            />
            {tasks.some(t => t.done) && (
              <>
                <button
                  className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-white w-full text-left"
                  onClick={() => setShowCompleted(v => !v)}>
                  Completed {tasks.filter(t => t.done).length}
                  <span
                    className={`ml-2 transition-transform inline-block ${showCompleted ? 'rotate-90' : ''}`}>
                    ⮞
                  </span>
                </button>
                {showCompleted && (
                  <div className="mt-2">
                    <TaskList
                      tasks={tasks.filter(t => t.done)}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleOpenModal}
                      selectedTaskId={selectedTask?.id}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className={`absolute top-0 right-0 h-full w-[90%] max-w-md md:w-auto md:relative transition-transform duration-300 ease-in-out z-30
                           ${selectedTask ? 'translate-x-0' : 'translate-x-full'}`}>
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

        <div
          className={`absolute inset-0 bg-black bg-opacity-25 z-20 transition-opacity md:hidden
                     ${selectedTask ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleCloseModal}
        />

        {noResults && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-white z-10">
            <p>No tasks found for your search.</p>
          </div>
        )}

        {/* --- ОСЬ КЛЮЧОВЕ ВИПРАВЛЕННЯ --- */}
        {/* Додаємо `z-10`, щоб форма була над основним контентом, але під модальними вікнами */}
        <div className="mt-auto pt-6 shrink-0 z-10">
          <TaskForm onAdd={handleAddTask} />
        </div>
      </main>
    </div>
  );
}
