/**
 * Shared Security Policies and Standards
 * 
 * This module defines security policies that should be consistent
 * across both frontend and backend repositories.
 */

export interface SecurityPolicy {
  name: string;
  description: string;
  rules: SecurityRule[];
  compliance: ComplianceFramework[];
}

export interface SecurityRule {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  implementation: string;
  validation: string;
}

export interface ComplianceFramework {
  name: string;
  section: string;
  requirement: string;
}

/**
 * Shared security policies for multi-repository architecture
 */
export const SHARED_SECURITY_POLICIES: Record<string, SecurityPolicy> = {
  inputValidation: {
    name: 'Input Validation Policy',
    description: 'All user inputs must be validated and sanitized',
    rules: [
      {
        id: 'IV001',
        severity: 'critical',
        description: 'All user inputs must be validated using Zod schemas',
        implementation: 'Use validation schemas in src/lib/validation.ts',
        validation: 'Check for Zod schema usage in forms and API endpoints'
      },
      {
        id: 'IV002',
        severity: 'high',
        description: 'SQL injection prevention through parameterized queries',
        implementation: 'Use Supabase client methods, never raw SQL',
        validation: 'Scan for raw SQL usage in codebase'
      },
      {
        id: 'IV003',
        severity: 'high',
        description: 'XSS prevention through output encoding',
        implementation: 'Sanitize all dynamic content, avoid dangerouslySetInnerHTML',
        validation: 'Check for unsafe HTML rendering'
      }
    ],
    compliance: [
      {
        name: '21 CFR Part 11',
        section: '11.10(a)',
        requirement: 'System validation and data integrity'
      },
      {
        name: 'HIPAA',
        section: '164.312(a)(1)',
        requirement: 'Access control'
      }
    ]
  },

  authentication: {
    name: 'Authentication & Authorization Policy',
    description: 'Secure user authentication and role-based access control',
    rules: [
      {
        id: 'AA001',
        severity: 'critical',
        description: 'Multi-factor authentication for admin accounts',
        implementation: 'Configure MFA in Supabase Auth settings',
        validation: 'Verify MFA enforcement for admin roles'
      },
      {
        id: 'AA002',
        severity: 'high',
        description: 'Session timeout and management',
        implementation: 'Configure session timeout in Supabase',
        validation: 'Test automatic session expiration'
      },
      {
        id: 'AA003',
        severity: 'high',
        description: 'Role-based access control (RBAC)',
        implementation: 'Use RLS policies for data access control',
        validation: 'Audit RLS policies for all tables'
      }
    ],
    compliance: [
      {
        name: 'HIPAA',
        section: '164.312(a)(2)(i)',
        requirement: 'Unique user identification'
      },
      {
        name: 'SOX',
        section: '404',
        requirement: 'Access controls for financial data'
      }
    ]
  },

  dataProtection: {
    name: 'Data Protection Policy',
    description: 'Encryption and data handling standards',
    rules: [
      {
        id: 'DP001',
        severity: 'critical',
        description: 'Encryption at rest for sensitive data',
        implementation: 'Enable database encryption in Supabase',
        validation: 'Verify encryption status for all tables'
      },
      {
        id: 'DP002',
        severity: 'critical',
        description: 'Encryption in transit using TLS 1.3',
        implementation: 'Configure HTTPS with security headers',
        validation: 'Test SSL/TLS configuration'
      },
      {
        id: 'DP003',
        severity: 'high',
        description: 'Personal data anonymization and pseudonymization',
        implementation: 'Use hashing for PII in logs and analytics',
        validation: 'Audit logs for PII exposure'
      }
    ],
    compliance: [
      {
        name: 'GDPR',
        section: 'Article 32',
        requirement: 'Security of processing'
      },
      {
        name: 'HIPAA',
        section: '164.312(a)(2)(iv)',
        requirement: 'Encryption and decryption'
      }
    ]
  },

  auditLogging: {
    name: 'Audit Logging Policy',
    description: 'Comprehensive audit trail for all system activities',
    rules: [
      {
        id: 'AL001',
        severity: 'critical',
        description: 'Log all authentication events',
        implementation: 'Use Supabase auth hooks for logging',
        validation: 'Verify auth event logging completeness'
      },
      {
        id: 'AL002',
        severity: 'high',
        description: 'Log all data access and modifications',
        implementation: 'Use database triggers for audit logging',
        validation: 'Test audit trail completeness'
      },
      {
        id: 'AL003',
        severity: 'medium',
        description: 'Log retention for compliance periods',
        implementation: 'Configure log retention policies',
        validation: 'Verify log retention configuration'
      }
    ],
    compliance: [
      {
        name: '21 CFR Part 11',
        section: '11.10(e)',
        requirement: 'Use of secure, computer-generated, time-stamped audit trails'
      },
      {
        name: 'HIPAA',
        section: '164.312(b)',
        requirement: 'Audit controls'
      }
    ]
  }
};

/**
 * Security validation functions that can be shared across repositories
 */
export class SecurityValidator {
  static validateSecurityHeaders(headers: Record<string, string>): SecurityValidationResult {
    const required = [
      'Content-Security-Policy',
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Strict-Transport-Security'
    ];

    const missing = required.filter(header => !headers[header]);
    
    return {
      isValid: missing.length === 0,
      issues: missing.map(header => ({
        severity: 'high' as const,
        message: `Missing security header: ${header}`,
        policy: 'dataProtection',
        rule: 'DP002'
      }))
    };
  }

  static validateInputSchema(schema: any, data: any): SecurityValidationResult {
    try {
      schema.parse(data);
      return { isValid: true, issues: [] };
    } catch (error: any) {
      return {
        isValid: false,
        issues: [{
          severity: 'high' as const,
          message: `Input validation failed: ${error.message}`,
          policy: 'inputValidation',
          rule: 'IV001'
        }]
      };
    }
  }

  static validateRLSPolicies(table: string, policies: any[]): SecurityValidationResult {
    if (policies.length === 0) {
      return {
        isValid: false,
        issues: [{
          severity: 'critical' as const,
          message: `Table ${table} has no RLS policies`,
          policy: 'authentication',
          rule: 'AA003'
        }]
      };
    }

    return { isValid: true, issues: [] };
  }
}

export interface SecurityValidationResult {
  isValid: boolean;
  issues: SecurityIssue[];
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  policy: string;
  rule: string;
}

/**
 * Compliance reporting utilities
 */
export class ComplianceReporter {
  static generateComplianceReport(policies: SecurityPolicy[]): ComplianceReport {
    const frameworks = new Map<string, ComplianceFramework[]>();
    
    policies.forEach(policy => {
      policy.compliance.forEach(compliance => {
        if (!frameworks.has(compliance.name)) {
          frameworks.set(compliance.name, []);
        }
        frameworks.get(compliance.name)!.push(compliance);
      });
    });

    return {
      generatedAt: new Date(),
      frameworks: Object.fromEntries(frameworks),
      policiesCovered: policies.length,
      totalRules: policies.reduce((sum, policy) => sum + policy.rules.length, 0)
    };
  }
}

export interface ComplianceReport {
  generatedAt: Date;
  frameworks: Record<string, ComplianceFramework[]>;
  policiesCovered: number;
  totalRules: number;
}