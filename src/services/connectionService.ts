/**
 * Connection Service - Bridge to Main Application
 * Handles connection/redirect to the main authenticated application
 */

export interface ConnectionConfig {
  mainAppUrl: string;
  authEndpoint: string;
  redirectParams?: Record<string, string>;
}

export interface ConnectionServiceResult {
  success: boolean;
  message: string;
  redirectUrl?: string;
  error?: string;
}

export class ConnectionService {
  private static defaultConfig: ConnectionConfig = {
    mainAppUrl: process.env.REACT_APP_MAIN_APP_URL || 'https://your-main-app.com',
    authEndpoint: '/auth/connect',
    redirectParams: {
      source: 'saidas-ai-playground',
      return_to: window.location.href
    }
  };

  /**
   * Connect to main application
   * This redirects users to the authenticated app
   */
  static async connectToMainApp(options?: {
    redirectTo?: string;
    userContext?: Record<string, any>;
    config?: Partial<ConnectionConfig>;
  }): Promise<ConnectionServiceResult> {
    try {
      const config = { ...this.defaultConfig, ...options?.config };
      
      // Build redirect URL with parameters
      const redirectUrl = this.buildRedirectUrl({
        baseUrl: config.mainAppUrl,
        endpoint: config.authEndpoint,
        params: {
          ...config.redirectParams,
          redirect_to: options?.redirectTo || window.location.href,
          timestamp: new Date().toISOString(),
          ...(options?.userContext && { context: JSON.stringify(options.userContext) })
        }
      });

      // Track connection attempt
      this.trackConnectionAttempt({
        source: 'saidas-ai-playground',
        destination: config.mainAppUrl,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });

      return {
        success: true,
        message: "Redirecting to main application...",
        redirectUrl
      };

    } catch (error: any) {
      console.error('ConnectionService.connectToMainApp:', error);
      return {
        success: false,
        message: "Failed to connect to main application",
        error: "CONNECTION_ERROR"
      };
    }
  }

  /**
   * Check if connection to main app is available
   */
  static async checkMainAppStatus(config?: Partial<ConnectionConfig>): Promise<ConnectionServiceResult> {
    try {
      const appConfig = { ...this.defaultConfig, ...config };
      
      // Simple health check
      const response = await fetch(`${appConfig.mainAppUrl}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return {
          success: true,
          message: "Main application is available"
        };
      } else {
        throw new Error(`Main app returned status: ${response.status}`);
      }

    } catch (error: any) {
      console.error('ConnectionService.checkMainAppStatus:', error);
      return {
        success: false,
        message: "Main application is currently unavailable",
        error: "MAIN_APP_UNAVAILABLE"
      };
    }
  }

  /**
   * Handle return from main application
   */
  static handleReturnFromMainApp(params: URLSearchParams): ConnectionServiceResult {
    try {
      const status = params.get('status');
      const token = params.get('token');
      const error = params.get('error');

      if (error) {
        return {
          success: false,
          message: "Connection to main app failed",
          error: error
        };
      }

      if (status === 'connected' && token) {
        // Validate token format before storing
        if (typeof token === 'string' && token.length > 0 && token.length < 500) {
          // Store connection token temporarily with expiration
          const tokenData = {
            token: token,
            expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour expiration
          };
          sessionStorage.setItem('main_app_connection_token', JSON.stringify(tokenData));
        }
        
        return {
          success: true,
          message: "Successfully connected to main application"
        };
      }

      return {
        success: false,
        message: "Invalid return parameters from main application",
        error: "INVALID_RETURN"
      };

    } catch (error: any) {
      console.error('ConnectionService.handleReturnFromMainApp:', error);
      return {
        success: false,
        message: "Failed to process return from main application",
        error: "RETURN_PROCESSING_ERROR"
      };
    }
  }

  /**
   * Build redirect URL with parameters
   */
  private static buildRedirectUrl(options: {
    baseUrl: string;
    endpoint: string;
    params: Record<string, string>;
  }): string {
    const url = new URL(options.endpoint, options.baseUrl);
    
    Object.entries(options.params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  /**
   * Track connection attempts for analytics
   */
  private static trackConnectionAttempt(data: {
    source: string;
    destination: string;
    timestamp: string;
    userAgent: string;
  }): void {
    try {
      // Log connection attempt
      console.log('[CONNECTION_TRACKING]', data);
      
      // Could send to analytics service
      // analytics.track('main_app_connection_attempt', data);
      
    } catch (error) {
      console.error('Failed to track connection attempt:', error);
    }
  }

  /**
   * Clear any stored connection data
   */
  static clearConnectionData(): void {
    try {
      sessionStorage.removeItem('main_app_connection_token');
      localStorage.removeItem('main_app_connection_preference');
    } catch (error) {
      console.error('Failed to clear connection data:', error);
    }
  }

  /**
   * Get stored connection token with expiration check
   */
  static getConnectionToken(): string | null {
    try {
      const tokenDataStr = sessionStorage.getItem('main_app_connection_token');
      if (!tokenDataStr) return null;

      const tokenData = JSON.parse(tokenDataStr);
      const expiresAt = new Date(tokenData.expiresAt);
      
      // Check if token has expired
      if (expiresAt < new Date()) {
        this.clearConnectionData();
        return null;
      }

      return tokenData.token;
    } catch (error) {
      console.error('Failed to get connection token:', error);
      return null;
    }
  }
}