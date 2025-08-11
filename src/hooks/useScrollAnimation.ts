import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (config: ScrollAnimationConfig = {}) => {
  const { threshold = 0.1, rootMargin = '-10% 0px -10% 0px', triggerOnce = true } = config;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    margin: rootMargin,
    amount: threshold,
  });

  return { ref, isInView };
};

// Hook for scroll-based progress tracking
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

// Hook for section-based scroll tracking
export const useSectionProgress = (sectionRefs: React.RefObject<HTMLElement>[]) => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgresses, setSectionProgresses] = useState<number[]>([]);

  useEffect(() => {
    const updateSectionProgress = () => {
      const progresses = sectionRefs.map((ref) => {
        if (!ref.current) return 0;

        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        return visibleHeight / rect.height;
      });

      setSectionProgresses(progresses);

      // Find the section that's most visible
      const mostVisibleIndex = progresses.reduce(
        (maxIndex, current, index) => (current > progresses[maxIndex] ? index : maxIndex),
        0,
      );

      setActiveSection(mostVisibleIndex);
    };

    window.addEventListener('scroll', updateSectionProgress, { passive: true });
    window.addEventListener('resize', updateSectionProgress, { passive: true });

    // Initial calculation
    updateSectionProgress();

    return () => {
      window.removeEventListener('scroll', updateSectionProgress);
      window.removeEventListener('resize', updateSectionProgress);
    };
  }, [sectionRefs]);

  return { activeSection, sectionProgresses };
};

// Hook for scroll-triggered animations with custom easing
export const useScrollTrigger = (callback: (progress: number) => void, dependency?: any[]) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const progress = scrollY / (documentHeight - windowHeight);

    callback(Math.max(0, Math.min(1, progress)));
  }, [scrollY, callback, ...(dependency || [])]);

  return scrollY;
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};
