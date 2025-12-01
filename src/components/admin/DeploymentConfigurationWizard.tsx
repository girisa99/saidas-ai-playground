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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createDeployment } from "@/services/deploymentService";
import { 
  ChevronRight, ChevronLeft, Check, Loader2, Database, Brain, Server, Settings,
  Building2, DollarSign, MapPin, Plus, Trash2, Link, Globe, FileText, Sparkles
} from "lucide-react";

interface WizardProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
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
  const [modelProvider, setModelProvider] = useState("google");
  const [modelName, setModelName] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");
  const [enableVision, setEnableVision] = useState(false);
  const [enableSplitScreen, setEnableSplitScreen] = useState(false);

  // Step 6: MCP Servers
  const [mcpServers, setMcpServers] = useState<MCPServer[]>([]);
  const [selectedMcpServers, setSelectedMcpServers] = useState<string[]>([]);

  const totalSteps = 7;

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
        provider: modelProvider,
        model: modelName,
        temperature: parseFloat(temperature),
        max_tokens: parseInt(maxTokens),
        enable_vision: enableVision,
        enable_split_screen: enableSplitScreen,
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
    setModelProvider("google");
    setModelName("gemini-2.5-flash");
    setTemperature("0.7");
    setMaxTokens("2000");
    setEnableVision(false);
    setEnableSplitScreen(false);
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
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Model Configuration</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model-provider">Provider</Label>
                <Select value={modelProvider} onValueChange={setModelProvider}>
                  <SelectTrigger id="model-provider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google (Gemini)</SelectItem>
                    <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                    <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-name">Model</Label>
                <Select value={modelName} onValueChange={setModelName}>
                  <SelectTrigger id="model-name">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modelProvider === "google" && (
                      <>
                        <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro (LLM)</SelectItem>
                        <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash (SLM)</SelectItem>
                        <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite (SLM)</SelectItem>
                        <SelectItem value="gemini-2.0-flash-vision">Gemini 2.0 Flash Vision (VLM)</SelectItem>
                      </>
                    )}
                    {modelProvider === "openai" && (
                      <>
                        <SelectItem value="gpt-4o">GPT-4o (LLM)</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini (SLM)</SelectItem>
                        <SelectItem value="gpt-4-vision">GPT-4 Vision (VLM)</SelectItem>
                      </>
                    )}
                    {modelProvider === "anthropic" && (
                      <>
                        <SelectItem value="claude-3.5-sonnet">Claude 3.5 Sonnet (LLM)</SelectItem>
                        <SelectItem value="claude-3-haiku">Claude 3 Haiku (SLM)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

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
            </div>
          </div>
        );

      case 6:
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
                <div className="space-y-2">
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
                    mcpServers.map((server) => (
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
                    ))
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
              <Check className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Review Configuration</h3>
            </div>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                <TabsTrigger value="model">Model</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
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
                    <div><span className="font-medium">Provider:</span> {modelProvider}</div>
                    <div><span className="font-medium">Model:</span> {modelName}</div>
                    <div><span className="font-medium">Temperature:</span> {temperature}</div>
                    <div><span className="font-medium">Max Tokens:</span> {maxTokens}</div>
                    <div><span className="font-medium">Vision:</span> {enableVision ? 'Enabled' : 'Disabled'}</div>
                    <div><span className="font-medium">Split Screen:</span> {enableSplitScreen ? 'Enabled' : 'Disabled'}</div>
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
