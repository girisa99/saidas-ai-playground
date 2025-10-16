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

interface VisionFeatureEvent {
  user_email: string;
  feature_type: 'vision_enabled' | 'medical_mode_enabled' | 'image_uploaded' | 'dicom_processed';
  context: string;
  metadata?: {
    model_name?: string;
    image_count?: number;
    image_type?: string;
    file_size?: number;
    has_phi?: boolean;
    dicom_modality?: string;
  };
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

  // Geo lookup removed - edge functions handle this server-side if needed
  async getGeoLocation(ipAddress?: string): Promise<GeoLocation | null> {
    return null; // Geo is optional, prevents CORS/429 errors
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
        geoLocation = await this.getGeoLocation(ipAddress);
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
        geoLocation = await this.getGeoLocation(ipAddress);
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
        geoLocation = await this.getGeoLocation(ipAddress);
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
      }
    } catch (error) {
      console.error('Error tracking user registration:', error);
    }
  }

  // Track vision feature usage
  async trackVisionFeature(data: VisionFeatureEvent): Promise<void> {
    try {
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

      let geoLocation = data.geo_location;
      if (!geoLocation && ipAddress) {
        geoLocation = await this.getGeoLocation(ipAddress);
      }

      const enrichedData = { 
        ...data, 
        ip_address: ipAddress,
        geo_location: geoLocation 
      };

      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: data.feature_type,
        p_event_data: enrichedData as any,
        p_user_email: data.user_email,
        p_context: data.context,
        p_ip_address: ipAddress || null
      });

      if (error) {
        console.error('Failed to track vision feature:', error);
      }
    } catch (error) {
      console.error('Error tracking vision feature:', error);
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
