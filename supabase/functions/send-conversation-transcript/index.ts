import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConversationTranscriptRequest {
  userInfo: {
    firstName: string;
    lastName?: string;
    email: string;
  };
  context: string;
  topic: string;
  aiConfig: any;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  sessionDuration?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const transcriptData: ConversationTranscriptRequest = await req.json();
    console.log('Conversation transcript request:', transcriptData);

    // Validate required fields
    if (!transcriptData.userInfo || !transcriptData.messages || transcriptData.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userInfo and messages are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { userInfo, context, topic, aiConfig, messages, sessionDuration } = transcriptData;

    // Sanitize topic to remove newlines and limit length for email subject
    const cleanTopic = topic.replace(/[\r\n]+/g, ' ').trim().substring(0, 50);

    // Format transcript
    const transcript = messages
      .map((msg, idx) => `${idx + 1}. **${msg.role === 'user' ? 'User' : 'Genie AI'}**: ${msg.content}`)
      .join('\n\n');

    // Create conversation summary
    const conversationStats = {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      assistantMessages: messages.filter(m => m.role === 'assistant').length,
      firstMessage: messages[0]?.timestamp,
      lastMessage: messages[messages.length - 1]?.timestamp,
    };

    // Create professional HTML email template for transcript
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
        <!-- Header -->
        <div style="background-color: #ffffff; border-radius: 8px 8px 0 0; padding: 24px; border-bottom: 3px solid #3b82f6; text-align: center;">
          <div style="display: inline-block; padding: 12px 20px; background-color: #3b82f6; border-radius: 8px; margin-bottom: 8px;">
            <span style="font-size: 24px; font-weight: bold; color: white;">🧞 Genie AI</span>
          </div>
          <div style="font-size: 14px; color: #64748b; font-style: italic;">Conversation Transcript Archive</div>
        </div>

        <!-- Content -->
        <div style="background-color: #ffffff; padding: 32px 24px; border-radius: 0 0 8px 8px;">
          <h1 style="color: #1e293b; font-size: 28px; font-weight: bold; margin: 0 0 24px 0; text-align: center;">Conversation Transcript</h1>
          
          <p style="color: #475569; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">
            A user has completed a conversation session with Genie AI. Below is the complete transcript and session details.
          </p>

          <!-- Session Details -->
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #334155; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Session Details</h2>
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">User:</span>
              <span style="color: #1e293b; font-size: 14px;">${userInfo.firstName} ${userInfo.lastName || ''}</span>
            </div>
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Email:</span>
              <a href="mailto:${userInfo.email}" style="color: #3b82f6; text-decoration: underline; font-size: 14px;">${userInfo.email}</a>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Context:</span>
              <span style="color: #1e293b; font-size: 14px;">${context}</span>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Topic:</span>
              <span style="color: #1e293b; font-size: 14px;">${cleanTopic}</span>
            </div>
            
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">AI Mode:</span>
              <span style="color: #1e293b; font-size: 14px;">${aiConfig?.mode || 'default'} (${aiConfig?.selectedModel || 'gpt-4o-mini'})</span>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Session Start:</span>
              <span style="color: #1e293b; font-size: 14px;">${new Date(conversationStats.firstMessage).toLocaleString()}</span>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Session End:</span>
              <span style="color: #1e293b; font-size: 14px;">${new Date(conversationStats.lastMessage).toLocaleString()}</span>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Total Messages:</span>
              <span style="color: #1e293b; font-size: 14px;">${conversationStats.totalMessages} (${conversationStats.userMessages} user, ${conversationStats.assistantMessages} AI)</span>
            </div>

            ${Object.keys(aiConfig || {}).filter(k => ['ragEnabled', 'knowledgeBaseEnabled', 'mcpEnabled', 'splitScreenEnabled'].includes(k) && aiConfig[k]).length > 0 ? `
            <div style="margin-bottom: 12px;">
              <span style="color: #475569; font-size: 14px; font-weight: 600; display: inline-block; min-width: 120px;">Features Used:</span>
              <span style="color: #1e293b; font-size: 14px;">${Object.keys(aiConfig || {}).filter(k => ['ragEnabled', 'knowledgeBaseEnabled', 'mcpEnabled', 'splitScreenEnabled'].includes(k) && aiConfig[k]).map(k => k.replace('Enabled', '').toUpperCase()).join(', ')}</span>
            </div>
            ` : ''}
          </div>

          <!-- Conversation Transcript -->
          <div style="margin-bottom: 24px;">
            <h2 style="color: #334155; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Full Conversation Transcript</h2>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; max-height: 600px; overflow-y: auto;">
              <div style="color: #1e293b; font-size: 14px; line-height: 24px; white-space: pre-wrap; font-family: monospace;">${transcript}</div>
            </div>
          </div>

          <!-- Action Items -->
          <div style="background-color: #fef3cd; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #475569; font-size: 16px; margin: 0 0 12px 0;"><strong>Recommended Follow-up Actions:</strong></p>
            <ul style="margin: 12px 0; padding-left: 20px;">
              <li style="color: #92400e; font-size: 14px; margin-bottom: 8px;">
                <a href="mailto:${userInfo.email}?subject=Re: Your ${context} conversation about ${cleanTopic}" style="color: #3b82f6; text-decoration: underline; font-weight: 600;">
                  Follow up with ${userInfo.firstName} about their ${cleanTopic} questions
                </a>
              </li>
              <li style="color: #92400e; font-size: 14px; margin-bottom: 8px;">Review conversation for insights and improvement opportunities</li>
              <li style="color: #92400e; font-size: 14px;">Consider personalizing future interactions based on their interests</li>
            </ul>
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

        <!-- Footer -->
        <div style="text-align: center; padding: 0 24px 24px 24px;">
          <p style="color: #64748b; font-size: 14px; line-height: 20px; margin: 0 0 12px 0;">
            <strong>Genie AI Experimentation Hub</strong><br>
            Saidas - AI Innovation Leader<br>
            936 Villageview Lane, Cary, NC 27519<br>
            <a href="mailto:genieaiexperimentationhub@gmail.com" style="color: #3b82f6; text-decoration: underline;">genieaiexperimentationhub@gmail.com</a>
          </p>
          <p style="color: #94a3b8; font-size: 12px; margin: 0; font-style: italic;">
            This transcript was automatically generated when the user completed their conversation session.
          </p>
        </div>
      </div>
    `;

    // Send transcript email to both user and admin
    const emailResponse = await resend.emails.send({
      from: 'Genie AI Hub <transcripts@genieaiexperimentationhub.tech>',
      to: [userInfo.email, 'genieaiexperimentationhub@gmail.com'],
      subject: `Your Genie AI Conversation Transcript - ${context}/${cleanTopic}`,
      html: emailHtml,
      text: `
Genie AI Conversation Transcript

User: ${userInfo.firstName} ${userInfo.lastName || ''} (${userInfo.email})
Context: ${context}
Topic: ${cleanTopic}
AI Configuration: ${JSON.stringify(aiConfig, null, 2)}
Session: ${new Date(conversationStats.firstMessage).toLocaleString()} - ${new Date(conversationStats.lastMessage).toLocaleString()}
Total Messages: ${conversationStats.totalMessages} (${conversationStats.userMessages} user, ${conversationStats.assistantMessages} AI)

--- FULL TRANSCRIPT ---
${transcript.replace(/\*\*/g, '')}

--- END TRANSCRIPT ---

This transcript was automatically generated when you completed your conversation session.
      `.trim(),
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send transcript email', 
          details: emailResponse.error.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Transcript email sent successfully:', emailResponse.data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Conversation transcript sent successfully',
        emailId: emailResponse.data?.id,
        stats: conversationStats
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in send-conversation-transcript function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});