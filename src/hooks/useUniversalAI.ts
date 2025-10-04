import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIRequest {
  provider: 'openai' | 'claude' | 'gemini';
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
        context: request.context
      });

      const { data, error: functionError } = await supabase.functions.invoke('ai-universal-processor', {
        body: {
          provider: request.provider,
          model: request.model,
          prompt: request.prompt,
          systemPrompt: request.systemPrompt || '',
          temperature: request.temperature || 0.7,
          maxTokens: request.maxTokens || 1500,
          imageUrl: request.imageUrl,
          images: request.images,
          useRAG: request.useRAG,
          knowledgeBase: request.knowledgeBase,
          useMCP: request.useMCP,
          labelStudio: request.labelStudio,
          context: request.context
        }
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
        model: request.model,
        contentLength: data.content?.length || 0,
        ragUsed: data.ragContext ? 'Yes' : 'No',
        knowledgeBaseUsed: data.knowledgeBaseResults ? 'Yes' : 'No'
      });

      return {
        content: data.content,
        provider: request.provider,
        model: request.model,
        timestamp: new Date().toISOString(),
        ragContext: data.ragContext,
        knowledgeBaseResults: data.knowledgeBaseResults
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