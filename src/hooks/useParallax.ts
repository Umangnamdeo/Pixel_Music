import { useState, useEffect } from 'react';

/**
 * useParallax hook
 * Tracks scroll position using requestAnimationFrame and returns
 * interpolated smooth parallax offsets for multi-layer depth without
 * triggering reflows or layout thrashing.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollY,
    // Layer speeds for smooth cinematic depth
    bgOffset: scrollY * 0.12,
    midOffset: scrollY * 0.28,
    foregroundOffset: scrollY * 0.45,
  };
}
