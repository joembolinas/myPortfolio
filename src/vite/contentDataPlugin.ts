import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Virtual module identifiers
const modules = {
  home: 'virtual:home-data',
  about: 'virtual:about-data',
  skills: 'virtual:skills-data',
  projects: 'virtual:projects-data',
  blogs: 'virtual:blogs-data',
  contact: 'virtual:contact-data',
} as const;

const resolved = Object.fromEntries(
  Object.entries(modules).map(([key, id]) => [key, `\0${id}`]),
) as Record<keyof typeof modules, string>;

type SkillCategory = 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
type SkillProficiency = 'beginner' | 'intermediate' | 'advanced';

type ContactType = 'email' | 'linkedin' | 'github' | 'phone';

type BlogStatus = 'draft' | 'published' | 'coming-soon';

type ProjectStatus = 'wip' | 'live' | 'archived';

interface HomeData {
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

interface AboutData {
  id: string;
  headline: string;
  bio?: string;
  strengths?: string[];
  values?: string[];
  currentFocus?: string[];
  cta?: { label: string; href: string };
  narrative?: string;
}

interface SkillDataItem {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  icon?: string;
  description?: string;
}

interface ProjectDataItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient?: string;
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
  highlights?: string[];
  status?: ProjectStatus;
}

interface BlogDataItem {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime?: number;
  category?: string;
  tags?: string[];
  status?: BlogStatus;
  featured?: boolean;
  url?: string;
  summary?: string;
}

interface ContactDataItem {
  type: ContactType;
  label: string;
  value: string;
  url?: string;
  icon?: string;
}

interface ContactData {
  headline?: string;
  summary?: string;
  contacts: ContactDataItem[];
}

interface ContentConfig<T> {
  key: keyof typeof modules;
  dir: string;
  single: boolean;
  parser: (file: MarkdownFile) => T | null;
  exporter: string; // export const name
}

interface MarkdownFile {
  path: string;
  content: string;
}

export function contentDataPlugin(): Plugin {
  let root = '';

  const configs: ContentConfig<any>[] = [
    { key: 'home', dir: 'content/1-home', single: true, parser: parseHome, exporter: 'homeData' },
    { key: 'about', dir: 'content/2-about', single: true, parser: parseAbout, exporter: 'aboutData' },
    { key: 'skills', dir: 'content/2.5-skills', single: false, parser: parseSkills, exporter: 'skillsData' },
    {
      key: 'projects',
      dir: 'content/3-projects',
      single: false,
      parser: parseProjects,
      exporter: 'projectsData',
    },
    { key: 'blogs', dir: 'content/5-blogs', single: false, parser: parseBlogs, exporter: 'blogsData' },
    { key: 'contact', dir: 'content/6-contact', single: true, parser: parseContact, exporter: 'contactData' },
  ];

  return {
    name: 'vite-plugin-content-data',

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      const entry = Object.entries(modules).find(([, virtualId]) => virtualId === id);
      if (entry) return resolved[entry[0] as keyof typeof modules];
      return null;
    },

    load(id) {
      const entry = Object.entries(resolved).find(([, rid]) => rid === id);
      if (!entry) return null;

      const [key] = entry as [keyof typeof modules, string];
      const config = configs.find((c) => c.key === key);
      if (!config) return null;

      console.time(`[plugin:${config.key}]`);
      const dirPath = path.resolve(root, config.dir);
      const files = readMarkdownFiles(dirPath);
      const parsed = files.map((f) => config.parser(f)).filter(Boolean);
      const data = config.single ? parsed[0] ?? null : parsed;
      const result = `export const ${config.exporter} = ${JSON.stringify(
        data ?? (config.single ? null : []),
        null,
        2,
      )};`;
      console.timeEnd(`[plugin:${config.key}]`);
      return result;
    },

    handleHotUpdate({ file, server }) {
      const match = configs.find((c) => file.startsWith(path.resolve(root, c.dir)) && file.endsWith('.md'));
      if (match) {
        const mod = server.moduleGraph.getModuleById(resolved[match.key]);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      }
    },
  };
}

function readMarkdownFiles(contentPath: string): MarkdownFile[] {
  const files: MarkdownFile[] = [];
  if (!fs.existsSync(contentPath)) return files;
  const ignoreSpec = /spec\.md$/i;

  function walk(dir: string, relativeBase = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      const rel = path.join(relativeBase, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (entry.isFile() && entry.name.endsWith('.md') && !ignoreSpec.test(entry.name)) {
        files.push({ path: rel.replace(/\\/g, '/'), content: fs.readFileSync(full, 'utf-8') });
      }
    }
  }

  walk(contentPath);
  return files;
}

function slugFromPath(filePath: string): string {
  return filePath.replace(/\.md$/, '').replace(/\\/g, '/');
}

function ensureStringArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
}

function parseHome(file: MarkdownFile): HomeData | null {
  const { data, content } = matter(file.content);
  if (!data.title) return null;
  const sections = splitSections(content);
  return {
    id: slugFromPath(file.path),
    title: data.title,
    subtitle: data.subtitle || '',
    ctaPrimary: data.ctaPrimary,
    ctaSecondary: data.ctaSecondary,
    highlights: ensureStringArray(data.highlights).length
      ? ensureStringArray(data.highlights)
      : extractBullets(sections['highlights']),
    badges: ensureStringArray(data.badges),
    social: Array.isArray(data.social) ? data.social : [],
    body: sections['hero copy']?.trim() || sections['overview']?.trim() || '',
  };
}

