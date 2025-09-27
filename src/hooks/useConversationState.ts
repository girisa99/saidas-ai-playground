import { useState, useCallback } from 'react';

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
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
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