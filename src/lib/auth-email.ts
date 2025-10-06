import { supabase } from "@/integrations/supabase/client";

export interface AuthEmailVariables {
  app_name?: string;
  user_name?: string;
  user_email?: string;
  reset_url?: string;
  confirmation_url?: string;
  magic_link_url?: string;
  expiry_time?: string;
  notification_type?: string;
  notification_message?: string;
  timestamp?: string;
  ip_address?: string;
  lock_reason?: string;
  lock_time?: string;
  unlock_time?: string;
  [key: string]: any;
}

export class AuthEmailService {
  private static defaultVariables: Partial<AuthEmailVariables> = {
    app_name: "Your App",
    expiry_time: "24 hours"
  };

  private static async sendEmail(templateName: string, toEmail: string, variables: AuthEmailVariables = {}) {
    try {
      const mergedVariables = { ...this.defaultVariables, ...variables };
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: toEmail,
          template_name: templateName,
          variables: mergedVariables
        }
      });

      if (error) {
        console.error(`Error sending ${templateName} email:`, error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`Failed to send ${templateName} email:`, error);
      throw error;
    }
  }

  static async sendWelcomeEmail(toEmail: string, variables: AuthEmailVariables = {}) {
    return this.sendEmail('welcome_email', toEmail, {
      user_email: toEmail,
      ...variables
    });
  }

  static async sendPasswordResetEmail(toEmail: string, resetUrl: string, variables: AuthEmailVariables = {}) {
    return this.sendEmail('password_reset', toEmail, {
      user_email: toEmail,
      reset_url: resetUrl,
      ...variables
    });
  }

  static async sendEmailConfirmation(toEmail: string, confirmationUrl: string, variables: AuthEmailVariables = {}) {
    return this.sendEmail('email_confirmation', toEmail, {
      user_email: toEmail,
      confirmation_url: confirmationUrl,
      ...variables
    });
  }

  static async sendMagicLink(toEmail: string, magicLinkUrl: string, variables: AuthEmailVariables = {}) {
    return this.sendEmail('magic_link', toEmail, {
      user_email: toEmail,
      magic_link_url: magicLinkUrl,
      ...variables
    });
  }

  static async sendAdminNotification(
    toEmail: string, 
    notificationType: string, 
    message: string, 
    userEmail: string,
    variables: AuthEmailVariables = {}
  ) {
    return this.sendEmail('admin_notification', toEmail, {
      notification_type: notificationType,
      notification_message: message,
      user_email: userEmail,
      timestamp: new Date().toISOString(),
      ...variables
    });
  }

  static async sendAccountLockedEmail(
    toEmail: string, 
    lockReason: string, 
    unlockTime: string, 
    variables: AuthEmailVariables = {}
  ) {
    return this.sendEmail('account_locked', toEmail, {
      user_email: toEmail,
      lock_reason: lockReason,
      lock_time: new Date().toISOString(),
      unlock_time: unlockTime,
      ...variables
    });
  }

  // Supabase Auth Event Handlers
  static async handleAuthEvent(event: string, session: any, user: any) {
    try {
      switch (event) {
        case 'SIGNED_UP':
          if (user?.email) {
            await this.sendWelcomeEmail(user.email, {
              user_name: user.user_metadata?.full_name || user.email,
              user_email: user.email
            });
          }
          break;
        
        case 'PASSWORD_RECOVERY':
          // Password recovery initiated - no sensitive data logged
          break;
        
        default:
          // Unhandled auth event - no logging needed
          break;
      }
    } catch (error) {
      // Error logged without sensitive data exposure
      console.error('Error handling auth event');
    }
  }
}

// Utility functions for Supabase Auth integration
export const setupAuthEmailHandlers = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    AuthEmailService.handleAuthEvent(event, session, session?.user);
  });
};

// Export for backward compatibility
export const sendWelcomeEmail = AuthEmailService.sendWelcomeEmail.bind(AuthEmailService);
export const sendPasswordResetEmail = AuthEmailService.sendPasswordResetEmail.bind(AuthEmailService);
export const sendEmailConfirmation = AuthEmailService.sendEmailConfirmation.bind(AuthEmailService);
export const sendMagicLink = AuthEmailService.sendMagicLink.bind(AuthEmailService);
export const sendAdminNotification = AuthEmailService.sendAdminNotification.bind(AuthEmailService);
export const sendAccountLockedEmail = AuthEmailService.sendAccountLockedEmail.bind(AuthEmailService);