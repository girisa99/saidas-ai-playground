import { useState, useCallback, useEffect } from 'react';
import { genieConversationService } from '@/services/genieConversationService';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
  model?: string;
  metadata?: any;
}

interface ConversationConfig {
  selectedMode?: 'system' | 'single' | 'multi';
  selectedModel?: string;
  selectedModelType?: 'llm' | 'slm' | 'vlm';
  enabledFeatures?: string[];
  selectedMCPTools?: string[];
}

interface ConversationState {
  messages: ConversationMessage[];
  selectedMode?: string;
  config?: ConversationConfig;
}

export const useConversationState = () => {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    selectedMode: 'system'
  });

  const addMessage = useCallback((message: ConversationMessage) => {
    setState(prev => {
      const newMessages = [...prev.messages, message];
      
      // Auto-save to database if conversation is active
      if (genieConversationService.isConversationActive()) {
        genieConversationService.updateConversation(newMessages);
      }
      
      return {
        ...prev,
        messages: newMessages
      };
    });
  }, []);

  const updateConversationConfig = useCallback((config: ConversationConfig) => {
    setState(prev => ({
      ...prev,
      config,
      selectedMode: config.selectedMode || prev.selectedMode
    }));
  }, []);

  const switchMode = useCallback((mode: 'system' | 'single' | 'multi') => {
    setState(prev => ({
      ...prev,
      selectedMode: mode
    }));
  }, []);

  const resetConversation = useCallback(() => {
    setState(prev => ({
      ...prev,
      messages: []
    }));
  }, []);

  return {
    state,
    addMessage,
    updateConversationConfig,
    switchMode,
    resetConversation
  };
};