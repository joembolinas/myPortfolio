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
  type?: 'button' | 'submit' | 'reset';
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

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  // Honeypot field (should remain empty)
  company?: string;
}

export interface ContactFormState extends ContactFormData {
  status: 'idle' | 'validating' | 'submitting' | 'success' | 'error';
  errors: Partial<Record<keyof ContactFormData, string>>;
  lastSubmittedAt?: number;
}

export interface ContactSubmitResult {
  ok: boolean;
  id?: string;
  error?: string;
  receivedAt: number;
}
