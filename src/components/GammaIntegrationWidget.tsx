import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Presentation, 
  Image as ImageIcon, 
  Sparkles, 
  Eye, 
  Download,
  Workflow,
  Map,
  TrendingUp,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface GammaIntegrationWidgetProps {
  contentType: "journey" | "workflow" | "timeline" | "infographic" | "case-study";
  title: string;
  description: string;
  data?: any;
  onGenerate?: (type: string) => void;
  autoGenerate?: boolean;
  showInstructions?: boolean;
}

export const GammaIntegrationWidget = ({ 
  contentType, 
  title, 
  description, 
  data,
  onGenerate,
  autoGenerate = false,
  showInstructions = true
}: GammaIntegrationWidgetProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    if (autoGenerate && !isGenerated) {
      handleGenerate();
    }
  }, [autoGenerate]);

  const getContentIcon = () => {
    switch (contentType) {
      case "journey":
        return Map;
      case "workflow":
        return Workflow;
      case "timeline":
        return TrendingUp;
      case "infographic":
        return ImageIcon;
      case "case-study":
        return Presentation;
      default:
        return Sparkles;
    }
  };

  const getContentColor = () => {
    switch (contentType) {
      case "journey":
        return "from-genie-primary/10 to-genie-secondary/10";
      case "workflow":
        return "from-primary/10 to-accent/10";
      case "timeline":
        return "from-success/10 to-genie-accent/10";
      case "infographic":
        return "from-accent/10 to-warning/10";
      case "case-study":
        return "from-genie-secondary/10 to-primary/10";
      default:
        return "from-muted/10 to-card";
    }
  };

  const IconComponent = getContentIcon();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate Gamma API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast.success(`${title} generated successfully! Opening in new tab...`);
      
      // In real implementation, this would call Gamma API with the data
      setTimeout(() => {
        window.open("https://gamma.app", "_blank");
      }, 1000);

      onGenerate?.(contentType);
      setIsGenerated(true);
      
    } catch (error) {
      toast.error(`Failed to generate ${contentType}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    setIsViewing(true);
    toast.success("Preview mode activated");
    setTimeout(() => setIsViewing(false), 3000);
  };

  return (
    <Card className={`p-4 bg-gradient-to-br ${getContentColor()} border-border/50 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {title}
            </h4>
            <Badge variant="outline" className="text-xs mt-1">
              Gamma AI
            </Badge>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      
      {showInstructions && (
        <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border/30">
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">How to use:</p>
              <p>• Click <strong>Generate</strong> to create AI presentation</p>
              <p>• Use <strong>Preview</strong> to review content</p>
              <p>• <strong>Export</strong> when ready to download</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          size="sm"
          className="flex-1 h-8 text-xs"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Generate
            </div>
          )}
        </Button>
        
        <Button 
          onClick={handlePreview}
          disabled={isViewing}
          variant="outline"
          size="sm"
          className="h-8 px-3"
        >
          {isViewing ? (
            <div className="w-3 h-3 border border-foreground/30 border-t-foreground rounded-full animate-spin" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          className="h-8 px-3"
          onClick={() => toast.success("Export options coming soon!")}
        >
          <Download className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};