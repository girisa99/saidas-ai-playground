/**
 * Secure logging utility that prevents sensitive data exposure in production
 * Only logs to console in development environment
 */

const isDevelopment = import.meta.env.DEV;

// Sensitive data patterns to redact
const SENSITIVE_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  uuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
  token: /[A-Za-z0-9_-]{20,}/g,
  conversationId: /genie_\d+_[a-z0-9]+/g,
};

/**
 * Redacts sensitive information from log messages
 */
function redactSensitiveData(data: any): any {
  if (typeof data === 'string') {
    let redacted = data;
    redacted = redacted.replace(SENSITIVE_PATTERNS.email, '[EMAIL_REDACTED]');
    redacted = redacted.replace(SENSITIVE_PATTERNS.uuid, '[UUID_REDACTED]');
    redacted = redacted.replace(SENSITIVE_PATTERNS.conversationId, '[CONVERSATION_ID_REDACTED]');
    return redacted;
  }
  
  if (typeof data === 'object' && data !== null) {
    const redacted: any = Array.isArray(data) ? [] : {};
    for (const key in data) {
      if (key.toLowerCase().includes('email') || 
          key.toLowerCase().includes('password') ||
          key.toLowerCase().includes('token') ||
          key.toLowerCase().includes('secret') ||
          key.toLowerCase().includes('api')) {
        redacted[key] = '[REDACTED]';
      } else {
        redacted[key] = redactSensitiveData(data[key]);
      }
    }
    return redacted;
  }
  
  return data;
}

/**
 * Secure logger that only outputs in development
 * and redacts sensitive data in production
 */
export const secureLog = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    } else {
      // In production, log warnings but redact sensitive data
      console.warn(...args.map(redactSensitiveData));
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors but redact sensitive data in production
    if (isDevelopment) {
      console.error(...args);
    } else {
      console.error(...args.map(redactSensitiveData));
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  }
};

/**
 * For critical production monitoring (use sparingly)
 */
export const productionLog = {
  critical: (message: string, metadata?: Record<string, any>) => {
    console.error('[CRITICAL]', message, metadata ? redactSensitiveData(metadata) : '');
  }
};
