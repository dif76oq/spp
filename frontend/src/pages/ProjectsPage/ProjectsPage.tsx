import type { Project } from '../../types';
import { ProjectList } from '../../components';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectsPage = ({ projects, onSelectProject }: ProjectsPageProps) => {
  return (
    <div>
      <h1>Проекты</h1>
      <ProjectList projects={projects} onSelectProject={onSelectProject} />
    </div>
  );
};

export default ProjectsPage;