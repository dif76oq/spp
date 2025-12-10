import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext'; 
import { useAuth } from '../../context/AuthContext';
import { ProjectList, CreateProjectForm } from '../../components';

const ProjectsPage = () => {
  const { projects, isLoading, createProject } = useProjects();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Загрузка проектов...</div>;
  }

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <div>
      <h1>Проекты</h1>
      <ProjectList projects={projects} />
      <hr />
      {isAdmin ? (
        <CreateProjectForm onCreateProject={createProject} />
      ) : (
        <p>Создание проектов доступно только администраторам.</p>
      )}
    </div>
  );
};

export default ProjectsPage;