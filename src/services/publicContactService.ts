/**
 * Simplified Contact Service - Public Frontend Only
 * No authentication required - pure contact form functionality
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
   * Submit contact form - Public endpoint, no auth required
   */
  static async submitContactForm(formData: ContactFormData): Promise<ContactServiceResult> {
    try {
      // 1. Validate input data
      const validatedData = contactFormSchema.parse(formData);
      
      // 2. Sanitize inputs
      const sanitizedData = {
        ...validatedData,
        name: validatedData.name.trim(),
        email: validatedData.email.toLowerCase().trim(),
        message: validatedData.message.trim(),
        subject: validatedData.subject.trim()
      };

      // 3. Rate limiting for public contact form
      const rateLimitKey = `contact:${sanitizedData.email}`;
      if (!this.checkRateLimit(rateLimitKey)) {
        return {
          success: false,
          message: "Too many contact attempts. Please wait before submitting again.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 4. Submit via public edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          contactMethod: 'Public Website Contact Form',
          timestamp: new Date().toISOString(),
          source: 'saidas-ai-playground-frontend'
        }
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Thank you for your enquiry. We'll get back to you within 24-48 hours.",
        data
      };

    } catch (error: any) {
      console.error('ContactService.submitContactForm:', error);
      
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
   * Rate limiting for public contact form
   * Rule: Max 3 submissions per hour per email
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
}