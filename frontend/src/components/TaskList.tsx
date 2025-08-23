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
       <li key={task.id} className="flex items-center justify-between  p-3 mb-1  rounded-md bg-white shadow-md">
          <div>
           <h3 className="font-light">{task.done ? <s>{task.title}</s> : task.title}</h3>
            {task.description && <p className="text-sm text-gray-400">{task.description}</p>}
          </div>
          <div className="flex items-center space-x-4">
           <label className="relative cursor-pointer h-4 w-4 flex items-center">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onUpdate(task.id, { done: !task.done })}
                className="peer absolute opacity-0 h-12 w-12 cursor-pointer"
              />
             <span className="block h-4 w-4 border rounded-full bg-white peer-checked:bg-white peer-checked:border-gray-600 transition-colors">
                {task.done && (
                  <svg className="absolute left-0 top-0 h-4 w-4 text-black" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
            </label>
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
           <button  onClick={() => onDelete(task.id)}  className="px-4 py-2 bg-gray-100 text-black rounded flex items-center justify-center" aria-label="Close">
              &#10005;
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}