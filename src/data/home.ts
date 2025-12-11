/**
 * Home/Hero Section Data Re-export (F9: Data Re-export Layer)
 * Provides fallback data for graceful degradation during development
 * 
 * @module data/home
 * @since Phase 3.1 - M3.1.9
 */

import { homeData } from 'virtual:home-data';

/**
 * Fallback home data used when virtual module is unavailable
 * Ensures UI never breaks during development/migration
 */
const fallbackHomeData = {
  id: 'home',
  title: 'Growth Journey Portfolio',
  subtitle: 'Building performant, accessible experiences',
  ctaPrimary: { label: 'View Projects', href: '#projects' },
  ctaSecondary: { label: 'My Journey', href: '#learning-journey' },
  highlights: ['Performance-first', 'WCAG AA', 'React 18', 'TypeScript 5'],
  badges: ['Lighthouse 90+', 'A11y AA'],
  social: [
    { label: 'GitHub', href: 'https://github.com/joembolinas' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/joembolinas' },
  ],
  body: 'A career transformation story from admin/procurement to software engineering.',
};

/**
 * Home section data with fallback support
 * Exports data from virtual module or fallback if unavailable
 */
export const home = homeData ?? fallbackHomeData;
