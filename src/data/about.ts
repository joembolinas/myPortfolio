/**
 * About Section Data Re-export (F9: Data Re-export Layer)
 * Provides fallback data for graceful degradation during development
 * 
 * @module data/about
 * @since Phase 3.1 - M3.1.9
 */

import { aboutData } from 'virtual:about-data';

/**
 * Fallback about data used when virtual module is unavailable
 * Ensures UI never breaks during development/migration
 */
const fallbackAboutData = {
  id: 'about',
  headline: 'About Me',
  bio: 'I build performant, accessible interfaces and love turning complex ideas into clear, shippable experiences.',
  strengths: ['Systems thinking', 'A11y mindset', 'Performance focus'],
  values: ['Clarity', 'Reliability', 'Continuous learning'],
  currentFocus: ['Content pipeline', 'Animation polish', 'Testing & a11y automation'],
  cta: { label: 'View Projects', href: '#projects' },
  narrative: 'Former admin/procurement lead now crafting software.',
};

/**
 * About section data with fallback support
 * Exports data from virtual module or fallback if unavailable
 */
export const about = aboutData ?? fallbackAboutData;
