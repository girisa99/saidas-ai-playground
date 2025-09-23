import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Presentation, 
  Workflow, 
  Image as ImageIcon, 
  Sparkles, 
  Download, 
  Share2, 
  Zap,
  Building2,
  TrendingUp,
  Target,
  Users,
  Brain,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

const GammaPresentationHub = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [presentationTopic, setPresentationTopic] = useState("");
  const [presentationContent, setPresentationContent] = useState("");
  const [presentationType, setPresentationType] = useState("enterprise");

  const presentationTemplates = [
    {
      id: "enterprise-overview",
      title: "Enterprise AI Overview",
      description: "Comprehensive presentation on AI transformation strategy",
      icon: Building2,
      category: "Enterprise",
      slides: 12,
      duration: "15-20 min",
      color: "bg-gradient-to-br from-primary/10 to-genie-primary/10"
    },
    {
      id: "technical-workflow",
      title: "Technical Implementation",
      description: "Detailed workflow diagrams and technical architecture",
      icon: Workflow,
      category: "Technical",
      slides: 8,
      duration: "10-15 min",
      color: "bg-gradient-to-br from-genie-secondary/10 to-accent/10"
    },
    {
      id: "business-impact",
      title: "Business Impact Analysis",
      description: "ROI, metrics, and business value propositions",
      icon: TrendingUp,
      category: "Business",
      slides: 10,
      duration: "12-18 min",
      color: "bg-gradient-to-br from-success/10 to-genie-accent/10"
    },
    {
      id: "strategy-roadmap",
      title: "Strategic Roadmap",
      description: "Future planning and implementation timeline",
      icon: Target,
      category: "Strategy",
      slides: 15,
      duration: "20-25 min",
      color: "bg-gradient-to-br from-accent/10 to-warning/10"
    }
  ];

  const workflowTypes = [
    {
      id: "ai-development",
      title: "AI Development Pipeline",
      description: "From concept to deployment workflow",
      icon: Brain,
      complexity: "Advanced",
      steps: 8
    },
    {
      id: "data-processing",
      title: "Data Processing Flow",
      description: "Data ingestion, processing, and analytics",
      icon: Zap,
      complexity: "Intermediate",
      steps: 6
    },
    {
      id: "innovation-process",
      title: "Innovation Framework",
      description: "Ideation to implementation process",
      icon: Lightbulb,
      complexity: "Strategic",
      steps: 5
    },
    {
      id: "team-collaboration",
      title: "Team Collaboration Model",
      description: "Cross-functional team workflows",
      icon: Users,
      complexity: "Organizational",
      steps: 7
    }
  ];

  const handleGeneratePresentation = async (templateId: string) => {
    setIsGenerating(true);
    try {
      // Simulate API call to Gamma
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success("Presentation generated successfully! Opening in new tab...");
      
      // In a real implementation, this would open the Gamma presentation
      // For now, we'll show a success message
      setTimeout(() => {
        window.open("https://gamma.app", "_blank");
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to generate presentation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateWorkflow = async (workflowId: string) => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      toast.success("Workflow diagram generated! Ready for export.");
    } catch (error) {
      toast.error("Failed to generate workflow. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGeneration = async () => {
    if (!presentationTopic.trim()) {
      toast.error("Please enter a presentation topic");
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      toast.success("Custom presentation created! Opening Gamma editor...");
      
      setTimeout(() => {
        window.open("https://gamma.app", "_blank");
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to generate custom presentation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Presentations
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Generate Enterprise
            <span className="bg-gradient-to-r from-primary via-genie-secondary to-accent bg-clip-text text-transparent block mt-2">
              Presentations & Workflows
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning visual presentations and workflow diagrams powered by Gamma AI. 
            Transform your content into professional, engaging presentations in seconds.
          </p>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Custom
            </TabsTrigger>
          </TabsList>

          {/* Presentation Templates */}
          <TabsContent value="templates" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presentationTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Card key={template.id} className={`p-6 hover:shadow-lg transition-all duration-300 border-border/50 ${template.color}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {template.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{template.slides} slides</span>
                        <span>{template.duration}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleGeneratePresentation(template.id)}
                      disabled={isGenerating}
                      className="w-full"
                      variant="default"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Generate Presentation
                        </div>
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Workflow Diagrams */}
          <TabsContent value="workflows" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflowTypes.map((workflow) => {
                const IconComponent = workflow.icon;
                return (
                  <Card key={workflow.id} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-gradient-to-br from-card via-muted/10 to-accent/5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-genie-secondary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-genie-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {workflow.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {workflow.complexity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {workflow.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-muted-foreground">
                        {workflow.steps} steps
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleGenerateWorkflow(workflow.id)}
                      disabled={isGenerating}
                      className="w-full"
                      variant="secondary"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Workflow className="w-4 h-4" />
                          Generate Workflow
                        </div>
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Custom Generation */}
          <TabsContent value="custom" className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary/5 via-card to-genie-accent/5">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Create Custom Presentation
                  </h3>
                  <p className="text-muted-foreground">
                    Describe your topic and let AI create a tailored presentation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Presentation Topic
                    </label>
                    <Input
                      placeholder="e.g., AI Implementation Strategy for Manufacturing"
                      value={presentationTopic}
                      onChange={(e) => setPresentationTopic(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Content & Details
                    </label>
                    <Textarea
                      placeholder="Provide any specific points, data, or requirements you want included..."
                      value={presentationContent}
                      onChange={(e) => setPresentationContent(e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Presentation Style
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["enterprise", "technical", "creative"].map((style) => (
                        <Button
                          key={style}
                          variant={presentationType === style ? "default" : "outline"}
                          onClick={() => setPresentationType(style)}
                          className="capitalize"
                        >
                          {style}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleCustomGeneration}
                    disabled={isGenerating || !presentationTopic.trim()}
                    className="w-full h-12"
                    size="lg"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Custom Presentation...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5" />
                        Generate with Gamma AI
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-gradient-to-br from-success/5 to-card">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-success" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Instant Generation
            </h4>
            <p className="text-muted-foreground text-sm">
              Create professional presentations in under 60 seconds
            </p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-card">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Enterprise Ready
            </h4>
            <p className="text-muted-foreground text-sm">
              Professional templates designed for business environments
            </p>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-accent/5 to-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-6 h-6 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Easy Sharing
            </h4>
            <p className="text-muted-foreground text-sm">
              Export, share, and collaborate seamlessly with your team
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GammaPresentationHub;