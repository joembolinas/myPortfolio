// Core portfolio data types based on our existing ui-2.html structure

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  category: 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
}

export interface WebsiteType {
  id: string;
  title: string;
  icon: string;
  useCase: string;
  example: string;
  gradient: string;
  popular?: boolean;
}

export interface ContactMethod {
  type: 'email' | 'linkedin' | 'github' | 'phone';
  icon: string;
  label: string;
  value: string;
  url?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

// Props interfaces for our components
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hover?: boolean;
}

export interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}
