import type { Project } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (projectId: string) => void;
}

const ProjectCard = ({ project, onSelectProject }: ProjectCardProps) => {
  const taskCount = project.tasks.length;

  return (
    <div className="project-card"
    onClick={() => {
      onSelectProject(project.id);
    }}>
      <h3>{project.name}</h3>
      <p>Задач: {taskCount}</p>
    </div>
  );
};

export default ProjectCard;