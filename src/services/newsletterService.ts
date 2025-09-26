/**
 * Newsletter Service - Public Frontend Only
 * Handles email subscriptions without authentication
 */

import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  interests: z.array(z.string()).optional()
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export interface NewsletterServiceResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export class NewsletterService {
  /**
   * Subscribe to newsletter - Public endpoint
   */
  static async subscribe(data: NewsletterData): Promise<NewsletterServiceResult> {
    try {
      // 1. Validate input
      const validatedData = newsletterSchema.parse(data);
      
      // 2. Sanitize email
      const sanitizedData = {
        ...validatedData,
        email: validatedData.email.toLowerCase().trim(),
        firstName: validatedData.firstName?.trim(),
        lastName: validatedData.lastName?.trim()
      };

      // 3. Rate limiting for subscriptions
      const rateLimitKey = `newsletter:${sanitizedData.email}`;
      if (!this.checkSubscriptionRateLimit(rateLimitKey)) {
        return {
          success: false,
          message: "Please wait a moment before subscribing again.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 4. Submit subscription via public edge function
      const { data: result, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: {
          ...sanitizedData,
          source: 'saidas-ai-playground-frontend',
          subscriptionDate: new Date().toISOString()
        }
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Successfully subscribed! Please check your email for confirmation.",
        data: result
      };

    } catch (error: any) {
      console.error('NewsletterService.subscribe:', error);
      
      if (error.name === 'ZodError') {
        return {
          success: false,
          message: "Please enter a valid email address.",
          error: "VALIDATION_ERROR"
        };
      }

      return {
        success: false,
        message: error.message || "Failed to subscribe. Please try again.",
        error: "SUBSCRIPTION_ERROR"
      };
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  static async unsubscribe(email: string, token?: string): Promise<NewsletterServiceResult> {
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-unsubscribe', {
        body: {
          email: email.toLowerCase().trim(),
          token,
          source: 'saidas-ai-playground-frontend'
        }
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Successfully unsubscribed from newsletter.",
        data
      };

    } catch (error: any) {
      console.error('NewsletterService.unsubscribe:', error);
      return {
        success: false,
        message: "Failed to unsubscribe. Please try again.",
        error: "UNSUBSCRIBE_ERROR"
      };
    }
  }

  /**
   * Get newsletter stats (public information)
   */
  static async getPublicStats(): Promise<NewsletterServiceResult> {
    try {
      const { data, error } = await supabase.functions.invoke('get-newsletter-stats', {
        body: {
          public: true,
          source: 'saidas-ai-playground-frontend'
        }
      });

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: "Newsletter stats retrieved",
        data
      };

    } catch (error: any) {
      console.error('NewsletterService.getPublicStats:', error);
      return {
        success: false,
        message: "Failed to retrieve newsletter stats",
        error: "STATS_ERROR"
      };
    }
  }

  /**
   * Rate limiting for newsletter subscriptions
   */
  private static subscriptionRateLimit = new Map<string, number>();

  private static checkSubscriptionRateLimit(key: string): boolean {
    const now = Date.now();
    const lastSubscription = this.subscriptionRateLimit.get(key);
    
    // Allow subscription if no previous attempt or > 1 minute ago
    if (!lastSubscription || now - lastSubscription > 60000) {
      this.subscriptionRateLimit.set(key, now);
      return true;
    }
    
    return false;
  }
}