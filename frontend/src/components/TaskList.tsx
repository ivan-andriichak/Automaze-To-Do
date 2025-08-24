import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
  selectedTaskId?: string;
}

export default function TaskList({
  tasks,
  onUpdate,
  onEdit,
  selectedTaskId,
}: TaskListProps) {
  return (
    <ul>
      {tasks.map(task => (
        <li
          key={task.id}
          className={`flex items-center justify-between p-2 mb-1 border-b rounded-md bg-white shadow-md cursor-pointer hover:bg-blue-50 ${
            selectedTaskId === task.id ? 'border-blue-800 bg-blue-100' : ''
          }`}
          onClick={() => onEdit(task)}>
          <div className="flex items-center space-x-4">
            <div>
              <label
                className="relative cursor-pointer h-4 w-4 flex items-center"
                onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onUpdate(task.id, { done: !task.done })}
                  className="peer absolute opacity-0 h-12 w-12 cursor-pointer"
                />
                <span className="block h-4 w-4 border rounded-full bg-white peer-checked:bg-white peer-checked:border-gray-600 transition-colors">
                  {task.done && (
                    <svg
                      className="absolute left-0 top-0 h-4 w-4 text-black"
                      viewBox="0 0 16 16"
                      fill="none">
                      <path
                        d="M4 8l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </label>
            </div>
            <div>
              <h3 className="font-light">
                {task.done ? <s>{task.title}</s> : task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-400 flex items-center">
                  <span style={{ marginRight: '10px' }}>
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                      <path d="M10 9H8" />
                    </svg>
                  </span>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={task.priority}
              onChange={e =>
                onUpdate(task.id, { priority: Number(e.target.value) })
              }
              className="p-1 border rounded"
              onClick={e => e.stopPropagation()}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </li>
      ))}
    </ul>
  );
}
