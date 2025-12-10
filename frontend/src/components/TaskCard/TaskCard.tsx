import { useState } from 'react';
import type { Task } from '../../types';
import { EditTaskForm } from '../../components';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onDeleteTask: (taskId: string) => Promise<void>;
  onEditTask: (updatedTask: Task) => Promise<void>;
}

const TaskCard = ({ task, onDeleteTask, onEditTask }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedTask: Task) => {
    try {
      await onEditTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
      alert('Не удалось сохранить задачу');
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteTask(task.id);
    } catch (error) {
      alert('Не удалось удалить задачу');
    }
  };

  if (isEditing) {
    return (
      <EditTaskForm 
        task={task}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
      <div className="task-card">
      <div className="task-card-header">
        <h4>{task.title}</h4>
        <div>
          <button onClick={() => setIsEditing(true)} className="edit-task-btn">✏️</button>
            <button onClick={handleDelete} className="delete-task-btn">&times;</button>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      {task.assignee && <p className="task-assignee">Исполнитель: {task.assignee}</p>}
    </div>
  );
};

export default TaskCard;