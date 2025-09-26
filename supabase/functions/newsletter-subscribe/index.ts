import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";
import { WelcomeEmail } from "./_templates/welcome-email.tsx";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
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
    const { email, source = 'website', preferences = {} }: SubscribeRequest = await req.json();

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
          preferences: preferences,
          is_active: true
        })
        .select('id')
        .single();

      if (insertError) throw insertError;
      subscriberId = newSubscriber.id;
    }

    // Send welcome email
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const unsubscribeUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/newsletter-unsubscribe?email=${encodeURIComponent(email)}&id=${subscriberId}`;
    const siteUrl = "https://genieexperimentationhub.lovable.app";

    const emailHtml = await renderAsync(
      React.createElement(WelcomeEmail, {
        subscriberEmail: email,
        unsubscribeUrl,
        siteUrl
      })
    );

    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: "Genie AI Experimentation Hub <genieexpermentationhub@gmail.com>",
      to: [email],
      subject: "Welcome to Genie AI Experimentation Hub! 🧞‍♂️",
      html: emailHtml,
    });

    // Log email sending
    await supabase
      .from('email_logs')
      .insert({
        subscriber_id: subscriberId,
        email_type: 'welcome',
        email_address: email,
        status: emailError ? 'failed' : 'sent',
        error_message: emailError?.message || null,
        template_used: 'welcome-email'
      });

    if (emailError) {
      console.error('Error sending welcome email:', emailError);
    }

    console.log('Newsletter subscription successful:', { email, subscriberId, emailSent: !emailError });

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed to newsletter',
        subscriberId,
        emailSent: !emailError
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