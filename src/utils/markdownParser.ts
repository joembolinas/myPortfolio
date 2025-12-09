import matter from 'gray-matter';

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

/**
 * Parse a markdown file with YAML front matter
 * Extracts structured content from learning journey markdown files
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
 * Parse markdown sections and extract content
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

    switch (heading.toLowerCase()) {
      case 'overview':
        sections.overview = text.replace(/^#+\s*/, '').trim();
        break;

      case 'key learnings':
        sections.keyLearnings = extractBulletPoints(text);
        break;

      case 'technologies':
        sections.technologies = extractBulletPoints(text);
        break;

      case 'achievements':
        sections.achievements = extractBulletPoints(text);
        break;

      case 'challenges':
        sections.challenges = extractBulletPoints(text);
        break;

      case 'next steps':
      case 'nextsteps':
        sections.nextSteps = extractBulletPoints(text);
        break;

      case 'academic reflection essay':
      case 'reflection':
        sections.reflection = text;
        break;
    }
  }

  return sections;
}

/**
 * Extract bullet points from markdown text
 * Handles both - and * list markers
 */
function extractBulletPoints(text: string): string[] {
  const lines = text.split('\n');
  const points: string[] = [];

  for (const line of lines) {
    // Match lines starting with - or * followed by space
    const match = line.match(/^[\s]*[-*]\s+(.+)$/);
    if (match) {
      points.push(match[1].trim());
    }
  }

  return points.filter((p) => p.length > 0);
}

/**
 * Validate and ensure category is one of the allowed types
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
