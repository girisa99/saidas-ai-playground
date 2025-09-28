import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain, Settings, Layers, Zap } from 'lucide-react';

interface CapabilitiesPromptProps {
  onModeSelect: (mode: 'default' | 'single' | 'multi') => void;
  onFeatureToggle: (feature: string) => void;
  currentConfig: any;
}

export const CapabilitiesPrompt: React.FC<CapabilitiesPromptProps> = ({
  onModeSelect,
  onFeatureToggle,
  currentConfig
}) => {
  return (
    <Card className="p-4 my-2 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Configure My Capabilities</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={currentConfig.mode === 'default' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('default')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs">Default</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('single')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Single Agent</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'multi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('multi')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Layers className="h-4 w-4" />
            <span className="text-xs">Multi-Agent</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {['RAG', 'Knowledge Base', 'MCP Tools', 'Split Screen'].map(feature => (
            <Badge
              key={feature}
              variant={currentConfig[feature.toLowerCase().replace(' ', '')] ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => onFeatureToggle(feature)}
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TopicSuggestionsProps {
  context: 'technology' | 'healthcare';
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  context,
  topics,
  onTopicSelect
}) => {
  return (
    <Card className="p-3 my-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">
          {context === 'technology' ? '🚀' : '🏥'} Suggested {context} topics:
        </h4>
        <div className="flex flex-wrap gap-1">
          {topics.map(topic => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              onClick={() => onTopicSelect(topic)}
              className="text-xs h-auto py-1 px-2"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};