/**
 * Contact Service - Business Logic Layer
 * Separated from UI components for better maintainability
 */

import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema } from "@/lib/validation";
import { z } from "zod";

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactServiceResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export class ContactService {
  /**
   * Submit contact form with validation and processing
   */
  static async submitContactForm(formData: ContactFormData): Promise<ContactServiceResult> {
    try {
      // 1. Validate input data
      const validatedData = contactFormSchema.parse(formData);
      
      // 2. Sanitize inputs (additional security layer)
      const sanitizedData = {
        ...validatedData,
        name: validatedData.name.trim(),
        email: validatedData.email.toLowerCase().trim(),
        message: validatedData.message.trim(),
        subject: validatedData.subject.trim()
      };

      // 3. Rate limiting check (business rule)
      const rateLimitKey = `contact:${sanitizedData.email}`;
      if (!this.checkRateLimit(rateLimitKey)) {
        return {
          success: false,
          message: "Too many contact attempts. Please wait before submitting again.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 4. Call backend service
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          contactMethod: 'Website Contact Form',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          source: 'saidas-ai-playground'
        }
      });

      if (error) {
        throw error;
      }

      // 5. Log successful submission (audit trail)
      await this.logContactSubmission(sanitizedData);

      return {
        success: true,
        message: "Thank you for your enquiry. We'll get back to you within 24-48 hours.",
        data
      };

    } catch (error: any) {
      console.error('ContactService.submitContactForm:', error);
      
      // Handle specific error types
      if (error.name === 'ZodError') {
        return {
          success: false,
          message: "Please check your input and try again.",
          error: "VALIDATION_ERROR"
        };
      }

      return {
        success: false,
        message: error.message || "Unable to send message. Please try again later.",
        error: "SUBMISSION_ERROR"
      };
    }
  }

  /**
   * Rate limiting for contact form submissions
   * Business rule: Max 3 submissions per hour per email
   */
  private static rateLimitStore = new Map<string, number[]>();

  private static checkRateLimit(key: string): boolean {
    const now = Date.now();
    const submissions = this.rateLimitStore.get(key) || [];
    
    // Remove submissions older than 1 hour
    const recentSubmissions = submissions.filter(time => now - time < 3600000);
    
    // Check if limit exceeded (3 per hour)
    if (recentSubmissions.length >= 3) {
      return false;
    }

    // Record new submission
    recentSubmissions.push(now);
    this.rateLimitStore.set(key, recentSubmissions);
    
    return true;
  }

  /**
   * Log contact submission for audit purposes
   */
  private static async logContactSubmission(data: ContactFormData): Promise<void> {
    try {
      // Log to audit system (could be database, analytics, etc.)
      const auditData = {
        event: 'contact_form_submitted',
        timestamp: new Date().toISOString(),
        email_hash: this.hashEmail(data.email),
        has_company: !!data.company,
        has_phone: !!data.phone,
        message_length: data.message.length,
        source: 'frontend'
      };

      // Could send to analytics service or audit log
      console.log('[AUDIT]', auditData);
      
    } catch (error) {
      console.error('Failed to log contact submission:', error);
      // Don't fail the main operation for logging issues
    }
  }

  /**
   * Hash email for privacy-compliant logging
   */
  private static hashEmail(email: string): string {
    // Simple hash for demonstration - in production use crypto.subtle.digest
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  /**
   * Get contact statistics (for admin dashboard)
   */
  static async getContactStatistics(): Promise<ContactServiceResult> {
    try {
      // This would typically query a database or analytics service
      const stats = {
        totalSubmissions: 0,
        submissionsToday: 0,
        averageResponseTime: '24 hours',
        topInquiryTypes: []
      };

      return {
        success: true,
        message: "Statistics retrieved successfully",
        data: stats
      };

    } catch (error: any) {
      return {
        success: false,
        message: "Failed to retrieve contact statistics",
        error: error.message
      };
    }
  }
}