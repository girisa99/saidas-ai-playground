import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIRequest {
  provider: 'lovable'; // Always use Lovable AI Gateway
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
      console.log('🚀 Universal AI Request:', {
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

      console.log('📤 Calling ai-universal-processor edge function...');
      
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

      console.log('📥 Edge function response received:', { 
        hasData: !!data, 
        hasError: !!functionError,
        dataKeys: data ? Object.keys(data) : [],
        error: functionError 
      });

      if (functionError) {
        console.error('❌ Universal AI Error:', functionError);
        throw new Error(functionError.message);
      }

      if (!data || !data.content) {
        console.error('❌ No content in response:', data);
        throw new Error('No response content received');
      }

      console.log('✅ Universal AI Response:', {
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
      
      // DETAILED TRIAGE DATA LOGGING FOR VERIFICATION
      if (data.triageData) {
        console.log('🔍 DETAILED TRIAGE DATA:', {
          complexity: data.triageData.complexity,
          domain: data.triageData.domain,
          urgency: data.triageData.urgency,
          best_format: data.triageData.best_format,
          emotional_tone: data.triageData.emotional_tone,
          reasoning: data.triageData.reasoning,
          confidence: data.triageData.confidence
        });
      } else {
        console.warn('⚠️ NO TRIAGE DATA RECEIVED - Smart routing may not be enabled');
      }

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
      const errorMessage = err.message || 'Failed to generate AI response';
      setError(errorMessage);
      console.error('AI generation error:', err);
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