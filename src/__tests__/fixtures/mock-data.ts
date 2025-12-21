import type { Project, Skill, ContactMethod, LearningJourneyItem, BlogPost } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'test-project-1',
    title: 'Test Project 1',
    description: 'This is a test project.',
    technologies: ['React', 'TypeScript'],
    gradient: 'from-blue-500 to-purple-600',
    demoUrl: 'https://example.com',
    sourceUrl: 'https://github.com/example/test-project-1',
    image: '/test-image.jpg',
  },
];

export const mockSkills: Skill[] = [
  {
    name: 'React',
    category: 'dev',
    proficiency: 'advanced',
    icon: 'react',
  },
];

export const mockContactMethods: ContactMethod[] = [
  {
    type: 'email',
    icon: 'mail',
    label: 'Email',
    value: 'test@example.com',
    url: 'mailto:test@example.com',
  },
];

export const mockLearningJourney: LearningJourneyItem[] = [
  {
    id: 'test-journey-1',
    title: 'Test Journey 1',
    period: '2024',
    category: 'project',
    description: 'This is a test journey item.',
    expandedContent: {
      overview: 'Test overview',
      keyLearnings: ['Test learning 1', 'Test learning 2'],
    },
    icon: '🚀',
    color: 'from-indigo-500 to-indigo-600',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'test-blog-post-1',
    title: 'Test Blog Post 1',
    excerpt: 'This is a test blog post.',
    publishDate: '2024-01-01',
    readTime: 5,
    category: 'technical',
    tags: ['testing', 'typescript'],
    featured: true,
    status: 'published',
  },
];
