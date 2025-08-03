import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import { navigationItems } from '@/data/portfolio';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Approximate header height
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className={clsx(
      'fixed top-0 w-full z-50 transition-all duration-300',
      {
        'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md shadow-soft': isScrolled,
        'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-sm': !isScrolled,
      }
    )}>
      <nav className="container-padding mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="text-xl lg:text-2xl font-bold gradient-text">
              Joe M. Bolinas
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    {
                      'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': 
                        activeSection === item.href.substring(1),
                      'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400': 
                        activeSection !== item.href.substring(1),
                    }
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className={clsx('h-6 w-6 transition-transform duration-200', {
                  'rotate-90': isMenuOpen,
                })}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={clsx(
          'md:hidden transition-all duration-300 ease-in-out',
          {
            'max-h-96 opacity-100': isMenuOpen,
            'max-h-0 opacity-0 overflow-hidden': !isMenuOpen,
          }
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md rounded-lg mt-2">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  {
                    'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': 
                      activeSection === item.href.substring(1),
                    'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800': 
                      activeSection !== item.href.substring(1),
                  }
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;