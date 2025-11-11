import { supabase } from "@/integrations/supabase/client";

/**
 * Phase 1: AI Intelligence Service
 * Provides access to query analysis, confidence scoring, and token budget features
 */

export interface QueryAnalysis {
  id: string;
  query_text: string;
  detected_intent: string;
  detected_domain: string;
  complexity_score: number;
  requires_rag: boolean;
  requires_mcp: boolean;
  recommended_model: string;
  token_estimate: number;
  analyzed_at: string;
}

export interface ResponseConfidence {
  id: string;
  message_index: number;
  confidence_score: number;
  reasoning_quality: number;
  factual_accuracy: number;
  completeness_score: number;
  sources_used: any;
  model_used: string;
  token_usage: any;
  created_at: string;
}

export interface TokenBudget {
  id: string;
  allocated_tokens: number;
  used_tokens: number;
  remaining_tokens: number;
  budget_period: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get query analysis history for a conversation
 */
export async function getQueryAnalysisHistory(
  conversationId: string
): Promise<QueryAnalysis[]> {
  const { data, error } = await supabase
    .from('genie_query_analysis')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('analyzed_at', { ascending: false });

  if (error) {
    console.error('Error fetching query analysis:', error);
    return [];
  }

  return data || [];
}

/**
 * Get confidence scores for a conversation
 */
export async function getConfidenceScores(
  conversationId: string
): Promise<ResponseConfidence[]> {
  const { data, error } = await supabase
    .from('genie_response_confidence')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('message_index', { ascending: true });

  if (error) {
    console.error('Error fetching confidence scores:', error);
    return [];
  }

  return data || [];
}

/**
 * Get token budget for a conversation
 */
export async function getTokenBudget(
  conversationId: string
): Promise<TokenBudget | null> {
  const { data, error } = await supabase
    .from('genie_token_budgets')
    .select('*')
    .eq('conversation_id', conversationId)
    .single();

  if (error) {
    console.error('Error fetching token budget:', error);
    return null;
  }

  return data;
}

/**
 * Create or update token budget for a conversation
 */
export async function setTokenBudget(
  conversationId: string,
  userId: string,
  allocatedTokens: number = 10000
): Promise<boolean> {
  const { error } = await supabase
    .from('genie_token_budgets')
    .upsert({
      conversation_id: conversationId,
      user_id: userId,
      allocated_tokens: allocatedTokens,
      budget_period: 'conversation',
    });

  if (error) {
    console.error('Error setting token budget:', error);
    return false;
  }

  return true;
}

/**
 * Trigger batch embeddings generation for knowledge base entries
 */
export async function generateKnowledgeEmbeddings(
  knowledgeIds?: string[],
  batchSize: number = 50
): Promise<{ success: boolean; message: string; processed?: number }> {
  try {
    const { data, error } = await supabase.functions.invoke(
      'generate-knowledge-embeddings-batch',
      {
        body: {
          knowledge_ids: knowledgeIds,
          batch_size: batchSize,
        },
      }
    );

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: data.message || 'Embeddings generated successfully',
      processed: data.success_count,
    };
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to generate embeddings',
    };
  }
}

/**
 * Search knowledge base using semantic search
 */
export async function semanticSearch(
  queryText: string,
  domain?: string,
  matchThreshold: number = 0.7,
  matchCount: number = 10
): Promise<any[]> {
  try {
    // Generate embedding for the query using OpenAI API via edge function
    // This requires the generate-embeddings edge function or similar
    // For now, we'll use the hybrid search approach that's already in ai-universal-processor
    
    // Call the universal AI processor with semantic search enabled
    const { data, error } = await supabase.functions.invoke('ai-universal-processor', {
      body: {
        provider: 'gemini',
        model: 'gemini-2.0-flash-exp',
        prompt: queryText,
        useRAG: true,
        context: domain,
      },
    });

    if (error) {
      throw error;
    }

    return data.metadata?.knowledgeBaseResults || [];
  } catch (error) {
    console.error('Error performing semantic search:', error);
    return [];
  }
}

/**
 * Get analytics for AI intelligence features
 */
export async function getAIIntelligenceAnalytics(
  userId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  totalQueries: number;
  avgConfidence: number;
  avgComplexity: number;
  tokenUsage: number;
  domains: Record<string, number>;
}> {
  try {
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate || new Date();

    // Get query analytics
    const { data: queries, error: queriesError } = await supabase
      .from('genie_query_analysis')
      .select('*')
      .eq('user_id', userId)
      .gte('analyzed_at', start.toISOString())
      .lte('analyzed_at', end.toISOString());

    if (queriesError) throw queriesError;

    // Get confidence scores
    const { data: confidence, error: confError } = await supabase
      .from('genie_response_confidence')
      .select('confidence_score, token_usage')
      .in(
        'conversation_id',
        queries?.map((q: any) => q.conversation_id) || []
      );

    if (confError) throw confError;

    // Calculate metrics
    const totalQueries = queries?.length || 0;
    const avgConfidence =
      confidence?.reduce((sum: number, c: any) => sum + (c.confidence_score || 0), 0) /
        (confidence?.length || 1) || 0;
    const avgComplexity =
      queries?.reduce((sum: number, q: any) => sum + (q.complexity_score || 0), 0) /
        totalQueries || 0;
    const tokenUsage =
      confidence?.reduce(
        (sum: number, c: any) => sum + (c.token_usage?.total_tokens || 0),
        0
      ) || 0;

    // Domain distribution
    const domains: Record<string, number> = {};
    queries?.forEach((q: any) => {
      const domain = q.detected_domain || 'unknown';
      domains[domain] = (domains[domain] || 0) + 1;
    });

    return {
      totalQueries,
      avgConfidence,
      avgComplexity,
      tokenUsage,
      domains,
    };
  } catch (error) {
    console.error('Error fetching AI intelligence analytics:', error);
    return {
      totalQueries: 0,
      avgConfidence: 0,
      avgComplexity: 0,
      tokenUsage: 0,
      domains: {},
    };
  }
}
