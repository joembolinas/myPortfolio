/**
 * Markdown Parser Utility Library (F5)
 * Provides reusable utilities for parsing markdown files with YAML frontmatter
 * Used by Vite plugins to transform content files into structured data
 * 
 * @module markdownParser
 * @version 1.0.0
 * @since Phase 3.1 - M3.1.4
 */

import matter from 'gray-matter';

// ============================================================================
// Type Definitions
// ============================================================================

export interface ParsedMarkdownContent {
  frontMatter: {
    title: string;
    date: string;
    period: string;
    category: 'education' | 'work' | 'skill' | 'project' | 'certification';
    description: string;
    skills: string[];
    tags: string[];
    term: string;
    type: string;
  };
  sections: {
    overview: string;
    keyLearnings: string[];
    achievements: string[];
    challenges: string[];
    technologies?: string[];
    nextSteps?: string[];
    reflection?: string;
  };
}

// ============================================================================
// Core Parsing Functions
// ============================================================================

/**
 * Parse a markdown file with YAML front matter
 * Extracts structured content from learning journey markdown files
 * 
 * @param content - Raw markdown content with YAML frontmatter
 * @returns Parsed content with frontmatter and sections
 * @example
 * ```typescript
 * const parsed = parseMarkdownContent(fileContent);
 * console.log(parsed.frontMatter.title);
 * console.log(parsed.sections.overview);
 * ```
 */
export function parseMarkdownContent(content: string): ParsedMarkdownContent {
  const { data, content: markdown } = matter(content);

  // Parse markdown sections
  const sections = parseMarkdownSections(markdown);

  return {
    frontMatter: {
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      period: data.period || '',
      category: validateCategory(data.category),
      description: data.description || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      term: data.term || '',
      type: data.type || '',
    },
    sections,
  };
}

/**
 * Split markdown content into sections by H2 (##) headings
 * Returns a map of lowercase section names to their content
 * 
 * @param markdown - Markdown content (without frontmatter)
 * @returns Record mapping section names to content
 * @example
 * ```typescript
 * const sections = splitSections(markdown);
 * const overview = sections['overview'];
 * const highlights = sections['highlights'];
 * ```
 */
export function splitSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = markdown.split(/\n## /);
  
  for (const part of parts) {
    const [heading, ...rest] = part.split('\n');
    if (!heading) continue;
    
    const key = heading.trim().toLowerCase();
    const text = rest.join('\n').trim();
    
    if (text) {
      sections[key] = text;
    }
  }
  
  return sections;
}

/**
 * Extract bullet points from a markdown text block
 * Handles both `-` and `*` list markers
 * 
 * @param block - Text block potentially containing bullet lists
 * @returns Array of extracted bullet point text (without markers)
 * @example
 * ```typescript
 * const text = "- Item 1\n- Item 2\n* Item 3";
 * const bullets = extractBullets(text);
 * // Returns: ["Item 1", "Item 2", "Item 3"]
 * ```
 */
export function extractBullets(block?: string): string[] {
  if (!block) return [];
  
  const lines = block.split('\n');
  const items: string[] = [];
  
  for (const line of lines) {
    const match = line.match(/^[\s]*[-*]\s+(.+)$/);
    if (match) {
      items.push(match[1].trim());
    }
  }
  
  return items.filter((item) => item.length > 0);
}

/**
 * Normalize any value to a string array
 * Handles arrays, CSV strings, and empty values gracefully
 * 
 * @param value - Value to normalize (array, string, or other)
 * @returns String array (empty if input is null/undefined)
 * @example
 * ```typescript
 * ensureStringArray(['a', 'b']) // ['a', 'b']
 * ensureStringArray('a, b, c')  // ['a', 'b', 'c']
 * ensureStringArray(null)        // []
 * ensureStringArray(123)         // []
 * ```
 */
export function ensureStringArray(value: any): string[] {
  if (!value) return [];
  
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }
  
  return [];
}

/**
 * Generate a URL-safe slug from a file path
 * Removes file extension and normalizes path separators
 * 
 * @param filePath - File path (relative or absolute)
 * @returns URL-safe slug identifier
 * @example
 * ```typescript
 * slugFromPath('content/projects/my-project.md')
 * // Returns: 'content/projects/my-project'
 * 
 * slugFromPath('term-1\\career-start.md')
 * // Returns: 'term-1/career-start'
 * ```
 */
export function slugFromPath(filePath: string): string {
  return filePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/');
}

// ============================================================================
// Internal Helper Functions
// ============================================================================

/**
 * Parse markdown sections and extract content
 * Internal function used by parseMarkdownContent
 * 
 * @param markdown - Markdown content without frontmatter
 * @returns Structured sections object
 * @internal
 */
function parseMarkdownSections(markdown: string): ParsedMarkdownContent['sections'] {
  const sections: ParsedMarkdownContent['sections'] = {
    overview: '',
    keyLearnings: [],
    achievements: [],
    challenges: [],
    technologies: [],
    nextSteps: [],
    reflection: '',
  };

  // Split by heading 2 (##)
  const parts = markdown.split(/\n## /);

  for (const part of parts) {
    const [heading, ...content] = part.split('\n');
    const text = content.join('\n').trim();

    if (!text) continue;

    const headingLower = heading.toLowerCase();

    // Use switch for common cases, if/else for flexible matching
    if (headingLower.includes('overview')) {
      sections.overview = text.replace(/^#+\s*/, '').trim();
    } else if (headingLower.includes('key learning') || headingLower === 'learnings') {
      sections.keyLearnings = extractBullets(text);
    } else if (headingLower.includes('technolog')) {
      sections.technologies = extractBullets(text);
    } else if (headingLower.includes('achievement')) {
      sections.achievements = extractBullets(text);
    } else if (headingLower.includes('challenge')) {
      sections.challenges = extractBullets(text);
    } else if (headingLower.includes('next step')) {
      sections.nextSteps = extractBullets(text);
    } else if (headingLower.includes('reflection') || headingLower.includes('academic reflection essay')) {
      sections.reflection = text;
    }
  }

  return sections;
}

/**
 * Validate and ensure category is one of the allowed types
 * Provides type-safe category validation with fallback
 * 
 * @param category - Category value to validate
 * @returns Valid category or default 'skill'
 * @internal
 */
function validateCategory(
  category: unknown,
): 'education' | 'work' | 'skill' | 'project' | 'certification' {
  const validCategories = ['education', 'work', 'skill', 'project', 'certification'];

  if (typeof category === 'string' && validCategories.includes(category.toLowerCase())) {
    return category.toLowerCase() as any;
  }

  // Default to 'skill' if invalid
  return 'skill';
}

// ============================================================================
// Exports
// ============================================================================

// Re-export for convenience (legacy compatibility)
export const extractBulletPoints = extractBullets;
