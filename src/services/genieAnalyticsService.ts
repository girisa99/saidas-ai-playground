import { supabase } from '@/integrations/supabase/client';

interface GeoLocation {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

interface PopupClickEvent {
  ip_address?: string;
  user_agent?: string;
  page_url: string;
  timestamp: string;
  geo_location?: GeoLocation;
}

interface PrivacyAcceptEvent {
  user_email: string;
  user_name: string;
  ip_address?: string;
  timestamp: string;
  geo_location?: GeoLocation;
}

interface UserRegistrationEvent {
  user_email: string;
  user_name: string;
  context: string;
  ip_address?: string;
  timestamp: string;
  geo_location?: GeoLocation;
}

export class GenieAnalyticsService {
  private static instance: GenieAnalyticsService;
  private sessionId: string | null = null;

  private constructor() {}

  static getInstance(): GenieAnalyticsService {
    if (!GenieAnalyticsService.instance) {
      GenieAnalyticsService.instance = new GenieAnalyticsService();
    }
    return GenieAnalyticsService.instance;
  }

  // Fetch geolocation data. If ipAddress is not provided, fall back to auto-detect.
  async getGeoLocation(ipAddress?: string): Promise<GeoLocation | null> {
    const parse = (data: any): GeoLocation => ({
      country: data.country_name,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude
    });

    try {
      if (ipAddress) {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        if (response.ok) return parse(await response.json());
      }
      // Fallback: auto-detect client IP geolocation
      const fallback = await fetch('https://ipapi.co/json/');
      if (!fallback.ok) return null;
      return parse(await fallback.json());
    } catch (error) {
      console.error('Failed to fetch geolocation:', error);
      return null;
    }
  }

  async trackPopupClick(data: PopupClickEvent): Promise<void> {
    try {
      // Ensure we have IP address - fetch if not provided
      let ipAddress = data.ip_address;
      if (!ipAddress) {
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (err) {
          console.warn('Could not fetch IP address:', err);
        }
      }

      // Fetch geolocation if we have IP and don't have geo data
      let geoLocation = data.geo_location;
      if (!geoLocation && ipAddress) {
        console.log('[Popup Click] Fetching geolocation for IP:', ipAddress);
        geoLocation = await this.getGeoLocation(ipAddress);
        console.log('[Popup Click] Geolocation result:', geoLocation);
      }

      const enrichedData = { 
        ...data, 
        ip_address: ipAddress,
        geo_location: geoLocation 
      };

      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'popup_click',
        p_event_data: enrichedData as any,
        p_user_email: null,
        p_context: null,
        p_ip_address: ipAddress || null
      });

      if (error) {
        console.error('Failed to track popup click:', error);
      } else {
        console.log('✅ Popup click tracked with geo:', geoLocation ? `${geoLocation.city}, ${geoLocation.country}` : 'no location');
      }
    } catch (error) {
      console.error('Error tracking popup click:', error);
    }
  }

  async trackPrivacyAccept(data: PrivacyAcceptEvent): Promise<void> {
    try {
      // Ensure we have IP address - fetch if not provided
      let ipAddress = data.ip_address;
      if (!ipAddress) {
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (err) {
          console.warn('Could not fetch IP address:', err);
        }
      }

      // Fetch geolocation if we have IP and don't have geo data
      let geoLocation = data.geo_location;
      if (!geoLocation && ipAddress) {
        console.log('[Privacy Accept] Fetching geolocation for IP:', ipAddress);
        geoLocation = await this.getGeoLocation(ipAddress);
        console.log('[Privacy Accept] Geolocation result:', geoLocation);
      }

      const enrichedData = { 
        ...data, 
        ip_address: ipAddress,
        geo_location: geoLocation 
      };

      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'privacy_accepted',
        p_event_data: enrichedData as any,
        p_user_email: data.user_email,
        p_context: null,
        p_ip_address: ipAddress || null
      });

      if (error) {
        console.error('Failed to track privacy acceptance:', error);
      } else {
        console.log('✅ Privacy acceptance tracked with geo:', geoLocation ? `${geoLocation.city}, ${geoLocation.country}` : 'no location');
      }
    } catch (error) {
      console.error('Error tracking privacy acceptance:', error);
    }
  }

  // Track user registration/subscription
  async trackUserRegistration(data: UserRegistrationEvent): Promise<void> {
    try {
      // Ensure we have IP address - fetch if not provided
      let ipAddress = data.ip_address;
      if (!ipAddress) {
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (err) {
          console.warn('Could not fetch IP address:', err);
        }
      }

      // Fetch geolocation if we have IP and don't have geo data
      let geoLocation = data.geo_location;
      if (!geoLocation && ipAddress) {
        console.log('[User Registration] Fetching geolocation for IP:', ipAddress);
        geoLocation = await this.getGeoLocation(ipAddress);
        console.log('[User Registration] Geolocation result:', geoLocation);
      }

      const enrichedData = { 
        ...data, 
        ip_address: ipAddress,
        geo_location: geoLocation 
      };

      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'user_registered',
        p_event_data: enrichedData as any,
        p_user_email: data.user_email,
        p_context: data.context,
        p_ip_address: ipAddress || null
      });

      if (error) {
        console.error('Failed to track user registration:', error);
      } else {
        console.log('✅ User registration tracked with geo:', geoLocation ? `${geoLocation.city}, ${geoLocation.country}` : 'no location');
      }
    } catch (error) {
      console.error('Error tracking user registration:', error);
    }
  }

  // Update site stats for popup clicks
  async incrementPopupClickStat(): Promise<void> {
    try {
      const { error } = await supabase.rpc('update_site_stat', {
        stat_name_param: 'popup_clicks',
        increment_value: 1
      });

      if (error) {
        console.error('Failed to update popup click stat:', error);
      }
    } catch (error) {
      console.error('Error updating popup click stat:', error);
    }
  }
}

export const genieAnalyticsService = GenieAnalyticsService.getInstance();
