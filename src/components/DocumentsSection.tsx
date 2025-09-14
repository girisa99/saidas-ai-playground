import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Lightbulb, 
  TrendingUp, 
  Building, 
  Cog, 
  BookOpen,
  Download,
  ArrowRight 
} from "lucide-react";

export const DocumentsSection = () => {
  const documents = [
    {
      title: "From Curiosity to Reality",
      subtitle: "Building Your AI Experimentation Hub",
      description: "A comprehensive guide for technical leaders ready to harness AI's potential while maintaining enterprise-grade security and governance.",
      icon: <Lightbulb className="h-6 w-6" />,
      tags: ["Implementation", "Strategy", "Technical"],
      gradient: "from-primary/20 to-ai-secondary/20",
      border: "border-primary/30"
    },
    {
      title: "The Spark",
      subtitle: "My Personal Journey into AI-Driven Development",
      description: "A personal chronicle of discovery, technical breakthroughs, and the transformation from curiosity to enterprise impact.",
      icon: <TrendingUp className="h-6 w-6" />,
      tags: ["Personal Journey", "Development", "Innovation"],
      gradient: "from-ai-secondary/20 to-ai-accent/20",
      border: "border-ai-secondary/30"
    },
    {
      title: "The AI Imperative",
      subtitle: "Empowering Every Team Across Your Enterprise",
      description: "Strategic insights on democratizing AI innovation and the critical business decisions that will define the next decade.",
      icon: <Building className="h-6 w-6" />,
      tags: ["Enterprise", "Strategy", "ROI"],
      gradient: "from-ai-accent/20 to-primary/20",
      border: "border-ai-accent/30"
    },
    {
      title: "My AI Journey",
      subtitle: "From Curiosity to Impact",
      description: "Practical exploration of AI ecosystem components, from foundational models to specialized enterprise integration tools.",
      icon: <BookOpen className="h-6 w-6" />,
      tags: ["Learning", "Tools", "Platforms"],
      gradient: "from-primary/15 to-ai-secondary/15",
      border: "border-primary/20"
    },
    {
      title: "Strategic Implementation Guide",
      subtitle: "AI Experimentation Hub Setup",
      description: "A structured 10-step methodology for executives to transform AI experimentation into tangible business outcomes.",
      icon: <Cog className="h-6 w-6" />,
      tags: ["Executive", "Implementation", "Methodology"],
      gradient: "from-ai-secondary/15 to-ai-accent/15",
      border: "border-ai-secondary/20"
    },
    {
      title: "Business Potential & ROI",
      subtitle: "Unlocking AI's Business Impact",
      description: "Comprehensive analysis of AI's transformational potential, ROI metrics, and practical implementation strategies.",
      icon: <TrendingUp className="h-6 w-6" />,
      tags: ["Business Impact", "ROI", "Metrics"],
      gradient: "from-ai-accent/15 to-primary/15",
      border: "border-ai-accent/20"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Knowledge</span> Repository
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive documentation and insights from the AI experimentation journey - 
            practical guides for transformation and strategic implementation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <Card 
              key={index} 
              className={`p-6 h-full bg-gradient-to-br ${doc.gradient} ${doc.border} hover:scale-105 transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-background/80 rounded-lg">
                  {doc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {doc.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {doc.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {doc.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  Read More
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Key Insights Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">45+</div>
            <p className="text-muted-foreground">Days of Intensive Research & Development</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-ai-secondary/10 to-transparent border-ai-secondary/20">
            <div className="text-3xl font-bold text-ai-secondary mb-2">60-80%</div>
            <p className="text-muted-foreground">Development Cost Reduction Achieved</p>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-ai-accent/10 to-transparent border-ai-accent/20">
            <div className="text-3xl font-bold text-ai-accent mb-2">10+</div>
            <p className="text-muted-foreground">Enterprise AI Solutions Documented</p>
          </Card>
        </div>
      </div>
    </section>
  );
};