import { useEffect, useState } from 'react';
import { Task } from '@/types/task';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Task>) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}

export default function EditTaskModal({
  task,
  onClose,
  onSave,
  onDelete,
}: EditTaskModalProps) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || '',
  );

  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description || '');
    }
  }, [task]);

  const handleSave = async () => {
    try {
      await onSave(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="m-1">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px] border border-gray-200 relative">
        <h3 className="text-lg  mb-2">Edit Task: {task.title}</h3>
        <label className="block mb-2">
          <span className="block mb-1 font-light">Title:</span>
          <input
            className="w-full border rounded p-2 mt-1
             focus:border-blue-300 focus:outline-none transition-colors
             font-light"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          <span className="block mb-1 font-light">Add note:</span>
          <textarea
            className="w-full border rounded  p-2 mt-1
            focus:border-blue-300 focus:outline-none transition-colors  font-light"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />
        </label>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-600 text-white rounded">
            Save
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1 bg-orange-600 text-white rounded">
            Delete
          </button>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:text-blue-500"
            aria-label="Clear search">
            &#10006;
          </button>
        </div>
      </div>
    </div>
  );
}
