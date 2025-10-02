/**
 * Performance optimization utilities for the Genie AI Hub
 */

// Lazy load images with Intersection Observer
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        if (target.dataset.src) {
          target.src = target.dataset.src;
          target.classList.remove('lazy');
          observer.unobserve(target);
        }
      }
    });
  });
  observer.observe(img);
};

// Debounce function for scroll/resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance-critical events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Detect device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance monitoring
export const measurePerformance = (name: string, callback: () => void) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  console.log(`[Performance] ${name}: ${(endTime - startTime).toFixed(2)}ms`);
};

// Preload critical assets
export const preloadAsset = (href: string, as: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
};

// Viewport height fix for mobile browsers
export const setVhProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Initialize viewport height and update on resize
if (typeof window !== 'undefined') {
  setVhProperty();
  window.addEventListener('resize', debounce(setVhProperty, 100));
}
