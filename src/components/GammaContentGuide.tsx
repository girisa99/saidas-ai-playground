import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Workflow, 
  TrendingUp, 
  Image as ImageIcon, 
  FileText, 
  Sparkles,
  ArrowRight,
  Lightbulb,
  Zap
} from "lucide-react";

export const GammaContentGuide = () => {
  const contentTypes = [
    {
      type: "Journey Maps",
      icon: TrendingUp,
      description: "Personal stories, learning paths, development timelines",
      examples: ["My AI Learning Journey", "Career Progression", "Project Evolution"],
      color: "genie-primary",
      keywords: "story, journey, path, timeline, learning"
    },
    {
      type: "Workflows",
      icon: Workflow, 
      description: "Process flows, implementation steps, system operations",
      examples: ["AI Implementation Process", "Development Workflow", "Automation Pipeline"],
      color: "genie-teal",
      keywords: "process, steps, workflow, implementation, system"
    },
    {
      type: "Infographics",
      icon: ImageIcon,
      description: "Data visualization, technology stacks, architectural overviews",
      examples: ["Technology Stack", "AI Tools Overview", "Performance Metrics"],
      color: "genie-cyan", 
      keywords: "data, technology, tools, metrics, overview"
    },
    {
      type: "Case Studies",
      icon: FileText,
      description: "Project showcases, solution implementations, success stories",
      examples: ["Healthcare Solution", "Enterprise Transformation", "AI Integration"],
      color: "genie-primary",
      keywords: "case, project, solution, results, success"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-genie-primary/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Sparkles className="w-3 h-3 mr-2" />
            Smart Content Detection
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            AI-Powered Visual Content Generation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our system automatically detects content type and generates the perfect visual presentation format for your material
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contentTypes.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className={`p-6 border-${item.color}/20 hover:border-${item.color}/40 transition-all duration-300 hover:shadow-lg`}>
                <div className={`w-12 h-12 bg-${item.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 text-${item.color}`} />
                </div>
                
                <h3 className={`text-lg font-bold text-${item.color} mb-3`}>
                  {item.type}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-foreground">Examples:</p>
                  {item.examples.map((example, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className={`w-1 h-1 bg-${item.color} rounded-full`} />
                      {example}
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Triggers:</span> {item.keywords}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* How it works */}
        <Card className="p-8 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 border-genie-primary/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-genie-primary" />
              Intelligent Content Analysis
            </h3>
            <p className="text-muted-foreground">
              How our AI determines the best presentation format for your content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-genie-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-genie-primary">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Content Scanning</h4>
              <p className="text-sm text-muted-foreground">
                AI analyzes your text for keywords, structure, and context patterns
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-genie-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-genie-teal">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Format Detection</h4>
              <p className="text-sm text-muted-foreground">
                Matches content type with optimal visual presentation format
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-genie-cyan/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-genie-cyan">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Auto Generation</h4>
              <p className="text-sm text-muted-foreground">
                Creates professional presentations with Gamma AI integration
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-genie-primary hover:bg-genie-teal text-white">
              <Lightbulb className="w-4 h-4 mr-2" />
              Try It Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};