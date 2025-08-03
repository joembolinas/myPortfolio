export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'learning';
  category: 'frontend' | 'backend' | 'tools' | 'business' | 'other';
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github: string;
  location?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  avatar?: string;
  resumeUrl?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'learning';
  status: 'completed' | 'current' | 'planned';
}

export interface GithubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  languages: { name: string; percentage: number }[];
  lastUpdated: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}