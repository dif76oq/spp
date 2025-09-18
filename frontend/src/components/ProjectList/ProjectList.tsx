import type { Project } from '../../types';
import { ProjectCard } from '..'; 
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectList = ({ projects, onSelectProject }: ProjectListProps) => {
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
};

export default ProjectList;