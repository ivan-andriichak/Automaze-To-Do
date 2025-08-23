import React, {useState} from 'react';

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
    <form onSubmit={handleSubmit}
          className="flex items-center justify-between mt-3
          p-2 rounded-md bg-gray-100 shadow-md hover:bg-white transition-colors">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task"
       className="p-0 m-0 border-none outline-none bg-transparent"
        required
      />
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          min={1}
          max={10}
        className="w-16  border rounded mx-2"
        />
      {title.trim() ? (
        <button
          type="submit"
          className="rounded-full  w-12 h-12 flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
        >
          <span style={{ fontSize: '1.5rem', color: '#0b5eee' }}>&#10003;</span>
      </button>
      ) : (
        <button type="button" className="rounded-full  w-12 h-12 flex items-center justify-center" tabIndex={-1}>
         <span
            style={{ fontSize: '3rem', fontWeight: 100, color: '#0b5eee', transition: 'font-weight 0.2s' }}
          >
            +
          </span>
        </button>
      )}
    </form>
  );
}