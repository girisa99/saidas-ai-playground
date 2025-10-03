import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenieWelcomeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  context?: string;
  ipAddress?: string;
  conversationId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      firstName, 
      lastName, 
      context = 'general',
      ipAddress,
      conversationId
    }: GenieWelcomeRequest = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize services
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const siteUrl = "https://genieaiexperimentationhub.tech";
    const userName = firstName && lastName ? `${firstName} ${lastName}` : (firstName || 'there');

    // Genie welcome email HTML
    const genieWelcomeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Genie AI! 🧞‍♂️</title>
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .container { background-color: #ffffff; margin: 40px auto; padding: 0; border-radius: 12px; max-width: 600px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white; }
    .logo { width: 100px; height: 100px; margin: 0 auto 20px; background: white; border-radius: 50%; padding: 15px; }
    .header-title { color: white; font-size: 32px; font-weight: bold; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .content { padding: 40px; }
    .greeting { color: #1a365d; font-size: 24px; font-weight: bold; margin: 0 0 20px; }
    .text { color: #4a5568; font-size: 16px; line-height: 1.8; margin: 16px 0; }
    .feature-box { background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 24px 0; border-radius: 8px; }
    .feature-title { color: #2d3748; font-size: 18px; font-weight: bold; margin: 0 0 12px; }
    .feature-list { color: #4a5568; font-size: 15px; line-height: 1.8; margin: 8px 0; padding-left: 20px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 24px 0; box-shadow: 0 4px 15px rgba(102,126,234,0.4); }
    .cta-button:hover { box-shadow: 0 6px 20px rgba(102,126,234,0.6); }
    .divider { border-top: 2px solid #e2e8f0; margin: 32px 0; }
    .footer { text-align: center; color: #718096; font-size: 14px; padding: 20px; background: #f7fafc; }
    .context-badge { display: inline-block; background: #667eea; color: white; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="${siteUrl}/genie-logo-main.png" width="70" height="70" alt="Genie AI" style="display: block;" />
      </div>
      <h1 class="header-title">Welcome to Genie AI! 🧞‍♂️</h1>
    </div>
    
    <div class="content">
      <p class="greeting">Hello ${userName}!</p>
      
      <p class="text">
        🎉 <strong>Your AI journey has begun!</strong> I'm Genie, your intelligent AI companion for exploring 
        the Experimentation Hub's cutting-edge technology and healthcare innovations.
      </p>

      <p class="text">
        <span class="context-badge">Context: ${context}</span>
      </p>

      <div class="feature-box">
        <div class="feature-title">💡 What I Can Help You With:</div>
        <ul class="feature-list">
          <li><strong>AI Innovation:</strong> Gartner Value Framework mapping to technology stacks</li>
          <li><strong>Healthcare Insights:</strong> Business use cases, DTx, Cell & Gene therapies</li>
          <li><strong>Tech Stack Guidance:</strong> Comprehensive technology concepts and journeys</li>
          <li><strong>Case Studies:</strong> Real-world implementation methodologies</li>
          <li><strong>Security & Compliance:</strong> Enterprise-grade frameworks and best practices</li>
          <li><strong>Value Creation:</strong> Strategic planning and realization strategies</li>
        </ul>
      </div>

      <div class="feature-box">
        <div class="feature-title">🚀 Getting Started:</div>
        <p class="text" style="margin: 8px 0;">
          1. <strong>Ask me anything</strong> about our technology stack or healthcare solutions<br/>
          2. <strong>Explore case studies</strong> and implementation methodologies<br/>
          3. <strong>Get personalized insights</strong> based on your interests<br/>
          4. <strong>Access advanced features</strong> through the configuration wizard
        </p>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${siteUrl}" class="cta-button">Start Exploring Now →</a>
      </div>

      <p class="text">
        💬 <strong>Your conversation ID:</strong> <code style="background: #edf2f7; padding: 4px 8px; border-radius: 4px; font-size: 13px;">${conversationId || 'New Session'}</code>
      </p>

      <div class="divider"></div>

      <p class="text" style="font-size: 14px; color: #718096;">
        📧 This email was sent to <strong>${email}</strong> because you started a conversation with Genie AI.<br/>
        ${ipAddress ? `📍 Session started from: ${ipAddress}` : ''}
      </p>
    </div>

    <div class="footer">
      <p style="margin: 8px 0;"><strong>Genie AI Experimentation Hub</strong></p>
      <p style="margin: 8px 0;">Empowering Innovation Through Intelligent AI</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send welcome email
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <onboarding@resend.dev>",
      to: [email],
      subject: `Welcome to Genie AI, ${firstName || 'Explorer'}! 🧞‍♂️`,
      html: genieWelcomeHtml,
      reply_to: "genieaiexperimentationhub@gmail.com",
    });

    if (emailError) {
      console.error('Error sending Genie welcome email:', emailError);
      throw emailError;
    }

    // Send admin notification
    const adminNotificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; margin: 0; padding: 20px; background: #f6f9fc; }
    .container { background: white; padding: 30px; border-radius: 8px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0; }
    .title { color: #1a365d; font-size: 22px; font-weight: bold; margin: 0; }
    .info { margin: 12px 0; padding: 12px; background: #f7fafc; border-radius: 6px; }
    .label { font-weight: 600; color: #2d3748; display: inline-block; min-width: 120px; }
    .value { color: #4a5568; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">🧞‍♂️ New Genie AI User!</h1>
    </div>
    <div class="info">
      <div><span class="label">Name:</span> <span class="value">${userName}</span></div>
    </div>
    <div class="info">
      <div><span class="label">Email:</span> <span class="value">${email}</span></div>
    </div>
    <div class="info">
      <div><span class="label">Context:</span> <span class="value">${context}</span></div>
    </div>
    <div class="info">
      <div><span class="label">IP Address:</span> <span class="value">${ipAddress || 'Unknown'}</span></div>
    </div>
    <div class="info">
      <div><span class="label">Conversation ID:</span> <span class="value">${conversationId || 'N/A'}</span></div>
    </div>
    <div class="info">
      <div><span class="label">Started At:</span> <span class="value">${new Date().toLocaleString()}</span></div>
    </div>
  </div>
</body>
</html>
    `;

    const { error: adminEmailError } = await resend.emails.send({
      from: "Genie AI Notifications <onboarding@resend.dev>",
      to: ["genieaiexperimentationhub@gmail.com"],
      subject: "🧞‍♂️ New Genie AI User Registration",
      html: adminNotificationHtml,
      reply_to: email,
    });

    if (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError);
    }

    // Log email activity
    await supabase
      .from('email_logs')
      .insert({
        email_type: 'genie_welcome',
        email_address: email,
        status: 'sent',
        template_used: 'genie-welcome-v1',
        metadata: {
          conversation_id: conversationId,
          context,
          ip_address: ipAddress
        }
      });

    console.log('Genie welcome email sent successfully:', { 
      email, 
      userName,
      conversationId,
      emailSent: !emailError,
      adminNotified: !adminEmailError
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Welcome email sent successfully',
        emailSent: true
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-genie-welcome-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
