import { useState } from 'react';
import type { Project } from './types';
import { mockProjects } from './mock-data';

import { Navigation } from './components';
import { HomePage, ProjectsPage, ProfilePage, ProjectPage } from './pages';

import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects] = useState<Project[]>(mockProjects);


  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  const handlePageChange = (page: string) => {
    setSelectedProjectId(null);
    setCurrentPage(page);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const renderCurrentPage = () => {
    if (selectedProject) {
      return <ProjectPage project={selectedProject} onBack={handleBackToProjects} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage projects={projects} onSelectProject={handleSelectProject} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      <Navigation onPageChange={handlePageChange} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;