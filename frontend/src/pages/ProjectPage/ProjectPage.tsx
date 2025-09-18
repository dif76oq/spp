import { useParams, useNavigate } from 'react-router-dom'; 
import type { Task, TaskStatus } from '../../types';
import { TaskCard, CreateTaskForm } from '../../components';
import { useProjects } from '../../context/ProjectsContext'; 
import './ProjectPage.css';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { projects, addTask, deleteTask, editTask } = useProjects();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Проект не найден</div>;
  }

  const handleAddTaskWrapper = (newTask: Task) => {
    addTask(project.id, newTask);
  };

  const handleEditTaskWrapper = (updatedTask: Task) => {
    editTask(project.id, updatedTask);
  };

  const handleDeleteTaskWrapper = (taskId: string) => {
    deleteTask(project.id, taskId);
  };

  const columns: TaskStatus[] = ['todo', 'in progress', 'done'];

  return (
    <div className="kanban-page">
      <button onClick={() => navigate('/projects')} className="back-button">
        &larr; Назад к проектам
      </button>
      <h2>{project.name}</h2>

      <div className="kanban-board">
        {columns.map(status => (
          <div key={status} className="kanban-column">
            <h3>{status.toUpperCase()}</h3>
            <div className="tasks-container">
              {project.tasks
                .filter(task => task.status === status)
                .map(task => (
                  <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTaskWrapper} onEditTask={handleEditTaskWrapper} />
                ))}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <CreateTaskForm onAddTask={handleAddTaskWrapper} />
    </div>
  );
};

export default ProjectPage;