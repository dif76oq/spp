import type { Project } from './types';
import { generateId } from './utils/generateId';

export const mockProjects: Project[] = [
  {
    id: generateId(),
    name: 'Разработка корпоративного сайта',
    tasks: [
      { id: generateId(), title: 'Настроить Webpack', description: 'Описание задачи по настройке Webpack', status: 'done', assignee: 'Петр Петров' },
      { id:generateId(), title: 'Создать UI-кит', description: 'Описание задачи по созданию UI-кита', status: 'in progress', assignee: 'Анна Сидорова' },
      { id: generateId(), title: 'Реализовать API-клиент', description: 'Описание задачи по реализации API-клиента', status: 'todo', assignee: 'Иван Иванов' },
    ],
  },
  {
    id: generateId(),
    name: 'Мобильное приложение "Фитнес-трекер"',
    tasks: [
      { id: generateId(), title: 'Проектирование базы данных', description: 'Описание задачи по проектированию базы данных', status: 'done', assignee: 'Петр Петров' },
      { id: generateId(), title: 'Реализовать экран авторизации', description: 'Описание задачи по реализации экрана авторизации', status: 'todo', assignee: 'Анна Сидорова' },
    ],
  },
];