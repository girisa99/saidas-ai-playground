import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { UnsubscribeConfirmationEmail } from "./_templates/unsubscribe-confirmation.tsx";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const subscriberId = url.searchParams.get('id');

    if (!email || !subscriberId) {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Unsubscribe Request</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; }
            .error { color: #e53e3e; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Invalid Unsubscribe Request</h1>
            <p>The unsubscribe link is invalid or incomplete. Please contact support if you continue to have issues.</p>
          </div>
        </body>
        </html>`,
        { status: 400, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Update subscriber status
    const { data: subscriber, error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriberId)
      .eq('email', email.toLowerCase())
      .select('email')
      .single();

    if (updateError || !subscriber) {
      return new Response(
        `<!DOCTYPE html>
        <html>
        <head>
          <title>Unsubscribe Error</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; }
            .error { color: #e53e3e; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Unsubscribe Failed</h1>
            <p>We couldn't find your subscription or you may have already unsubscribed. Please contact support if you continue to receive emails.</p>
          </div>
        </body>
        </html>`,
        { status: 404, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      );
    }

    // Send confirmation email
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const siteUrl = "https://genieexperimentationhub.lovable.app";

    const emailHtml = await renderAsync(
      React.createElement(UnsubscribeConfirmationEmail, {
        subscriberEmail: email,
        siteUrl
      })
    );

    const { error: emailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <genieexpermentationhub@gmail.com>",
      to: [email],
      subject: "You've been unsubscribed - Genie AI Hub",
      html: emailHtml,
    });

    // Log email sending
    await supabase
      .from('email_logs')
      .insert({
        subscriber_id: subscriberId,
        email_type: 'unsubscribe_confirmation',
        email_address: email,
        status: emailError ? 'failed' : 'sent',
        error_message: emailError?.message || null,
        template_used: 'unsubscribe-confirmation'
      });

    console.log('Newsletter unsubscribe successful:', { email, subscriberId });

    // Return success page
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Successfully Unsubscribed - Genie AI Hub</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif; 
            margin: 0; 
            padding: 40px; 
            background-color: #f6f9fc;
            color: #4a5568;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 48px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
          }
          .logo { width: 80px; height: 80px; margin: 0 auto 32px; }
          h1 { color: #1a365d; margin-bottom: 16px; }
          .success { color: #38a169; font-size: 18px; margin-bottom: 24px; }
          p { line-height: 1.6; margin-bottom: 16px; }
          .button { 
            display: inline-block; 
            background: #3182ce; 
            color: white; 
            text-decoration: none; 
            padding: 12px 24px; 
            border-radius: 8px; 
            margin: 24px 0;
            font-weight: bold;
          }
          .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${siteUrl}/genie-logo.png" alt="Genie AI Logo" class="logo" />
          <h1>Successfully Unsubscribed</h1>
          <div class="success">✅ You've been unsubscribed from our newsletter</div>
          <p>We're sorry to see you go! You have been successfully unsubscribed from the Genie AI Experimentation Hub newsletter.</p>
          <p>You will no longer receive our weekly updates, but you can always resubscribe anytime by visiting our website.</p>
          <a href="${siteUrl}" class="button">Visit Genie AI Hub</a>
          <div class="footer">
            <p>If this was a mistake, you can resubscribe at any time.<br/>
            Thank you for being part of our AI community!</p>
          </div>
        </div>
      </body>
      </html>`,
      { status: 200, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('Error in newsletter-unsubscribe function:', error);
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribe Error</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
          .container { max-width: 600px; margin: 0 auto; }
          .error { color: #e53e3e; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="error">Error Processing Unsubscribe</h1>
          <p>An error occurred while processing your unsubscribe request. Please try again later or contact support.</p>
          <p>Error: ${error.message}</p>
        </div>
      </body>
      </html>`,
      { status: 500, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
    );
  }
};

serve(handler);