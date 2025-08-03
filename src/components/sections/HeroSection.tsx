import React from 'react';
import { Button } from '@/components/ui/Button';
import { useScrollTo } from '@/hooks/useScrollTo';

// Hero section with gradient text and career transition narrative
export const HeroSection: React.FC = () => {
  const { scrollToSection } = useScrollTo();

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-1000 relative z-10 bg-grid-pattern"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main heading with gradient text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Hello, I'm Joem
        </h1>
        
        {/* Career transition subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Full Stack Developer passionate about creating beautiful, functional, and user-friendly applications
        </p>
        
        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection('websites')}
          >
            Static Websites
          </Button>
        </div>
      </div>
    </section>
  );
};
