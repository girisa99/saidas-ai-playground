import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Contact form validation schema
export const ContactEmailSchema = z.object({
  senderName: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  
  senderEmail: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  
  subject: z.string()
    .trim()
    .max(200, "Subject must be less than 200 characters")
    .optional(),
  
  message: z.string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
  
  phoneNumber: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format")
    .optional()
    .or(z.literal('')),
  
  companyName: z.string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .optional()
});

// Newsletter subscription validation schema
export const NewsletterSubscribeSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  
  name: z.string()
    .trim()
    .max(100, "Name must be less than 100 characters")
    .optional(),
  
  source: z.string()
    .max(100, "Source must be less than 100 characters")
    .optional(),
  
  preferences: z.object({
    weeklyUpdates: z.boolean().optional(),
    monthlyNewsletter: z.boolean().optional(),
    productNews: z.boolean().optional()
  }).optional()
});

// Medical image analysis validation schema
export const MedicalImageAnalysisSchema = z.object({
  imageData: z.string()
    .min(1, "Image data is required")
    .regex(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/, "Invalid image format"),
  
  modality: z.string()
    .max(50, "Modality must be less than 50 characters")
    .optional(),
  
  bodyPart: z.string()
    .max(100, "Body part must be less than 100 characters")
    .optional(),
  
  clinicalContext: z.string()
    .max(1000, "Clinical context must be less than 1000 characters")
    .optional(),
  
  userEmail: z.string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .optional(),
  
  sessionId: z.string()
    .max(200, "Session ID too long")
    .optional(),
  
  aiModel: z.enum(['openai', 'claude', 'gemini'])
  .optional()
  .default('gemini')
});

// AI processor validation schema (Direct API calls only)
export const AIRequestSchema = z.object({
  provider: z.enum(['openai', 'claude', 'gemini']),

  model: z.string()
    .min(1, "Model is required")
    .max(100, "Model name too long"),

  prompt: z.string()
    .min(1, "Prompt is required")
    .max(10000, "Prompt must be less than 10000 characters"),

  systemPrompt: z.string()
    .max(5000, "System prompt must be less than 5000 characters")
    .optional(),

  temperature: z.number()
    .min(0, "Temperature must be at least 0")
    .max(2, "Temperature must be at most 2")
    .optional(),

  maxTokens: z.number()
    .int("Max tokens must be an integer")
    .min(1, "Max tokens must be at least 1")
    .max(32000, "Max tokens must be at most 32000")
    .optional(),

  // Context & multimodal
  context: z.string().max(200).optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  images: z.array(z.string()).optional(),

  // Feature toggles
  useRAG: z.boolean().optional(),
  knowledgeBase: z.boolean().optional(),
  useMCP: z.boolean().optional(),
  mcpServers: z.array(z.string()).optional(),
  enableSmartRouting: z.boolean().optional(),
  enableMultiAgent: z.boolean().optional(),

  // Conversation continuity
  conversationHistory: z.array(z.object({
    role: z.string(),
    content: z.string()
  })).optional(),

  // Integrations
  labelStudioProject: z.string().optional(),

  // Backward compatibility fields (ignored by processor but allowed)
  useVision: z.boolean().optional(),
  enableRAG: z.boolean().optional(),
  ragContext: z.string().optional(),
  mcpContext: z.boolean().optional(),
}).passthrough();

// HTML sanitization function
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Text sanitization (remove dangerous characters but preserve normal text)
export function sanitizeText(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Validation error response helper
export function createValidationErrorResponse(error: z.ZodError, corsHeaders: Record<string, string>) {
  return new Response(
    JSON.stringify({
      error: 'Validation failed',
      issues: error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    }
  );
}
