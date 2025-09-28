/**
 * Email Service - Business Logic Layer
 * Abstracts all email-related operations from UI components
 */

import { supabase } from "@/integrations/supabase/client";
import { AuthEmailService } from "@/lib/auth-email";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  text_content?: string;
  template_type?: string;
  is_system_template?: boolean;
}

export interface EmailServiceResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template_id?: string;
  variables?: Record<string, any>;
}

export interface CreateTemplateOptions {
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateType?: string;
}

export class EmailService {
  /**
   * Send a custom email
   */
  static async sendEmail(options: SendEmailOptions): Promise<EmailServiceResult> {
    try {
      // Validate user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return {
          success: false,
          message: "Authentication required to send emails",
          error: "UNAUTHORIZED"
        };
      }

      // Validate email options
      if (!options.to || !options.subject) {
        return {
          success: false,
          message: "Recipient and subject are required",
          error: "INVALID_OPTIONS"
        };
      }

      // Rate limiting
      if (!this.checkEmailRateLimit(session.user.id)) {
        return {
          success: false,
          message: "Email rate limit exceeded. Please wait before sending more emails.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: options.to,
          subject: options.subject,
          text_content: options.text,
          html_content: options.html,
          template_id: options.template_id || null,
          variables: options.variables || {}
        }
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Email sent successfully",
        data
      };

    } catch (error: any) {
      console.error('EmailService.sendEmail:', error);
      return {
        success: false,
        message: error.message || "Failed to send email",
        error: "SEND_ERROR"
      };
    }
  }

  /**
   * Send authentication-related emails
   */
  static async sendAuthEmail(
    type: 'welcome' | 'password_reset' | 'email_confirmation' | 'magic_link' | 'admin_notification' | 'account_locked',
    to: string,
    options?: {
      resetUrl?: string;
      confirmationUrl?: string;
      magicLinkUrl?: string;
      lockReason?: string;
      unlockTime?: string;
      notificationType?: string;
      notificationMessage?: string;
      variables?: Record<string, any>;
    }
  ): Promise<EmailServiceResult> {
    try {
      const defaultVariables = {
        app_name: "Saidas AI Playground",
        user_name: to,
        user_email: to,
        ...options?.variables
      };

      let result: any;

      switch (type) {
        case 'welcome':
          result = await AuthEmailService.sendWelcomeEmail(to, defaultVariables);
          break;
        
        case 'password_reset':
          if (!options?.resetUrl) {
            throw new Error('Reset URL is required for password reset emails');
          }
          result = await AuthEmailService.sendPasswordResetEmail(
            to, 
            options.resetUrl, 
            defaultVariables
          );
          break;
        
        case 'email_confirmation':
          if (!options?.confirmationUrl) {
            throw new Error('Confirmation URL is required');
          }
          result = await AuthEmailService.sendEmailConfirmation(
            to,
            options.confirmationUrl,
            defaultVariables
          );
          break;
        
        case 'magic_link':
          if (!options?.magicLinkUrl) {
            throw new Error('Magic link URL is required');
          }
          result = await AuthEmailService.sendMagicLink(
            to,
            options.magicLinkUrl,
            defaultVariables
          );
          break;
        
        case 'admin_notification':
          result = await AuthEmailService.sendAdminNotification(
            to,
            options?.notificationType || "System Alert",
            options?.notificationMessage || "Admin notification",
            to,
            defaultVariables
          );
          break;
        
        case 'account_locked':
          result = await AuthEmailService.sendAccountLockedEmail(
            to,
            options?.lockReason || "Security measure",
            options?.unlockTime || "24 hours",
            defaultVariables
          );
          break;
        
        default:
          throw new Error(`Unsupported auth email type: ${type}`);
      }

      return {
        success: true,
        message: `${type.replace('_', ' ')} email sent successfully`,
        data: result
      };

    } catch (error: any) {
      console.error('EmailService.sendAuthEmail:', error);
      return {
        success: false,
        message: error.message || `Failed to send ${type} email`,
        error: "AUTH_EMAIL_ERROR"
      };
    }
  }

  /**
   * Fetch email templates
   */
  static async getEmailTemplates(): Promise<EmailServiceResult<EmailTemplate[]>> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Email templates retrieved successfully",
        data: data || []
      };

    } catch (error: any) {
      console.error('EmailService.getEmailTemplates:', error);
      return {
        success: false,
        message: "Failed to fetch email templates",
        error: error.message
      };
    }
  }

  /**
   * Create a new email template
   */
  static async createEmailTemplate(options: CreateTemplateOptions): Promise<EmailServiceResult> {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .insert({
          name: options.name,
          subject: options.subject,
          html_content: options.htmlContent,
          text_content: options.textContent,
          template_type: options.templateType || 'custom'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Email template created successfully",
        data
      };

    } catch (error: any) {
      console.error('EmailService.createEmailTemplate:', error);
      return {
        success: false,
        message: error.message || "Failed to create email template",
        error: "CREATE_TEMPLATE_ERROR"
      };
    }
  }

  /**
   * Get sent emails history
   */
  static async getSentEmails(limit: number = 10): Promise<EmailServiceResult> {
    try {
      const { data, error } = await supabase
        .from('sent_emails')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Sent emails retrieved successfully",
        data: data || []
      };

    } catch (error: any) {
      console.error('EmailService.getSentEmails:', error);
      return {
        success: false,
        message: "Failed to fetch sent emails",
        error: error.message
      };
    }
  }

  /**
   * Get received emails
   */
  static async getReceivedEmails(limit: number = 10): Promise<EmailServiceResult> {
    try {
      const { data, error } = await supabase
        .from('received_emails')
        .select('*')
        .order('received_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Received emails retrieved successfully",
        data: data || []
      };

    } catch (error: any) {
      console.error('EmailService.getReceivedEmails:', error);
      return {
        success: false,
        message: "Failed to fetch received emails",
        error: error.message
      };
    }
  }

  /**
   * Mark email as read
   */
  static async markEmailAsRead(emailId: string): Promise<EmailServiceResult> {
    try {
      const { error } = await supabase
        .from('received_emails')
        .update({ is_read: true })
        .eq('id', emailId);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Email marked as read"
      };

    } catch (error: any) {
      console.error('EmailService.markEmailAsRead:', error);
      return {
        success: false,
        message: "Failed to mark email as read",
        error: error.message
      };
    }
  }

  /**
   * Rate limiting for email sending
   * Business rule: Max 10 emails per hour per user
   */
  private static rateLimitStore = new Map<string, number[]>();

  private static checkEmailRateLimit(userId: string): boolean {
    const now = Date.now();
    const emails = this.rateLimitStore.get(userId) || [];
    
    // Remove emails older than 1 hour
    const recentEmails = emails.filter(time => now - time < 3600000);
    
    // Check if limit exceeded (10 per hour)
    if (recentEmails.length >= 10) {
      return false;
    }

    // Record new email
    recentEmails.push(now);
    this.rateLimitStore.set(userId, recentEmails);
    
    return true;
  }
}

// Export a default instance for convenience
export const emailService = new EmailService();