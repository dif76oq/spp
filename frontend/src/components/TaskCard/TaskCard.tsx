import type { Task } from '../../types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p className="task-description">{task.description}</p>
      {task.assignee && <p className="task-assignee">Исполнитель: {task.assignee}</p>}
    </div>
  );
};

export default TaskCard;