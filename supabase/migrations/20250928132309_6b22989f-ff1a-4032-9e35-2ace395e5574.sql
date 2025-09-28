-- Update the process_rag_recommendation function to call the email edge function directly
CREATE OR REPLACE FUNCTION public.process_rag_recommendation(
  p_recommendation_id uuid, 
  p_action text, 
  p_review_notes text DEFAULT NULL::text, 
  p_merge_with_entry_id uuid DEFAULT NULL::uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  rec RECORD;
  kb_entry_id UUID;
  result JSONB;
  email_response JSONB;
BEGIN
  -- Get the recommendation
  SELECT * INTO rec FROM public.rag_recommendations WHERE id = p_recommendation_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Recommendation not found');
  END IF;
  
  CASE p_action
    WHEN 'approve' THEN
      -- Create knowledge base entry with public source type
      INSERT INTO public.knowledge_base (
        title,
        content,
        category,
        source_type,
        confidence_score,
        status,
        created_by,
        reviewed_by,
        reviewed_at,
        approval_notes
      ) VALUES (
        'FAQ: ' || LEFT(rec.user_query, 100),
        rec.suggested_content,
        COALESCE(rec.suggested_category, 'RAG Generated'),
        'rag_generated', -- This ensures it will sync to FAQ
        rec.confidence_score,
        'approved',
        auth.uid(),
        auth.uid(),
        now(),
        p_review_notes
      )
      RETURNING id INTO kb_entry_id;
      
      -- Update recommendation status
      UPDATE public.rag_recommendations
      SET 
        status = 'approved',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes,
        knowledge_base_entry_id = kb_entry_id
      WHERE id = p_recommendation_id;
      
      -- Send approval email notification
      SELECT content INTO email_response FROM http((
        'POST',
        current_setting('app.settings.supabase_url', true) || '/functions/v1/send-rag-approval-email',
        ARRAY[http_header('authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true))],
        'application/json',
        jsonb_build_object(
          'to_email', 'genieaiexperimentationhub@gmail.com',
          'subject', 'RAG Recommendation Approved',
          'html_content', format(
            '<h2>RAG Recommendation Approved</h2>
             <p><strong>Recommendation ID:</strong> %s</p>
             <p><strong>Original Query:</strong> %s</p>
             <p><strong>Suggested Content:</strong> %s</p>
             <p><strong>Category:</strong> %s</p>
             <p><strong>Confidence Score:</strong> %s%%</p>
             <p><strong>Review Notes:</strong> %s</p>
             <p><strong>Knowledge Base Entry ID:</strong> %s</p>
             <p>This content has been approved and added to the FAQ.</p>',
            p_recommendation_id,
            rec.user_query,
            rec.suggested_content,
            COALESCE(rec.suggested_category, 'RAG Generated'),
            (rec.confidence_score * 100)::text,
            COALESCE(p_review_notes, 'None'),
            kb_entry_id
          )
        )::text
      ));
      
      result := jsonb_build_object(
        'status', 'approved',
        'knowledge_base_entry_id', kb_entry_id,
        'email_sent', true
      );
      
    WHEN 'reject' THEN
      UPDATE public.rag_recommendations
      SET 
        status = 'rejected',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes
      WHERE id = p_recommendation_id;
      
      -- Send rejection email notification
      SELECT content INTO email_response FROM http((
        'POST',
        current_setting('app.settings.supabase_url', true) || '/functions/v1/send-rag-approval-email',
        ARRAY[http_header('authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true))],
        'application/json',
        jsonb_build_object(
          'to_email', 'genieaiexperimentationhub@gmail.com',
          'subject', 'RAG Recommendation Rejected',
          'html_content', format(
            '<h2>RAG Recommendation Rejected</h2>
             <p><strong>Recommendation ID:</strong> %s</p>
             <p><strong>Original Query:</strong> %s</p>
             <p><strong>Suggested Content:</strong> %s</p>
             <p><strong>Rejection Reason:</strong> %s</p>
             <p>This recommendation has been rejected and will not be added to the FAQ.</p>',
            p_recommendation_id,
            rec.user_query,
            rec.suggested_content,
            COALESCE(p_review_notes, 'No reason provided')
          )
        )::text
      ));
      
      result := jsonb_build_object('status', 'rejected', 'email_sent', true);
      
    WHEN 'merge' THEN
      -- Merge with existing knowledge base entry
      UPDATE public.knowledge_base
      SET 
        content = content || E'\n\nAdditional context: ' || rec.suggested_content,
        updated_at = now()
      WHERE id = p_merge_with_entry_id;
      
      UPDATE public.rag_recommendations
      SET 
        status = 'merged',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes,
        knowledge_base_entry_id = p_merge_with_entry_id
      WHERE id = p_recommendation_id;
      
      -- Send merge email notification  
      SELECT content INTO email_response FROM http((
        'POST',
        current_setting('app.settings.supabase_url', true) || '/functions/v1/send-rag-approval-email',
        ARRAY[http_header('authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true))],
        'application/json',
        jsonb_build_object(
          'to_email', 'genieaiexperimentationhub@gmail.com',
          'subject', 'RAG Recommendation Merged',
          'html_content', format(
            '<h2>RAG Recommendation Merged</h2>
             <p><strong>Recommendation ID:</strong> %s</p>
             <p><strong>Original Query:</strong> %s</p>
             <p><strong>Merged with Entry ID:</strong> %s</p>
             <p><strong>Review Notes:</strong> %s</p>
             <p>This recommendation has been merged with existing content.</p>',
            p_recommendation_id,
            rec.user_query,
            p_merge_with_entry_id,
            COALESCE(p_review_notes, 'None')
          )
        )::text
      ));
      
      result := jsonb_build_object(
        'status', 'merged',
        'merged_with', p_merge_with_entry_id,
        'email_sent', true
      );
      
    ELSE
      RETURN jsonb_build_object('error', 'Invalid action');
  END CASE;
  
  RETURN result;
END;
$$;