declare module 'virtual:home-data' {
  import type { ContactMethod, NavigationItem, Skill, Project } from '@/types';
  export interface HomeData {
    id: string;
    title: string;
    subtitle?: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    highlights?: string[];
    badges?: string[];
    social?: Array<{ label: string; href: string }>;
    body?: string;
  }
  export const homeData: HomeData | null;
}

declare module 'virtual:about-data' {
  export interface AboutData {
    id: string;
    headline: string;
    bio?: string;
    strengths?: string[];
    values?: string[];
    currentFocus?: string[];
    cta?: { label: string; href: string };
    narrative?: string;
  }
  export const aboutData: AboutData | null;
}

declare module 'virtual:skills-data' {
  import type { Skill } from '@/types';
  export const skillsData: Skill[];
}

declare module 'virtual:projects-data' {
  import type { Project } from '@/types';
  export const projectsData: Project[];
}

declare module 'virtual:blogs-data' {
  import type { BlogPost } from '@/data/blogs';
  export const blogsData: BlogPost[];
}

declare module 'virtual:contact-data' {
  import type { ContactMethod } from '@/types';
  export interface ContactData {
    headline?: string;
    summary?: string;
    contacts: ContactMethod[];
  }
  export const contactData: ContactData | null;
}
