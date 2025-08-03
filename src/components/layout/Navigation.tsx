import React from 'react';
import { navigationItems } from '@/data/contact';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollTo } from '@/hooks/useScrollTo';

// Fixed navigation component with active section highlighting
export const Navigation: React.FC = () => {
  const sectionIds = navigationItems.map(item => item.id);
  const activeSection = useActiveSection(sectionIds);
  const { scrollToSection } = useScrollTo();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-blue-400">
            Joem Portfolio
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link capitalize hover:text-blue-400 transition-colors duration-300 ${
                  activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button - we'll implement this later */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
