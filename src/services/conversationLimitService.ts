import { supabase } from "@/integrations/supabase/client";

export interface ConversationLimits {
  allowed: boolean;
  daily_count: number;
  daily_limit: number;
  hourly_count: number;
  hourly_limit: number;
  email_daily_count?: number;
  email_daily_limit?: number;
  email_hourly_count?: number;
  email_hourly_limit?: number;
  duplicate_email_ips?: number;
  reset_time: string;
  restriction_reason?: string;
  is_returning_user?: boolean;
}

export interface ConversationSession {
  session_id: string;
  ip_address: string;
  user_email?: string;
  user_name?: string;
  context: string;
  message_count: number;
}

class ConversationLimitService {
  private currentSession: ConversationSession | null = null;

  async getUserIP(): Promise<string> {
    // Check session cache first
    const cachedIP = sessionStorage.getItem('user_ip_cache');
    if (cachedIP) return cachedIP;
    
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        // Add timeout
        signal: AbortSignal.timeout(5000)
      });
      const data = await response.json();
      // Cache IP for session
      sessionStorage.setItem('user_ip_cache', data.ip);
      return data.ip;
    } catch (error) {
      console.debug('Failed to get IP, using fallback');
      return '0.0.0.0'; // Fallback
    }
  }

  async checkConversationLimits(
    userEmail?: string,
    userName?: string
  ): Promise<ConversationLimits> {
    const ip_address = await this.getUserIP();
    
    const { data, error } = await supabase.functions.invoke('conversation-rate-limiter', {
      body: {
        ip_address,
        user_email: userEmail,
        user_name: userName,
        action: 'check'
      }
    });

    if (error) {
      console.error('Rate limit check error:', error);
      // Return permissive defaults on error
      return {
        allowed: true,
        daily_count: 0,
        daily_limit: 5,
        hourly_count: 0,
        hourly_limit: 2,
        reset_time: new Date(Date.now() + 3600000).toISOString()
      };
    }

    return data as ConversationLimits;
  }

  async startConversation(
    context: string,
    userEmail?: string,
    userName?: string
  ): Promise<{ allowed: boolean; session_id?: string; message?: string; limits?: ConversationLimits }> {
    const ip_address = await this.getUserIP();
    const session_id = `${ip_address}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { data, error } = await supabase.functions.invoke('conversation-rate-limiter', {
      body: {
        ip_address,
        user_email: userEmail,
        user_name: userName,
        context,
        action: 'start',
        session_id
      }
    });

    if (error) {
      console.error('Start conversation error:', error);
      return { allowed: false, message: 'Failed to start conversation' };
    }

    if (data.allowed) {
      this.currentSession = {
        session_id: data.session_id,
        ip_address,
        user_email: userEmail,
        user_name: userName,
        context,
        message_count: 0
      };
    }

    return data;
  }

  async updateMessageCount(): Promise<void> {
    if (!this.currentSession) return;

    this.currentSession.message_count += 1;
    const ip_address = await this.getUserIP();

    const { error } = await supabase.functions.invoke('conversation-rate-limiter', {
      body: {
        ip_address,
        session_id: this.currentSession.session_id,
        action: 'message',
        message_count: this.currentSession.message_count
      }
    });

    if (error) {
      console.error('Update message count error:', error);
    }
  }

  async endConversation(): Promise<void> {
    if (!this.currentSession) return;

    const ip_address = await this.getUserIP();

    const { error } = await supabase.functions.invoke('conversation-rate-limiter', {
      body: {
        ip_address,
        session_id: this.currentSession.session_id,
        action: 'end',
        message_count: this.currentSession.message_count
      }
    });

    if (error) {
      console.error('End conversation error:', error);
    }

    this.currentSession = null;
  }

  getCurrentSession(): ConversationSession | null {
    return this.currentSession;
  }

  isConversationActive(): boolean {
    return this.currentSession !== null;
  }
}

export const conversationLimitService = new ConversationLimitService();