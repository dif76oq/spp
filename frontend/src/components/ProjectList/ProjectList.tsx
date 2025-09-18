import type { Project } from '../../types';
import { ProjectCard } from '..'; 
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
};

export default ProjectList;