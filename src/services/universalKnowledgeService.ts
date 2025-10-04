import { supabase } from '@/integrations/supabase/client';

export type KnowledgeDomain = 
  | 'medical_imaging' 
  | 'patient_onboarding' 
  | 'clinical_risk' 
  | 'conversational';

export type ContentType = 
  | 'finding' 
  | 'guideline' 
  | 'template' 
  | 'protocol' 
  | 'faq' 
  | 'educational_content'
  | 'scoring_system';

export type FeedbackType = 
  | 'helpful' 
  | 'not_helpful' 
  | 'inaccurate' 
  | 'outdated' 
  | 'suggestion';

export interface UniversalKnowledge {
  id: string;
  finding_name: string;
  description: string;
  domain: KnowledgeDomain;
  content_type: ContentType;
  quality_score: number;
  usage_count: number;
  feedback_ratio: number;
  clinical_significance?: string;
  key_features?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface UsageAnalytics {
  knowledge_base_id: string;
  domain: KnowledgeDomain;
  use_case: string;
  user_id?: string;
  session_id?: string;
  query_text?: string;
  was_helpful?: boolean;
  response_quality_score?: number;
}

/**
 * Search the universal knowledge base
 * Works across all domains: medical imaging, patient onboarding, risk assessment, conversations
 */
export const searchUniversalKnowledge = async (
  domain: KnowledgeDomain,
  queryText: string,
  contentType?: ContentType,
  limitCount: number = 10
): Promise<UniversalKnowledge[]> => {
  try {
    const { data, error } = await supabase.rpc(
      'search_universal_knowledge',
      {
        query_domain: domain,
        query_content_type: contentType || null,
        query_text: queryText,
        limit_count: limitCount
      }
    );

    if (error) {
      console.error('Error searching universal knowledge:', error);
      return [];
    }

    return (data || []) as UniversalKnowledge[];
  } catch (error) {
    console.error('Failed to search universal knowledge:', error);
    return [];
  }
};

/**
 * Get top performing knowledge entries by domain
 * Useful for analytics dashboards and quality monitoring
 */
export const getTopKnowledgeByDomain = async (
  domain: KnowledgeDomain,
  limitCount: number = 5
): Promise<any[]> => {
  try {
    const { data, error } = await supabase.rpc(
      'get_top_knowledge_by_domain',
      {
        query_domain: domain,
        limit_count: limitCount
      }
    );

    if (error) {
      console.error('Error getting top knowledge:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to get top knowledge:', error);
    return [];
  }
};

/**
 * Track knowledge usage
 * Call this whenever you use knowledge base entries
 */
export const trackKnowledgeUsage = async (
  analytics: UsageAnalytics
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('knowledge_usage_analytics')
      .insert({
        ...analytics,
        user_id: analytics.user_id || null,
        metadata: {
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        }
      });

    if (error) {
      console.error('Error tracking knowledge usage:', error);
    }

    // Also increment the usage count on the knowledge base entry
    await supabase.rpc('increment_knowledge_usage', {
      knowledge_id: analytics.knowledge_base_id
    });
  } catch (error) {
    console.error('Failed to track knowledge usage:', error);
  }
};

/**
 * Submit user feedback for continuous learning
 */
export const submitKnowledgeFeedback = async (
  conversationId: string,
  messageIndex: number,
  feedbackType: FeedbackType,
  knowledgeBaseIds: string[],
  domain: KnowledgeDomain,
  userId?: string,
  feedbackText?: string,
  suggestedCorrection?: string
): Promise<void> => {
  try {
    // Insert feedback
    const { error } = await supabase
      .from('conversation_learning_feedback')
      .insert({
        conversation_id: conversationId,
        user_id: userId || null,
        message_index: messageIndex,
        feedback_type: feedbackType,
        feedback_text: feedbackText,
        knowledge_base_ids: knowledgeBaseIds,
        suggested_correction: suggestedCorrection,
        domain: domain,
        metadata: {
          timestamp: new Date().toISOString(),
          page: window.location.pathname
        }
      });

    if (error) {
      console.error('Error submitting feedback:', error);
      return;
    }

    // Update feedback scores on knowledge base entries
    const isPositive = feedbackType === 'helpful';
    await Promise.all(
      knowledgeBaseIds.map(kbId =>
        supabase.rpc('update_knowledge_feedback', {
          knowledge_id: kbId,
          is_positive: isPositive
        })
      )
    );
  } catch (error) {
    console.error('Failed to submit feedback:', error);
  }
};

/**
 * Get knowledge repositories from re3data, Kaggle, etc.
 */
export const getKnowledgeRepositories = async (
  domain?: KnowledgeDomain,
  minQualityScore: number = 70
): Promise<any[]> => {
  try {
    let query = supabase
      .from('universal_knowledge_repositories')
      .select('*')
      .eq('is_active', true)
      .gte('quality_score', minQualityScore)
      .order('quality_score', { ascending: false });

    if (domain) {
      query = query.eq('domain', domain);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching repositories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return [];
  }
};

/**
 * Medical Imaging specific helper
 * Searches for imaging findings with modality and body part filters
 */
export const searchMedicalImagingKnowledge = async (
  modality: string,
  bodyPart?: string,
  clinicalContext?: string,
  limitCount: number = 5
): Promise<UniversalKnowledge[]> => {
  const queryText = `${modality} ${bodyPart || ''} ${clinicalContext || ''}`.trim();
  
  return searchUniversalKnowledge(
    'medical_imaging',
    queryText,
    'finding',
    limitCount
  );
};

/**
 * Patient Onboarding specific helper
 * Searches for templates, consent forms, intake guidelines
 */
export const searchOnboardingTemplates = async (
  templateType: string,
  limitCount: number = 5
): Promise<UniversalKnowledge[]> => {
  return searchUniversalKnowledge(
    'patient_onboarding',
    templateType,
    'template',
    limitCount
  );
};

/**
 * Clinical Risk Assessment specific helper
 * Searches for risk protocols and scoring systems
 */
export const searchRiskAssessmentProtocols = async (
  condition: string,
  limitCount: number = 5
): Promise<UniversalKnowledge[]> => {
  return searchUniversalKnowledge(
    'clinical_risk',
    condition,
    'protocol',
    limitCount
  );
};

/**
 * Conversational AI specific helper
 * Searches for FAQs and educational content
 */
export const searchConversationalKnowledge = async (
  topic: string,
  limitCount: number = 3
): Promise<UniversalKnowledge[]> => {
  return searchUniversalKnowledge(
    'conversational',
    topic,
    'faq',
    limitCount
  );
};

/**
 * Get knowledge usage analytics for a specific domain
 */
export const getDomainAnalytics = async (
  domain: KnowledgeDomain,
  startDate?: Date,
  endDate?: Date
): Promise<any[]> => {
  try {
    let query = supabase
      .from('knowledge_usage_analytics')
      .select(`
        *,
        universal_knowledge_base!inner(
          finding_name,
          description,
          quality_score
        )
      `)
      .eq('domain', domain);

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }

    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching domain analytics:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch domain analytics:', error);
    return [];
  }
};

/**
 * Trigger re3data sync (admin only)
 */
export const syncRe3DataRepositories = async (): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke(
      'sync-re3data-repositories',
      { body: {} }
    );

    if (error) {
      console.error('Error syncing re3data:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to sync re3data:', error);
    throw error;
  }
};