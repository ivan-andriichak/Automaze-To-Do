import React from 'react';
import TaskFilter from './TaskFilter';

interface SidebarProps {
  username: string;
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sort: 'asc' | 'desc';
  setSort: (value: 'asc' | 'desc') => void;
}

const MenuItem = ({
  icon,
  label,
  count,
  isActive = false,
}: {
  icon: string;
  label: string;
  count?: number;
  isActive?: boolean;
}) => (
  <li
    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
      isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
    }`}>
    <div className="flex items-center">
      <span className="mr-3 text-lg">{icon}</span>
      <span className="font-light">{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-sm text-gray-500">{count}</span>
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
}: SidebarProps) {
  return (
    <aside className="w-72 bg-gray-50 p-4 flex flex-col border-r border-gray-200">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500">Personal Account</p>
        </div>
      </div>

      <div className="mb-6">
        <TaskFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          <MenuItem icon="☀️" label="My Day" isActive={true} />
          <MenuItem icon="⭐" label="Important" />
          <MenuItem icon="📅" label="Planned" />
          <hr className="my-2" />
          <MenuItem icon="📋" label="Tasks" count={12} />
        </ul>
      </nav>

      <div className="text-xs text-gray-400 mt-auto">
        <p>© 2024 Automaze To-Do</p>
      </div>
    </aside>
  );
}
