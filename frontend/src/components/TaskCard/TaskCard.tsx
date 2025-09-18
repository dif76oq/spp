import { useState } from 'react';
import type { Task } from '../../types';
import { EditTaskForm } from '../../components';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (updatedTask: Task) => void;
}

const TaskCard = ({ task, onDeleteTask, onEditTask }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedTask: Task) => {
    onEditTask(updatedTask);
    setIsEditing(false); 
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
          <button onClick={() => onDeleteTask(task.id)} className="delete-task-btn">&times;</button>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      {task.assignee && <p className="task-assignee">Исполнитель: {task.assignee}</p>}
    </div>
  );
};

export default TaskCard;