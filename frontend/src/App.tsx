import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';

import { Navigation } from './components';
import {
  HomePage,
  ProjectsPage,
  ProfilePage,
  ProjectPage,
  LoginPage,
  RegisterPage,
} from './pages';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </ProjectsProvider>
    </AuthProvider>
  );
};

export default App;