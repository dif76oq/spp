import type { Task, TaskStatus } from '../types';

export const filterTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};
