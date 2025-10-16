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

// Get IP address
const getIPAddress = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.debug('IP fetch skipped:', error);
    return null;
  }
};

// Geo data removed - no longer needed (was causing CORS/429 errors)
// Server-side edge functions handle geo lookup if needed for analytics
const getLocationData = async () => {
  return {}; // Return empty - geo is optional
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const startTime = useRef<number>(Date.now());
  const currentPath = useRef<string>('');
  const ipAddress = useRef<string | null>(null);
  const locationData = useRef<any>(null);

  useEffect(() => {
    // Get IP and location once per session
    const initializeTracking = async () => {
      if (!ipAddress.current) {
        ipAddress.current = await getIPAddress();
        locationData.current = await getLocationData();
      }
    };
    
    initializeTracking();
  }, []);

  useEffect(() => {
    const trackPageView = async () => {
      const sessionId = getSessionId();
      const pagePath = location.pathname;
      const pageTitle = document.title;

      // Ensure we have IP and location (only fetch once per session)
      if (!ipAddress.current) {
        ipAddress.current = await getIPAddress();
      }
      if (!locationData.current) {
        locationData.current = await getLocationData();
      }

      // Track time on previous page before navigating
      if (currentPath.current && currentPath.current !== pagePath) {
        const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
        
        try {
          await supabase.from('visitor_analytics').insert({
            session_id: sessionId,
            ip_address: ipAddress.current,
            page_path: currentPath.current,
            page_title: document.title,
            time_on_page_seconds: timeOnPage,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            ...locationData.current,
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
          ip_address: ipAddress.current,
          page_path: pagePath,
          page_title: pageTitle,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          ...locationData.current,
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
        
        const data = {
          session_id: getSessionId(),
          ip_address: ipAddress.current,
          page_path: currentPath.current,
          page_title: document.title,
          time_on_page_seconds: timeOnPage,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          ...locationData.current,
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
