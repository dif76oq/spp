import { useState } from 'react';
import type { Task, TaskStatus } from '../../types';
import '../CreateTaskForm/CreateTaskForm.css';

interface EditTaskFormProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
}

const EditTaskForm = ({ task, onSave, onCancel }: EditTaskFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = {
      ...task, 
      title,
      description,
      assignee,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <input type="text" value={assignee} onChange={e => setAssignee(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
        <option value="todo">ToDo</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className="form-buttons">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default EditTaskForm;