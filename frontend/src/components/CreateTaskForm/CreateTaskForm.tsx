import { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import { generateId } from '../../utils/generateId';
import './CreateTaskForm.css';

interface CreateTaskFormProps {
  onAddTask: (newTask: Task) => void;
}

const CreateTaskForm = ({ onAddTask }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Название задачи не может быть пустым');
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title,
      description,
      assignee,
      status,
    };

    onAddTask(newTask);

    setTitle('');
    setDescription('');
    setAssignee('');
    setStatus('todo');
  };

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <h4>Создать новую задачу</h4>
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Исполнитель"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        <option value="todo">ToDo</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default CreateTaskForm;