import { useRef, useEffect } from 'react';

// Hook to capture the previously focused element and provide a method to restore focus
// Useful for modals, drawers, or programmatic navigation (e.g., skip links, in-page nav)
export const useFocusReturn = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = (document.activeElement as HTMLElement) || null;
  }, []);

  const returnFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  return { returnFocus };
};

// Utility to focus a section heading after smooth scroll ends
export const focusSectionHeading = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  // Try to find a focusable heading inside section
  const heading = section.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null;
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    // Remove tabindex after focus for clean DOM
    const remove = () => heading.removeAttribute('tabindex');
    heading.addEventListener('blur', remove, { once: true });
  }
};
