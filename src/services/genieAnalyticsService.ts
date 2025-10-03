import { supabase } from '@/integrations/supabase/client';

interface PopupClickEvent {
  ip_address?: string;
  user_agent?: string;
  page_url: string;
  timestamp: string;
}

interface PrivacyAcceptEvent {
  user_email: string;
  user_name: string;
  ip_address?: string;
  timestamp: string;
}

interface UserRegistrationEvent {
  user_email: string;
  user_name: string;
  context: string;
  ip_address?: string;
  timestamp: string;
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

  async trackPopupClick(data: PopupClickEvent): Promise<void> {
    try {
      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'popup_click',
        p_event_data: data as any,
        p_user_email: null,
        p_context: null,
        p_ip_address: data.ip_address || null
      });

      if (error) {
        console.error('Failed to track popup click:', error);
      } else {
        console.log('✅ Popup click tracked');
      }
    } catch (error) {
      console.error('Error tracking popup click:', error);
    }
  }

  async trackPrivacyAccept(data: PrivacyAcceptEvent): Promise<void> {
    try {
      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'privacy_accepted',
        p_event_data: data as any,
        p_user_email: data.user_email,
        p_context: null,
        p_ip_address: data.ip_address || null
      });

      if (error) {
        console.error('Failed to track privacy acceptance:', error);
      } else {
        console.log('✅ Privacy acceptance tracked');
      }
    } catch (error) {
      console.error('Error tracking privacy acceptance:', error);
    }
  }

  // Track user registration/subscription
  async trackUserRegistration(data: UserRegistrationEvent): Promise<void> {
    try {
      const { error } = await supabase.rpc('log_genie_popup_event', {
        p_event_type: 'user_registered',
        p_event_data: data as any,
        p_user_email: data.user_email,
        p_context: data.context,
        p_ip_address: data.ip_address || null
      });

      if (error) {
        console.error('Failed to track user registration:', error);
      } else {
        console.log('✅ User registration tracked');
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
