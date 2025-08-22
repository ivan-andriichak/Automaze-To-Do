import {Task} from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onUpdate(task.id, { done: !task.done })}
              className="h-4 w-4"
            />
            <select
              value={task.priority}
              onChange={(e) => onUpdate(task.id, { priority: Number(e.target.value) })}
              className="p-1 border rounded"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              onClick={() => onDelete(task.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}