import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Brain, Settings, Layers, Zap, Database, Network, Cpu, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { AIConfig } from './AdvancedAISettings';

interface ConfigurationWizardProps {
  isOpen: boolean;
  onComplete: (config: AIConfig) => void;
  onCancel: () => void;
}

const modelOptions = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', type: 'LLM', provider: 'OpenAI', description: 'Fast & efficient for most tasks' },
  { id: 'gpt-4o', name: 'GPT-4o', type: 'LLM', provider: 'OpenAI', description: 'Most capable OpenAI model' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', type: 'LLM', provider: 'Anthropic', description: 'Quick responses, good reasoning' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', type: 'LLM', provider: 'Anthropic', description: 'Balanced performance & quality' },
  { id: 'gemini-pro', name: 'Gemini Pro', type: 'LLM', provider: 'Google', description: 'Google\'s flagship model' },
  { id: 'phi-3-mini', name: 'Phi-3 Mini', type: 'SLM', provider: 'Microsoft', description: 'Compact but powerful' },
];

export const ConfigurationWizard: React.FC<ConfigurationWizardProps> = ({
  isOpen,
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<AIConfig>({
    mode: 'default',
    ragEnabled: false,
    knowledgeBaseEnabled: false,
    mcpEnabled: false,
    selectedModel: 'gpt-4o-mini',
    secondaryModel: 'claude-3-haiku',
    splitScreenEnabled: false,
    contextualSuggestions: true,
  });

  const updateConfig = (updates: Partial<AIConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete(config);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Brain className="h-12 w-12 text-primary mx-auto" />
        <h3 className="text-lg font-semibold">Choose Your AI Mode</h3>
        <p className="text-sm text-muted-foreground">How should Genie handle your conversations?</p>
      </div>

      <div className="grid gap-4">
        <Card 
          className={`cursor-pointer transition-all ${config.mode === 'default' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => updateConfig({ mode: 'default' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-blue-500" />
              <div className="flex-1">
                <h4 className="font-medium">Default Mode</h4>
                <p className="text-sm text-muted-foreground">Balanced AI responses for general conversations</p>
              </div>
              {config.mode === 'default' && <Badge variant="default">Selected</Badge>}
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${config.mode === 'single' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => updateConfig({ mode: 'single' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-green-500" />
              <div className="flex-1">
                <h4 className="font-medium">Single Agent</h4>
                <p className="text-sm text-muted-foreground">Focused responses from one specialized model</p>
              </div>
              {config.mode === 'single' && <Badge variant="default">Selected</Badge>}
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${config.mode === 'multi' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
          onClick={() => updateConfig({ mode: 'multi' })}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-500" />
              <div className="flex-1">
                <h4 className="font-medium">Multi-Agent</h4>
                <p className="text-sm text-muted-foreground">Cross-model consensus for complex questions</p>
              </div>
              {config.mode === 'multi' && <Badge variant="default">Selected</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Settings className="h-12 w-12 text-primary mx-auto" />
        <h3 className="text-lg font-semibold">Select AI Models</h3>
        <p className="text-sm text-muted-foreground">Choose your primary {config.mode === 'multi' ? 'and secondary ' : ''}model{config.mode === 'multi' ? 's' : ''}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Primary Model</label>
          <Select value={config.selectedModel} onValueChange={(value) => updateConfig({ selectedModel: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{model.name}</span>
                      <Badge variant="secondary" className="text-xs">{model.type}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {config.mode === 'multi' && (
          <div>
            <label className="text-sm font-medium mb-2 block">Secondary Model</label>
            <Select 
              value={config.secondaryModel} 
              onValueChange={(value) => updateConfig({ secondaryModel: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {modelOptions
                  .filter(m => m.id !== config.selectedModel)
                  .map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{model.name}</span>
                          <Badge variant="secondary" className="text-xs">{model.type}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{model.description}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Enable Split Screen</h4>
            <p className="text-xs text-muted-foreground">Compare responses side-by-side</p>
          </div>
          <Switch
            checked={config.splitScreenEnabled}
            onCheckedChange={(checked) => updateConfig({ splitScreenEnabled: checked })}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Layers className="h-12 w-12 text-primary mx-auto" />
        <h3 className="text-lg font-semibold">Advanced Features</h3>
        <p className="text-sm text-muted-foreground">Enable additional AI capabilities</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <h4 className="text-sm font-medium">RAG (Retrieval Augmented Generation)</h4>
            </div>
            <p className="text-xs text-muted-foreground">Real-time knowledge retrieval</p>
          </div>
          <Switch
            checked={config.ragEnabled}
            onCheckedChange={(checked) => updateConfig({ ragEnabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <h4 className="text-sm font-medium">Knowledge Base</h4>
            </div>
            <p className="text-xs text-muted-foreground">Domain-specific knowledge</p>
          </div>
          <Switch
            checked={config.knowledgeBaseEnabled}
            onCheckedChange={(checked) => updateConfig({ knowledgeBaseEnabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <h4 className="text-sm font-medium">MCP (Model Context Protocol)</h4>
            </div>
            <p className="text-xs text-muted-foreground">Enhanced model connectivity</p>
          </div>
          <Switch
            checked={config.mcpEnabled}
            onCheckedChange={(checked) => updateConfig({ mcpEnabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Contextual Suggestions</h4>
            <p className="text-xs text-muted-foreground">Smart follow-up recommendations</p>
          </div>
          <Switch
            checked={config.contextualSuggestions}
            onCheckedChange={(checked) => updateConfig({ contextualSuggestions: checked })}
          />
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Your Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{config.mode.toUpperCase()}</Badge>
            <Badge variant="secondary">{modelOptions.find(m => m.id === config.selectedModel)?.name}</Badge>
            {config.secondaryModel && (
              <Badge variant="secondary">{modelOptions.find(m => m.id === config.secondaryModel)?.name}</Badge>
            )}
            {config.ragEnabled && <Badge variant="outline">RAG</Badge>}
            {config.knowledgeBaseEnabled && <Badge variant="outline">KB</Badge>}
            {config.mcpEnabled && <Badge variant="outline">MCP</Badge>}
            {config.splitScreenEnabled && <Badge variant="outline">Split Screen</Badge>}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Genie AI Configuration</span>
            <Badge variant="outline" className="text-xs">Step {step}/3</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Start Conversation
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};