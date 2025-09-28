import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ManageRequestBody {
  request_id: string;
  action: 'approve' | 'deny';
  admin_notes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const requestBody: ManageRequestBody = await req.json();
    
    // Validate required fields
    if (!requestBody.request_id || !requestBody.action) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: request_id, action' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!['approve', 'deny'].includes(requestBody.action)) {
      return new Response(JSON.stringify({ error: 'Invalid action. Must be approve or deny' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the access request
    const { data: accessRequest, error: fetchError } = await supabase
      .from('access_requests')
      .select('*')
      .eq('id', requestBody.request_id)
      .single();

    if (fetchError || !accessRequest) {
      return new Response(JSON.stringify({ error: 'Access request not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (accessRequest.status !== 'pending') {
      return new Response(JSON.stringify({ 
        error: `Request already ${accessRequest.status}`,
        current_status: accessRequest.status
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Update the access request
    const { data: updatedRequest, error: updateError } = await supabase
      .from('access_requests')
      .update({
        status: requestBody.action === 'approve' ? 'approved' : 'denied',
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        admin_notes: requestBody.admin_notes
      })
      .eq('id', requestBody.request_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating access request:', updateError);
      throw updateError;
    }

    // If approved, create access override
    if (requestBody.action === 'approve') {
      const { error: overrideError } = await supabase
        .from('approved_access_overrides')
        .insert({
          user_email: accessRequest.user_email,
          ip_address: accessRequest.ip_address,
          granted_by: user.id,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          additional_quota: {
            daily_conversations: 50,
            hourly_conversations: 10
          },
          reason: `Approved access request: ${accessRequest.request_reason}`,
          is_active: true
        });

      if (overrideError) {
        console.error('Error creating access override:', overrideError);
        // Don't fail the whole request, but log the error
      }
    }

    console.log(`Access request ${requestBody.action}d successfully:`, updatedRequest);

    return new Response(JSON.stringify({
      success: true,
      action: requestBody.action,
      request: updatedRequest,
      message: `Access request ${requestBody.action}d successfully`
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in manage-access-request function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});