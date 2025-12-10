export interface AuthLoginPayload {
  login: string;
  password: string;
}

export interface AuthRegisterPayload {
  login: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
  login: string;
  role: string;
}

export interface UserProfile {
  login: string;
  role: string;
}

export type TaskStatus = 'todo' | 'in progress' | 'done';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
}

export type TaskInput = Omit<Task, 'id' | 'projectId'>;

export interface CreateProjectPayload {
  name: string;
  description?: string;
  members?: string[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  members: string[];
  tasks: Task[];
}