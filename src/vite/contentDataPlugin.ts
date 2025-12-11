/**
 * Content Data Plugin - Core Vite Plugin for Markdown Content Pipeline
 * 
 * **Epic:** EPIC-001 - Core Plugin Infrastructure
 * **Phase:** 3.1 - Foundation Establishment
 * **Milestone:** M3.1.1-M3.1.9
 * 
 * This plugin implements the build-time markdown content transformation system
 * for the Growth Journey Portfolio. It converts markdown files with YAML frontmatter
 * into type-safe virtual modules that can be imported directly in React components.
 * 
 * **Architecture Pattern:**
 * Content Layer (Markdown) → Processing Layer (Plugin) → Runtime Layer (Virtual Modules)
 * 
 * **Supported Sections:**
 * - Home/Hero (single-file)
 * - About (single-file)
 * - Skills (multi-file aggregation)
 * - Projects (multi-file)
 * - Blogs (multi-file)
 * - Contact (single-file)
 * 
 * **Performance Targets:**
 * - Build-time processing: <2s for 100 files
 * - HMR updates: <100ms
 * - Zero runtime overhead (no parsers in client bundle)
 * 
 * @module contentDataPlugin
 * @version 1.0.0
 * @since Phase 3.1
 */

import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { splitSections, extractBullets, ensureStringArray, slugFromPath } from '../utils/markdownParser';

// ============================================================================
// Virtual Module Configuration
// ============================================================================

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

