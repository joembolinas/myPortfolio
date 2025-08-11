import { useCallback } from 'react';

// Enhanced hook for smooth scrolling to sections with optimized performance
export const useScrollTo = () => {
  const scrollToSection = useCallback((sectionId: string, options?: {
    offset?: number;
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
  }) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const { offset = 80, behavior = 'smooth' } = options || {};
      
      // Calculate position with offset for fixed navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToSection, scrollToTop };
};
