import {useState} from 'react';
import {Task} from '@/types/task';
import EditTaskModal from '@/components/EditTaskModal';

interface TaskListProps {
                          tasks: Task[];
                          onUpdate: (id: string, updates: Partial<Task>) => void;
                          onDelete: (id: string) => void;
                        }

                        export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
                          const [selectedTask, setSelectedTask] = useState<Task | null>(null);

                          const handleOpenModal = (task: Task) => {
                            setSelectedTask(task);
                          };

                          const handleCloseModal = () => {
                            setSelectedTask(null);
                          };
                          return (
                            <div className="flex gap-4">
                              <div className={`${selectedTask ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
                                <ul>
                                  {tasks.map((task) => (
                                    <li
                                      key={task.id}
                                      className={`flex items-center justify-between p-2 mb-1 border-b rounded-md bg-white shadow-md cursor-pointer hover:bg-blue-50 ${
                                        selectedTask?.id === task.id ? 'border-blue-500' : ''
                                      }`}
                                      onClick={() => handleOpenModal(task)}
                                    >
                                      <div>
                                        <h3 className="font-light">
                                          {task.done ? <s>{task.title}</s> : task.title}
                                        </h3>
                                        {task.description && (
                                          <p className="text-sm text-gray-400">{task.description}</p>
                                        )}
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        <label
                                          className="relative cursor-pointer h-4 w-4 flex items-center"
                                          onClick={e => e.stopPropagation()}
                                        >
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
                        fill="none"
                      >
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
                                        <select
                                          value={task.priority}
                                          onChange={(e) => onUpdate(task.id, { priority: Number(e.target.value) })}
                                          className="p-1 border rounded"
                                          onClick={e => e.stopPropagation()}
                                        >
                                          {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
                                            <option key={p} value={p}>
                                              {p}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {selectedTask && (
                                <div className="w-1/2 border-l">
                                  <EditTaskModal
                                    task={selectedTask}
                                    onClose={handleCloseModal}
                                    onSave={onUpdate}
                                    onDelete={onDelete}
                                  />
                                </div>
                              )}
                            </div>
                          );

                        }
