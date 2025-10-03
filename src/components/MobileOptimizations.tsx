import { useEffect } from 'react';

/**
 * Mobile-specific optimizations component
 * Handles viewport height fixes, touch optimizations, and performance improvements
 */
export const MobileOptimizations = () => {
  useEffect(() => {
    // Fix viewport height on mobile browsers (accounts for address bar)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    // Prevent zoom on double-tap for iOS
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventZoom, { passive: false });

    // Prevent pull-to-refresh on mobile
    let startY = 0;
    const preventPullToRefresh = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (e.type === 'touchstart') {
        startY = touch.pageY;
      } else if (e.type === 'touchmove') {
        const y = touch.pageY;
        // Only prevent if at top of page and pulling down
        if (window.scrollY === 0 && y > startY) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: false });
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

    return () => {
      window.removeEventListener('resize', setVH);
      document.removeEventListener('touchend', preventZoom);
      document.removeEventListener('touchstart', preventPullToRefresh);
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  return null;
};
