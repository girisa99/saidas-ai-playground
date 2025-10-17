/**
 * Testing utilities for edge functions
 * Helps verify functionality after security updates
 */

export interface TestResult {
  endpoint: string;
  passed: boolean;
  error?: string;
  responseTime?: number;
}

export async function testEndpoint(
  url: string,
  method: string,
  body?: any,
  headers?: Record<string, string>
): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      endpoint: url,
      passed: response.ok,
      responseTime,
      error: response.ok ? undefined : `HTTP ${response.status}: ${await response.text()}`
    };
  } catch (error) {
    return {
      endpoint: url,
      passed: false,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export const TEST_CASES = {
  'ai-universal-processor': {
    method: 'POST',
    body: {
      provider: 'gemini',
      model: 'gemini-2.0-flash-exp',
      prompt: 'Test query',
      systemPrompt: 'You are a helpful assistant'
    }
  },
  'send-contact-email': {
    method: 'POST',
    body: {
      senderName: 'Test User',
      senderEmail: 'test@example.com',
      message: 'Test message',
      subject: 'Test Subject'
    }
  },
  'newsletter-subscribe': {
    method: 'POST',
    body: {
      email: 'test@example.com',
      name: 'Test User'
    }
  }
};
