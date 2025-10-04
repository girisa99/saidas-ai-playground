import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Brain, Database, Network, Settings2, Cpu, Users, Eye, AlertTriangle, ExternalLink, FileImage, Zap, Image, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { genieAnalyticsService } from '@/services/genieAnalyticsService';

interface AdvancedAISettingsProps {
  onConfigChange: (config: AIConfig) => void;
  currentConfig: AIConfig;
  userEmail?: string;
  context?: string;
}

export interface AIConfig {
  mode: 'default' | 'single' | 'multi';
  ragEnabled: boolean;
  knowledgeBase: boolean;  // Renamed from knowledgeBaseEnabled for consistency
  knowledgeBaseEnabled: boolean;  // Keep for backwards compatibility
  mcpEnabled: boolean;
  selectedModel: string;
  secondaryModel?: string;
  splitScreen: boolean;  // Renamed from splitScreenEnabled for consistency
  splitScreenEnabled: boolean;  // Keep for backwards compatibility
  contextualSuggestions: boolean;
  visionEnabled?: boolean;
  medicalImageMode?: boolean;
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

type ModelOption = typeof modelOptions[0];

export const AdvancedAISettings: React.FC<AdvancedAISettingsProps> = ({ 
  onConfigChange, 
  currentConfig,
  userEmail,
  context = 'healthcare'
}) => {
  const [config, setConfig] = useState<AIConfig>(currentConfig);
  const [modelFilter, setModelFilter] = useState<'all' | 'general' | 'slm' | 'vision' | 'healthcare'>('all');

  const updateConfig = (updates: Partial<AIConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);

    // Track vision feature toggles
    if (userEmail) {
      if (updates.visionEnabled !== undefined && updates.visionEnabled !== config.visionEnabled) {
        genieAnalyticsService.trackVisionFeature({
          user_email: userEmail,
          feature_type: 'vision_enabled',
          context,
          metadata: {
            model_name: newConfig.selectedModel
          },
          timestamp: new Date().toISOString()
        });
      }

      if (updates.medicalImageMode !== undefined && updates.medicalImageMode !== config.medicalImageMode) {
        genieAnalyticsService.trackVisionFeature({
          user_email: userEmail,
          feature_type: 'medical_mode_enabled',
          context,
          metadata: {
            model_name: newConfig.selectedModel
          },
          timestamp: new Date().toISOString()
        });
      }
    }
  };

  const selectedModel = modelOptions.find(m => m.id === config.selectedModel);
  
  // Filter models based on selected filter
  const getFilteredModels = () => {
    switch (modelFilter) {
      case 'general':
        return modelOptions.filter(m => m.category === 'General');
      case 'slm':
        return modelOptions.filter(m => m.category === 'Efficient');
      case 'vision':
        return modelOptions.filter(m => m.category === 'Vision');
      case 'healthcare':
        return modelOptions.filter(m => m.category === 'Healthcare');
      default:
        return modelOptions;
    }
  };

