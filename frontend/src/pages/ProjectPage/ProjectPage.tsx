import { useState } from 'react';
import type { Project, Task, TaskStatus } from '../../types';
import { TaskCard, CreateTaskForm } from '../../components';
import './ProjectPage.css';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectPage = ({ project, onBack }: ProjectPageProps) => {
  const [tasks, setTasks] = useState<Task[]>(project.tasks);

  const handleAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const columns: TaskStatus[] = ['todo', 'in progress', 'done'];

  return (
    <div className="kanban-page">
      <button onClick={onBack} className="back-button">&larr; Назад к проектам</button>
      <h2>{project.name}</h2>

      <CreateTaskForm onAddTask={handleAddTask} />

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className="kanban-column">
            <h3>{status.toUpperCase()}</h3>
            <div className="tasks-container">
              {tasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;