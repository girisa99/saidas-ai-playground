import { supabase } from '@/integrations/supabase/client';

export interface GenieMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
  model?: string;
  metadata?: any;
}

export interface GenieConversationData {
  conversation_id: string;
  session_name?: string;
  user_id?: string;
  user_email?: string;
  user_name?: string;
  context?: string;
  messages: GenieMessage[];
  is_active: boolean;
  session_start?: string;
  session_end?: string;
  ip_address?: string;
  metadata?: any;
}

class GenieConversationService {
  private currentConversationId: string | null = null;

  async startConversation(data: {
    userEmail?: string;
    userName?: string;
    context?: string;
    ipAddress?: string;
  }): Promise<{ success: boolean; conversationId?: string; error?: string }> {
    try {
      const conversationId = `genie_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      const { data: insertData, error } = await supabase
        .from('genie_conversations')
        .insert({
          conversation_id: conversationId,
          user_email: data.userEmail,
          session_name: data.userName ? `${data.userName}'s Session` : 'Anonymous Session',
          context: data.context || 'general',
          messages: [] as any, // Type assertion for empty JSONB array
          is_active: true,
          session_start: new Date().toISOString(),
          ip_address: data.ipAddress,
          metadata: {
            source: 'public_genie_popup',
            started_at: new Date().toISOString()
          } as any // Type assertion for JSONB
        })
        .select()
        .single();

      if (error) {
        console.error('Error starting Genie conversation:', error);
        return { success: false, error: error.message };
      }

      this.currentConversationId = conversationId;
      console.log('✅ Genie conversation started:', conversationId);
      
      return { success: true, conversationId };
    } catch (error: any) {
      console.error('Failed to start Genie conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async updateConversation(messages: GenieMessage[]): Promise<{ success: boolean; error?: string }> {
    if (!this.currentConversationId) {
      console.warn('⚠️ No active conversation to update');
      return { success: false, error: 'No active conversation' };
    }

    try {
      const { error } = await supabase
        .from('genie_conversations')
        .update({
          messages: messages as any, // Type assertion for JSONB
          updated_at: new Date().toISOString()
        })
        .eq('conversation_id', this.currentConversationId);

      if (error) {
        console.error('Error updating Genie conversation:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Genie conversation updated with', messages.length, 'messages');
      return { success: true };
    } catch (error: any) {
      console.error('Failed to update Genie conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async endConversation(): Promise<{ success: boolean; error?: string }> {
    if (!this.currentConversationId) {
      return { success: true }; // Already ended or never started
    }

    try {
      const { error } = await supabase
        .from('genie_conversations')
        .update({
          is_active: false,
          session_end: new Date().toISOString()
        })
        .eq('conversation_id', this.currentConversationId);

      if (error) {
        console.error('Error ending Genie conversation:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Genie conversation ended:', this.currentConversationId);
      this.currentConversationId = null;
      
      return { success: true };
    } catch (error: any) {
      console.error('Failed to end Genie conversation:', error);
      return { success: false, error: error.message };
    }
  }

  getCurrentConversationId(): string | null {
    return this.currentConversationId;
  }

  isConversationActive(): boolean {
    return this.currentConversationId !== null;
  }
}

export const genieConversationService = new GenieConversationService();
