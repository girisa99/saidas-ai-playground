import { supabase } from '@/integrations/supabase/client';
import { GenieDeployment } from './deploymentService';

export interface EmbedCodeOptions {
  deploymentId: string;
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  showBranding?: boolean;
  width?: string;
  height?: string;
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
 * Generate iframe embed code
 */
export function generateIframeEmbed(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const baseUrl = window.location.origin;
  const width = options.width || '400px';
  const height = options.height || '600px';
  const theme = options.theme || 'auto';
  
  return `<!-- Genie AI Chat Widget (iframe) -->
<iframe 
  src="${baseUrl}/embed/${deployment.id}?theme=${theme}&branding=${options.showBranding !== false}"
  width="${width}"
  height="${height}"
  frameborder="0"
  allow="microphone"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
  title="Genie AI Chat - ${deployment.name}"
></iframe>
<!-- End Genie AI Chat Widget -->`;
}

/**
 * Generate Web Component embed code
 */
export function generateWebComponentEmbed(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const baseUrl = window.location.origin;
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  
  return `<!-- Genie AI Chat Widget (Web Component) -->
<script type="module" src="${baseUrl}/genie-widget.js"></script>

<genie-chat
  deployment-id="${deployment.id}"
  deployment-name="${deployment.name}"
  api-url="${apiUrl}/functions/v1/deployment-chat"
  theme="${options.theme || 'auto'}"
  position="${options.position || 'bottom-right'}"
  primary-color="${options.primaryColor || '#3b82f6'}"
  ${options.showBranding === false ? 'hide-branding' : ''}
></genie-chat>
<!-- End Genie AI Chat Widget -->`;
}

/**
 * Generate Next.js integration code
 */
export function generateNextJSCode(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  
  return `// Next.js Integration - pages/api/genie-chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const DEPLOYMENT_ID = "${deployment.id}";
const API_URL = "${apiUrl}/functions/v1/deployment-chat";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.GENIE_API_KEY}\`,
      },
      body: JSON.stringify({
        deploymentId: DEPLOYMENT_ID,
        message: req.body.message,
        conversationId: req.body.conversationId,
        sessionId: req.body.sessionId,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Genie chat error:', error);
    return res.status(500).json({ error: 'Failed to process chat' });
  }
}`;
}

/**
 * Generate React component code for a deployment
 */
export function generateReactComponent(deployment: GenieDeployment, options: EmbedCodeOptions): string {
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  const primaryColor = options.primaryColor || '#3b82f6';
  const theme = options.theme || 'auto';
  const position = options.position || 'bottom-right';
  
  return `import React, { useState, useCallback } from 'react';

// Genie AI Chat Component for ${deployment.name}
// Deployment ID: ${deployment.id}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function GenieAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('${apiUrl}/functions/v1/deployment-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
          deploymentId: '${deployment.id}',
          message: userMessage,
          conversationId,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      if (data.conversationId) setConversationId(data.conversationId);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, conversationId]);

  return (
    <div className="genie-chat-widget">
      {/* Header */}
      <div className="genie-header" style={{ backgroundColor: '${primaryColor}' }}>
        <h3>${deployment.name}</h3>
      </div>

      {/* Messages */}
      <div className="genie-messages">
        {messages.map((msg, i) => (
          <div key={i} className={\`message \${msg.role}\`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
      </div>

      {/* Input */}
      <div className="genie-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={isLoading}>Send</button>
      </div>
    </div>
  );
}`;
}

/**
 * Generate API endpoint documentation for a deployment
 */
export function generateAPIDocumentation(deployment: GenieDeployment): string {
  const apiUrl = import.meta.env.VITE_SUPABASE_URL;
  const codeBlock = '```';
  
  return `# ${deployment.name} - API Documentation

## Endpoint
\`POST ${apiUrl}/functions/v1/deployment-chat\`

## Authentication
Include your deployment API key in the Authorization header:
${codeBlock}
Authorization: Bearer YOUR_DEPLOYMENT_API_KEY
${codeBlock}

## Request Body
${codeBlock}json
{
  "deploymentId": "${deployment.id}",
  "message": "User message here",
  "conversationId": "optional-conversation-id",
  "sessionId": "optional-session-id"
}
${codeBlock}

## Response
${codeBlock}json
{
  "response": "AI response text",
  "conversationId": "conversation-id",
  "model": "model-used",
  "confidence": 0.95,
  "tokensUsed": 150
}
${codeBlock}

## cURL Example
${codeBlock}bash
curl -X POST "${apiUrl}/functions/v1/deployment-chat" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "deploymentId": "${deployment.id}",
    "message": "Hello, how can you help me?"
  }'
${codeBlock}

## JavaScript/Fetch Example
${codeBlock}javascript
const response = await fetch('${apiUrl}/functions/v1/deployment-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: JSON.stringify({
    deploymentId: '${deployment.id}',
    message: 'Hello, how can you help me?',
  }),
});

const data = await response.json();
console.log(data.response);
${codeBlock}

## Rate Limits
- 10 requests per minute per IP
- 100 requests per hour per session
- Contact support for increased limits

## Error Codes
| Code | Description |
|------|-------------|
| 400 | Bad request - invalid parameters |
| 401 | Unauthorized - invalid API key |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

## Configuration
- **Deployment ID:** ${deployment.id}
- **Version:** v${deployment.version}
- **Status:** ${deployment.deployment_status}
${deployment.description ? `- **Description:** ${deployment.description}` : ''}`;
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
