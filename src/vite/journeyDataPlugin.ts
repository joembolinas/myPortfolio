/**
 * Learning Journey Data Plugin - Specialized Vite Plugin for Learning Journey Content
 * 
 * **Epic:** EPIC-001 - Core Plugin Infrastructure
 * **Phase:** 3.1 - Foundation Establishment
 * **Feature:** F4.7 - Section-Specific Parser for Learning Journey
 * 
 * This plugin handles the Learning Journey section separately due to its unique
 * structure with nested directories (term-based organization) and specialized
 * enrichment requirements (icon/color mapping, period-based sorting).
 * 
 * **Content Structure:**
 * ```
 * content/learningJourney/
 *   term-1/
 *     career-start.md
 *     college-return.md
 *   term-2/
 *     leetcode-journey.md
 *     tryhackme-security.md
 * ```
 * 
 * **Special Features:**
 * - Recursive directory traversal
 * - Icon and color enrichment based on category
 * - Chronological sorting by period
 * - Flexible section matching for varied content
 * 
 * **Performance Targets:**
 * - Build-time processing: <500ms
 * - HMR updates: <100ms
 * - Supports 50+ journey items efficiently
 * 
 * @module journeyDataPlugin
 * @version 1.0.0
 * @since Phase 3.1
 */

import type { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { getIconAndColor } from '../utils/iconColorGenerator';
import { extractBullets } from '../utils/markdownParser';

// ============================================================================
// Virtual Module Configuration
// ============================================================================

export const VIRTUAL_MODULE_ID = 'virtual:learning-journey-data';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

// ============================================================================
// Type Definitions
// ============================================================================

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
 * 
 * Implements F8 (HMR Integration) with <100ms target
 * 
 * @returns Vite plugin instance
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
        return generateVirtualModule(contentPath);
      }
    },

    handleHotUpdate({ file, server }) {
      // Reload when markdown files change (F8: HMR Integration)
      if (file.startsWith(contentPath) && file.endsWith('.md')) {
        console.log(`[learning-journey] Reloading data for ${file}`);
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          // Trigger full reload to ensure client receives update
          server.ws.send({ type: 'full-reload' });
        }
        return [];
      }
    },
  };
}

/**
 * Read all markdown files from the content directory
 * Implements F2 (Markdown File Discovery & Reading)
 * 
 * **Security:** This function only reads files within the resolved content directory.
 * The contentPath is constructed from config.root (set by Vite) and a hardcoded
 * path 'content/learningJourney', preventing path traversal attacks.
 * 
 * @param contentPath - Absolute path to learning journey content
 * @returns Array of markdown files with normalized paths
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
    const ignoreSpec = /spec\.md$|^LearningJourney\.md$/i;

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(relativeBase, entry.name);

      if (entry.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.md') && !ignoreSpec.test(entry.name)) {
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
 * Parse a single markdown file into learning journey item
 * Implements F4.7 (Section-Specific Parser for Learning Journey)
 * 
 * @param filePath - Relative file path
 * @param content - Raw markdown content
 * @returns Parsed learning journey item or null if invalid
 */
function parseMarkdown(filePath: string, content: string): LearningJourneyItem | null {
  try {
    const { data, content: markdown } = matter(content);

    // Validate required fields (FR-013: Validation)
    if (!data.title || !data.period || !data.category) {
      console.warn(`[learning-journey] Missing required fields in ${filePath}`);
      return null;
    }

    // Parse markdown sections (F3: Content Parsing Pipeline)
    const sections = parseMarkdownSections(markdown);

    // Generate ID from file path (FR-015: Generate unique IDs)
    const id = filePath.replace(/\.md$/, '').replace(/\\/g, '/');

    // Get icon and color based on category (enrichment)
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
 * Extracts structured content from learning journey markdown
 * 
 * @param markdown - Markdown content without frontmatter
 * @returns Structured sections object
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

    // Use centralized extractBullets utility
    if (headingLower.includes('overview')) {
      sections.overview = text.replace(/^#+\s*/, '').trim();
    } else if (headingLower.includes('key learnings') || headingLower.includes('learnings')) {
      sections.keyLearnings = extractBullets(text);
    } else if (headingLower.includes('technolog')) {
      sections.technologies = extractBullets(text);
    } else if (headingLower.includes('achievement')) {
      sections.achievements = extractBullets(text);
    } else if (headingLower.includes('challenge')) {
      sections.challenges = extractBullets(text);
    } else if (headingLower.includes('next step')) {
      sections.nextSteps = extractBullets(text);
    }
  }

  return sections;
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
