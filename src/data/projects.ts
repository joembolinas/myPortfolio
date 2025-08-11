import { Project } from '@/types';

// Project data extracted from our ui-2.html
export const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
    technologies: ['React', 'Node.js', 'MongoDB'],
    gradient: 'from-blue-500 to-cyan-500',
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates',
    technologies: ['React', 'Socket.io', 'PostgreSQL'],
    gradient: 'from-purple-500 to-pink-500',
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A responsive weather app with geolocation and forecasting',
    technologies: ['JavaScript', 'API Integration', 'CSS3'],
    gradient: 'from-green-500 to-teal-500',
    demoUrl: '#',
    sourceUrl: '#',
  },
];
