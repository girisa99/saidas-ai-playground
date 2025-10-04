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
}

interface UseUniversalAIOptions {
  silent?: boolean;
}

export const useUniversalAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = useCallback(async (
    request: AIRequest, 
    options: UseUniversalAIOptions = {}
  ): Promise<AIResponse | null> => {
    if (!options.silent) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('ai-universal-processor', {
        body: {
          provider: request.provider,
          model: request.model,
          prompt: request.prompt,
          systemPrompt: request.systemPrompt || '',
          temperature: request.temperature || 0.7,
          maxTokens: request.maxTokens || 1500,
          imageUrl: request.imageUrl,
          images: request.images
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data || !data.content) {
        throw new Error('No response content received');
      }

      return {
        content: data.content,
        provider: request.provider,
        model: request.model,
        timestamp: new Date().toISOString()
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