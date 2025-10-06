import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { sanitizeInput } from '@/lib/validation';
import { secureLog } from '@/lib/secure-logger';

// Validation schemas
const emailSchema = z.string().email().max(255).trim().toLowerCase();
const nameSchema = z.string().min(1).max(200).trim();
const contextSchema = z.enum(['technology', 'healthcare', 'general']).default('general');
const ipAddressSchema = z.string()
  .regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i, 'Invalid IP address')
  .optional();

const conversationStartSchema = z.object({
  userEmail: emailSchema.optional(),
  userName: nameSchema.optional(),
  context: contextSchema.optional(),
  ipAddress: ipAddressSchema.optional(),
});

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
      // Validate and sanitize input
      const validatedData = conversationStartSchema.parse({
        userEmail: data.userEmail ? sanitizeInput(data.userEmail) : undefined,
        userName: data.userName ? sanitizeInput(data.userName) : undefined,
        context: data.context,
        ipAddress: data.ipAddress,
      });

      const conversationId = `genie_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      const { data: insertData, error } = await supabase
        .from('genie_conversations')
        .insert({
          conversation_id: conversationId,
          user_email: validatedData.userEmail,
          session_name: validatedData.userName ? `${validatedData.userName}'s Session` : 'Anonymous Session',
          context: validatedData.context || 'general',
          messages: [] as any,
          is_active: true,
          session_start: new Date().toISOString(),
          ip_address: validatedData.ipAddress,
          metadata: {
            source: 'public_genie_popup',
            started_at: new Date().toISOString()
          } as any
        })
        .select()
        .single();

      if (error) {
        secureLog.error('Error starting Genie conversation:', error);
        return { success: false, error: error.message };
      }

      this.currentConversationId = conversationId;
      secureLog.log('✅ Genie conversation started');
      
      return { success: true, conversationId };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        secureLog.error('Validation error in conversation start:', error.issues[0]?.message);
        return { success: false, error: 'Invalid input data' };
      }
      secureLog.error('Failed to start Genie conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async updateConversation(messages: GenieMessage[]): Promise<{ success: boolean; error?: string }> {
    if (!this.currentConversationId) {
      secureLog.warn('⚠️ No active conversation to update');
      return { success: false, error: 'No active conversation' };
    }

    try {
      const { error } = await supabase
        .from('genie_conversations')
        .update({
          messages: messages as any,
          updated_at: new Date().toISOString()
        })
        .eq('conversation_id', this.currentConversationId);

      if (error) {
        secureLog.error('Error updating Genie conversation:', error);
        return { success: false, error: error.message };
      }

      secureLog.log('✅ Genie conversation updated with', messages.length, 'messages');
      return { success: true };
    } catch (error: any) {
      secureLog.error('Failed to update Genie conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async endConversation(): Promise<{ success: boolean; error?: string }> {
    if (!this.currentConversationId) {
      return { success: true };
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
        secureLog.error('Error ending Genie conversation:', error);
        return { success: false, error: error.message };
      }

      secureLog.log('✅ Genie conversation ended');
      this.currentConversationId = null;
      
      return { success: true };
    } catch (error: any) {
      secureLog.error('Failed to end Genie conversation:', error);
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
