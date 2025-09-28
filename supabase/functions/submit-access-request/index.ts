import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AccessRequestBody {
  user_email: string;
  user_name?: string;
  ip_address: string;
  request_reason: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const requestBody: AccessRequestBody = await req.json();
    
    // Validate required fields
    if (!requestBody.user_email || !requestBody.ip_address || !requestBody.request_reason) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: user_email, ip_address, request_reason' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user already has a pending request
    const { data: existingRequest, error: checkError } = await supabase
      .from('access_requests')
      .select('id, status')
      .eq('user_email', requestBody.user_email)
      .eq('status', 'pending')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing requests:', checkError);
      throw checkError;
    }

    if (existingRequest) {
      return new Response(JSON.stringify({ 
        error: 'You already have a pending access request. Please wait for review.',
        existing_request_id: existingRequest.id
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create new access request
    const { data, error } = await supabase
      .from('access_requests')
      .insert({
        user_email: requestBody.user_email,
        user_name: requestBody.user_name,
        ip_address: requestBody.ip_address,
        request_reason: requestBody.request_reason,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating access request:', error);
      throw error;
    }

    console.log('Access request created successfully:', data);

    // TODO: Send email notification to genieaiexperimentationhub@gmail.com
    // This would require setting up an email service like Resend

    return new Response(JSON.stringify({
      success: true,
      request_id: data.id,
      message: 'Access request submitted successfully. Our team at genieaiexperimentationhub@gmail.com will review your request within 1-2 business days.'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in submit-access-request function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});