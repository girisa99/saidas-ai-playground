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
    .container { background-color: #ffffff; margin: 40px auto; padding: 0; border-radius: 12px; max-width: 650px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
    .header { background: linear-gradient(135deg, #2d547e 0%, #48a3c4 50%, #7dd3fc 100%); padding: 40px 20px; text-align: center; color: white; }
    .logo { width: 100px; height: 100px; margin: 0 auto 20px; background: white; border-radius: 50%; padding: 15px; }
    .header-title { color: white; font-size: 32px; font-weight: bold; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .tagline { color: #7dd3fc; font-size: 16px; font-style: italic; margin: 8px 0 0; }
    .content { padding: 40px; }
    .greeting { color: #1a365d; font-size: 24px; font-weight: bold; margin: 0 0 20px; }
    .text { color: #4a5568; font-size: 16px; line-height: 1.8; margin: 16px 0; }
    .genesis-box { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #48a3c4; padding: 24px; margin: 24px 0; border-radius: 8px; }
    .feature-box { background: #f7fafc; border-left: 4px solid #48a3c4; padding: 20px; margin: 24px 0; border-radius: 8px; }
    .feature-title { color: #2d3748; font-size: 18px; font-weight: bold; margin: 0 0 12px; }
    .feature-list { color: #4a5568; font-size: 15px; line-height: 1.8; margin: 8px 0; padding-left: 20px; }
    .rate-limit-box { background: #fff7ed; border: 2px solid #fb923c; padding: 20px; margin: 24px 0; border-radius: 8px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #48a3c4 0%, #2d547e 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 24px 0; box-shadow: 0 4px 15px rgba(72, 163, 196, 0.4); }
    .cta-button:hover { box-shadow: 0 6px 20px rgba(72, 163, 196, 0.6); }
    .divider { border-top: 2px solid #e2e8f0; margin: 32px 0; }
    .footer { text-align: center; color: #718096; font-size: 14px; padding: 20px; background: #f7fafc; }
    .context-badge { display: inline-block; background: #48a3c4; color: white; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .highlight { color: #2d547e; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="${siteUrl}/genie-email-logo.png" width="100" height="100" alt="Genie AI" style="display: block;" />
      </div>
      <h1 class="header-title">Welcome to Genie AI! 🧞‍♂️</h1>
      <p class="tagline">Your Educational AI Experimentation Platform</p>
    </div>
    
    <div class="content">
      <p class="greeting">Hello ${userName}!</p>
      
      <p class="text">
        🎉 <strong>Welcome to an extraordinary AI journey!</strong> I'm Genie, your intelligent AI companion born from personal experimentation 
        and now ready to share knowledge, insights, and proven methodologies with you.
      </p>

      <p class="text">
        <span class="context-badge">Your Context: ${context}</span>
      </p>

      <div class="genesis-box">
        <div class="feature-title">🌟 The Genesis of Genie AI</div>
        <p class="text">
          <strong>This is an Educational & Knowledge-Sharing Experimentation Platform.</strong> Genie AI was born from 
          <span class="highlight">Sai Dasika's personal AI experimentation journey</span> - demonstrating the 
          <strong>"Experiment → Validate → Lead to Deploy"</strong> framework through real implementations.
        </p>
        <p class="text">
          I document learnings, proven outcomes, and practical insights to help others build AI expertise and position 
          themselves as AI-proficient professionals in their organizations. This platform showcases <strong>80-90 days 
          of development work</strong> built in just 2 weeks using modern AI-powered methodologies.
        </p>
      </div>

      <div class="feature-box">
        <div class="feature-title">🚀 Genie AI Major Features & Capabilities</div>
        <ul class="feature-list">
          <li><strong>🤖 Multi-Model AI Intelligence:</strong> Access to 5+ AI models (GPT-4o, Claude, Gemini, Llama) with real-time streaming responses</li>
          <li><strong>🔄 Dual Context System:</strong> Seamlessly switch between Technology and Healthcare domains with 80+ specialized knowledge contexts</li>
          <li><strong>👁️ Advanced Vision Analysis:</strong> Medical image processing with DICOM support, GPT-4 Vision, and Claude Vision capabilities</li>
          <li><strong>⚡ Split-Screen Comparison:</strong> Run multiple AI models side-by-side to compare responses and find the best answers</li>
          <li><strong>💬 Smart Session Management:</strong> Context-aware conversations with automatic saving and intelligent memory</li>
          <li><strong>🎯 Specialized Knowledge:</strong> Deep expertise in AI Innovation, Healthcare Solutions, Technology Stacks, Case Studies, and Enterprise Security</li>
          <li><strong>📊 Gartner Framework Integration:</strong> Value creation mapping and strategic planning tools</li>
          <li><strong>🔒 Enterprise-Grade Security:</strong> Built with compliance frameworks and best practices</li>
          <li><strong>⚡ High Performance:</strong> &lt;2.5s response times, 99.9% reliability, supports 1,000+ concurrent users</li>
        </ul>
      </div>

      <div class="rate-limit-box">
        <div class="feature-title">⏱️ Usage Limits & Fair Use Policy</div>
        <p class="text" style="margin: 8px 0;">
          To ensure quality experience for everyone on this educational platform:<br/>
          • <strong>10 conversations per hour</strong> per user<br/>
          • <strong>50 messages per conversation</strong> (for focused, productive sessions)<br/>
          • <strong>Unlimited daily access</strong> - just pace your experimentation<br/>
          • <strong>Full feature access</strong> including vision analysis and multi-model comparison
        </p>
        <p class="text" style="margin: 12px 0 0; font-size: 14px; color: #78350f;">
          💡 <em>These limits help maintain platform stability while you explore and learn.</em>
        </p>
      </div>

      <div class="feature-box">
        <div class="feature-title">🎓 Key Use Cases & Learning Paths</div>
        <ul class="feature-list">
          <li><strong>AI Technology Exploration:</strong> Learn about modern AI stacks, architectures, and implementation patterns</li>
          <li><strong>Healthcare Innovation:</strong> Explore Digital Therapeutics (DTx), Cell & Gene therapies, Patient Care AI</li>
          <li><strong>Enterprise Strategies:</strong> Discover AI value realization frameworks and deployment methodologies</li>
          <li><strong>Technical Deep-Dives:</strong> Understand Supabase, React, AI integration, and full-stack development</li>
          <li><strong>Medical Image Analysis:</strong> Experiment with AI-powered medical imaging and DICOM processing</li>
          <li><strong>Strategic Planning:</strong> Apply Gartner frameworks to real-world business scenarios</li>
        </ul>
      </div>

      <div class="feature-box">
        <div class="feature-title">🛠️ How to Get Started</div>
        <p class="text" style="margin: 8px 0;">
          1. <strong>Start a Conversation:</strong> Click the Genie popup on any page or visit the dedicated chat interface<br/>
          2. <strong>Choose Your Context:</strong> Select Technology or Healthcare based on your interest<br/>
          3. <strong>Explore Features:</strong> Try vision analysis, split-screen comparison, or specialized knowledge queries<br/>
          4. <strong>Ask Questions:</strong> I can help with case studies, technical guidance, strategic planning, and more<br/>
          5. <strong>Experiment & Learn:</strong> Use this platform to build your own AI expertise through hands-on exploration
        </p>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${siteUrl}" class="cta-button">Start Your AI Journey Now →</a>
      </div>

      <div class="genesis-box">
        <div class="feature-title">👨‍💻 About Sai Dasika - Your AI Guide</div>
        <p class="text">
          Building AI expertise through systematic personal experimentation. Sharing proven results, documented learnings, 
          and practical frameworks that transform curiosity into professional capability and organizational influence. 
          Connect on <a href="https://www.linkedin.com/in/saidas/" style="color: #0077b5; text-decoration: underline;">LinkedIn</a> 
          to discuss your AI journey and exchange insights.
        </p>
      </div>

      <p class="text">
        💬 <strong>Your Conversation ID:</strong> <code style="background: #edf2f7; padding: 4px 8px; border-radius: 4px; font-size: 13px;">${conversationId || 'New Session'}</code>
      </p>

      <div class="divider"></div>

      <p class="text" style="font-size: 14px; color: #718096;">
        📧 This email was sent to <strong>${email}</strong> because you started a conversation with Genie AI.<br/>
        ${ipAddress ? `📍 Session started from: ${ipAddress}<br/>` : ''}
        🕒 <strong>Started at:</strong> ${new Date().toLocaleString()}
      </p>
    </div>

    <div class="footer">
      <p style="margin: 8px 0;"><strong>Genie AI Experimentation Hub</strong></p>
      <p style="margin: 8px 0;">Building AI Expertise Through Personal Experimentation</p>
      <p style="margin: 8px 0; font-size: 12px;">
        <a href="https://www.linkedin.com/in/saidas/" style="color: #48a3c4; text-decoration: underline;">Connect with Sai Dasika</a> | 
        <a href="${siteUrl}" style="color: #48a3c4; text-decoration: underline;">Visit Hub</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Send welcome email
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <genie@genieaiexperimentationhub.tech>",
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
      from: "Genie AI Notifications <notifications@genieaiexperimentationhub.tech>",
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
