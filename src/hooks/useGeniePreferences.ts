import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AIConfig } from '@/components/public-genie/AdvancedAISettings';

const STORAGE_KEY = 'genie_user_preferences';

interface GeniePreferences {
  config: AIConfig;
  context: 'technology' | 'healthcare';
  selectedTopic: string;
  lastUsed: string;
  usageCount: number;
}

export const useGeniePreferences = (userEmail?: string) => {
  const [preferences, setPreferences] = useState<GeniePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setPreferences(parsed);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to localStorage
  const savePreferences = async (newPreferences: Partial<GeniePreferences>) => {
    try {
      const updated: GeniePreferences = {
        ...preferences!,
        ...newPreferences,
        lastUsed: new Date().toISOString(),
        usageCount: (preferences?.usageCount || 0) + 1,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setPreferences(updated);

      // Track analytics if user email is provided
      if (userEmail && updated.config) {
        await trackConfigurationAnalytics(userEmail, updated.config);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // Track configuration choices in Supabase
  const trackConfigurationAnalytics = async (email: string, config: AIConfig) => {
    try {
      await supabase.from('genie_configuration_analytics').insert({
        user_email: email,
        mode: config.mode,
        selected_models: {
          selectedModel: config.selectedModel,
          secondaryModel: config.secondaryModel,
        },
        features_enabled: {
          ragEnabled: config.ragEnabled,
          knowledgeBaseEnabled: config.knowledgeBaseEnabled,
          mcpEnabled: config.mcpEnabled,
          visionEnabled: config.visionEnabled,
          splitScreen: config.splitScreen,
        },
        context: preferences?.context || 'technology',
      });
    } catch (error) {
      console.error('Error tracking analytics:', error);
    }
  };

  // Get smart defaults based on usage patterns
  const getSmartDefaults = (): Partial<AIConfig> | null => {
    if (!preferences || preferences.usageCount < 3) return null;

    return {
      mode: preferences.config.mode,
      selectedModel: preferences.config.selectedModel,
      ragEnabled: preferences.config.ragEnabled,
      knowledgeBaseEnabled: preferences.config.knowledgeBaseEnabled,
    };
  };

  return {
    preferences,
    isLoading,
    savePreferences,
    getSmartDefaults,
  };
};
