// Security headers configuration for production deployment
export const SECURITY_HEADERS = {
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Strict Transport Security (HTTPS only)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://ithspbabhmdntioslfqe.supabase.co wss://ithspbabhmdntioslfqe.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  
  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (removed deprecated features: vr, ambient-light-sensor, battery)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()'
  ].join(', ')
};

// Function to set security headers in Vite
export const configureSecurityHeaders = () => {
  // This would be used in vite.config.ts or deployment configuration
  return SECURITY_HEADERS;
};

// CSP violation reporting
export const handleCSPViolation = (violationEvent: SecurityPolicyViolationEvent) => {
  console.error('CSP Violation:', {
    directive: violationEvent.violatedDirective,
    blockedURI: violationEvent.blockedURI,
    documentURI: violationEvent.documentURI,
    originalPolicy: violationEvent.originalPolicy
  });
  
  // In production, send to monitoring service
  // analytics.track('csp_violation', {...});
};