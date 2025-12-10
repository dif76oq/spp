
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Project, Task, TaskInput, CreateProjectPayload } from '../types';
import { useAuth } from './AuthContext';
import { getGraphQLClient } from '../utils/graphql';
import {
  GET_PROJECTS,
  CREATE_PROJECT,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../utils/graphqlQueries';

interface ProjectsContextType {
  projects: Project[];
  isLoading: boolean;
  createProject: (payload: CreateProjectPayload) => Promise<void>;
  addTask: (projectId: string, newTask: TaskInput) => Promise<void>;
  deleteTask: (projectId: string, taskId: string) => Promise<void>;
  editTask: (projectId: string, updatedTask: Task) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const fetchProjects = useCallback(async () => {
    if (!token) {
      setProjects([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const client = getGraphQLClient(token);
      const data = await client.request<{ projects: Project[] }>(GET_PROJECTS);
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setProjects([]);
      setIsLoading(false);
      return;
    }

    void fetchProjects();
  }, [fetchProjects, token]);

  const createProject = useCallback(async (payload: CreateProjectPayload) => {
    if (!token) {
      throw new Error('Необходима авторизация');
    }

    const trimmedName = payload.name.trim();
    if (!trimmedName) {
      throw new Error('Название проекта не может быть пустым');
    }

    const members = (payload.members ?? [])
      .map(member => member.trim())
      .filter(Boolean);

    try {
      const client = getGraphQLClient(token);
      const data = await client.request<{ createProject: Project }>(CREATE_PROJECT, {
        input: {
          name: trimmedName,
          description: payload.description?.trim() || null,
          members: members.length > 0 ? members : [],
        },
      });
      setProjects(prev => [...prev, data.createProject]);
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось создать проект');
    }
  }, [token]);

  const addTask = useCallback(async (projectId: string, newTask: TaskInput) => {
    if (!token) {
      throw new Error('Необходима авторизация');
    }

    try {
      const client = getGraphQLClient(token);
      const data = await client.request<{ createTask: Task }>(CREATE_TASK, {
        projectId,
        input: {
          title: newTask.title,
          description: newTask.description || null,
          status: newTask.status || null,
          assignee: newTask.assignee || null,
        },
      });
      setProjects(prev =>
        prev.map(project =>
          project.id === projectId
            ? { ...project, tasks: [...project.tasks, data.createTask] }
            : project
        )
      );
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось создать задачу');
    }
  }, [token]);

  const deleteTask = useCallback(async (projectId: string, taskId: string) => {
    if (!token) {
      throw new Error('Необходима авторизация');
    }

    try {
      const client = getGraphQLClient(token);
      await client.request<{ deleteTask: boolean }>(DELETE_TASK, { id: taskId });
      setProjects(prev =>
        prev.map(project =>
          project.id === projectId
            ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
            : project
        )
      );
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось удалить задачу');
    }
  }, [token]);

  const editTask = useCallback(async (projectId: string, updatedTask: Task) => {
    if (!token) {
      throw new Error('Необходима авторизация');
    }

    try {
      const client = getGraphQLClient(token);
      const data = await client.request<{ updateTask: Task }>(UPDATE_TASK, {
        id: updatedTask.id,
        input: {
          title: updatedTask.title,
          description: updatedTask.description || null,
          status: updatedTask.status || null,
          assignee: updatedTask.assignee || null,
        },
      });
      setProjects(prev =>
        prev.map(project =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map(task =>
                  task.id === data.updateTask.id ? data.updateTask : task
                ),
              }
            : project
        )
      );
    } catch (error) {
      console.error(error);
      throw new Error('Не удалось сохранить задачу');
    }
  }, [token]);

  const value: ProjectsContextType = {
    projects,
    isLoading,
    createProject,
    addTask,
    deleteTask,
    editTask,
  };

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