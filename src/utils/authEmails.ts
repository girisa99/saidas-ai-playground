import { supabase } from "@/integrations/supabase/client";
import type { AuthChangeEvent } from "@supabase/supabase-js";

interface EmailVariables {
  [key: string]: string;
}

/**
 * Send standardized authentication emails using Resend templates
 */
export class AuthEmailService {
  /**
   * Send welcome email to new users
   */
  static async sendWelcomeEmail(
    userEmail: string,
    userName: string,
    appName: string = "Your App"
  ) {
    return this.sendTemplateEmail('welcome_email', userEmail, {
      app_name: appName,
      user_name: userName,
      user_email: userEmail
    });
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(
    userEmail: string,
    userName: string,
    resetUrl: string,
    appName: string = "Your App",
    expiryTime: string = "1 hour"
  ) {
    return this.sendTemplateEmail('password_reset', userEmail, {
      app_name: appName,
      user_name: userName,
      reset_url: resetUrl,
      expiry_time: expiryTime
    });
  }

  /**
   * Send email confirmation email
   */
  static async sendEmailConfirmation(
    userEmail: string,
    userName: string,
    confirmationUrl: string,
    appName: string = "Your App",
    expiryTime: string = "24 hours"
  ) {
    return this.sendTemplateEmail('email_confirmation', userEmail, {
      app_name: appName,
      user_name: userName,
      confirmation_url: confirmationUrl,
      expiry_time: expiryTime
    });
  }

  /**
   * Send magic link email
   */
  static async sendMagicLink(
    userEmail: string,
    userName: string,
    magicLinkUrl: string,
    appName: string = "Your App",
    expiryTime: string = "15 minutes"
  ) {
    return this.sendTemplateEmail('magic_link', userEmail, {
      app_name: appName,
      user_name: userName,
      magic_link_url: magicLinkUrl,
      expiry_time: expiryTime
    });
  }

  /**
   * Send admin notification email
   */
  static async sendAdminNotification(
    adminEmail: string,
    notificationType: string,
    notificationMessage: string,
    userEmail: string,
    ipAddress: string = "Unknown",
    appName: string = "Your App"
  ) {
    return this.sendTemplateEmail('admin_notification', adminEmail, {
      app_name: appName,
      notification_type: notificationType,
      notification_message: notificationMessage,
      user_email: userEmail,
      timestamp: new Date().toISOString(),
      ip_address: ipAddress
    });
  }

  /**
   * Send account locked notification
   */
  static async sendAccountLockedEmail(
    userEmail: string,
    userName: string,
    lockReason: string,
    unlockTime: string,
    appName: string = "Your App"
  ) {
    return this.sendTemplateEmail('account_locked', userEmail, {
      app_name: appName,
      user_name: userName,
      user_email: userEmail,
      lock_reason: lockReason,
      lock_time: new Date().toISOString(),
      unlock_time: unlockTime
    });
  }

  /**
   * Generic method to send template-based emails
   */
  private static async sendTemplateEmail(
    templateName: string,
    toEmail: string,
    variables: EmailVariables,
    fromEmail: string = 'noreply@resend.dev'
  ) {
    try {
      // Get template ID
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('id')
        .eq('name', templateName)
        .eq('is_active', true)
        .single();

      if (templateError || !template) {
        throw new Error(`Template '${templateName}' not found`);
      }

      // Call send-email function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: toEmail,
          from: fromEmail,
          template_id: template.id,
          variables
        }
      });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error(`Error sending ${templateName} email:`, error);
      return { 
        success: false, 
        error: error.message || 'Failed to send email' 
      };
    }
  }

  /**
   * Send custom email without template
   */
  static async sendCustomEmail(
    toEmail: string,
    subject: string,
    htmlContent?: string,
    textContent?: string,
    fromEmail: string = 'noreply@resend.dev'
  ) {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: toEmail,
          from: fromEmail,
          subject,
          html_content: htmlContent,
          text_content: textContent
        }
      });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Error sending custom email:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send email' 
      };
    }
  }
}

/**
 * Hook for Supabase Auth events to automatically send emails
 */
export const setupAuthEmailHooks = () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    const user = session?.user;
    
    // Handle new user signups
    if (user?.email && user?.email_confirmed_at) {
      // Check if this is a new user by looking at created_at vs confirmed_at
      const createdAt = new Date(user.created_at);
      const confirmedAt = new Date(user.email_confirmed_at);
      const timeDiff = Math.abs(confirmedAt.getTime() - createdAt.getTime());
      
      // If confirmed within 5 minutes of creation, likely a new signup
      if (timeDiff < 5 * 60 * 1000) {
        await AuthEmailService.sendWelcomeEmail(
          user.email,
          user.user_metadata?.full_name || 'User'
        );
      }
    }
  });
};