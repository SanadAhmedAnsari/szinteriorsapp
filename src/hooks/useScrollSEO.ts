import { useEffect, useRef } from 'react';

/**
 * useScrollSEO Hook
 * Updates the browser URL hash as the user scrolls through elements.
 * Uses Intersection Observer for performance and history.replaceState to avoid breaking the back button.
 */
export const useScrollSEO = (selector: string) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Trigger when 60% of the element is visible
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            // Update URL hash without adding to history stack
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector]);
};
