import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  preferences?: {
    frequency?: string;
    topics?: string[];
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, source = 'website', preferences = {} }: SubscribeRequest = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .single();

    let subscriberId: string;

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return new Response(
          JSON.stringify({ message: 'Already subscribed to newsletter' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Reactivate subscription
      const { data: updatedSubscriber, error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: true,
          unsubscribed_at: null,
          subscription_source: source,
          preferences: preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSubscriber.id)
        .select('id')
        .single();

      if (updateError) throw updateError;
      subscriberId = updatedSubscriber.id;
    } else {
      // Create new subscription
      const { data: newSubscriber, error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase(),
          subscription_source: source,
          preferences: {
            ...preferences,
            firstName: firstName || '',
            lastName: lastName || ''
          },
          is_active: true
        })
        .select('id')
        .single();

      if (insertError) throw insertError;
      subscriberId = newSubscriber.id;
    }

    // Send welcome email and admin notification
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const unsubscribeUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/newsletter-unsubscribe?email=${encodeURIComponent(email)}&id=${subscriberId}`;
    const siteUrl = "https://genieexperimentationhub.lovable.app";

    // Welcome email HTML template
    const welcomeEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Genie AI Experimentation Hub!</title>
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif; margin: 0; padding: 0; background-color: #f6f9fc; }
    .container { background-color: #ffffff; margin: 0 auto; padding: 20px 0 48px; margin-bottom: 64px; max-width: 600px; }
    .logo-section { padding: 32px 0; text-align: center; }
    .logo { margin: 0 auto; width: 120px; height: 120px; }
    .content { padding: 0 48px; }
    .h1 { color: #1a365d; font-size: 28px; font-weight: bold; text-align: center; margin: 0 0 30px; line-height: 1.3; }
    .h2 { color: #2d3748; font-size: 20px; font-weight: bold; margin: 32px 0 16px; }
    .text { color: #4a5568; font-size: 16px; line-height: 1.6; margin: 16px 0; }
    .section { margin: 32px 0; }
    .cta-section { text-align: center; margin: 48px 0; }
    .button { background-color: #3182ce; border-radius: 8px; color: #fff; font-size: 16px; font-weight: bold; text-decoration: none; text-align: center; display: inline-block; padding: 16px 32px; margin: 0 auto; }
    .hr { border-color: #e2e8f0; margin: 32px 0; }
    .footer { color: #718096; font-size: 14px; line-height: 1.5; text-align: center; margin: 32px 0 16px; }
    .unsubscribe { color: #a0aec0; font-size: 12px; line-height: 1.4; text-align: center; margin: 16px 0 0; }
    .unsubscribe-link { color: #3182ce; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-section">
      <img src="${siteUrl}/genie-logo.png" width="120" height="120" alt="Genie AI Logo" class="logo" />
    </div>
    <div class="content">
      <h1 class="h1">Welcome to Genie AI Experimentation Hub! 🧞‍♂️</h1>
      
      <p class="text">
        Hello ${firstName ? firstName + ' ' + lastName : 'there'}!<br/><br/>
        Thank you for joining our innovative community at <strong>Genie AI Experimentation Hub</strong>! 
        You've just taken the first step into the future of AI experimentation and discovery.
      </p>

      <div class="section">
        <h2 class="h2">Our Mission</h2>
        <p class="text">
          We're dedicated to democratizing AI experimentation and making advanced artificial intelligence 
          accessible to innovators, researchers, and curious minds worldwide. Our platform serves as your 
          gateway to explore, experiment, and excel with cutting-edge AI technologies.
        </p>
      </div>

      <div class="section">
        <h2 class="h2">What We Do</h2>
        <p class="text">
          • <strong>AI Experimentation Platform:</strong> Hands-on tools for testing and developing AI solutions<br/>
          • <strong>Knowledge Sharing:</strong> Community-driven insights and best practices<br/>
          • <strong>Innovation Hub:</strong> Collaborate with fellow AI enthusiasts and experts<br/>
          • <strong>Learning Resources:</strong> Comprehensive guides and tutorials for all skill levels
        </p>
      </div>

      <div class="section">
        <h2 class="h2">Your AI Journey Starts Here</h2>
        <p class="text">
          From curiosity to breakthrough, from concept to implementation - we're here to support 
          your entire AI journey. Whether you're a seasoned developer or just starting out, 
          our hub provides the tools, community, and resources you need to succeed.
        </p>
      </div>

      <div class="section">
        <h2 class="h2">About Our Founder</h2>
        <p class="text">
          Led by visionary AI researcher and innovator, our hub combines years of industry experience 
          with a passion for making AI accessible to everyone. We believe that the next breakthrough 
          in artificial intelligence could come from anyone, anywhere.
        </p>
      </div>

      <div class="cta-section">
        <a href="${siteUrl}" class="button">Explore the Hub Now</a>
      </div>

      <p class="text">
        As a subscriber, you'll receive:
      </p>
      <p class="text">
        ✨ Weekly AI experiment insights and tutorials<br/>
        🚀 Early access to new platform features<br/>
        🤝 Invitations to exclusive community events<br/>
        📊 Industry trends and breakthrough discoveries<br/>
        🛠️ Tool recommendations and expert tips
      </p>

      <hr class="hr" />

      <p class="footer">
        Thank you for joining our mission to advance AI experimentation!<br/>
        <strong>The Genie AI Experimentation Hub Team</strong>
      </p>

      <p class="unsubscribe">
        You received this email because you subscribed to our newsletter at ${email}.<br/>
        <a href="${unsubscribeUrl}" class="unsubscribe-link">Unsubscribe from future emails</a>
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Admin notification email HTML
    const adminNotificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Newsletter Subscription</title>
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif; margin: 0; padding: 20px; background-color: #f6f9fc; }
    .container { background-color: #ffffff; margin: 0 auto; padding: 32px; border-radius: 8px; max-width: 500px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 24px; }
    .logo { width: 60px; height: 60px; margin: 0 auto 16px; }
    .title { color: #1a365d; font-size: 24px; font-weight: bold; margin: 0; }
    .subtitle { color: #4a5568; font-size: 16px; margin: 8px 0 0; }
    .content { margin: 24px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .label { font-weight: bold; color: #2d3748; }
    .value { color: #4a5568; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${siteUrl}/genie-logo.png" width="60" height="60" alt="Genie AI Logo" class="logo" />
      <h1 class="title">New Newsletter Subscription! 🎉</h1>
      <p class="subtitle">Someone just joined your AI community</p>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="label">Name:</span>
        <span class="value">${firstName && lastName ? firstName + ' ' + lastName : 'Not provided'}</span>
      </div>
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value">${email}</span>
      </div>
      <div class="info-row">
        <span class="label">Source:</span>
        <span class="value">${source}</span>
      </div>
      <div class="info-row">
        <span class="label">Subscribed At:</span>
        <span class="value">${new Date().toLocaleString()}</span>
      </div>
      <div class="info-row">
        <span class="label">Subscriber ID:</span>
        <span class="value">${subscriberId}</span>
      </div>
    </div>
    
    <div class="footer">
      <p>This notification was sent automatically from your Genie AI Experimentation Hub.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send welcome email to subscriber
    const { data: welcomeEmailResult, error: welcomeEmailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <genieaiexperimentationhub@gmail.com>",
      to: [email],
      subject: "Welcome to Genie AI Experimentation Hub! 🧞‍♂️",
      html: welcomeEmailHtml,
    });

    // Send notification email to admin
    const { data: adminEmailResult, error: adminEmailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <genieaiexperimentationhub@gmail.com>",
      to: ["genieaiexperimentationhub@gmail.com"],
      subject: "New Newsletter Subscription - Genie AI Hub",
      html: adminNotificationHtml,
    });

    // Log email sending
    await supabase
      .from('email_logs')
      .insert([
        {
          subscriber_id: subscriberId,
          email_type: 'welcome',
          email_address: email,
          status: welcomeEmailError ? 'failed' : 'sent',
          error_message: welcomeEmailError?.message || null,
          template_used: 'welcome-email'
        },
        {
          subscriber_id: subscriberId,
          email_type: 'admin_notification',
          email_address: 'genieaiexperimentationhub@gmail.com',
          status: adminEmailError ? 'failed' : 'sent',
          error_message: adminEmailError?.message || null,
          template_used: 'admin-notification'
        }
      ]);

    if (welcomeEmailError) {
      console.error('Error sending welcome email:', welcomeEmailError);
    }
    if (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError);
    }

    console.log('Newsletter subscription successful:', { 
      email, 
      subscriberId, 
      welcomeEmailSent: !welcomeEmailError,
      adminNotificationSent: !adminEmailError
    });

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed to newsletter',
        subscriberId,
        emailSent: !welcomeEmailError
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in newsletter-subscribe function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);