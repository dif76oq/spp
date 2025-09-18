export type TaskStatus = 'todo' | 'in progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}