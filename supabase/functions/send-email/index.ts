import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template_id?: string;
  template_variables?: Record<string, any>;
  cc?: string[];
  bcc?: string[];
  from?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailData: EmailRequest = await req.json();
    console.log('Email request:', emailData);

    let htmlContent = emailData.html;
    let textContent = emailData.text;
    let subject = emailData.subject;

    // If template_id is provided, fetch and render template
    if (emailData.template_id) {
      const { data: template, error: templateError } = await supabaseClient
        .from('email_templates')
        .select('*')
        .eq('id', emailData.template_id)
        .eq('is_active', true)
        .single();

      if (templateError || !template) {
        return new Response(
          JSON.stringify({ error: 'Template not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Simple template variable replacement
      subject = template.subject;
      htmlContent = template.html_content;
      textContent = template.text_content;

      if (emailData.template_variables) {
        Object.entries(emailData.template_variables).forEach(([key, value]) => {
          const placeholder = `{{${key}}}`;
          subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
          if (htmlContent) {
            htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), String(value));
          }
          if (textContent) {
            textContent = textContent.replace(new RegExp(placeholder, 'g'), String(value));
          }
        });
      }
    }

    const toEmails = Array.isArray(emailData.to) ? emailData.to : [emailData.to];
    const fromEmail = emailData.from || 'noreply@resend.dev';

    // Create sent email record
    const { data: sentEmailRecord, error: insertError } = await supabaseClient
      .from('sent_emails')
      .insert({
        from_email: fromEmail,
        to_emails: toEmails,
        cc_emails: emailData.cc || null,
        bcc_emails: emailData.bcc || null,
        subject: subject,
        html_content: htmlContent,
        text_content: textContent,
        template_id: emailData.template_id || null,
        template_variables: emailData.template_variables || {},
        user_id: user.id,
        status: 'sending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating sent email record:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create email record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const emailPayload: any = {
      from: fromEmail,
      to: toEmails,
      subject: subject,
      text: textContent || '',
    };

    if (emailData.cc) emailPayload.cc = emailData.cc;
    if (emailData.bcc) emailPayload.bcc = emailData.bcc;
    if (htmlContent) emailPayload.html = htmlContent;

    const emailResponse = await resend.emails.send(emailPayload);

    console.log('Resend response:', emailResponse);

    // Update sent email record with result
    const updateData: any = {
      sent_at: new Date().toISOString(),
    };

    if (emailResponse.error) {
      updateData.status = 'failed';
      updateData.error_message = emailResponse.error.message;
    } else {
      updateData.status = 'sent';
      updateData.external_id = emailResponse.data?.id;
      updateData.delivery_status = 'delivered';
    }

    await supabaseClient
      .from('sent_emails')
      .update(updateData)
      .eq('id', sentEmailRecord.id);

    return new Response(
      JSON.stringify({
        success: !emailResponse.error,
        email_id: sentEmailRecord.id,
        external_id: emailResponse.data?.id,
        message: emailResponse.error ? emailResponse.error.message : 'Email sent successfully'
      }),
      {
        status: emailResponse.error ? 400 : 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in send-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});