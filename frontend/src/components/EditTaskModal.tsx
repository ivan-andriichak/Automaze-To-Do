import { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import CheckIcon from '@/components/icons/CheckIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import { Task } from '@/interfaces/task';

interface EditTaskModalProps {
  task: Task | null;
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? '');
      setDescription(task.description ?? '');
    }
  }, [task]);

  if (!task) {
    return null;
  }

  const isTitleEmpty = !title.trim();

  const handleSaveAndClose = async () => {
    if (isTitleEmpty) return;
    try {
      if (
        title.trim() !== task.title ||
        description.trim() !== (task.description ?? '')
      ) {
        await onSave(task.id, {
          title: title.trim(),
          description: description.trim() || null,
        });
      }
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
      if (isNaN(date.getTime())) return 'Invalid date';
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
              <CheckIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            )}
          </span>
        </label>
        <textarea
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={isTitleEmpty ? 'Title cannot be empty' : ''}
          rows={1}
          className={`w-full text-lg font-light bg-transparent resize-none outline-none border rounded-lg p-2 transition
            ${isTitleEmpty ? 'border-red-500' : 'border-gray-300'} 
            focus:border-blue-500`}
        />
      </div>
      <div className="flex-1 mb-4">
        <textarea
          className="w-full h-full text-sm resize-none border rounded-lg p-3
           focus:border-blue-400 focus:ring-blue-200 focus:ring-opacity-50 transition"
          value={description}
          onChange={e => setDescription(e.target.value)}
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
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
