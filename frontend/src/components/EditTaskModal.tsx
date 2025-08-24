import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import CloseButton from './CloseButton';

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

  const isTitleEmpty = !editTitle.trim();

  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description || '');
    }
  }, [task]);

  const handleSaveAndClose = async () => {
    if (isTitleEmpty) return;
    try {
      await onSave(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDeleteAndClose = async () => {
    try {
      await onDelete(task.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full p-4 border border-gray-200 relative">
      <CloseButton onClick={onClose} />
      <div className="flex items-start p-2 rounded-lg bg-gray-50 mb-4">
        <label
          className="relative cursor-pointer h-6 w-6 flex items-center mr-3 mt-1"
          onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={task.done}
            disabled={isTitleEmpty}
            onChange={() => onSave(task.id, { done: !task.done })}
            className="peer absolute opacity-0 h-12 w-12 cursor-pointer"
          />
          <span className="block h-6 w-6 border-2 border-gray-400 rounded-full bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors">
            {task.done && (
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white"
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
        <textarea
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          placeholder={isTitleEmpty ? 'Title cannot be empty' : ''}
          rows={1}
          className={`w-full text-lg font-semibold bg-transparent resize-none outline-none border rounded-lg p-2 transition
  ${isTitleEmpty ? 'border-red-500' : 'border-gray-300'} 
  focus:border-blue-500`}
        />
      </div>

      <div className="flex-1 mb-4">
        <textarea
          className="w-full h-full text-sm resize-none border rounded-lg p-3
           focus:border-blue-400 focus:ring-blue-200 focus:ring-opacity-50 transition"
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
          placeholder="Add a note..."
        />
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-gray-500 border-t pt-3">
        <button
          onClick={handleSaveAndClose}
          disabled={isTitleEmpty}
          className="font-semibold text-blue-600 hover:text-blue-800 disabled:text-gray-400">
          Done
        </button>

        <div className="text-center">
          {task.updated_at && task.created_at !== task.updated_at ? (
            <span>Updated: {formatDate(task.updated_at)}</span>
          ) : (
            <span>Created: {formatDate(task.created_at)}</span>
          )}
        </div>

        <button
          onClick={handleDeleteAndClose}
          className="text-gray-500 hover:text-red-600"
          aria-label="Delete task">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
