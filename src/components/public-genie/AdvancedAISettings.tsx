import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Brain, Database, Network, Settings2, Cpu, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedAISettingsProps {
  onConfigChange: (config: AIConfig) => void;
  currentConfig: AIConfig;
}

export interface AIConfig {
  mode: 'default' | 'single' | 'multi';
  ragEnabled: boolean;
  knowledgeBaseEnabled: boolean;
  mcpEnabled: boolean;
  selectedModel: string;
  splitScreenEnabled: boolean;
  contextualSuggestions: boolean;
}

const modelOptions = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', type: 'LLM', provider: 'OpenAI' },
  { id: 'gpt-4o', name: 'GPT-4o', type: 'LLM', provider: 'OpenAI' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', type: 'LLM', provider: 'Anthropic' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', type: 'LLM', provider: 'Anthropic' },
  { id: 'gemini-pro', name: 'Gemini Pro', type: 'LLM', provider: 'Google' },
  { id: 'phi-3-mini', name: 'Phi-3 Mini', type: 'SLM', provider: 'Microsoft' },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', type: 'SLM', provider: 'Meta' },
];

export const AdvancedAISettings: React.FC<AdvancedAISettingsProps> = ({ 
  onConfigChange, 
  currentConfig 
}) => {
  const [config, setConfig] = useState<AIConfig>(currentConfig);

  const updateConfig = (updates: Partial<AIConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const selectedModel = modelOptions.find(m => m.id === config.selectedModel);

  return (
    <div className="space-y-4 p-4 max-h-96 overflow-y-auto">
      {/* Mode Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Mode
          </CardTitle>
          <CardDescription className="text-xs">
            Choose how the AI handles conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={config.mode} onValueChange={(value: any) => updateConfig({ mode: value })}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-3 w-3" />
                  Default - Balanced responses
                </div>
              </SelectItem>
              <SelectItem value="single">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3 w-3" />
                  Single - Focused model responses
                </div>
              </SelectItem>
              <SelectItem value="multi">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  Multi - Cross-model consensus
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Model Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Model Selection
          </CardTitle>
          <CardDescription className="text-xs">
            Primary model for responses
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <Select value={config.selectedModel} onValueChange={(value) => updateConfig({ selectedModel: value })}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs">{model.name}</span>
                    <div className="flex gap-1 ml-2">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {model.provider}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedModel && (
            <div className="flex gap-1">
              <Badge variant="secondary" className="text-xs">
                {selectedModel.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {selectedModel.provider}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Knowledge & Context Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Database className="h-4 w-4" />
            Knowledge & Context
          </CardTitle>
          <CardDescription className="text-xs">
            Enhanced AI capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">RAG (Retrieval Augmented Generation)</Label>
              <p className="text-xs text-muted-foreground">Real-time knowledge retrieval</p>
            </div>
            <Switch
              checked={config.ragEnabled}
              onCheckedChange={(checked) => updateConfig({ ragEnabled: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Knowledge Base</Label>
              <p className="text-xs text-muted-foreground">Domain-specific knowledge</p>
            </div>
            <Switch
              checked={config.knowledgeBaseEnabled}
              onCheckedChange={(checked) => updateConfig({ knowledgeBaseEnabled: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Network className="h-3 w-3" />
                MCP (Model Context Protocol)
              </Label>
              <p className="text-xs text-muted-foreground">Enhanced model connectivity</p>
            </div>
            <Switch
              checked={config.mcpEnabled}
              onCheckedChange={(checked) => updateConfig({ mcpEnabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Interface Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Interface Features</CardTitle>
          <CardDescription className="text-xs">
            Enhanced conversation experience
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Split Screen Mode</Label>
              <p className="text-xs text-muted-foreground">Compare multiple responses</p>
            </div>
            <Switch
              checked={config.splitScreenEnabled}
              onCheckedChange={(checked) => updateConfig({ splitScreenEnabled: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-xs font-medium">Contextual Suggestions</Label>
              <p className="text-xs text-muted-foreground">Smart follow-up recommendations</p>
            </div>
            <Switch
              checked={config.contextualSuggestions}
              onCheckedChange={(checked) => updateConfig({ contextualSuggestions: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Configuration Summary */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs">Active Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            <Badge variant="default" className="text-xs">
              {config.mode.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {selectedModel?.name || 'No model'}
            </Badge>
            {config.ragEnabled && <Badge variant="outline" className="text-xs">RAG</Badge>}
            {config.knowledgeBaseEnabled && <Badge variant="outline" className="text-xs">KB</Badge>}
            {config.mcpEnabled && <Badge variant="outline" className="text-xs">MCP</Badge>}
            {config.splitScreenEnabled && <Badge variant="outline" className="text-xs">Split</Badge>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};