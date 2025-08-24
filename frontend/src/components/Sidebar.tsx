import React from 'react';
import TaskFilter from './TaskFilter';
import CloseButton from './CloseButton';

interface SidebarProps {
  username: string;
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sort: 'asc' | 'desc';
  setSort: (value: 'asc' | 'desc') => void;
  isOpen: boolean;
  onClose: () => void;
  taskCount: number;
}

const MenuItem = ({
  icon,
  label,
  count,
}: {
  icon: string;
  label: string;
  count?: number;
}) => (
  <li className="flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-200">
    <div className="flex items-center">
      <span className="mr-3 text-lg">{icon}</span>
      <span className="font-light">{label}</span>
    </div>
    {count !== undefined && count > 0 && (
      <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </li>
);

export default function Sidebar({
  username,
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  isOpen,
  onClose,
  taskCount,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`bg-gray-50 flex flex-col border-r border-gray-200 transition-transform duration-300 ease-in-out
        w-72 shrink-0 z-40
        lg:static lg:translate-x-0 
        fixed top-0 left-0 h-full 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="lg:hidden absolute top-1 right-1">
            <CloseButton onClick={onClose} />
          </div>
          <div className="flex items-center mb-6 mt-8 lg:mt-0">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 shrink-0">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold whitespace-nowrap">{username}</p>
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Personal Account
              </p>
            </div>
          </div>
          <div className="mb-6">
            <TaskFilter
              {...{ search, setSearch, status, setStatus, sort, setSort }}
            />
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              <MenuItem icon="☀️" label="My Day" count={taskCount} />
              <MenuItem icon="⭐" label="Important" />
              <MenuItem icon="📅" label="Planned" />
              <hr className="my-2" />
              <MenuItem icon="📋" label="Tasks" count={taskCount} />
            </ul>
          </nav>
          <div className="text-xs text-gray-400 mt-auto">
            <p className="whitespace-nowrap">© 2024 Automaze To-Do</p>
          </div>
        </div>
      </aside>
    </>
  );
}
