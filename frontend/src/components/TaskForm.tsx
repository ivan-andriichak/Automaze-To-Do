import {useState} from 'react';

interface TaskFormProps {
  onAdd: (title: string, description: string | null, priority: number) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description || null, priority);
      setTitle('');
      setDescription('');
      setPriority(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200 dark:border-gray-700 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full p-2 border rounded"
      />
      <div className="flex items-center space-x-4">
        <label>Priority:</label>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min={1}
          max={10}
          className="w-20 p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
}