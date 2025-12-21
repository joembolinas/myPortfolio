import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { getIconAndColor } from '../utils/iconColorGenerator';

export const VIRTUAL_MODULE_ID = 'virtual:learning-journey-data';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

interface LearningJourneyItem {
  id: string;
  title: string;
  period: string;
  category: 'education' | 'work' | 'skill' | 'project' | 'certification';
  description: string;
  expandedContent: {
    overview: string;
    keyLearnings: string[];
    technologies?: string[];
    achievements?: string[];
    challenges?: string[];
    nextSteps?: string[];
  };
  icon: string;
  color: string;
}

/**
 * Vite plugin that loads and parses markdown files from content/learningJourney/
 * Generates a virtual module with compiled learning journey data
 */
export function journeyDataPlugin(): Plugin {
  let contentPath: string;

  return {
    name: 'vite-plugin-learning-journey-data',

    configResolved(config) {
      // Set content path relative to project root
      contentPath = path.resolve(config.root, 'content/learningJourney');
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        console.time('[plugin:learning-journey]');
        const result = generateVirtualModule(contentPath);
        console.timeEnd('[plugin:learning-journey]');
        return result;
      }
    },

    handleHotUpdate({ file, server }) {
      // Reload when markdown files change
      if (file.startsWith(contentPath) && file.endsWith('.md')) {
        console.log(`[learning-journey] Reloading data for ${file}`);
        server.moduleGraph.invalidateModule(
          server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)!,
        );
        return [];
      }
    },
  };
}

/**
 * Read all markdown files from the content directory
 */
function readMarkdownFiles(contentPath: string): Array<{ path: string; content: string }> {
  const files: Array<{ path: string; content: string }> = [];

  if (!fs.existsSync(contentPath)) {
    console.warn(`[learning-journey] Content path not found: ${contentPath}`);
    return files;
  }

  // Recursively read all .md files
  function walkDir(dir: string, relativeBase = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(relativeBase, entry.name);

      if (entry.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        files.push({
          path: relativePath.replace(/\\/g, '/'), // Normalize to forward slashes
          content,
        });
      }
    }
  }

  walkDir(contentPath);
  return files;
}

/**
 * Parse a single markdown file
 */
function parseMarkdown(filePath: string, content: string): LearningJourneyItem | null {
  try {
    const { data, content: markdown } = matter(content);

    // Validate required fields
    if (!data.title || !data.period || !data.category) {
      console.warn(`[learning-journey] Missing required fields in ${filePath}`);
      return null;
    }

    // Parse markdown sections
    const sections = parseMarkdownSections(markdown);

    // Generate ID from file path (e.g., term-1/career-start.md -> term-1/career-start)
    const id = filePath.replace(/\.md$/, '').replace(/\\/g, '/');

    // Get icon and color based on category
    const { icon, color } = getIconAndColor(data.category);

    return {
      id,
      title: data.title,
      period: data.period,
      category: data.category || 'skill',
      description: data.description || '',
      expandedContent: {
        overview: sections.overview,
        keyLearnings: sections.keyLearnings,
        technologies: sections.technologies?.length ? sections.technologies : undefined,
        achievements: sections.achievements?.length ? sections.achievements : undefined,
        challenges: sections.challenges?.length ? sections.challenges : undefined,
        nextSteps: sections.nextSteps?.length ? sections.nextSteps : undefined,
      },
      icon,
      color,
    };
  } catch (error) {
    console.error(`[learning-journey] Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Parse markdown sections
 */
function parseMarkdownSections(markdown: string) {
  const sections = {
    overview: '',
    keyLearnings: [] as string[],
    technologies: [] as string[],
    achievements: [] as string[],
    challenges: [] as string[],
    nextSteps: [] as string[],
  };

  // Split by heading 2 (##)
  const parts = markdown.split(/\n## /);

  for (const part of parts) {
    const [heading, ...content] = part.split('\n');
    const text = content.join('\n').trim();

    if (!text) continue;

    const headingLower = heading.toLowerCase();

    switch (true) {
      case headingLower.includes('overview'):
        sections.overview = text.replace(/^#+\s*/, '').trim();
        break;

      case headingLower.includes('key learnings') || headingLower.includes('learnings'):
        sections.keyLearnings = extractBulletPoints(text);
        break;

      case headingLower.includes('technolog'):
        sections.technologies = extractBulletPoints(text);
        break;

      case headingLower.includes('achievement'):
        sections.achievements = extractBulletPoints(text);
        break;

      case headingLower.includes('challenge'):
        sections.challenges = extractBulletPoints(text);
        break;

      case headingLower.includes('next step'):
        sections.nextSteps = extractBulletPoints(text);
        break;
    }
  }

  return sections;
}

/**
 * Extract bullet points from text
 */
function extractBulletPoints(text: string): string[] {
  const lines = text.split('\n');
  const points: string[] = [];

  for (const line of lines) {
    const match = line.match(/^[\s]*[-*]\s+(.+)$/);
    if (match) {
      points.push(match[1].trim());
    }
  }

  return points.filter((p) => p.length > 0);
}

/**
 * Sort items by period (chronologically)
 */
function sortByPeriod(items: LearningJourneyItem[]): LearningJourneyItem[] {
  return [...items].sort((a, b) => {
    const parseYear = (period: string): number => {
      const match = period.match(/\d{4}/);
      if (!match) {
        return period.includes('Present') || period.includes('Ongoing') ? 9999 : 0;
      }
      return parseInt(match[0], 10);
    };

    return parseYear(a.period) - parseYear(b.period);
  });
}

/**
 * Generate the virtual module code
 */
function generateVirtualModule(contentPath: string): string {
  const files = readMarkdownFiles(contentPath);
  const items: LearningJourneyItem[] = [];

  for (const file of files) {
    const item = parseMarkdown(file.path, file.content);
    if (item) {
      items.push(item);
    }
  }

  // Sort by period
  const sortedItems = sortByPeriod(items);

  // Generate TypeScript code
  const itemsCode = JSON.stringify(sortedItems, null, 2);

  return `
export const learningJourney = ${itemsCode};
`;
}
