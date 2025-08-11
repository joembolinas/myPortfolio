export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  publishDate: string;
  readTime: number;
  category: 'tutorial' | 'experience' | 'project' | 'reflection' | 'technical';
  tags: string[];
  featured: boolean;
  image?: string;
  status: 'published' | 'draft' | 'coming-soon';
}

export const blogPosts: BlogPost[] = [
  {
    id: 'career-transition-story',
    title: 'From Admin to Developer: My Career Transition Story',
    excerpt:
      'The challenges, learnings, and mindset shifts involved in transitioning from government administration to software development.',
    publishDate: '2024-12-01',
    readTime: 8,
    category: 'experience',
    tags: ['career-change', 'personal-story', 'motivation'],
    featured: true,
    status: 'coming-soon',
  },
  {
    id: 'first-react-project',
    title: 'Building My First React Portfolio: Lessons Learned',
    excerpt:
      'Technical challenges and design decisions involved in creating a modern portfolio website with React and TypeScript.',
    publishDate: '2024-11-15',
    readTime: 12,
    category: 'project',
    tags: ['react', 'typescript', 'portfolio', 'web-development'],
    featured: true,
    status: 'coming-soon',
  },
  {
    id: 'leetcode-beginner-guide',
    title: 'LeetCode for Career Changers: A Practical Approach',
    excerpt:
      'How to approach algorithmic problem-solving when coming from a non-technical background.',
    publishDate: '2024-11-01',
    readTime: 10,
    category: 'tutorial',
    tags: ['algorithms', 'leetcode', 'learning', 'career-change'],
    featured: false,
    status: 'coming-soon',
  },
  {
    id: 'admin-skills-in-tech',
    title: 'How Administrative Skills Transfer to Tech Roles',
    excerpt:
      'Discovering the unexpected value of administrative experience in software development teams.',
    publishDate: '2024-10-20',
    readTime: 6,
    category: 'reflection',
    tags: ['soft-skills', 'career-change', 'teamwork'],
    featured: false,
    status: 'coming-soon',
  },
  {
    id: 'learning-system-setup',
    title: 'Building a Learning System for Self-Taught Developers',
    excerpt: 'Tools, methods, and strategies for efficient self-directed learning in programming.',
    publishDate: '2024-10-05',
    readTime: 7,
    category: 'tutorial',
    tags: ['learning', 'productivity', 'self-taught', 'resources'],
    featured: false,
    status: 'coming-soon',
  },
  {
    id: 'typescript-migration-experience',
    title: "Migrating from JavaScript to TypeScript: A Beginner's Experience",
    excerpt:
      'The benefits, challenges, and practical steps involved in adopting TypeScript for better code quality.',
    publishDate: '2024-09-15',
    readTime: 9,
    category: 'technical',
    tags: ['typescript', 'javascript', 'code-quality', 'migration'],
    featured: false,
    status: 'coming-soon',
  },
  {
    id: 'remote-work-preparation',
    title: 'Preparing for Remote Tech Work: Beyond Technical Skills',
    excerpt:
      'Communication, time management, and professional skills essential for successful remote work in tech.',
    publishDate: '2024-09-01',
    readTime: 5,
    category: 'experience',
    tags: ['remote-work', 'communication', 'professional-development'],
    featured: false,
    status: 'coming-soon',
  },
  {
    id: 'github-workflow-setup',
    title: 'Setting Up a Professional GitHub Workflow',
    excerpt:
      'Best practices for version control, documentation, and project management using GitHub.',
    publishDate: '2024-08-20',
    readTime: 11,
    category: 'tutorial',
    tags: ['github', 'git', 'workflow', 'documentation'],
    featured: false,
    status: 'coming-soon',
  },
];

export const getBlogPostsByCategory = (category: BlogPost['category']) => {
  return blogPosts.filter((post) => post.category === category);
};

export const getFeaturedPosts = () => {
  return blogPosts.filter((post) => post.featured);
};

export const getPostsByStatus = (status: BlogPost['status']) => {
  return blogPosts.filter((post) => post.status === status);
};
