import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce application with user authentication, product management, and payment integration.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard that displays current conditions and forecasts with interactive maps and charts.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeatherMap API'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.vercel.app',
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description:
      'Analytics platform for tracking social media metrics with data visualization and export capabilities.',
    technologies: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/social-analytics',
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode support.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://yourportfolio.vercel.app',
  },
  {
    id: '6',
    title: 'API Gateway',
    description:
      'A microservices API gateway with rate limiting, authentication, and request routing capabilities.',
    technologies: ['Go', 'Redis', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
  },
]

