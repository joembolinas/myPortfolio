import { ContactMethod, NavigationItem } from '@/types';

// Contact information (using placeholder data - user should update)
export const contactMethods: ContactMethod[] = [
  {
    type: 'email',
    icon: '📧',
    label: 'Email',
    value: 'joem@example.com',
    url: 'mailto:joem@example.com'
  },
  {
    type: 'linkedin',
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/joem',
    url: 'https://linkedin.com/in/joem'
  },
  {
    type: 'github',
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/joem',
    url: 'https://github.com/joem'
  }
];

// Navigation items matching our sections
export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'home', href: '#home' },
  { id: 'about', label: 'about', href: '#about' },
  { id: 'projects', label: 'projects', href: '#projects' },
  { id: 'websites', label: 'websites', href: '#websites' },
  { id: 'contact', label: 'contact', href: '#contact' }
];
