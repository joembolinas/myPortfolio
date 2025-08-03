import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { personalInfo } from '@/data/portfolio';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = `Hello, I'm ${personalInfo.name}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const headerHeight = 80;
      const targetPosition = projectsSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-900 dark:to-secondary-800">
      <div className="container-padding mx-auto max-w-7xl text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white">
              {displayedText}
              {showCursor && (
                <span className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary-500 ml-1 animate-pulse" />
              )}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold gradient-text">
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              {personalInfo.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const headerHeight = 80;
                  const targetPosition = contactSection.offsetTop - headerHeight;
                  window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
              className="w-full sm:w-auto"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 animate-bounce">
            <div className="flex justify-center">
              <svg 
                className="w-6 h-6 text-secondary-400 dark:text-secondary-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;