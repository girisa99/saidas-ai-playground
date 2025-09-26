/**
 * Standardized Email Service for Multi-Repository Architecture
 * 
 * This service should be shared between frontend and backend repositories
 * using git subtree or npm package approach.
 * 
 * Usage:
 * - Frontend repo: Marketing emails, notifications
 * - Backend repo: Transactional emails, system alerts
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: Record<string, any>;
}

export interface EmailConfig {
  provider: 'resend' | 'sendgrid' | 'ses';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
}

export class StandardizedEmailService {
  private config: EmailConfig;
  
  constructor(config: EmailConfig) {
    this.config = config;
  }

  /**
   * Send email using standardized template system
   */
  async sendEmail({
    to,
    template,
    variables = {},
    attachments = []
  }: {
    to: string | string[];
    template: EmailTemplate;
    variables?: Record<string, any>;
    attachments?: Array<{ filename: string; content: Buffer; type: string }>;
  }) {
    // Input validation using shared validation schema
    const { sanitizeInput } = await import('./validation');
    
    const sanitizedTo = Array.isArray(to) 
      ? to.map(email => sanitizeInput(email))
      : sanitizeInput(to);
    
    // Rate limiting check
    const rateLimitKey = `email:${Array.isArray(to) ? to[0] : to}`;
    if (!this.checkRateLimit(rateLimitKey)) {
      throw new Error('Rate limit exceeded for email sending');
    }

    // Template rendering with XSS protection
    const renderedContent = this.renderTemplate(template, variables);
    
    // Send via configured provider
    return this.sendViaProvider({
      to: sanitizedTo,
      subject: template.subject,
      html: renderedContent.html,
      text: renderedContent.text,
      attachments
    });
  }

  /**
   * Shared email templates for both repositories
   */
  static getSharedTemplates(): Record<string, EmailTemplate> {
    return {
      welcome: {
        id: 'welcome',
        name: 'Welcome Email',
        subject: 'Welcome to {{app_name}}',
        htmlContent: `
          <h1>Welcome {{user_name}}!</h1>
          <p>Thank you for joining {{app_name}}.</p>
          <a href="{{app_url}}">Get Started</a>
        `,
        variables: { user_name: '', app_name: '', app_url: '' }
      },
      passwordReset: {
        id: 'password_reset',
        name: 'Password Reset',
        subject: 'Reset your password',
        htmlContent: `
          <h1>Password Reset Request</h1>
          <p>Click the link below to reset your password:</p>
          <a href="{{reset_url}}">Reset Password</a>
          <p>This link expires in 1 hour.</p>
        `,
        variables: { reset_url: '' }
      },
      securityAlert: {
        id: 'security_alert',
        name: 'Security Alert',
        subject: 'Security Alert: {{alert_type}}',
        htmlContent: `
          <h1>Security Alert</h1>
          <p>We detected {{alert_type}} on your account.</p>
          <p>Time: {{timestamp}}</p>
          <p>IP: {{ip_address}}</p>
          <p>If this wasn't you, please contact support immediately.</p>
        `,
        variables: { alert_type: '', timestamp: '', ip_address: '' }
      }
    };
  }

  private renderTemplate(template: EmailTemplate, variables: Record<string, any>) {
    let html = template.htmlContent;
    let text = template.textContent || '';

    // XSS-safe template rendering
    Object.entries(variables).forEach(([key, value]) => {
      const escapedValue = this.escapeHtml(String(value));
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), escapedValue);
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });

    return { html, text };
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private checkRateLimit(key: string): boolean {
    // Implement rate limiting logic
    // This should be shared across both repositories
    return true; // Placeholder
  }

  private async sendViaProvider(emailData: any) {
    switch (this.config.provider) {
      case 'resend':
        return this.sendViaResend(emailData);
      case 'sendgrid':
        return this.sendViaSendGrid(emailData);
      case 'ses':
        return this.sendViaSES(emailData);
      default:
        throw new Error(`Unsupported email provider: ${this.config.provider}`);
    }
  }

  private async sendViaResend(emailData: any) {
    // Resend implementation
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email sending failed: ${response.statusText}`);
    }

    return response.json();
  }

  private async sendViaSendGrid(emailData: any) {
    // SendGrid implementation placeholder
    throw new Error('SendGrid implementation needed');
  }

  private async sendViaSES(emailData: any) {
    // AWS SES implementation placeholder
    throw new Error('SES implementation needed');
  }
}

/**
 * Factory function for creating email service instances
 * Should be used in both repositories
 */
export function createEmailService(config: EmailConfig): StandardizedEmailService {
  return new StandardizedEmailService(config);
}

/**
 * Audit logging for email operations
 * Critical for compliance in healthcare applications
 */
export function logEmailOperation(operation: {
  type: 'sent' | 'failed' | 'bounced';
  to: string;
  template: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, any>;
}) {
  // This should integrate with your audit logging system
  console.log('[EMAIL_AUDIT]', {
    ...operation,
    timestamp: operation.timestamp.toISOString(),
  });
}