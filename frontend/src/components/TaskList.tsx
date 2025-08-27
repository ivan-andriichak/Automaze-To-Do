import { Task } from '@/interfaces/task';
import CheckIcon from './icons/CheckIcon';
import DocumentIcon from './icons/DocumentIcon';

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
                <span className="relative flex justify-center items-center h-4 w-4 border rounded-full bg-white peer-checked:bg-white peer-checked:border-gray-600 transition-colors">
                  {task.done && (
                    <CheckIcon className="absolute left-0 top-0 h-4 w-4 text-black" />
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
                    <DocumentIcon className="w-4 h-4 mr-1" />
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
