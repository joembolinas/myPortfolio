import type { 
  PersonalInfo, 
  Project, 
  Skill, 
  ContactInfo, 
  NavigationItem, 
  SocialLink,
  SEOData 
} from '@/types';

export const personalInfo: PersonalInfo = {
  name: "Joe M. Bolinas",
  title: "Career Growth Developer",
  subtitle: "Transitioning from SNR admin/procurement to tech professional",
  bio: "I'm a 2nd year college student currently learning programming and transitioning from SNR admin/procurement to tech. My goal is to secure a remote/VA job to support my education while building real-world development skills through LeetCode, TryHackMe, and roadmap.sh. This portfolio showcases my growth journey - demonstrating not just technical skills, but the ability to learn, adapt, and deliver results even while still developing expertise.",
  resumeUrl: "#", // To be updated when resume is available
};

export const contactInfo: ContactInfo = {
  email: "bolinasjoem@gmail.com",
  github: "joembolinas",
  linkedin: "#", // To be updated with actual LinkedIn profile
};

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/joembolinas",
    icon: "github",
  },
  {
    platform: "LinkedIn",
    url: "#", // To be updated
    icon: "linkedin",
  },
  {
    platform: "Email",
    url: "mailto:bolinasjoem@gmail.com",
    icon: "mail",
  },
];

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skills: Skill[] = [
  { name: "HTML5 & CSS3", level: "intermediate", category: "frontend" },
  { name: "JavaScript", level: "intermediate", category: "frontend" },
  { name: "React", level: "learning", category: "frontend" },
  { name: "TypeScript", level: "learning", category: "frontend" },
  { name: "Tailwind CSS", level: "learning", category: "frontend" },
  { name: "Git & GitHub", level: "intermediate", category: "tools" },
  { name: "Vite", level: "learning", category: "tools" },
  { name: "Business Operations", level: "advanced", category: "business" },
  { name: "Problem Solving", level: "advanced", category: "other" },
  { name: "LeetCode Practice", level: "learning", category: "other" },
  { name: "TryHackMe", level: "learning", category: "other" },
];

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Growth Journey Portfolio",
    description: "This responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features professional GitHub setup, automated quality checks, and performance optimization. Showcases my transition from business operations to software development.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    githubUrl: "https://github.com/joembolinas/myPortfolio",
    liveUrl: "#",
    status: "in-progress",
    featured: true,
  },
  {
    id: "learning-tracker",
    title: "Coding Practice Tracker",
    description: "A web application to track LeetCode solutions, TryHackMe progress, and roadmap.sh milestones. Built to document my learning journey and demonstrate consistent growth in programming skills.",
    technologies: ["React", "JavaScript", "Local Storage", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
    status: "planned",
    featured: false,
  },
  {
    id: "admin-optimizer",
    title: "Admin Process Optimizer",
    description: "A tool that combines my SNR admin/procurement experience with new programming skills. Automates repetitive business tasks and demonstrates real-world problem solving with practical applications.",
    technologies: ["JavaScript", "Node.js", "CSV Processing", "Web APIs"],
    githubUrl: "#",
    liveUrl: "#",
    status: "planned",
    featured: false,
  },
];

export const seoData: SEOData = {
  title: "Joe M. Bolinas - Growth Journey Portfolio",
  description: "Portfolio showcasing career growth from admin/procurement to tech professional. Building modern web applications while documenting my learning journey in programming.",
  keywords: [
    "portfolio",
    "career-transition", 
    "react",
    "typescript",
    "web-development",
    "frontend-developer",
    "learning-journey",
    "programming-student",
    "business-operations",
    "remote-work"
  ],
  url: "https://github.com/joembolinas/myPortfolio",
};