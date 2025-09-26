import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IncomingEmailData {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text: string;
  attachments?: any[];
  headers?: Record<string, any>;
  messageId?: string;
  inReplyTo?: string;
  references?: string;
  rawEmail?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for webhook
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Received email webhook');
    
    // Parse incoming email data (format depends on your email provider)
    const emailData: IncomingEmailData = await req.json();
    console.log('Email data:', emailData);

    // Extract thread ID from references or subject
    const threadId = emailData.inReplyTo || 
                    emailData.messageId || 
                    emailData.subject.replace(/^(Re: |Fwd: )+/i, '').trim();

    // Store received email
    const { data: receivedEmail, error: insertError } = await supabaseClient
      .from('received_emails')
      .insert({
        from_email: emailData.from,
        to_email: emailData.to,
        subject: emailData.subject,
        html_content: emailData.html,
        text_content: emailData.text,
        attachments: emailData.attachments || [],
        headers: emailData.headers || {},
        raw_email: emailData.rawEmail,
        message_id: emailData.messageId,
        in_reply_to: emailData.inReplyTo,
        thread_id: threadId,
        processing_status: 'processed'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing received email:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to store email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update or create email conversation
    const participants = [emailData.from, emailData.to];
    
    const { data: existingConversation } = await supabaseClient
      .from('email_conversations')
      .select('*')
      .eq('thread_id', threadId)
      .single();

    if (existingConversation) {
      // Update existing conversation
      await supabaseClient
        .from('email_conversations')
        .update({
          last_message_at: new Date().toISOString(),
          message_count: existingConversation.message_count + 1,
          participants: Array.from(new Set([...existingConversation.participants, ...participants]))
        })
        .eq('id', existingConversation.id);
    } else {
      // Create new conversation
      await supabaseClient
        .from('email_conversations')
        .insert({
          thread_id: threadId,
          subject: emailData.subject.replace(/^(Re: |Fwd: )+/i, '').trim(),
          participants: participants,
          message_count: 1
        });
    }

    // Trigger any custom processing logic here
    // For example: auto-reply, sentiment analysis, ticket creation, etc.

    return new Response(
      JSON.stringify({
        success: true,
        email_id: receivedEmail.id,
        thread_id: threadId,
        message: 'Email processed successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in receive-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});