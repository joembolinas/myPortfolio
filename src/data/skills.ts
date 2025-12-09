import { Skill } from '@/types';
import { skillsData } from 'virtual:skills-data';

const fallbackSkills: Skill[] = [
  { name: 'React', category: 'dev', proficiency: 'intermediate', icon: 'react' },
  { name: 'JavaScript', category: 'dev', proficiency: 'intermediate', icon: 'javascript' },
  { name: 'TypeScript', category: 'dev', proficiency: 'beginner', icon: 'typescript' },
  { name: 'HTML5', category: 'dev', proficiency: 'intermediate', icon: 'html' },
  { name: 'CSS3', category: 'dev', proficiency: 'intermediate', icon: 'css' },
  { name: 'Tailwind CSS', category: 'dev', proficiency: 'intermediate', icon: 'tailwind' },
  { name: 'Node.js', category: 'dev', proficiency: 'beginner', icon: 'nodejs' },
  { name: 'Python', category: 'dev', proficiency: 'beginner', icon: 'python' },
  { name: 'Git & GitHub', category: 'dev', proficiency: 'intermediate', icon: 'git' },
  { name: 'Vite', category: 'dev', proficiency: 'beginner', icon: 'vite' },
  { name: 'Network Security', category: 'network', proficiency: 'beginner', icon: 'shield' },
  { name: 'Linux/Unix', category: 'network', proficiency: 'beginner', icon: 'linux' },
  { name: 'Ethical Hacking', category: 'network', proficiency: 'beginner', icon: 'hack' },
  { name: 'Security Tools', category: 'network', proficiency: 'beginner', icon: 'tools' },
  { name: 'TryHackMe', category: 'network', proficiency: 'beginner', icon: 'tryhackme' },
  { name: 'Penetration Testing', category: 'network', proficiency: 'beginner', icon: 'pentest' },
  { name: 'Data Analysis', category: 'data', proficiency: 'beginner', icon: 'chart' },
  { name: 'SQL', category: 'data', proficiency: 'beginner', icon: 'database' },
  { name: 'PostgreSQL', category: 'data', proficiency: 'beginner', icon: 'postgresql' },
  { name: 'MongoDB', category: 'data', proficiency: 'beginner', icon: 'mongodb' },
  { name: 'Data Visualization', category: 'data', proficiency: 'beginner', icon: 'visualization' },
  { name: 'Machine Learning', category: 'ai', proficiency: 'beginner', icon: 'ai' },
  { name: 'AI Fundamentals', category: 'ai', proficiency: 'beginner', icon: 'brain' },
  { name: 'Prompt Engineering', category: 'ai', proficiency: 'intermediate', icon: 'prompt' },
  { name: 'LLM Integration', category: 'ai', proficiency: 'beginner', icon: 'llm' },
];

export const skills: Skill[] = Array.isArray(skillsData) && skillsData.length ? skillsData : fallbackSkills;

export const skillCategories = {
  dev: {
    title: 'Development',
    description: 'Frontend & backend development technologies',
    color: 'from-blue-500 to-cyan-500',
    icon: 'í²»',
  },
  network: {
    title: 'Network & CyberSec',
    description: 'Security, networking, and ethical hacking',
    color: 'from-red-500 to-orange-500',
    icon: 'í´’',
  },
  data: {
    title: 'Data Analytics',
    description: 'Data analysis, databases, and visualization',
    color: 'from-green-500 to-emerald-500',
    icon: 'í³Š',
  },
  ai: {
    title: 'AI & Machine Learning',
    description: 'Artificial intelligence and machine learning',
    color: 'from-purple-500 to-pink-500',
    icon: 'í´–',
  },
};

export const getSkillsByCategory = (category: string) => {
  return skills.filter((skill) => skill.category === category);
};
