/**
 * Authentication Service - Business Logic Layer
 * Handles all authentication flows and business rules
 */

import { supabase } from "@/integrations/supabase/client";
import { AuthEmailService } from "@/lib/auth-email";
import { authSchema } from "@/lib/validation";
import { z } from "zod";

export type AuthCredentials = z.infer<typeof authSchema>;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  emailConfirmed: boolean;
  lastSignIn?: string;
}

export interface AuthServiceResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  requiresEmailConfirmation?: boolean;
}

export interface SignUpOptions {
  email: string;
  password: string;
  fullName?: string;
  redirectTo?: string;
  metaData?: Record<string, any>;
}

export interface SignInOptions {
  email: string;
  password: string;
}

export interface PasswordResetOptions {
  email: string;
  redirectTo?: string;
}

export class AuthService {
  /**
   * Sign up a new user with comprehensive validation and error handling
   */
  static async signUp(options: SignUpOptions): Promise<AuthServiceResult<AuthUser>> {
    try {
      // 1. Validate input data
      const validatedData = authSchema.parse({
        email: options.email,
        password: options.password
      });

      // 2. Additional business validations
      if (await this.isEmailBlacklisted(validatedData.email)) {
        return {
          success: false,
          message: "This email domain is not allowed for registration",
          error: "BLACKLISTED_EMAIL"
        };
      }

      // 3. Check if user already exists
      const existingUser = await this.checkUserExists(validatedData.email);
      if (existingUser) {
        return {
          success: false,
          message: "An account with this email already exists. Please sign in instead.",
          error: "USER_EXISTS"
        };
      }

      // 4. Create account via Supabase
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: options.redirectTo || `${window.location.origin}/`,
          data: {
            full_name: options.fullName || '',
            source: 'saidas-ai-playground',
            ...options.metaData
          }
        }
      });

      if (error) {
        return this.handleAuthError(error);
      }

      // 5. Handle successful registration
      if (data.user) {
        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name: options.fullName,
          emailConfirmed: !!data.user.email_confirmed_at
        };

        // 6. Send welcome email (if not auto-confirmed)
        if (!data.user.email_confirmed_at) {
          try {
            await AuthEmailService.sendEmailConfirmation(
              validatedData.email,
              options.redirectTo || `${window.location.origin}/auth/confirm`,
              {
                user_name: options.fullName || validatedData.email,
                app_name: "Saidas AI Playground"
              }
            );
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail registration for email issues
          }

          return {
            success: true,
            message: "Account created! Please check your email and click the confirmation link.",
            data: authUser,
            requiresEmailConfirmation: true
          };
        }

        return {
          success: true,
          message: "Account created and confirmed successfully!",
          data: authUser
        };
      }

      return {
        success: false,
        message: "Registration failed. Please try again.",
        error: "REGISTRATION_FAILED"
      };

    } catch (error: any) {
      console.error('AuthService.signUp:', error);
      
      if (error.name === 'ZodError') {
        return {
          success: false,
          message: "Please check your email and password requirements.",
          error: "VALIDATION_ERROR"
        };
      }

      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
        error: "SIGNUP_ERROR"
      };
    }
  }

  /**
   * Sign in existing user
   */
  static async signIn(options: SignInOptions): Promise<AuthServiceResult<AuthUser>> {
    try {
      // 1. Validate input
      const validatedData = authSchema.parse(options);

      // 2. Rate limiting check
      if (!this.checkSignInRateLimit(validatedData.email)) {
        return {
          success: false,
          message: "Too many sign-in attempts. Please wait 15 minutes before trying again.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 3. Attempt sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        // Track failed attempt for rate limiting
        this.recordFailedSignIn(validatedData.email);
        return this.handleAuthError(error);
      }

      // 4. Clear rate limiting on successful sign in
      this.clearSignInAttempts(validatedData.email);

      if (data.user) {
        const authUser: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name,
          emailConfirmed: !!data.user.email_confirmed_at,
          lastSignIn: data.user.last_sign_in_at
        };

        return {
          success: true,
          message: "Successfully signed in!",
          data: authUser
        };
      }

      return {
        success: false,
        message: "Sign in failed. Please try again.",
        error: "SIGNIN_FAILED"
      };

    } catch (error: any) {
      console.error('AuthService.signIn:', error);
      
      if (error.name === 'ZodError') {
        return {
          success: false,
          message: "Please check your email and password.",
          error: "VALIDATION_ERROR"
        };
      }

      return {
        success: false,
        message: error.message || "Sign in failed. Please try again.",
        error: "SIGNIN_ERROR"
      };
    }
  }

  /**
   * Send magic link for passwordless authentication
   */
  static async sendMagicLink(email: string, redirectTo?: string): Promise<AuthServiceResult> {
    try {
      // 1. Validate email
      const { email: validatedEmail } = authSchema.pick({ email: true }).parse({ email });

      // 2. Rate limiting
      if (!this.checkMagicLinkRateLimit(validatedEmail)) {
        return {
          success: false,
          message: "Magic link already sent. Please wait 5 minutes before requesting another.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 3. Send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email: validatedEmail,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/`,
        }
      });

      if (error) {
        return this.handleAuthError(error);
      }

      // 4. Record magic link sent for rate limiting
      this.recordMagicLinkSent(validatedEmail);

      // 5. Send custom magic link email
      try {
        await AuthEmailService.sendMagicLink(
          validatedEmail,
          redirectTo || `${window.location.origin}/auth/callback`,
          {
            user_name: validatedEmail,
            app_name: "Saidas AI Playground"
          }
        );
      } catch (emailError) {
        console.error('Failed to send custom magic link email:', emailError);
      }

      return {
        success: true,
        message: "Magic link sent! Please check your email."
      };

    } catch (error: any) {
      console.error('AuthService.sendMagicLink:', error);
      return {
        success: false,
        message: error.message || "Failed to send magic link",
        error: "MAGIC_LINK_ERROR"
      };
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(options: PasswordResetOptions): Promise<AuthServiceResult> {
    try {
      // 1. Validate email
      const { email: validatedEmail } = authSchema.pick({ email: true }).parse(options);

      // 2. Rate limiting
      if (!this.checkPasswordResetRateLimit(validatedEmail)) {
        return {
          success: false,
          message: "Password reset email already sent. Please wait 10 minutes before requesting another.",
          error: "RATE_LIMIT_EXCEEDED"
        };
      }

      // 3. Send reset email
      const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail, {
        redirectTo: options.redirectTo || `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return this.handleAuthError(error);
      }

      // 4. Record reset email sent
      this.recordPasswordResetSent(validatedEmail);

      // 5. Send custom reset email
      try {
        await AuthEmailService.sendPasswordResetEmail(
          validatedEmail,
          options.redirectTo || `${window.location.origin}/auth/reset-password`,
          {
            user_name: validatedEmail,
            app_name: "Saidas AI Playground"
          }
        );
      } catch (emailError) {
        console.error('Failed to send custom reset email:', emailError);
      }

      return {
        success: true,
        message: "Password reset email sent! Please check your inbox."
      };

    } catch (error: any) {
      console.error('AuthService.resetPassword:', error);
      return {
        success: false,
        message: error.message || "Failed to send password reset email",
        error: "PASSWORD_RESET_ERROR"
      };
    }
  }

  /**
   * Sign out user
   */
  static async signOut(): Promise<AuthServiceResult> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return this.handleAuthError(error);
      }

      return {
        success: true,
        message: "Successfully signed out"
      };

    } catch (error: any) {
      console.error('AuthService.signOut:', error);
      return {
        success: false,
        message: "Failed to sign out",
        error: "SIGNOUT_ERROR"
      };
    }
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<AuthServiceResult<AuthUser | null>> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return {
          success: true,
          message: "No authenticated user",
          data: null
        };
      }

      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.full_name,
        emailConfirmed: !!session.user.email_confirmed_at,
        lastSignIn: session.user.last_sign_in_at
      };

      return {
        success: true,
        message: "Current user retrieved",
        data: authUser
      };

    } catch (error: any) {
      console.error('AuthService.getCurrentUser:', error);
      return {
        success: false,
        message: "Failed to get current user",
        error: "GET_USER_ERROR"
      };
    }
  }

  // Private helper methods
  private static async checkUserExists(email: string): Promise<boolean> {
    try {
      // This would typically check against your user profiles table
      const { data } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();
      
      return !!data;
    } catch {
      return false;
    }
  }

  private static async isEmailBlacklisted(email: string): Promise<boolean> {
    // Business rule: Block certain domains
    const blacklistedDomains = ['tempmail.org', '10minutemail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return blacklistedDomains.includes(domain);
  }

  private static handleAuthError(error: any): AuthServiceResult {
    if (error.message.includes('Invalid login credentials')) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
        error: "INVALID_CREDENTIALS"
      };
    }
    
    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        message: "Please check your email and click the confirmation link before signing in.",
        error: "EMAIL_NOT_CONFIRMED"
      };
    }
    
    if (error.message.includes('User already registered')) {
      return {
        success: false,
        message: "An account with this email already exists. Please sign in instead.",
        error: "USER_EXISTS"
      };
    }

    return {
      success: false,
      message: error.message || "Authentication failed",
      error: "AUTH_ERROR"
    };
  }

  // Rate limiting implementation
  private static signInAttempts = new Map<string, number[]>();
  private static magicLinkSent = new Map<string, number>();
  private static passwordResetSent = new Map<string, number>();

  private static checkSignInRateLimit(email: string): boolean {
    const now = Date.now();
    const attempts = this.signInAttempts.get(email) || [];
    const recentAttempts = attempts.filter(time => now - time < 900000); // 15 minutes
    return recentAttempts.length < 5; // Max 5 attempts per 15 minutes
  }

  private static recordFailedSignIn(email: string): void {
    const attempts = this.signInAttempts.get(email) || [];
    attempts.push(Date.now());
    this.signInAttempts.set(email, attempts);
  }

  private static clearSignInAttempts(email: string): void {
    this.signInAttempts.delete(email);
  }

  private static checkMagicLinkRateLimit(email: string): boolean {
    const lastSent = this.magicLinkSent.get(email);
    return !lastSent || Date.now() - lastSent > 300000; // 5 minutes
  }

  private static recordMagicLinkSent(email: string): void {
    this.magicLinkSent.set(email, Date.now());
  }

  private static checkPasswordResetRateLimit(email: string): boolean {
    const lastSent = this.passwordResetSent.get(email);
    return !lastSent || Date.now() - lastSent > 600000; // 10 minutes
  }

  private static recordPasswordResetSent(email: string): void {
    this.passwordResetSent.set(email, Date.now());
  }
}