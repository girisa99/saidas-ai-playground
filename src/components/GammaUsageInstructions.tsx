import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Presentation, Eye, Download, Info, Video, FileText, Settings } from "lucide-react";

export const GammaUsageInstructions = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 border-genie-primary/20">
      <div className="text-center mb-6">
        <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-3">
          <Presentation className="w-3 h-3 mr-2" />
          Gamma AI Integration
        </Badge>
        <h3 className="text-xl font-bold text-foreground mb-2">
          How to Use Gamma Presentation Generator
        </h3>
        <p className="text-muted-foreground">
          Transform any content into stunning visual presentations with AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-genie-primary" />
            Quick Start Guide
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-6 h-6 bg-genie-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-genie-primary">1</div>
              <div>
                <p className="font-medium text-sm">Generate Content</p>
                <p className="text-xs text-muted-foreground">Click the Generate button on any widget to create AI presentations</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-6 h-6 bg-genie-teal/10 rounded-full flex items-center justify-center text-xs font-bold text-genie-teal">2</div>
              <div>
                <p className="font-medium text-sm">Preview & Review</p>
                <p className="text-xs text-muted-foreground">Use Preview button to review before finalizing</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-6 h-6 bg-genie-cyan/10 rounded-full flex items-center justify-center text-xs font-bold text-genie-cyan">3</div>
              <div>
                <p className="font-medium text-sm">Export & Share</p>
                <p className="text-xs text-muted-foreground">Download or share your professional presentations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Settings className="w-4 h-4 text-genie-primary" />
            Available Content Types
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline" className="justify-center py-2">Journey Maps</Badge>
            <Badge variant="outline" className="justify-center py-2">Workflows</Badge>
            <Badge variant="outline" className="justify-center py-2">Timelines</Badge>
            <Badge variant="outline" className="justify-center py-2">Infographics</Badge>
            <Badge variant="outline" className="justify-center py-2">Case Studies</Badge>
            <Badge variant="outline" className="justify-center py-2">Tech Stacks</Badge>
          </div>
          
          <div className="mt-4 p-3 bg-genie-accent/10 rounded-lg border border-genie-accent/20">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-genie-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Auto-Generation</p>
                <p className="text-xs text-muted-foreground">Some content generates automatically on page load for instant visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button size="sm" className="bg-genie-primary hover:bg-genie-teal">
          <Video className="w-3 h-3 mr-2" />
          Watch Tutorial
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="w-3 h-3 mr-2" />
          Documentation
        </Button>
      </div>
    </Card>
  );
};