  const filteredModels = getFilteredModels();

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 max-h-96 overflow-y-auto">
        {/* Mode Selection - Cleaner */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">AI Mode</h3>
          </div>
          
          <Select value={config.mode} onValueChange={(value: 'default' | 'single' | 'multi') => updateConfig({ mode: value })}>
            <SelectTrigger className="h-9 bg-card border-border/50">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-[100000]">
              <SelectItem value="default" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-3.5 w-3.5" />
                  <span>Balanced</span>
                </div>
              </SelectItem>
              <SelectItem value="single" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Focused</span>
                </div>
              </SelectItem>
              <SelectItem value="multi" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>Consensus</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Model Selection - Cleaner with Icon Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm">Model Selection</h3>
          </div>
          
          {/* Icon-based Filter Buttons */}
          <div className="flex gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={modelFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModelFilter('all')}
                  className="h-8 w-8 p-0 transition-all"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">All ({modelOptions.length})</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={modelFilter === 'general' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModelFilter('general')}
                  className="h-8 w-8 p-0 transition-all"
                >
                  <Brain className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">LLM+Vision ({modelOptions.filter(m => m.category === 'General').length})</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={modelFilter === 'slm' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModelFilter('slm')}
                  className="h-8 w-8 p-0 transition-all"
                >
                  <Zap className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Small LM ({modelOptions.filter(m => m.category === 'Efficient').length})</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={modelFilter === 'vision' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModelFilter('vision')}
                  className="h-8 w-8 p-0 transition-all"
                >
                  <Image className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Vision ({modelOptions.filter(m => m.category === 'Vision').length})</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={modelFilter === 'healthcare' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setModelFilter('healthcare')}
                  className="h-8 w-8 p-0 transition-all"
                >
                  <Stethoscope className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Healthcare ({modelOptions.filter(m => m.category === 'Healthcare').length})</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Model Dropdown - Cleaner */}
          <Select value={config.selectedModel} onValueChange={(value) => updateConfig({ selectedModel: value })}>
            <SelectTrigger className="h-9 bg-card border-border/50">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-[100000] max-h-[280px]">
              {filteredModels.length === 0 ? (
                <div className="px-3 py-6 text-xs text-center text-muted-foreground">
                  No models in this category
                </div>
              ) : (
                filteredModels.map((model) => (
                  <SelectItem key={model.id} value={model.id} className="cursor-pointer">
                    <div className="flex items-center justify-between gap-3 w-full">
                      <span className="text-sm font-medium">{model.name}</span>
                      <div className="flex gap-1">
                        {model.vision && <Eye className="h-3 w-3 text-primary" />}
                        {model.medicalCapable && <Stethoscope className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Selected Model Info - Streamlined */}
          {selectedModel && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-3 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5 flex-1">
                  <p className="text-sm font-medium">{selectedModel.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedModel.description}</p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {selectedModel.provider}
                </Badge>
              </div>
              
              {(selectedModel.vision || selectedModel.medicalCapable) && (
                <div className="flex gap-1.5 flex-wrap">
                  {selectedModel.vision && (
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                      <Eye className="h-2.5 w-2.5 mr-1" />
                      Vision
                    </Badge>
                  )}
                  {selectedModel.medicalCapable && (
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                      <Stethoscope className="h-2.5 w-2.5 mr-1" />
                      Medical
                    </Badge>
                  )}
                </div>
              )}
              
              {selectedModel.learnMoreUrl && (
                <a 
                  href={selectedModel.learnMoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}
        </div>

        <Separator />

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
              <Label className="text-xs font-medium flex items-center gap-1">
                RAG (Retrieval Augmented Generation)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted text-[10px] cursor-help">i</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">Grounds answers by retrieving relevant snippets from your indexed sources.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
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
              <Label className="text-xs font-medium flex items-center gap-1">
                Knowledge Base
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted text-[10px] cursor-help">i</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">Uses the unified Universal Knowledge Base topics to enrich responses.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-muted text-[10px] cursor-help">i</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">Connects the model to tools, APIs, and data connectors for richer context.</p>
                  </TooltipContent>
                </Tooltip>
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

      {/* Vision & Medical Image Analysis */}
      {selectedModel?.vision && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Vision Capabilities
            </CardTitle>
            <CardDescription className="text-xs">
              Medical image analysis (Experimental)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {/* Vision Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-medium flex items-center gap-1">
                  <FileImage className="h-3 w-3" />
                  Enable Image Analysis
                </Label>
                <p className="text-xs text-muted-foreground">Upload and analyze images</p>
              </div>
              <Switch
                checked={config.visionEnabled || false}
                onCheckedChange={(checked) => updateConfig({ visionEnabled: checked })}
              />
            </div>
            
            <Separator />
            
            {/* Medical Image Mode */}
            {selectedModel?.medicalCapable && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium flex items-center gap-1">
                      Medical Image Mode
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                    </Label>
                    <p className="text-xs text-muted-foreground">X-rays, CT, MRI, ECG analysis</p>
                  </div>
                  <Switch
                    checked={config.medicalImageMode || false}
                    onCheckedChange={(checked) => updateConfig({ medicalImageMode: checked })}
                  />
                </div>
                
                {config.medicalImageMode && (
                  <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <AlertTitle className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                      Educational Use Only - Not for Diagnosis
                    </AlertTitle>
                    <AlertDescription className="text-xs text-orange-800 dark:text-orange-200 space-y-1 mt-1">
                      <p><strong>⚠️ Important Disclaimers:</strong></p>
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li>NOT FDA-approved for medical diagnosis</li>
                        <li>For educational & research purposes only</li>
                        <li>No PHI is stored or transmitted</li>
                        <li>Always consult licensed healthcare providers</li>
                        <li>Results are AI-generated interpretations</li>
                      </ul>
                      <p className="mt-2 text-[10px]">
                        By enabling this feature, you acknowledge this is an experimental technology demonstration for learning purposes only.
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* Vision Model Capabilities */}
                {config.medicalImageMode && (
                  <div className="bg-muted/50 rounded-md p-2 space-y-1">
                    <p className="text-xs font-medium">This model can help analyze:</p>
                    <div className="grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-1">✓ X-ray images</div>
                      <div className="flex items-center gap-1">✓ CT scans</div>
                      <div className="flex items-center gap-1">✓ MRI images</div>
                      <div className="flex items-center gap-1">✓ ECG/EKG</div>
                      <div className="flex items-center gap-1">✓ Ultrasound</div>
                      <div className="flex items-center gap-1">✓ Pathology slides</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

        {/* Current Configuration Summary */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
          <p className="text-xs font-medium mb-2">Active Configuration</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="default" className="text-[10px] px-2">
              {config.mode.charAt(0).toUpperCase() + config.mode.slice(1)}
            </Badge>
            <Badge variant="secondary" className="text-[10px] px-2">
              {selectedModel?.name || 'No model'}
            </Badge>
            {config.ragEnabled && <Badge variant="outline" className="text-[10px] px-2">RAG</Badge>}
            {config.knowledgeBaseEnabled && <Badge variant="outline" className="text-[10px] px-2">Knowledge</Badge>}
            {config.mcpEnabled && <Badge variant="outline" className="text-[10px] px-2">MCP</Badge>}
            {config.splitScreenEnabled && <Badge variant="outline" className="text-[10px] px-2">Split</Badge>}
            {config.visionEnabled && <Badge variant="outline" className="text-[10px] px-2">Vision</Badge>}
            {config.medicalImageMode && <Badge variant="outline" className="text-[10px] px-2">Medical</Badge>}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};