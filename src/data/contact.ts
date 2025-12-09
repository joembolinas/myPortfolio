import { ContactMethod, NavigationItem } from '@/types';
import { contactData } from 'virtual:contact-data';

const fallbackContacts: ContactMethod[] = [
  {
    type: 'email',
    icon: 'email',
    label: 'Email',
    value: 'bolinasjoem@gmail.com',
    url: 'mailto:bolinasjoem@gmail.com',
  },
  {
    type: 'linkedin',
    icon: 'briefcase',
    label: 'LinkedIn',
    value: 'linkedin.com/in/joem',
    url: 'https://linkedin.com/in/joembolinas',
  },
  {
    type: 'github',
    icon: 'laptop',
    label: 'GitHub',
    value: 'github.com/joembolinas',
    url: 'https://github.com/joembolinas',
  },
];

export const contactMethods: ContactMethod[] =
  (contactData?.contacts as ContactMethod[] | undefined)?.length && contactData?.contacts
    ? (contactData.contacts as ContactMethod[])
    : fallbackContacts;

// Navigation items matching our enhanced sections
export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'home', href: '#home' },
  { id: 'about', label: 'about', href: '#about' },
  { id: 'projects', label: 'projects', href: '#projects' },
  { id: 'learning-journey', label: 'journey', href: '#learning-journey' },
  { id: 'github', label: 'github', href: '#github' },
  { id: 'blog', label: 'blog', href: '#blog' },
  { id: 'contact', label: 'contact', href: '#contact' },
];
