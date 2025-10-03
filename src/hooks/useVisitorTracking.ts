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

// Get location data from IP (using ipapi.co free tier)
const getLocationData = async (): Promise<{
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }
  return {};
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
      
      // Get location data (only once per session)
      let locationData: any = {};
      const hasLocation = sessionStorage.getItem('visitor_location');
      if (!hasLocation) {
        locationData = await getLocationData();
        if (locationData.country) {
          sessionStorage.setItem('visitor_location', JSON.stringify(locationData));
        }
      } else {
        try {
          locationData = JSON.parse(hasLocation);
        } catch (e) {
          locationData = {};
        }
      }

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
            ...locationData,
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
          ...locationData,
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
