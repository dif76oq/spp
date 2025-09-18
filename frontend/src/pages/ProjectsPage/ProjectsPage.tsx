import { useProjects } from '../../context/ProjectsContext'; 
import { ProjectList, CreateProjectForm } from '../../components';

const ProjectsPage = () => {
  const { projects, createProject } = useProjects();

  return (
    <div>
      <h1>Проекты</h1>
      <ProjectList projects={projects} />
      <hr />
      <CreateProjectForm onCreateProject={createProject} />
    </div>
  );
};

export default ProjectsPage;