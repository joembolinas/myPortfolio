/**
 * Icon and Color Mappings
 * Maps learning journey categories to emoji icons and Tailwind color classes
 */

type Category = 'education' | 'work' | 'skill' | 'project' | 'certification';

interface IconColorMapping {
  icon: string;
  color: string;
}

const ICON_COLOR_MAP: Record<Category, IconColorMapping> = {
  education: {
    icon: '🎓',
    color: 'from-green-500 to-green-600',
  },
  work: {
    icon: '💼',
    color: 'from-blue-500 to-blue-600',
  },
  skill: {
    icon: '⚡',
    color: 'from-yellow-500 to-yellow-600',
  },
  project: {
    icon: '🚀',
    color: 'from-indigo-500 to-indigo-600',
  },
  certification: {
    icon: '🏆',
    color: 'from-purple-500 to-purple-600',
  },
};

/**
 * Get icon and color for a given category
 */
export function getIconAndColor(category: Category): IconColorMapping {
  return (
    ICON_COLOR_MAP[category] || {
      icon: '📚',
      color: 'from-gray-500 to-gray-600',
    }
  );
}

/**
 * Get icon for a category
 */
export function getIcon(category: Category): string {
  return ICON_COLOR_MAP[category]?.icon || '📚';
}

/**
 * Get color classes for a category
 */
export function getColor(category: Category): string {
  return ICON_COLOR_MAP[category]?.color || 'from-gray-500 to-gray-600';
}

/**
 * Parse period string to get sort date
 * Supports formats like: "2018-2023", "2024-Present", "Ongoing", "2025+"
 * Returns a sortable number for chronological ordering
 */
export function parsePeriodForSorting(period: string): number {
  if (!period) return Infinity;

  // Extract the starting year (first 4 consecutive digits)
  const yearMatch = period.match(/\d{4}/);

  if (!yearMatch) {
    // Handle "Present", "Ongoing" as current/latest
    if (period.includes('Present') || period.includes('Ongoing')) {
      return 9999;
    }
    return 0;
  }

  return parseInt(yearMatch[0], 10);
}

/**
 * Sort learning journey items by period (chronologically)
 * Items with "Present" or "Ongoing" appear last
 */
export function sortByPeriod<T extends { period: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parsePeriodForSorting(a.period);
    const dateB = parsePeriodForSorting(b.period);

    // Ascending order (earliest first)
    return dateA - dateB;
  });
}