function parseAbout(file: MarkdownFile): AboutData | null {
  const { data, content } = matter(file.content);
  if (!data.headline) return null;
  const sections = splitSections(content);
  return {
    id: slugFromPath(file.path),
    headline: data.headline,
    bio: data.bio || sections['narrative'] || sections['bio'] || '',
    strengths: ensureStringArray(data.strengths).length
      ? ensureStringArray(data.strengths)
      : extractBullets(sections['highlights']),
    values: ensureStringArray(data.values).length
      ? ensureStringArray(data.values)
      : extractBullets(sections['values']),
    currentFocus: ensureStringArray(data.currentFocus).length
      ? ensureStringArray(data.currentFocus)
      : extractBullets(sections['current focus']),
    cta: data.cta,
    narrative: sections['narrative'] || '',
  };
}

function parseSkills(file: MarkdownFile): SkillDataItem[] | null {
  const { data } = matter(file.content);
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const category = (data.category as SkillCategory) || 'learning';

  const parsed = skills
    .map((item: any, index: number) => {
      if (!item?.name) return null;
      const proficiency = (item.proficiency as SkillProficiency) || 'beginner';
      return {
        id: `${slugFromPath(file.path)}-${index}`,
        name: item.name,
        category,
        proficiency,
        icon: item.icon,
        description: item.description || '',
      } satisfies SkillDataItem;
    })
    .filter(Boolean) as SkillDataItem[];

  return parsed.length ? parsed : null;
}

function parseProjects(file: MarkdownFile): ProjectDataItem | null {
  const { data, content } = matter(file.content);
  if (!data.title || !data.description) return null;
  const sections = splitSections(content);
  return {
    id: slugFromPath(file.path).split('/').pop() || slugFromPath(file.path),
    title: data.title,
    description: data.description,
    technologies: ensureStringArray(data.technologies),
    gradient: data.gradient || 'from-slate-500 to-slate-600',
    demoUrl: data.demoUrl,
    sourceUrl: data.sourceUrl,
    image: data.image,
    highlights: ensureStringArray(data.highlights).length
      ? ensureStringArray(data.highlights)
      : extractBullets(sections['highlights']),
    status: data.status as ProjectStatus,
  };
}

function parseBlogs(file: MarkdownFile): BlogDataItem | null {
  const { data, content } = matter(file.content);
  if (!data.title || !data.excerpt || !data.date) return null;
  const sections = splitSections(content);
  return {
    id: slugFromPath(file.path).split('/').pop() || slugFromPath(file.path),
    title: data.title,
    excerpt: data.excerpt,
    publishDate: data.date,
    readTime: data.readTime ? Number(data.readTime) : 5,
    category: data.category || 'technical',
    tags: ensureStringArray(data.tags),
    status: (data.status as BlogStatus) || 'published',
    featured: Boolean(data.featured),
    url: data.url,
    summary: sections['summary'] || '',
  };
}

function parseContact(file: MarkdownFile): ContactData | null {
  const { data, content } = matter(file.content);
  const sections = splitSections(content);
  const contacts: ContactDataItem[] = Array.isArray(data.contacts)
    ? data.contacts.reduce((acc: ContactDataItem[], c: any) => {
        const normalized = normalizeContact(c);
        if (normalized) {
          acc.push(normalized);
        }
        return acc;
      }, [])
    : extractContactItems(sections['contacts']);

  if (!contacts.length) return null;

  return {
    headline: data.headline || '',
    summary: data.summary || sections['notes'] || '',
    contacts,
  };
}

function normalizeContact(raw: any): ContactDataItem | null {
  if (!raw?.type || !raw?.label || !raw?.value) return null;
  const type = (raw.type as ContactType) || 'email';
  const url = raw.url || synthesizeContactUrl(type, raw.value);
  return {
    type,
    label: String(raw.label),
    value: String(raw.value),
    url,
    icon: raw.icon,
  };
}

function synthesizeContactUrl(type: ContactType, value: string): string | undefined {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value}`;
  return undefined;
}

function splitSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = markdown.split(/\n## /);
  for (const part of parts) {
    const [heading, ...rest] = part.split('\n');
    if (!heading) continue;
    const key = heading.trim().toLowerCase();
    const text = rest.join('\n').trim();
    if (text) sections[key] = text;
  }
  return sections;
}

function extractBullets(block?: string): string[] {
  if (!block) return [];
  const lines = block.split('\n');
  const items: string[] = [];
  for (const line of lines) {
    const match = line.match(/^[\s]*[-*]\s+(.+)$/);
    if (match) items.push(match[1].trim());
  }
  return items;
}

function extractContactItems(block?: string): ContactDataItem[] {
  if (!block) return [];
  const lines = block.split('\n');
  const items: ContactDataItem[] = [];
  let current: any = null;

  const pushCurrent = () => {
    if (current && current.type && current.label && current.value) {
      const normalized = normalizeContact(current);
      if (normalized) items.push(normalized);
    }
    current = null;
  };

  for (const line of lines) {
    if (/^[\s]*-\s/.test(line)) {
      pushCurrent();
      current = {};
      const remainder = line.replace(/^[\s]*-\s*/, '');
      const [key, ...rest] = remainder.split(':');
      if (key && rest.length) {
        current[key.trim()] = rest.join(':').trim();
      }
      continue;
    }
    const kv = line.match(/^[\s]+([\w]+):\s*(.+)$/);
    if (kv && current) {
      current[kv[1].trim()] = kv[2].trim();
    }
  }
  pushCurrent();
  return items;
}
