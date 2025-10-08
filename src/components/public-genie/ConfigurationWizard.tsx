import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Settings, Layers, Zap, Database, Network, Cpu, Users, ChevronRight, ChevronLeft, Filter } from 'lucide-react';
import { AIConfig } from './AdvancedAISettings';

interface ConfigurationWizardProps {
  isOpen: boolean;
  onComplete: (config: AIConfig) => void;
  onCancel: () => void;
  initialConfig?: Partial<AIConfig>;
  showSmartDefaults?: boolean;
}

const modelOptions = [
  // Large Language Models (LLMs) with Vision
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    type: 'LLM+Vision', 
    provider: 'OpenAI', 
    category: 'General',
    vision: true,
    medicalCapable: true,
    description: 'Advanced multimodal model for text and images',
    learnMoreUrl: 'https://platform.openai.com/docs/models/gpt-4o'
  },
  { 
    id: 'gpt-4o-mini', 
    name: 'GPT-4o Mini', 
    type: 'LLM+Vision', 
    provider: 'OpenAI', 
    category: 'General',
    vision: true,
    medicalCapable: true,
    description: 'Efficient vision model with good accuracy',
    learnMoreUrl: 'https://platform.openai.com/docs/models/gpt-4o-mini'
  },
  { 
    id: 'claude-3-opus', 
    name: 'Claude 3 Opus', 
    type: 'LLM+Vision', 
    provider: 'Anthropic', 
    category: 'General',
    vision: true,
    medicalCapable: true,
    description: 'Most capable Claude model with vision',
    learnMoreUrl: 'https://www.anthropic.com/claude'
  },
  { 
    id: 'claude-3-sonnet', 
    name: 'Claude 3 Sonnet', 
    type: 'LLM+Vision', 
    provider: 'Anthropic', 
    category: 'General',
    vision: true,
    medicalCapable: true,
    description: 'Balanced performance and cost',
    learnMoreUrl: 'https://www.anthropic.com/claude'
  },
  { 
    id: 'claude-3-haiku', 
    name: 'Claude 3 Haiku', 
    type: 'LLM+Vision', 
    provider: 'Anthropic', 
    category: 'General',
    vision: true,
    medicalCapable: false,
    description: 'Fastest Claude model with vision',
    learnMoreUrl: 'https://www.anthropic.com/claude'
  },
  { 
    id: 'gemini-pro-vision', 
    name: 'Gemini Pro Vision', 
    type: 'LLM+Vision', 
    provider: 'Google', 
    category: 'General',
    vision: true,
    medicalCapable: true,
    description: 'Google\'s multimodal AI model',
    learnMoreUrl: 'https://ai.google.dev/gemini-api/docs'
  },
  { 
    id: 'gemini-pro', 
    name: 'Gemini Pro', 
    type: 'LLM', 
    provider: 'Google', 
    category: 'General',
    vision: false,
    medicalCapable: false,
    description: 'Text-only Gemini model',
    learnMoreUrl: 'https://ai.google.dev/gemini-api/docs'
  },
  
  // Small Language Models (SLMs)
  { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', type: 'SLM', provider: 'Microsoft', category: 'Efficient', vision: false, medicalCapable: false, description: 'Compact efficient model', learnMoreUrl: 'https://azure.microsoft.com/en-us/products/phi' },
  { id: 'phi-3-mini', name: 'Phi-3 Mini', type: 'SLM', provider: 'Microsoft', category: 'Efficient', vision: false, medicalCapable: false, description: 'Small but capable model', learnMoreUrl: 'https://azure.microsoft.com/en-us/products/phi' },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', type: 'SLM', provider: 'Meta', category: 'Efficient', vision: false, medicalCapable: false, description: 'Open-source efficient model', learnMoreUrl: 'https://llama.meta.com/' },
  { id: 'mistral-7b', name: 'Mistral 7B', type: 'SLM', provider: 'Mistral', category: 'Efficient', vision: false, medicalCapable: false, description: 'High-performance 7B model', learnMoreUrl: 'https://mistral.ai/' },
  { id: 'gemma-7b', name: 'Gemma 7B', type: 'SLM', provider: 'Google', category: 'Efficient', vision: false, medicalCapable: false, description: 'Google\'s lightweight model', learnMoreUrl: 'https://ai.google.dev/gemma' },
  { id: 'qwen-7b', name: 'Qwen 7B', type: 'SLM', provider: 'Alibaba', category: 'Efficient', vision: false, medicalCapable: false, description: 'Alibaba\'s efficient model', learnMoreUrl: 'https://github.com/QwenLM/Qwen' },
  
  // Vision Language Models (VLMs)
  { 
    id: 'llava-1.6', 
    name: 'LLaVA 1.6', 
    type: 'VLM', 
    provider: 'LAION', 
    category: 'Vision',
    vision: true,
    medicalCapable: true,
    description: 'Open-source vision-language model',
    learnMoreUrl: 'https://llava-vl.github.io/'
  },
  { 
    id: 'cogvlm', 
    name: 'CogVLM', 
    type: 'VLM', 
    provider: 'Tsinghua', 
    category: 'Vision',
    vision: true,
    medicalCapable: true,
    description: 'Advanced vision understanding',
    learnMoreUrl: 'https://github.com/THUDM/CogVLM'
  },
  { 
    id: 'paligemma', 
    name: 'PaliGemma', 
    type: 'VLM', 
    provider: 'Google', 
    category: 'Vision',
    vision: true,
    medicalCapable: false,
    description: 'Google\'s VLM based on Gemma',
    learnMoreUrl: 'https://ai.google.dev/gemma/docs/paligemma'
  },
  
  // Biotech & Healthcare Models
  { id: 'biogpt', name: 'BioGPT', type: 'Biotech', provider: 'Microsoft', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Biomedical text generation', learnMoreUrl: 'https://github.com/microsoft/BioGPT' },
  { id: 'med-palm-2', name: 'Med-PaLM 2', type: 'Medical', provider: 'Google', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Medical question answering', learnMoreUrl: 'https://sites.research.google/med-palm/' },
  { id: 'clinical-bert', name: 'Clinical BERT', type: 'Medical', provider: 'MIT', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Clinical note analysis', learnMoreUrl: 'https://github.com/EmilyAlsentzer/clinicalBERT' },
  { id: 'bioclinical-bert', name: 'BioClinical BERT', type: 'Medical', provider: 'NCBI', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Biomedical NLP', learnMoreUrl: 'https://github.com/ncbi-nlp/NCBI_BERT' },
  { id: 'pubmedbert', name: 'PubMedBERT', type: 'Biotech', provider: 'NIH', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Trained on PubMed abstracts', learnMoreUrl: 'https://github.com/ncbi/pubmedbert' },
  { id: 'galactica-6.7b', name: 'Galactica 6.7B', type: 'Scientific', provider: 'Meta', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Scientific knowledge model', learnMoreUrl: 'https://github.com/paperswithcode/galai' },
  { id: 'biomistral-7b', name: 'BioMistral 7B', type: 'Medical', provider: 'Mistral', category: 'Healthcare', vision: false, medicalCapable: true, description: 'Medical domain Mistral', learnMoreUrl: 'https://huggingface.co/BioMistral/BioMistral-7B' },
];

export const ConfigurationWizard: React.FC<ConfigurationWizardProps> = ({
  isOpen,
  onComplete,
  onCancel,
  initialConfig,
  showSmartDefaults
}) => {
  const [step, setStep] = useState(1);
  const [modelFilter, setModelFilter] = useState<'all' | 'general' | 'slm' | 'vision' | 'healthcare'>('all');
  const [config, setConfig] = useState<AIConfig>({
    mode: 'default',
    ragEnabled: false,
    knowledgeBase: false,
    knowledgeBaseEnabled: false,
    mcpEnabled: false,
    selectedModel: 'gpt-4o-mini',
    secondaryModel: 'claude-3-haiku',
    splitScreen: false,
    splitScreenEnabled: false,
    contextualSuggestions: true,
  });
  
  // Track selected models for multi-agent mode
  const [selectedModels, setSelectedModels] = useState<{
    llm?: string;
    slm?: string;
    vision?: string;
    healthcare?: string;
  }>({});

  const getFilteredModels = () => {
    if (modelFilter === 'all') return modelOptions;
    if (modelFilter === 'general') return modelOptions.filter(m => m.category === 'General');
    if (modelFilter === 'slm') return modelOptions.filter(m => m.type === 'SLM');
    if (modelFilter === 'vision') return modelOptions.filter(m => m.category === 'Vision' || m.vision);
    if (modelFilter === 'healthcare') return modelOptions.filter(m => m.category === 'Healthcare');
    return modelOptions;
  };

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
      <div className="space-y-4">
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
      <div className="space-y-4">
      <div className="text-center space-y-2">
        <Settings className="h-12 w-12 text-primary mx-auto" />
        <h3 className="text-lg font-semibold">Select AI Models</h3>
        <p className="text-sm text-muted-foreground">
          {config.mode === 'default' ? 'System will auto-select the best model' : 
           config.mode === 'single' ? 'Choose your specialized model' : 
           'Choose primary and secondary models'}
        </p>
      </div>

      <div className="space-y-4">
        {config.mode === 'default' && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Auto-Selected Model</h4>
                <p className="text-sm text-muted-foreground">Genie will intelligently choose the best model based on your query</p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Badge variant="outline">GPT-4o Mini</Badge>
                  <Badge variant="outline">Claude Haiku</Badge>
                  <Badge variant="outline">Gemini Pro</Badge>
                </div>
              </div>
            </div>
          </Card>
        )}

        {config.mode === 'single' && (
          <>
            <div className="text-center mb-3">
              <p className="text-sm text-muted-foreground">Choose your preferred model for this conversation</p>
            </div>

            <div className="space-y-3">
              {/* General/LLM Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">LLM</Badge>
                  Large Language Model
                </label>
                <Select 
                  value={selectedModels.llm || config.selectedModel} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, llm: value }));
                    updateConfig({ selectedModel: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select General LLM" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {modelOptions.filter(m => m.category === 'General' && !m.type.includes('SLM')).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SLM Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">SLM</Badge>
                  Small Language Model (Optional)
                </label>
                <Select 
                  value={selectedModels.slm || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, slm: value }));
                    if (value !== 'none') {
                      updateConfig({ selectedModel: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select SLM (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.type === 'SLM').map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Vision Model Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">VLM</Badge>
                  Vision Language Model (Optional)
                </label>
                <Select 
                  value={selectedModels.vision || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, vision: value }));
                    if (value !== 'none') {
                      updateConfig({ visionEnabled: true, selectedModel: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vision model (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.category === 'Vision' || (m.vision && m.type.includes('VLM'))).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Healthcare Model Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Healthcare</Badge>
                  Medical/Biotech Model (Optional)
                </label>
                <Select 
                  value={selectedModels.healthcare || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, healthcare: value }));
                    if (value !== 'none') {
                      updateConfig({ selectedModel: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Healthcare model (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.category === 'Healthcare').map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {config.mode === 'multi' && (
          <>
            <div className="text-center mb-3">
              <p className="text-sm text-muted-foreground">Select models from different categories for diverse perspectives</p>
            </div>

            <div className="space-y-3">
              {/* LLM Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">LLM</Badge>
                  Large Language Model
                </label>
                <Select 
                  value={selectedModels.llm || config.selectedModel} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, llm: value }));
                    updateConfig({ selectedModel: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LLM" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {modelOptions.filter(m => m.category === 'General' && !m.type.includes('SLM')).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SLM Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">SLM</Badge>
                  Small Language Model (Optional)
                </label>
                <Select 
                  value={selectedModels.slm || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, slm: value }));
                    if (!config.secondaryModel || config.secondaryModel === selectedModels.slm) {
                      updateConfig({ secondaryModel: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select SLM (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.type === 'SLM').map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Vision Model Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">VLM</Badge>
                  Vision Language Model (Optional)
                </label>
                <Select 
                  value={selectedModels.vision || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, vision: value }));
                    updateConfig({ visionEnabled: true });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vision model (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.category === 'Vision' || (m.vision && m.type.includes('VLM'))).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Healthcare Model Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Healthcare</Badge>
                  Medical/Biotech Model (Optional)
                </label>
                <Select 
                  value={selectedModels.healthcare || ''} 
                  onValueChange={(value) => {
                    setSelectedModels(prev => ({ ...prev, healthcare: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Healthcare model (optional)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="none">None</SelectItem>
                    {modelOptions.filter(m => m.category === 'Healthcare').map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                            <Badge variant="secondary" className="text-xs">{model.provider}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
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
            {config.mode === 'multi' && (
              <>
                {selectedModels.llm && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.llm)?.name}</Badge>}
                {selectedModels.slm && selectedModels.slm !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.slm)?.name}</Badge>}
                {selectedModels.vision && selectedModels.vision !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.vision)?.name}</Badge>}
                {selectedModels.healthcare && selectedModels.healthcare !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.healthcare)?.name}</Badge>}
              </>
            )}
            {config.mode === 'single' && (
              <>
                {selectedModels.llm && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.llm)?.name}</Badge>}
                {selectedModels.slm && selectedModels.slm !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.slm)?.name}</Badge>}
                {selectedModels.vision && selectedModels.vision !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.vision)?.name}</Badge>}
                {selectedModels.healthcare && selectedModels.healthcare !== 'none' && <Badge variant="secondary">{modelOptions.find(m => m.id === selectedModels.healthcare)?.name}</Badge>}
              </>
            )}
            {config.mode === 'default' && (
              <Badge variant="secondary">{modelOptions.find(m => m.id === config.selectedModel)?.name}</Badge>
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm sm:max-w-md w-full h-[80vh] sm:h-[85vh] max-h-[85vh] overflow-hidden flex flex-col z-[100001]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <span>Genie AI Configuration</span>
            <Badge variant="outline" className="text-xs">Step {step}/3</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 px-2 min-h-0">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <DialogFooter className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0 flex justify-between border-t px-2 py-3 mt-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
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