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
  secondaryModel?: string;
  splitScreenEnabled: boolean;
  contextualSuggestions: boolean;
}

const modelOptions = [
  // Large Language Models (LLMs)
  { id: 'gpt-4o', name: 'GPT-4o', type: 'LLM+Vision', provider: 'OpenAI', category: 'General' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', type: 'LLM+Vision', provider: 'OpenAI', category: 'General' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', type: 'LLM+Vision', provider: 'Anthropic', category: 'General' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', type: 'LLM+Vision', provider: 'Anthropic', category: 'General' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', type: 'LLM+Vision', provider: 'Anthropic', category: 'General' },
  { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', type: 'LLM+Vision', provider: 'Google', category: 'General' },
  { id: 'gemini-pro', name: 'Gemini Pro', type: 'LLM', provider: 'Google', category: 'General' },
  
  // Small Language Models (SLMs)
  { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', type: 'SLM', provider: 'Microsoft', category: 'Efficient' },
  { id: 'phi-3-mini', name: 'Phi-3 Mini', type: 'SLM', provider: 'Microsoft', category: 'Efficient' },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', type: 'SLM', provider: 'Meta', category: 'Efficient' },
  { id: 'mistral-7b', name: 'Mistral 7B', type: 'SLM', provider: 'Mistral', category: 'Efficient' },
  { id: 'gemma-7b', name: 'Gemma 7B', type: 'SLM', provider: 'Google', category: 'Efficient' },
  { id: 'qwen-7b', name: 'Qwen 7B', type: 'SLM', provider: 'Alibaba', category: 'Efficient' },
  
  // Vision Language Models (VLMs)
  { id: 'llava-1.6', name: 'LLaVA 1.6', type: 'VLM', provider: 'LAION', category: 'Vision' },
  { id: 'cogvlm', name: 'CogVLM', type: 'VLM', provider: 'Tsinghua', category: 'Vision' },
  { id: 'paligemma', name: 'PaliGemma', type: 'VLM', provider: 'Google', category: 'Vision' },
  
  // Biotech & Healthcare Models
  { id: 'biogpt', name: 'BioGPT', type: 'Biotech', provider: 'Microsoft', category: 'Healthcare' },
  { id: 'med-palm-2', name: 'Med-PaLM 2', type: 'Medical', provider: 'Google', category: 'Healthcare' },
  { id: 'clinical-bert', name: 'Clinical BERT', type: 'Medical', provider: 'MIT', category: 'Healthcare' },
  { id: 'bioclinical-bert', name: 'BioClinical BERT', type: 'Medical', provider: 'NCBI', category: 'Healthcare' },
  { id: 'pubmedbert', name: 'PubMedBERT', type: 'Biotech', provider: 'NIH', category: 'Healthcare' },
  { id: 'galactica-6.7b', name: 'Galactica 6.7B', type: 'Scientific', provider: 'Meta', category: 'Healthcare' },
  { id: 'biomistral-7b', name: 'BioMistral 7B', type: 'Medical', provider: 'Mistral', category: 'Healthcare' },
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
          <Select value={config.mode} onValueChange={(value: 'default' | 'single' | 'multi') => updateConfig({ mode: value })}>
            <SelectTrigger className="h-8 bg-background">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-[100000]">
              <SelectItem value="default" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-3 w-3" />
                  <span>Default - Balanced responses</span>
                </div>
              </SelectItem>
              <SelectItem value="single" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3 w-3" />
                  <span>Single - Focused model responses</span>
                </div>
              </SelectItem>
              <SelectItem value="multi" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span>Multi - Cross-model consensus</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Current: <strong>{config.mode}</strong>
          </p>
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
            <SelectTrigger className="h-8 bg-background">
              <SelectValue placeholder="Select primary model" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-[100000] max-h-[400px] overflow-y-auto">
              {/* Group by category */}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-background">
                General Purpose (LLM + Vision)
              </div>
              {modelOptions.filter(m => m.category === 'General').map((model) => (
                <SelectItem key={model.id} value={model.id} className="cursor-pointer pl-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs">{model.name}</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {model.provider}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-background border-t mt-1">
                Small Language Models (SLM)
              </div>
              {modelOptions.filter(m => m.category === 'Efficient').map((model) => (
                <SelectItem key={model.id} value={model.id} className="cursor-pointer pl-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs">{model.name}</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {model.provider}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-background border-t mt-1">
                Vision Language Models (VLM)
              </div>
              {modelOptions.filter(m => m.category === 'Vision').map((model) => (
                <SelectItem key={model.id} value={model.id} className="cursor-pointer pl-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs">{model.name}</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {model.provider}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-background border-t mt-1">
                Healthcare & Biotech Models
              </div>
              {modelOptions.filter(m => m.category === 'Healthcare').map((model) => (
                <SelectItem key={model.id} value={model.id} className="cursor-pointer pl-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs">{model.name}</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {model.provider}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedModel && (
            <div className="flex gap-1 items-center">
              <span className="text-xs text-muted-foreground">Active:</span>
              <Badge variant="secondary" className="text-xs">
                {selectedModel.name}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {selectedModel.provider}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Model (for Multi + Split) */}
      {(config.mode === 'multi' || config.splitScreenEnabled) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Comparison Model
            </CardTitle>
            <CardDescription className="text-xs">
              Secondary model for side-by-side responses
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <Select
              value={config.secondaryModel || 'claude-3-haiku'}
              onValueChange={(value) => updateConfig({ secondaryModel: value })}
            >
              <SelectTrigger className="h-8 bg-background">
                <SelectValue placeholder="Select comparison model" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[100000] max-h-[300px]">
                {modelOptions
                  .filter((m) => m.id !== config.selectedModel)
                  .map((model) => (
                    <SelectItem key={model.id} value={model.id} className="cursor-pointer">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs">{model.name}</span>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">
                            {model.type}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {model.provider}
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

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