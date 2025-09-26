import { z } from 'zod';

// Input validation schemas for security
export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  
  company: z.string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .optional(),
  
  phone: z.string()
    .trim()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format")
    .optional(),
  
  subject: z.string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  
  message: z.string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters")
});

export const authSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           "Password must contain: uppercase, lowercase, number, and special character")
});

export const agentSessionSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Agent name is required")
    .max(100, "Agent name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Agent name contains invalid characters"),
  
  description: z.string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  
  agent_purpose: z.string()
    .trim()
    .max(500, "Purpose must be less than 500 characters")
    .optional()
});

// Sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsed.toString();
  } catch {
    return '';
  }
};

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Filter out old requests
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};