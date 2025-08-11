import React from 'react';
import { navigationItems } from '@/data/contact';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollTo } from '@/hooks/useScrollTo';
import { focusSectionHeading } from '@/hooks/useFocusReturn';

// Fixed navigation component with active section highlighting
export const Navigation: React.FC = () => {
  const sectionIds = navigationItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);
  const { scrollToSection } = useScrollTo();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    // Slight delay to allow scroll then focus heading for screen readers
    setTimeout(() => focusSectionHeading(sectionId), 400);
  };

  return (
    <nav
      className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800"
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-blue-400">Joem Portfolio</div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8" role="list">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                    // Move focus to section heading after scroll (handled later by focus hook)
                  }}
                  className={`nav-link capitalize hover:text-blue-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button - we'll implement this later */}
          <div className="md:hidden">
            <button 
              className="text-gray-300 hover:text-blue-400"
              aria-label="Open mobile navigation menu"
              aria-expanded="false"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
