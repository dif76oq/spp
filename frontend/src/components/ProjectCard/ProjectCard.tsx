import { Link } from 'react-router-dom'; 
import type { Project } from '../../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.id}`} className="project-card-link">
      <div className="project-card">
        <h3>{project.name}</h3>
        {project.description && <p className="project-description">{project.description}</p>}
        <p className="project-stats">
          <span>Задач: {project.tasks.length}</span>
          <span>Участников: {project.members.length}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;