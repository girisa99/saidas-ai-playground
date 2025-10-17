import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

interface AIRequest {
  provider: 'openai' | 'claude' | 'gemini'; // Direct API calls (OpenAI, Anthropic, Google)
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  imageUrl?: string;
  images?: string[];
}

interface AIResponse {
  content: string;
  provider: string;
  model: string;
  timestamp: string;
  ragContext?: any;
  knowledgeBaseResults?: any;
  triageData?: any;
  routingReasoning?: string;
  estimatedCost?: number;
  estimatedLatency?: number;
  // Multi-agent collaboration metadata
  collaborationMode?: 'single' | 'sequential' | 'ensemble';
  agentCount?: number;
  consensusScore?: number;
  agentResponses?: Array<{ agent: string; content: string }>;
  // Oncology extractor output
  oncologyProducts?: Array<{ product: string; dose?: string; ndc?: string; modality?: string; application?: string; manufacturer?: string }>;
  // Treatment center map metadata (full filter support)
  showTreatmentMap?: boolean;
  centerType?: string;
  searchQuery?: string;
  therapeuticArea?: string;
  product?: string;
  manufacturer?: string;
  clinicalTrial?: string;
  state?: string;
  city?: string;
  insuranceType?: string;
  priceRange?: string;
  aiRecommendations?: any;
  contextualInsights?: any;
  // Smart routing optimization metadata
  smartRoutingOptimization?: any;
  // All metadata from edge function
  metadata?: any;
}

interface UseUniversalAIOptions {
  silent?: boolean;
}

interface AIRequestExtended extends AIRequest {
  useRAG?: boolean;
  knowledgeBase?: boolean;
  useMCP?: boolean;
  labelStudio?: boolean;
  context?: string;
  enableSmartRouting?: boolean;
  enableMultiAgent?: boolean; // NEW: Enable multi-agent collaboration
  conversationHistory?: Array<{ role: string; content: string }>;
}

export const useUniversalAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (
    request: AIRequestExtended, 
    options: UseUniversalAIOptions = {}
  ): Promise<AIResponse | null> => {
    if (!options.silent) {
      setIsLoading(true);
    }
    setError(null);

    try {
      logger.log('🚀 Universal AI Request:', {
        provider: request.provider,
        model: request.model,
        useRAG: request.useRAG,
        knowledgeBase: request.knowledgeBase,
        useMCP: request.useMCP,
        hasImages: request.images?.length || 0,
        context: request.context,
        smartRouting: request.enableSmartRouting || false,
        multiAgent: request.enableMultiAgent || false
      });

      logger.log('📤 Calling ai-universal-processor edge function...');
      
      const { data, error: functionError } = await supabase.functions.invoke('ai-universal-processor', {
        body: {
          provider: request.provider,
          model: request.model,
          prompt: request.prompt,
          systemPrompt: request.systemPrompt || '',
          temperature: request.temperature || 0.7,
          maxTokens: request.maxTokens || 4000,
          imageUrl: request.imageUrl,
          images: request.images,
          useRAG: request.useRAG,
          knowledgeBase: request.knowledgeBase,
          useMCP: request.useMCP,
          labelStudio: request.labelStudio,
          context: request.context,
          enableSmartRouting: request.enableSmartRouting,
          enableMultiAgent: request.enableMultiAgent,
          conversationHistory: request.conversationHistory
        }
      });

      logger.log('📥 Edge function response received:', { 
        hasData: !!data, 
        hasError: !!functionError,
        dataKeys: data ? Object.keys(data) : [],
        error: functionError 
      });

      if (functionError) {
        logger.error('❌ Universal AI Error:', functionError);
        throw new Error(functionError.message);
      }

      if (!data || !data.content) {
        logger.error('❌ No content in response:', data);
        throw new Error('No response content received');
      }

      logger.log('✅ Universal AI Response:', {
        provider: request.provider,
        model: data.model || data.modelUsed || request.model,
        contentLength: data.content?.length || 0,
        ragUsed: data.ragContext ? 'Yes' : 'No',
        knowledgeBaseUsed: (data.metadata?.knowledgeBaseResults || data.knowledgeBaseResults) ? 'Yes' : 'No',
        triageUsed: (data.metadata?.triageData || data.triageData) ? 'Yes' : 'No',
        routingReasoning: data.routingReasoning || data.metadata?.routingReasoning,
        multiAgent: (data.metadata?.collaborationMode || data.collaborationMode) ? `Yes (${data.metadata?.collaborationMode || data.collaborationMode})` : 'No',
        agentCount: data.metadata?.agentCount || data.agentCount || 0
      });
      
      // Extract metadata from nested structure or fallback to top-level
      const metadata = data.metadata || data;
      
      return {
        content: data.content,
        provider: request.provider,
        model: data.modelUsed || request.model,
        timestamp: new Date().toISOString(),
        ragContext: data.ragContext || metadata.ragContext,
        knowledgeBaseResults: metadata.knowledgeBaseResults,
        triageData: metadata.triageData,
        routingReasoning: data.routingReasoning || metadata.routingReasoning,
        estimatedCost: data.estimatedCost || metadata.estimatedCost,
        estimatedLatency: data.estimatedLatency || metadata.estimatedLatency,
        // ========== MULTI-AGENT COLLABORATION DATA ==========
        collaborationMode: data.collaborationMode || metadata.collaborationMode,
        agentCount: data.agentCount || metadata.agentCount,
        consensusScore: data.consensusScore || metadata.consensusScore,
        agentResponses: data.agentResponses || metadata.agentResponses,
        // ========== ONCOLOGY PRODUCTS (for card rendering) ==========
        oncologyProducts: metadata.oncologyProducts,
        // ========== TREATMENT CENTER MAP METADATA ==========
        showTreatmentMap: metadata.showTreatmentMap,
        centerType: metadata.centerType,
        searchQuery: metadata.searchQuery,
        therapeuticArea: metadata.therapeuticArea,
        product: metadata.product,
        manufacturer: metadata.manufacturer,
        clinicalTrial: metadata.clinicalTrial,
        state: metadata.state,
        city: metadata.city,
        insuranceType: metadata.insuranceType,
        priceRange: metadata.priceRange,
        aiRecommendations: metadata.aiRecommendations,
        contextualInsights: metadata.contextualInsights,
        // ========== SMART ROUTING OPTIMIZATION ==========
        smartRoutingOptimization: metadata.smartRoutingOptimization
      };
    } catch (err: any) {
      let errorMessage = (err && err.message) ? err.message : 'Failed to generate AI response';
      const lower = String(errorMessage).toLowerCase();
      if (lower.includes('lovable_402') || lower.includes('payment') || lower.includes('credit')) {
        errorMessage = 'Payment required: add credits to your Lovable AI workspace.';
      } else if (lower.includes('lovable_429') || lower.includes('rate limit') || lower.includes('too many')) {
        errorMessage = 'Rate limit exceeded: please wait and try again.';
      }
      setError(errorMessage);
      logger.error('AI generation error:', err);
      return null;
    } finally {
      if (!options.silent) {
        setIsLoading(false);
      }
    }
  }, []);

  return {
    generateResponse,
    isLoading,
    error
  };
};