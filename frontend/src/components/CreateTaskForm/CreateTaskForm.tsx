import { useState } from 'react';
import type { TaskInput, TaskStatus } from '../../types';
import './CreateTaskForm.css';

interface CreateTaskFormProps {
  onAddTask: (newTask: TaskInput) => Promise<void>;
}

const CreateTaskForm = ({ onAddTask }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Название задачи не может быть пустым');
      return;
    }

    const newTask: TaskInput = {
      title: title.trim(),
      description,
      assignee,
      status,
    };

    try {
      await onAddTask(newTask);
      setTitle('');
      setDescription('');
      setAssignee('');
      setStatus('todo');
    } catch (error) {
      alert('Не удалось создать задачу. Попробуйте снова.');
    }
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