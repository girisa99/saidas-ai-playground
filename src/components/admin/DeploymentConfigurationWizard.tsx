import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createDeployment } from "@/services/deploymentService";
import { 
  ChevronRight, ChevronLeft, Check, Loader2, Database, Brain, Server, Settings,
  Building2, DollarSign, MapPin, Plus, Trash2, Link, Globe, FileText, Sparkles,
  Eye, Cpu, Stethoscope, Zap
} from "lucide-react";

// Complete model options matching Genie AI system
const MODEL_OPTIONS = {
  llm: [
    { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: 'Top-tier multimodal, complex reasoning', vision: true },
    { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: 'Balanced cost & performance', vision: true },
    { id: 'openai/gpt-5', name: 'GPT-5', provider: 'OpenAI', description: 'Powerful reasoning, long context', vision: true },
    { id: 'openai/gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', description: 'Lower cost, strong performance', vision: true },
    { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', description: 'Superior reasoning & intelligence', vision: true },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Most capable Claude with vision', vision: true },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', description: 'Balanced performance and cost', vision: true },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Advanced multimodal model', vision: true },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Efficient vision model', vision: true },
  ],
  slm: [
    { id: 'google/gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite', provider: 'Google', description: 'Fastest, cheapest Gemini' },
    { id: 'openai/gpt-5-nano', name: 'GPT-5 Nano', provider: 'OpenAI', description: 'Speed & cost optimized' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', description: 'Fastest Claude model' },
    { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', provider: 'Microsoft', description: 'Compact efficient model' },
    { id: 'phi-3-mini', name: 'Phi-3 Mini', provider: 'Microsoft', description: 'Small but capable' },
    { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', provider: 'Meta', description: 'Open-source efficient' },
    { id: 'mistral-7b', name: 'Mistral 7B', provider: 'Mistral', description: 'High-performance 7B' },
    { id: 'gemma-7b', name: 'Gemma 7B', provider: 'Google', description: 'Lightweight model' },
    { id: 'qwen-7b', name: 'Qwen 7B', provider: 'Alibaba', description: 'Efficient multilingual' },
  ],
  vlm: [
    { id: 'google/gemini-2.0-flash-vision', name: 'Gemini 2.0 Flash Vision', provider: 'Google', description: 'Fast vision processing' },
    { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', provider: 'Google', description: 'Multimodal AI model' },
    { id: 'gpt-4-vision', name: 'GPT-4 Vision', provider: 'OpenAI', description: 'Advanced image analysis' },
    { id: 'llava-1.6', name: 'LLaVA 1.6', provider: 'LAION', description: 'Open-source VLM' },
    { id: 'cogvlm', name: 'CogVLM', provider: 'Tsinghua', description: 'Advanced vision understanding' },
    { id: 'paligemma', name: 'PaliGemma', provider: 'Google', description: 'VLM based on Gemma' },
  ],
  healthcare: [
    { id: 'med-palm-2', name: 'Med-PaLM 2', provider: 'Google', description: 'Medical question answering' },
    { id: 'biogpt', name: 'BioGPT', provider: 'Microsoft', description: 'Biomedical text generation' },
    { id: 'clinical-bert', name: 'Clinical BERT', provider: 'MIT', description: 'Clinical note analysis' },
    { id: 'bioclinical-bert', name: 'BioClinical BERT', provider: 'NCBI', description: 'Biomedical NLP' },
    { id: 'pubmedbert', name: 'PubMedBERT', provider: 'NIH', description: 'PubMed abstracts trained' },
    { id: 'biomistral-7b', name: 'BioMistral 7B', provider: 'Mistral', description: 'Medical domain Mistral' },
    { id: 'galactica-6.7b', name: 'Galactica 6.7B', provider: 'Meta', description: 'Scientific knowledge' },
  ],
};

interface WizardProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Agent {
  id: string;
  name: string;
  description: string | null;
  status: string | null;
  agent_type: string | null;
}

interface KnowledgeBaseEntry {
  id: string;
  finding_name: string | null;
  description: string | null;
  domain: string | null;
  content_type: string | null;
  dataset_source?: string | null;
  metadata?: any;
  quality_score?: number | null;
  usage_count?: number | null;
}

interface MCPServer {
  id: string;
  server_id: string | null;
  name: string | null;
  description: string | null;
  type: string | null;
  capabilities: any;
  is_active: boolean | null;
  reliability_score?: number | null;
  status?: string | null;
}

interface CustomRAGSource {
  id: string;
  name: string;
  url: string;
  type: 'website' | 'document' | 'api' | 'database';
  description?: string;
}

interface DataSourceConfig {
  treatmentCenters: boolean;
  productPricing: boolean;
  insuranceInfo: boolean;
  healthcareKnowledge: boolean;
  medicalImaging: boolean;
}

export default function DeploymentConfigurationWizard({ open, onClose, onSuccess }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Step 1: Basic Info & Branding
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandColor, setBrandColor] = useState("#8B5CF6");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I assist you today?");

  // Step 2: Knowledge Base
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [kbFilter, setKbFilter] = useState<string>("all");

  // Step 3: Custom RAG Sources
  const [customRAGSources, setCustomRAGSources] = useState<CustomRAGSource[]>([]);
  const [newRAGUrl, setNewRAGUrl] = useState("");
  const [newRAGName, setNewRAGName] = useState("");
  const [newRAGType, setNewRAGType] = useState<'website' | 'document' | 'api' | 'database'>('website');

  // Step 4: Pre-configured Data Sources
  const [dataSourceConfig, setDataSourceConfig] = useState<DataSourceConfig>({
    treatmentCenters: true,
    productPricing: true,
    insuranceInfo: true,
    healthcareKnowledge: true,
    medicalImaging: false,
  });
  const [treatmentCenterCount, setTreatmentCenterCount] = useState(0);

  // Step 5: Model Configuration
  const [selectedModelId, setSelectedModelId] = useState("google/gemini-2.5-flash");
  const [modelCategory, setModelCategory] = useState<'llm' | 'slm' | 'vlm' | 'healthcare'>('llm');
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");
  const [enableVision, setEnableVision] = useState(false);
  const [enableSplitScreen, setEnableSplitScreen] = useState(false);
  const [splitScreenModels, setSplitScreenModels] = useState<string[]>([]);
  const [enableSmartRouting, setEnableSmartRouting] = useState(true); // Smart routing & rich features
  const [aiMode, setAiMode] = useState<'default' | 'single' | 'multi'>('default'); // AI collaboration mode

  // Step 6: MCP Servers
  const [mcpServers, setMcpServers] = useState<MCPServer[]>([]);
  const [selectedMcpServers, setSelectedMcpServers] = useState<string[]>([]);

  // Step 7 (Optional): Agent Linking
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [enableAgentLink, setEnableAgentLink] = useState(false);

  const totalSteps = 8; // Updated to 8 steps

  // Load all data on mount
  useEffect(() => {
    if (open) {
      loadAllData();
    }
  }, [open]);

  const loadAllData = async () => {
    setLoadingData(true);
    await Promise.all([
      loadKnowledgeBase(),
      loadMcpServers(),
      loadTreatmentCenterCount(),
      loadAgents(),
    ]);
    setLoadingData(false);
  };

  const loadKnowledgeBase = async () => {
    try {
      const { data, error } = await supabase
        .from("universal_knowledge_base")
        .select("id, finding_name, description, domain, content_type, dataset_source, metadata, quality_score, usage_count")
        .order("usage_count", { ascending: false })
        .limit(100);

      if (error) throw error;
      setKnowledgeEntries(data || []);
    } catch (error) {
      console.error("Error loading knowledge base:", error);
    }
  };

  const loadMcpServers = async () => {
    try {
      const { data, error } = await supabase
        .from("mcp_servers")
        .select("*")
        .eq("is_active", true)
        .order("reliability_score", { ascending: false });

      if (error) throw error;
      setMcpServers(data || []);
    } catch (error) {
      console.error("Error loading MCP servers:", error);
    }
  };

  const loadTreatmentCenterCount = async () => {
    try {
      const { count, error } = await supabase
        .from("treatment_centers")
        .select("*", { count: 'exact', head: true });

      if (!error && count) {
        setTreatmentCenterCount(count);
      }
    } catch (error) {
      console.error("Error loading treatment center count:", error);
    }
  };

  const loadAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('id, name, description, status, agent_type')
        .eq('status', 'active')
        .order('name');
      
      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error loading agents:', error);
      toast.error('Failed to load agents');
    }
  };

  const handleAddRAGSource = () => {
    if (!newRAGUrl.trim() || !newRAGName.trim()) {
      toast.error("Please provide both name and URL");
      return;
    }

    const newSource: CustomRAGSource = {
      id: crypto.randomUUID(),
      name: newRAGName.trim(),
      url: newRAGUrl.trim(),
      type: newRAGType,
    };

    setCustomRAGSources([...customRAGSources, newSource]);
    setNewRAGUrl("");
    setNewRAGName("");
    toast.success("RAG source added");
  };

  const handleRemoveRAGSource = (id: string) => {
    setCustomRAGSources(customRAGSources.filter(s => s.id !== id));
  };

  const handleNext = () => {
    if (currentStep === 1 && !name.trim()) {
      toast.error("Please enter a deployment name");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const knowledgeSnapshot = selectedKnowledge.length > 0
        ? knowledgeEntries.filter((kb) => selectedKnowledge.includes(kb.id))
        : null;

      const mcpSnapshot = selectedMcpServers.length > 0
        ? mcpServers.filter((mcp) => selectedMcpServers.includes(mcp.id))
        : null;

      const modelConfig = {
        model: selectedModelId,
        category: modelCategory,
        temperature: parseFloat(temperature),
        max_tokens: parseInt(maxTokens),
        enable_vision: enableVision,
        enable_split_screen: enableSplitScreen,
        split_screen_models: enableSplitScreen ? splitScreenModels : [],
        enable_smart_routing: enableSmartRouting,
        ai_mode: aiMode,
      };

      const brandConfig = {
        name: brandName || name,
        color: brandColor,
        welcome_message: welcomeMessage,
      };

      await createDeployment({
        name,
        description,
        configuration: {
          knowledgeBaseIds: selectedKnowledge,
          mcpServerIds: selectedMcpServers,
          customRAGSources,
          dataSourceConfig,
          brand: brandConfig,
        },
        knowledge_base_snapshot: knowledgeSnapshot,
        mcp_servers_snapshot: mcpSnapshot,
        model_config: modelConfig,
        agent_id: enableAgentLink && selectedAgentId ? selectedAgentId : null, // Hybrid: optional agent link
      });

      toast.success("Deployment created successfully!");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error creating deployment:", error);
      toast.error("Failed to create deployment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setName("");
    setDescription("");
    setBrandName("");
    setBrandColor("#8B5CF6");
    setWelcomeMessage("Hello! How can I assist you today?");
    setSelectedKnowledge([]);
    setSelectedMcpServers([]);
    setCustomRAGSources([]);
    setDataSourceConfig({
      treatmentCenters: true,
      productPricing: true,
      insuranceInfo: true,
      healthcareKnowledge: true,
      medicalImaging: false,
    });
    setSelectedModelId("google/gemini-2.5-flash");
    setModelCategory('llm');
    setTemperature("0.7");
    setMaxTokens("2000");
    setEnableVision(false);
    setEnableSplitScreen(false);
    setSplitScreenModels([]);
    onClose();
  };

  const toggleKnowledge = (id: string) => {
    setSelectedKnowledge((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const toggleMcpServer = (id: string) => {
    setSelectedMcpServers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const filteredKnowledgeEntries = knowledgeEntries.filter(entry => {
    if (kbFilter === "all") return true;
    return entry.domain === kbFilter;
  });

  const domains = [...new Set(knowledgeEntries.map(e => e.domain))];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information & Branding</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deployment-name">Deployment Name *</Label>
                <Input
                  id="deployment-name"
                  placeholder="e.g., Customer Support Bot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deployment-description">Description</Label>
                <Textarea
                  id="deployment-description"
                  placeholder="Describe what this deployment will be used for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  placeholder="e.g., HealthCare Genie"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-color">Brand Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="brand-color"
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    placeholder="#8B5CF6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  placeholder="Hello! How can I assist you today?"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Knowledge Base (RAG)</h3>
              </div>
              <Select value={kbFilter} onValueChange={setKbFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.map(domain => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Select knowledge base entries to include. {knowledgeEntries.length} entries available.
            </p>

            {loadingData ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {filteredKnowledgeEntries.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No knowledge base entries found
                    </p>
                  ) : (
                    filteredKnowledgeEntries.map((entry) => (
                      <Card
                        key={entry.id}
                        className={`cursor-pointer transition-colors ${
                          selectedKnowledge.includes(entry.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => toggleKnowledge(entry.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <Checkbox
                            checked={selectedKnowledge.includes(entry.id)}
                            onCheckedChange={() => toggleKnowledge(entry.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">
                              {entry.finding_name ?? 'Untitled'}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {entry.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline" className="text-xs">{entry.domain ?? 'unknown'}</Badge>
                              <Badge variant="secondary" className="text-xs">{entry.content_type ?? 'unknown'}</Badge>
                              {entry.dataset_source && (
                                <Badge variant="default" className="text-xs bg-blue-600">
                                  {entry.dataset_source}
                                </Badge>
                              )}
                              {entry.quality_score && entry.quality_score > 80 && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  High Quality
                                </Badge>
                              )}
                            </div>
                            {entry.usage_count && entry.usage_count > 0 && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Used {entry.usage_count} times
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-muted-foreground">
                Selected: {selectedKnowledge.length} entries
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedKnowledge(filteredKnowledgeEntries.map(e => e.id))}
              >
                Select All Visible
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Custom RAG Sources</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Add custom URLs, documents, or API endpoints for additional knowledge retrieval.
            </p>

            <Card className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source Name</Label>
                    <Input
                      placeholder="e.g., Company FAQ"
                      value={newRAGName}
                      onChange={(e) => setNewRAGName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Source Type</Label>
                    <Select value={newRAGType} onValueChange={(v: any) => setNewRAGType(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="api">API Endpoint</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URL / Endpoint</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com/faq or /api/knowledge"
                      value={newRAGUrl}
                      onChange={(e) => setNewRAGUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddRAGSource}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-2 mt-4">
              <Label className="text-sm font-medium">Added Sources ({customRAGSources.length})</Label>
              <ScrollArea className="h-[200px]">
                {customRAGSources.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No custom sources added yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {customRAGSources.map((source) => (
                      <Card key={source.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {source.type === 'website' && <Globe className="w-4 h-4 text-blue-500" />}
                            {source.type === 'document' && <FileText className="w-4 h-4 text-green-500" />}
                            {source.type === 'api' && <Server className="w-4 h-4 text-purple-500" />}
                            {source.type === 'database' && <Database className="w-4 h-4 text-orange-500" />}
                            <div>
                              <p className="font-medium text-sm">{source.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                                {source.url}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRAGSource(source.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Pre-configured Data Sources</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Enable built-in data sources for healthcare and business knowledge.
            </p>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Treatment Centers Database</h4>
                      <p className="text-sm text-muted-foreground">
                        {treatmentCenterCount} treatment centers with locations, services, and contact info
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSourceConfig.treatmentCenters}
                    onCheckedChange={(checked) => 
                      setDataSourceConfig(prev => ({ ...prev, treatmentCenters: checked }))
                    }
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Product & Pricing Knowledge</h4>
                      <p className="text-sm text-muted-foreground">
                        Pricing guides, product information, and journey data
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSourceConfig.productPricing}
                    onCheckedChange={(checked) => 
                      setDataSourceConfig(prev => ({ ...prev, productPricing: checked }))
                    }
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Insurance & Verification Info</h4>
                      <p className="text-sm text-muted-foreground">
                        Insurance verification, coverage details, and FAQs
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSourceConfig.insuranceInfo}
                    onCheckedChange={(checked) => 
                      setDataSourceConfig(prev => ({ ...prev, insuranceInfo: checked }))
                    }
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Healthcare Knowledge Base</h4>
                      <p className="text-sm text-muted-foreground">
                        Educational content, guidelines, and conversational FAQs
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSourceConfig.healthcareKnowledge}
                    onCheckedChange={(checked) => 
                      setDataSourceConfig(prev => ({ ...prev, healthcareKnowledge: checked }))
                    }
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    <div>
                      <h4 className="font-medium">Medical Imaging Knowledge</h4>
                      <p className="text-sm text-muted-foreground">
                        Medical imaging findings, radiology guidelines (requires vision model)
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={dataSourceConfig.medicalImaging}
                    onCheckedChange={(checked) => 
                      setDataSourceConfig(prev => ({ ...prev, medicalImaging: checked }))
                    }
                  />
                </div>
              </Card>
            </div>
          </div>
        );

      case 5:
        const getSelectedModel = () => {
          const allModels = [...MODEL_OPTIONS.llm, ...MODEL_OPTIONS.slm, ...MODEL_OPTIONS.vlm, ...MODEL_OPTIONS.healthcare];
          return allModels.find(m => m.id === selectedModelId);
        };
        const currentModel = getSelectedModel();
        
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Model Configuration</h3>
            </div>
            
            <Tabs value={modelCategory} onValueChange={(v: any) => setModelCategory(v)} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="llm" className="gap-1">
                  <Brain className="w-3 h-3" />
                  <span className="hidden sm:inline">LLM</span>
                </TabsTrigger>
                <TabsTrigger value="slm" className="gap-1">
                  <Zap className="w-3 h-3" />
                  <span className="hidden sm:inline">SLM</span>
                </TabsTrigger>
                <TabsTrigger value="vlm" className="gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">Vision</span>
                </TabsTrigger>
                <TabsTrigger value="healthcare" className="gap-1">
                  <Stethoscope className="w-3 h-3" />
                  <span className="hidden sm:inline">Medical</span>
                </TabsTrigger>
              </TabsList>

              {(['llm', 'slm', 'vlm', 'healthcare'] as const).map((category) => (
                <TabsContent key={category} value={category} className="mt-4">
                  <ScrollArea className="h-[200px]">
                    <RadioGroup value={selectedModelId} onValueChange={setSelectedModelId}>
                      <div className="space-y-2">
                        {MODEL_OPTIONS[category].map((model) => (
                          <Card 
                            key={model.id} 
                            className={`cursor-pointer transition-colors ${selectedModelId === model.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                            onClick={() => setSelectedModelId(model.id)}
                          >
                            <CardContent className="p-3 flex items-center gap-3">
                              <RadioGroupItem value={model.id} id={model.id} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{model.name}</span>
                                  <Badge variant="outline" className="text-xs">{model.provider}</Badge>
                                  {'vision' in model && model.vision && (
                                    <Badge variant="secondary" className="text-xs">Vision</Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{model.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </RadioGroup>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>

            {currentModel && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Selected:</span> {currentModel.name} ({currentModel.provider})
                </p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Higher = more creative (0-2)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-tokens">Max Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  min="100"
                  max="8000"
                  step="100"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Response length limit</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Advanced Features</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Smart Routing & Rich Features</Label>
                  <p className="text-xs text-muted-foreground">
                    AI optimization, suggestions, humor, empathy, rich media (images, tables, HTML)
                  </p>
                </div>
                <Switch
                  checked={enableSmartRouting}
                  onCheckedChange={setEnableSmartRouting}
                />
              </div>

              {enableSmartRouting && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">Smart Routing includes:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Intent-based model routing (SLM → Healthcare → LLM → Vision)</li>
                        <li>Optimization transparency (rationale, cost, latency)</li>
                        <li>Context persistence across messages (full conversation history)</li>
                        <li>Intelligent context switching (healthcare ↔ technology detection)</li>
                        <li>KB/RAG-aware topic suggestions from knowledge base</li>
                        <li>Milestone suggestions (at 3, 5, 7 messages)</li>
                        <li>Proactive conversation guidance based on intent</li>
                        <li>Emotional intelligence & tone adaptation</li>
                        <li>Contextual humor (when appropriate)</li>
                        <li>Rich media rendering (images, tables, HTML, journey maps)</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>AI Collaboration Mode</Label>
                <RadioGroup value={aiMode} onValueChange={(value: 'default' | 'single' | 'multi') => setAiMode(value)}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="default" id="mode-default" />
                      <label htmlFor="mode-default" className="flex-1 cursor-pointer">
                        <div className="font-medium">Default Mode</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Single AI model with smart routing optimization
                        </p>
                      </label>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="single" id="mode-single" />
                      <label htmlFor="mode-single" className="flex-1 cursor-pointer">
                        <div className="font-medium">Single Agent Mode</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          One specialized agent with role-based expertise
                        </p>
                      </label>
                    </div>
                    <div className="flex items-start gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="multi" id="mode-multi" />
                      <label htmlFor="mode-multi" className="flex-1 cursor-pointer">
                        <div className="font-medium">Multi-Agent Mode</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Collaborative agents with consensus scoring & voting
                        </p>
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Vision (Image Analysis)</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow image uploads for medical/document analysis
                  </p>
                </div>
                <Switch
                  checked={enableVision}
                  onCheckedChange={setEnableVision}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Split-Screen Comparison</Label>
                  <p className="text-xs text-muted-foreground">
                    Compare responses from multiple models side-by-side
                  </p>
                </div>
                <Switch
                  checked={enableSplitScreen}
                  onCheckedChange={setEnableSplitScreen}
                />
              </div>

              {enableSplitScreen && (
                <div className="space-y-2 p-3 border rounded-lg">
                  <Label>Select Additional Models for Comparison</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[...MODEL_OPTIONS.llm.slice(0, 4), ...MODEL_OPTIONS.slm.slice(0, 2)].map((model) => (
                      model.id !== selectedModelId && (
                        <div key={model.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`split-${model.id}`}
                            checked={splitScreenModels.includes(model.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSplitScreenModels([...splitScreenModels, model.id].slice(0, 3));
                              } else {
                                setSplitScreenModels(splitScreenModels.filter(id => id !== model.id));
                              }
                            }}
                          />
                          <label htmlFor={`split-${model.id}`} className="text-xs">{model.name}</label>
                        </div>
                      )
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Max 3 models for comparison</p>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        const supabaseMcpServers = mcpServers.filter(s => s.server_id?.includes('supabase') || s.name?.toLowerCase().includes('supabase'));
        const localStorageMcpServers = mcpServers.filter(s => s.type === 'local' || s.name?.toLowerCase().includes('local storage'));
        const externalMcpServers = mcpServers.filter(s => 
          !s.server_id?.includes('supabase') && 
          s.type !== 'local' &&
          !s.name?.toLowerCase().includes('supabase') &&
          !s.name?.toLowerCase().includes('local storage')
        );

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">MCP Servers</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Select MCP (Model Context Protocol) servers to enhance capabilities.
              {mcpServers.length > 0 && ` ${mcpServers.length} servers available.`}
            </p>

            {loadingData ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {mcpServers.length === 0 ? (
                    <Card className="p-6 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No active MCP servers configured
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Configure MCP servers in the admin panel to enable here
                      </p>
                    </Card>
                  ) : (
                    <>
                      {/* Supabase Integration */}
                      {supabaseMcpServers.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Database className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-sm">Supabase Integration</h4>
                            <Badge variant="secondary" className="text-xs">{supabaseMcpServers.length}</Badge>
                          </div>
                          <div className="space-y-2">
                            {supabaseMcpServers.map((server) => (
                      <Card
                        key={server.id}
                        className={`cursor-pointer transition-colors ${
                          selectedMcpServers.includes(server.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => toggleMcpServer(server.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <Checkbox
                            checked={selectedMcpServers.includes(server.id)}
                            onCheckedChange={() => toggleMcpServer(server.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{server.name ?? 'Unnamed Server'}</h4>
                              {server.status === 'active' && (
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {server.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline">{server.type ?? 'unknown'}</Badge>
                              {Array.isArray(server.capabilities) && server.capabilities.slice(0, 3).map((cap: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {cap}
                                </Badge>
                              ))}
                              {server.reliability_score && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  {server.reliability_score}/10 reliability
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Local Storage Servers */}
                      {localStorageMcpServers.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Database className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold text-sm">Local Storage Servers</h4>
                            <Badge variant="secondary" className="text-xs">{localStorageMcpServers.length}</Badge>
                          </div>
                          <div className="space-y-2">
                            {localStorageMcpServers.map((server) => (
                      <Card
                        key={server.id}
                        className={`cursor-pointer transition-colors border-l-4 border-l-blue-600 ${
                          selectedMcpServers.includes(server.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => toggleMcpServer(server.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <Checkbox
                            checked={selectedMcpServers.includes(server.id)}
                            onCheckedChange={() => toggleMcpServer(server.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{server.name ?? 'Unnamed Server'}</h4>
                              {server.status === 'active' && (
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {server.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline">{server.type ?? 'unknown'}</Badge>
                              {Array.isArray(server.capabilities) && server.capabilities.slice(0, 3).map((cap: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {cap}
                                </Badge>
                              ))}
                              {server.reliability_score && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  {server.reliability_score}/10 reliability
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* External Servers */}
                      {externalMcpServers.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Globe className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-sm">External Servers</h4>
                            <Badge variant="secondary" className="text-xs">{externalMcpServers.length}</Badge>
                          </div>
                          <div className="space-y-2">
                            {externalMcpServers.map((server) => (
                      <Card
                        key={server.id}
                        className={`cursor-pointer transition-colors border-l-4 border-l-purple-600 ${
                          selectedMcpServers.includes(server.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => toggleMcpServer(server.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <Checkbox
                            checked={selectedMcpServers.includes(server.id)}
                            onCheckedChange={() => toggleMcpServer(server.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{server.name ?? 'Unnamed Server'}</h4>
                              {server.status === 'active' && (
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {server.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline">{server.type ?? 'unknown'}</Badge>
                              {Array.isArray(server.capabilities) && server.capabilities.slice(0, 3).map((cap: string, i: number) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {cap}
                                </Badge>
                              ))}
                              {server.reliability_score && (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  {server.reliability_score}/10 reliability
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            )}
            
            <p className="text-sm text-muted-foreground pt-2">
              Selected: {selectedMcpServers.length} servers
            </p>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Agent Linking (Optional)</h3>
            </div>
            
            <Card className="p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground mb-4">
                Link this deployment to an existing agent to inherit advanced capabilities like actions, workflows, and agent-specific configurations.
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label>Enable Agent Linking</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Standalone conversational AI vs. Agent-powered deployment
                  </p>
                </div>
                <Switch
                  checked={enableAgentLink}
                  onCheckedChange={setEnableAgentLink}
                />
              </div>
            </Card>

            {enableAgentLink && (
              loadingData ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : agents.length === 0 ? (
                <Card className="p-6 text-center">
                  <Cpu className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No active agents available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create an agent first to enable agent linking
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  <Label>Select Agent</Label>
                  <RadioGroup value={selectedAgentId || ''} onValueChange={setSelectedAgentId}>
                    <ScrollArea className="h-[300px] pr-4">
                      {agents.map((agent) => (
                        <div key={agent.id} className="mb-3">
                          <Card className={`cursor-pointer transition-colors ${
                            selectedAgentId === agent.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                          }`}>
                            <CardContent className="p-4 flex items-start gap-3">
                              <RadioGroupItem value={agent.id} id={`agent-${agent.id}`} />
                              <label htmlFor={`agent-${agent.id}`} className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{agent.name}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {agent.agent_type || 'Standard'}
                                  </Badge>
                                  {agent.status === 'active' && (
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                  )}
                                </div>
                                {agent.description && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {agent.description}
                                  </p>
                                )}
                              </label>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </ScrollArea>
                  </RadioGroup>

                  {selectedAgentId && (
                    <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5" />
                        <div className="text-sm text-green-800 dark:text-green-200">
                          <p className="font-medium">Agent capabilities will be inherited:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                            <li>Agent actions and workflows</li>
                            <li>Advanced MCP server integrations</li>
                            <li>Agent-specific configurations</li>
                            <li>Custom prompts and behavior</li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Review Configuration</h3>
            </div>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                <TabsTrigger value="model">Model</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
                <TabsTrigger value="agent">Agent</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {name}</div>
                    <div><span className="font-medium">Brand:</span> {brandName || name}</div>
                    <div><span className="font-medium">Color:</span> 
                      <span className="ml-2 px-2 py-1 rounded" style={{ backgroundColor: brandColor, color: '#fff' }}>
                        {brandColor}
                      </span>
                    </div>
                    {description && <div><span className="font-medium">Description:</span> {description}</div>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="knowledge" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Knowledge Base</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>{selectedKnowledge.length} entries selected</p>
                    <p className="mt-2">{customRAGSources.length} custom RAG sources</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">MCP Servers</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>{selectedMcpServers.length} servers selected</p>
                    {selectedMcpServers.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {mcpServers
                          .filter(s => selectedMcpServers.includes(s.id))
                          .map(s => (
                            <Badge key={s.id} variant="secondary">{s.name}</Badge>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="model" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">AI Model</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><span className="font-medium">Model:</span> {selectedModelId}</div>
                    <div><span className="font-medium">Category:</span> {modelCategory.toUpperCase()}</div>
                    <div><span className="font-medium">Temperature:</span> {temperature}</div>
                    <div><span className="font-medium">Max Tokens:</span> {maxTokens}</div>
                    <div><span className="font-medium">AI Mode:</span> {aiMode === 'default' ? 'Default' : aiMode === 'single' ? 'Single Agent' : 'Multi-Agent'}</div>
                    <div><span className="font-medium">Smart Routing:</span> {enableSmartRouting ? 'Enabled ✨' : 'Disabled'}</div>
                    {enableSmartRouting && (
                      <div className="pl-4 text-xs text-muted-foreground border-l-2 border-primary/30 mt-2">
                        <p>• Context persistence & switching detection</p>
                        <p>• KB/RAG topic suggestions</p>
                        <p>• Proactive conversation guidance</p>
                        <p>• Emotional intelligence & rich media</p>
                      </div>
                    )}
                    <div><span className="font-medium">Vision:</span> {enableVision ? 'Enabled' : 'Disabled'}</div>
                    <div><span className="font-medium">Split Screen:</span> {enableSplitScreen ? 'Enabled' : 'Disabled'}</div>
                    {enableSplitScreen && splitScreenModels.length > 0 && (
                      <div><span className="font-medium">Comparison Models:</span> {splitScreenModels.join(', ')}</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Pre-configured Sources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      {dataSourceConfig.treatmentCenters ? <Check className="w-4 h-4 text-green-500" /> : <span className="w-4 h-4" />}
                      Treatment Centers ({treatmentCenterCount})
                    </div>
                    <div className="flex items-center gap-2">
                      {dataSourceConfig.productPricing ? <Check className="w-4 h-4 text-green-500" /> : <span className="w-4 h-4" />}
                      Product & Pricing
                    </div>
                    <div className="flex items-center gap-2">
                      {dataSourceConfig.insuranceInfo ? <Check className="w-4 h-4 text-green-500" /> : <span className="w-4 h-4" />}
                      Insurance Info
                    </div>
                    <div className="flex items-center gap-2">
                      {dataSourceConfig.healthcareKnowledge ? <Check className="w-4 h-4 text-green-500" /> : <span className="w-4 h-4" />}
                      Healthcare Knowledge
                    </div>
                    <div className="flex items-center gap-2">
                      {dataSourceConfig.medicalImaging ? <Check className="w-4 h-4 text-green-500" /> : <span className="w-4 h-4" />}
                      Medical Imaging
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agent" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Agent Linking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><span className="font-medium">Agent Linking:</span> {enableAgentLink ? 'Enabled' : 'Disabled (Standalone)'}</div>
                    {enableAgentLink && selectedAgentId && (
                      <div>
                        <span className="font-medium">Linked Agent:</span> {agents.find(a => a.id === selectedAgentId)?.name || 'Unknown'}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {agents.find(a => a.id === selectedAgentId)?.agent_type || 'Standard'}
                        </Badge>
                      </div>
                    )}
                    {!enableAgentLink && (
                      <p className="text-xs text-muted-foreground">
                        Deployment will use standalone conversational AI without agent capabilities
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return null;
    }
  };

  const stepLabels = [
    "Basic Info",
    "Knowledge Base",
    "Custom RAG",
    "Data Sources",
    "AI Model",
    "MCP Servers",
    "Agent Linking",
    "Review"
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Configure New Deployment</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-4 px-2">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex flex-col items-center ${index > 0 ? 'ml-2' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep > index + 1
                      ? "bg-primary text-primary-foreground"
                      : currentStep === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-[10px] mt-1 text-muted-foreground hidden sm:block">
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div className={`w-8 h-0.5 ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        <Separator />

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto py-4 px-1">
          {renderStep()}
        </div>

        <Separator />

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Create Deployment
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