/**
 * Vite plugin for content data transformation (F1: Vite Plugin Core Infrastructure)
 * Transforms markdown files into virtual modules with type-safe exports
 * 
 * **Features Implemented:**
 * - F1: Vite Plugin Core Infrastructure
 * - F2: Markdown File Discovery & Reading  
 * - F3: Content Parsing Pipeline
 * - F4.1-F4.6: Section-Specific Parsers (Home, About, Skills, Projects, Blogs, Contact)
 * - F6: Virtual Module Generation
 * - F8: HMR Integration
 * 
 * **Non-Functional Requirements:**
 * - NFR-001: <500ms plugin execution time per virtual module
 * - NFR-003: <100ms HMR updates
 * - NFR-004: No build-time libraries in client bundle
 * - NFR-008-011: Graceful error handling with warnings
 * 
 * @returns Vite plugin instance
 * @example
 * ```typescript
 * // In vite.config.ts
 * import { contentDataPlugin } from './src/vite/contentDataPlugin';
 * 
 * export default defineConfig({
 *   plugins: [contentDataPlugin()]
 * });
 * ```
 */
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
      // FR-002: Register virtual module IDs
      // FR-003: Resolve to internal IDs with null-byte prefix
      const entry = Object.entries(modules).find(([, virtualId]) => virtualId === id);
      if (entry) return resolved[entry[0] as keyof typeof modules];
      return null;
    },

    load(id) {
      // FR-016-018: Virtual module generation with type-safe exports
      const entry = Object.entries(resolved).find(([, rid]) => rid === id);
      if (!entry) return null;
      const [key] = entry as [keyof typeof modules, string];
      const config = configs.find((c) => c.key === key);
      if (!config) return null;
      
      // F2: File discovery and reading
      const dirPath = path.resolve(root, config.dir);
      const files = readMarkdownFiles(dirPath);
      
      // F3: Content parsing pipeline
      const parsed = files.map((f) => config.parser(f)).filter(Boolean);
      const data = config.single ? parsed[0] ?? null : parsed;
      
      // F6: Virtual module generation with JSON serialization
      // IMPORTANT: Always return a valid module export, even if data is null/empty
      // This ensures static imports in re-export files (e.g., src/data/home.ts) 
      // can always resolve successfully, allowing fallback logic to work properly
      return `export const ${config.exporter} = ${JSON.stringify(data ?? (config.single ? null : []), null, 2)};`;
    },

    handleHotUpdate({ file, server }) {
      // F8: HMR Integration - FR-020-023: Detect changes and invalidate cache
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

/**
 * Read all markdown files from a directory recursively
 * Skips files matching *spec.md pattern
 * 
 * **Security:** This function only reads files within the resolved content directory.
 * The contentPath is constructed from config.root (set by Vite) and config.dir 
 * (hardcoded in plugin configuration), preventing path traversal attacks.
 * 
 * @param contentPath - Absolute path to content directory
 * @returns Array of markdown files with path and content
 */
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

/**
 * Parse Home/Hero section markdown file
 * Single-file parser for home page content
 * 
 * @param file - Markdown file with path and content
 * @returns Parsed home data or null if invalid
 */
function parseHome(file: MarkdownFile): HomeData | null {
  const { data, content } = matter(file.content);
  if (!data.title) {
    console.warn(`[contentDataPlugin] Missing required field 'title' in ${file.path}`);
    return null;
  }
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

/**
 * Parse About section markdown file
 * Single-file parser for about/bio content
 * 
 * @param file - Markdown file with path and content
 * @returns Parsed about data or null if invalid
 */
function parseAbout(file: MarkdownFile): AboutData | null {
  const { data, content } = matter(file.content);
  if (!data.headline) {
    console.warn(`[contentDataPlugin] Missing required field 'headline' in ${file.path}`);
    return null;
  }
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

/**
 * Parse Skills section markdown file
 * Multi-file parser that aggregates skill items from category files
 * 
 * @param file - Markdown file with path and content
 * @returns Array of parsed skill items or null if empty
 */
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

/**
 * Parse Projects section markdown file
 * Multi-file parser for project portfolio items
 * 
 * @param file - Markdown file with path and content
 * @returns Parsed project data or null if invalid
 */
function parseProjects(file: MarkdownFile): ProjectDataItem | null {
  const { data, content } = matter(file.content);
  if (!data.title || !data.description) {
    console.warn(`[contentDataPlugin] Missing required fields 'title' or 'description' in ${file.path}`);
    return null;
  }
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

/**
 * Parse Blogs section markdown file
 * Multi-file parser for blog post items
 * 
 * @param file - Markdown file with path and content
 * @returns Parsed blog data or null if invalid
 */
function parseBlogs(file: MarkdownFile): BlogDataItem | null {
  const { data, content } = matter(file.content);
  if (!data.title || !data.excerpt || !data.date) {
    console.warn(`[contentDataPlugin] Missing required fields 'title', 'excerpt', or 'date' in ${file.path}`);
    return null;
  }
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

/**
 * Parse Contact section markdown file
 * Single-file parser for contact information
 * 
 * @param file - Markdown file with path and content
 * @returns Parsed contact data or null if invalid
 */
function parseContact(file: MarkdownFile): ContactData | null {
  const { data, content } = matter(file.content);
  const sections = splitSections(content);
  const contacts: ContactDataItem[] = Array.isArray(data.contacts)
    ? data.contacts.map((c: any) => normalizeContact(c)).filter((item): item is ContactDataItem => item !== null)
    : extractContactItems(sections['contacts']);

  if (!contacts.length) return null;

  return {
    headline: data.headline || '',
    summary: data.summary || sections['notes'] || '',
    contacts,
  };
}

/**
 * Normalize raw contact data object to ContactDataItem
 * Adds type-safe validation and URL synthesis
 * 
 * @param raw - Raw contact object from frontmatter
 * @returns Normalized contact item or null if invalid
 */
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

/**
 * Generate appropriate URL for contact type
 * Creates mailto:/tel: URLs for email/phone
 * 
 * @param type - Contact type
 * @param value - Contact value (email address, phone number)
 * @returns Synthesized URL or undefined for unsupported types
 */
function synthesizeContactUrl(type: ContactType, value: string): string | undefined {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value}`;
  return undefined;
}

/**
 * Extract contact items from markdown bullet list
 * Parses structured contact lists from markdown sections
 * 
 * @param block - Markdown text block with contact list
 * @returns Array of parsed contact items
 */
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
