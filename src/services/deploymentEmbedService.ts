import { supabase } from '@/integrations/supabase/client';
import { GenieDeployment } from './deploymentService';

export interface EmbedCodeOptions {
  deploymentId: string;
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  showBranding?: boolean;
}

/**
 * Generate embeddable script for a deployment
 */
export function generateEmbedCode(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const baseUrl = window.location.origin;
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  
  const config = {
    deploymentId: deployment.id,
    deploymentName: deployment.name,
    theme: options.theme || 'auto',
    position: options.position || 'bottom-right',
    primaryColor: options.primaryColor || '#3b82f6',
    showBranding: options.showBranding !== false,
    apiUrl: `${apiUrl}/functions/v1/deployment-chat`,
  };

  return `<!-- Genie AI Chat Widget -->
<script>
  (function() {
    window.GenieConfig = ${JSON.stringify(config, null, 2)};
    
    var script = document.createElement('script');
    script.src = '${baseUrl}/genie-embed.min.js';
    script.async = true;
    document.head.appendChild(script);
    
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '${baseUrl}/genie-embed.css';
    document.head.appendChild(styles);
  })();
</script>
<!-- End Genie AI Chat Widget -->`;
}

/**
 * Generate React component code for a deployment
 */
export function generateReactComponent(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  
  return `import React from 'react';
import { GenieChat } from '@genie-ai/react';
import '@genie-ai/react/dist/styles.css';

export function GenieAIChat() {
  return (
    <GenieChat
      deploymentId="${deployment.id}"
      deploymentName="${deployment.name}"
      apiUrl="${apiUrl}/functions/v1/deployment-chat"
      theme="${options.theme || 'auto'}"
      position="${options.position || 'bottom-right'}"
      primaryColor="${options.primaryColor || '#3b82f6'}"
      showBranding={${options.showBranding !== false}}
    />
  );
}`;
}

/**
 * Generate API endpoint documentation for a deployment
 */
export function generateAPIDocumentation(deployment: GenieDeployment): string {
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  
  return `# ${deployment.name} - API Documentation

## Endpoint
\`POST ${apiUrl}/functions/v1/deployment-chat\`

## Authentication
Include your deployment API key in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_DEPLOYMENT_API_KEY
\`\`\`

## Request Body
\`\`\`json
{
  "deploymentId": "${deployment.id}",
  "message": "User message here",
  "conversationId": "optional-conversation-id",
  "sessionId": "optional-session-id"
}
\`\`\`

## Response
\`\`\`json
{
  "response": "AI response text",
  "conversationId": "conversation-id",
  "model": "model-used",
  "confidence": 0.95,
  "tokensUsed": 150
}
\`\`\`

## Rate Limits
- 10 requests per minute per IP
- 100 requests per hour per session
- Contact support for increased limits

## Configuration
This deployment uses the following configuration:
- Version: v${deployment.version}
- Status: ${deployment.deployment_status}
${deployment.description ? `- Description: ${deployment.description}` : ''}`;
}

/**
 * Generate deployment API key
 */
export async function generateDeploymentAPIKey(deploymentId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('genie_deployments')
      .select('api_key')
      .eq('id', deploymentId)
      .single();
    
    if (error) throw error;
    
    // If no API key exists, generate one
    if (!data.api_key) {
      const apiKey = `genie_${deploymentId.substring(0, 8)}_${crypto.randomUUID()}`;
      
      const { error: updateError } = await supabase
        .from('genie_deployments')
        .update({ api_key: apiKey })
        .eq('id', deploymentId);
      
      if (updateError) throw updateError;
      
      return apiKey;
    }
    
    return data.api_key;
  } catch (error) {
    console.error('Error generating API key:', error);
    return null;
  }
}

/**
 * Copy to clipboard utility
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}
