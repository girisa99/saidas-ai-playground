import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

// Generate or retrieve session ID
const getSessionId = (): string => {
  const storageKey = 'visitor_session_id';
  let sessionId = sessionStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const startTime = useRef<number>(Date.now());
  const currentPath = useRef<string>('');

  useEffect(() => {
    const trackPageView = async () => {
      const sessionId = getSessionId();
      const pagePath = location.pathname;
      const pageTitle = document.title;

      // Track time on previous page before navigating
      if (currentPath.current && currentPath.current !== pagePath) {
        const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
        
        try {
          await supabase.from('visitor_analytics').insert({
            session_id: sessionId,
            page_path: currentPath.current,
            page_title: document.title,
            time_on_page_seconds: timeOnPage,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            metadata: {
              screen_width: window.screen.width,
              screen_height: window.screen.height,
              viewport_width: window.innerWidth,
              viewport_height: window.innerHeight,
              language: navigator.language,
            }
          });
        } catch (error) {
          console.error('Error tracking page view:', error);
        }
      }

      // Start tracking new page
      currentPath.current = pagePath;
      startTime.current = Date.now();

      // Track page view
      try {
        await supabase.from('visitor_analytics').insert({
          session_id: sessionId,
          page_path: pagePath,
          page_title: pageTitle,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          metadata: {
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            language: navigator.language,
          }
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();

    // Track time on page when user leaves
    const handleBeforeUnload = async () => {
      if (currentPath.current) {
        const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
        
        // Use sendBeacon for reliable tracking on page unload
        const data = {
          session_id: getSessionId(),
          page_path: currentPath.current,
          page_title: document.title,
          time_on_page_seconds: timeOnPage,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          metadata: {
            screen_width: window.screen.width,
            screen_height: window.screen.height,
          }
        };

        try {
          await supabase.from('visitor_analytics').insert(data);
        } catch (error) {
          console.error('Error tracking page exit:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);
};
