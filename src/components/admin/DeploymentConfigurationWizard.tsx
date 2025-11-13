import { useState } from "react";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createDeployment } from "@/services/deploymentService";
import { ChevronRight, ChevronLeft, Check, Loader2, Database, Brain, Server, Settings } from "lucide-react";

interface WizardProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface KnowledgeBaseEntry {
  id: string;
  description: string;
  domain: string;
  content_type: string;
}

interface MCPServer {
  id: string;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
}

export default function DeploymentConfigurationWizard({ open, onClose, onSuccess }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Basic Info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Step 2: Knowledge Base
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);

  // Step 3: Model Configuration
  const [modelProvider, setModelProvider] = useState("google");
  const [modelName, setModelName] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");

  // Step 4: MCP Servers
  const [mcpServers, setMcpServers] = useState<MCPServer[]>([]);
  const [selectedMcpServers, setSelectedMcpServers] = useState<string[]>([]);

  const totalSteps = 5;

  // Load knowledge base entries
  const loadKnowledgeBase = async () => {
    try {
      const { data, error } = await supabase
        .from("universal_knowledge_base")
        .select("id, description, domain, content_type")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setKnowledgeEntries(data || []);
    } catch (error) {
      console.error("Error loading knowledge base:", error);
      toast.error("Failed to load knowledge base");
    }
  };

  // Load MCP servers
  const loadMcpServers = async () => {
    try {
      const { data, error } = await supabase
        .from("mcp_servers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMcpServers(data || []);
    } catch (error) {
      console.error("Error loading MCP servers:", error);
      toast.error("Failed to load MCP servers");
    }
  };

  const handleNext = async () => {
    if (currentStep === 1 && !name.trim()) {
      toast.error("Please enter a deployment name");
      return;
    }

    if (currentStep === 2 && knowledgeEntries.length === 0) {
      await loadKnowledgeBase();
    }

    if (currentStep === 4 && mcpServers.length === 0) {
      await loadMcpServers();
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      // Prepare knowledge base snapshot
      const knowledgeSnapshot = selectedKnowledge.length > 0
        ? knowledgeEntries.filter((kb) => selectedKnowledge.includes(kb.id))
        : null;

      // Prepare MCP servers snapshot
      const mcpSnapshot = selectedMcpServers.length > 0
        ? mcpServers.filter((mcp) => selectedMcpServers.includes(mcp.id))
        : null;

      // Prepare model configuration
      const modelConfig = {
        provider: modelProvider,
        model: modelName,
        temperature: parseFloat(temperature),
        max_tokens: parseInt(maxTokens),
      };

      // Create deployment
      await createDeployment({
        name,
        description,
        configuration: {
          knowledgeBaseIds: selectedKnowledge,
          mcpServerIds: selectedMcpServers,
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
    setSelectedKnowledge([]);
    setSelectedMcpServers([]);
    setModelProvider("google");
    setModelName("gemini-2.5-flash");
    setTemperature("0.7");
    setMaxTokens("2000");
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
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
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Knowledge Base (RAG)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select knowledge base entries to include in this deployment. These will be used for
              RAG-powered responses.
            </p>
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {knowledgeEntries.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No knowledge base entries found
                </p>
              ) : (
                knowledgeEntries.map((entry) => (
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
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {entry.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{entry.domain}</Badge>
                          <Badge variant="secondary">{entry.content_type}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Selected: {selectedKnowledge.length} entries
            </p>
          </div>
        );

      case 3:
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
                    {modelProvider === "google" ? (
                      <>
                        <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                        <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                        <SelectItem value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="gpt-5">GPT-5</SelectItem>
                        <SelectItem value="gpt-5-mini">GPT-5 Mini</SelectItem>
                        <SelectItem value="gpt-5-nano">GPT-5 Nano</SelectItem>
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
                <p className="text-xs text-muted-foreground">
                  Higher = more creative (0-2)
                </p>
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
                <p className="text-xs text-muted-foreground">
                  Response length limit
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">MCP Servers</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select MCP (Model Context Protocol) servers to enhance your deployment with additional
              tools and capabilities.
            </p>
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {mcpServers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No active MCP servers found
                </p>
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
                        <h4 className="font-medium">{server.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {server.description}
                        </p>
                        <Badge variant="outline" className="mt-2">
                          {server.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Selected: {selectedMcpServers.length} servers
            </p>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Review Configuration</h3>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Name: </span>
                  <span className="text-sm text-muted-foreground">{name}</span>
                </div>
                {description && (
                  <div>
                    <span className="text-sm font-medium">Description: </span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Provider: </span>
                  <span className="text-sm text-muted-foreground capitalize">{modelProvider}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Model: </span>
                  <span className="text-sm text-muted-foreground">{modelName}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Temperature: </span>
                  <span className="text-sm text-muted-foreground">{temperature}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Max Tokens: </span>
                  <span className="text-sm text-muted-foreground">{maxTokens}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {selectedKnowledge.length} entries selected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">MCP Servers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {selectedMcpServers.length} servers selected
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Deployment</DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    i + 1 < currentStep
                      ? "bg-primary text-primary-foreground"
                      : i + 1 === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1 < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-colors ${
                      i + 1 < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="min-h-[400px]">{renderStep()}</div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={isLoading}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
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
                  <Check className="w-4 h-4 mr-2" />
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
