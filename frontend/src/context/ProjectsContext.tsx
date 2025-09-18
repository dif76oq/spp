
import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { Project, Task } from '../types';
import { mockProjects } from '../mock-data';
import { generateId } from '../utils/generateId';

interface ProjectsContextType {
  projects: Project[];
  createProject: (projectName: string) => void;
  addTask: (projectId: string, newTask: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  editTask: (projectId: string, updatedTask: Task) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : mockProjects;
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  
  const createProject = (projectName: string) => {
    const newProject: Project = { id: generateId(), name: projectName, tasks: [] };
    setProjects(prev => [...prev, newProject]);
  };

  const addTask = (projectId: string, newTask: Task) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p
    ));
  };
  
  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) } : p
    ));
  };

  const editTask = (projectId: string, updatedTask: Task) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, tasks: p.tasks.map(t => t.id === updatedTask.id ? updatedTask : t) } : p
    ));
  };

  const value = { projects, createProject, addTask, deleteTask, editTask };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};