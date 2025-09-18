import { Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext'; 

import { Navigation } from './components';
import { HomePage, ProjectsPage, ProfilePage, ProjectPage } from './pages';
import './App.css';

const App = () => {

  return (
    <ProjectsProvider> 
      <Navigation /> 
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </ProjectsProvider>
  );
};

export default App;