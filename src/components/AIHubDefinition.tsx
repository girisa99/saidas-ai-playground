import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Lightbulb, 
  Zap, 
  Users,
  Target,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const AIHubDefinition = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-genie-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20">
            <Lightbulb className="w-4 h-4 mr-2" />
            What is Genie AI Hub?
          </Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            AI Experimentation <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive platform enabling strategic AI integration through experimentation, innovation, and enterprise transformation.
          </p>
        </div>

        {/* Central Hub Concept */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Problem Statement */}
            <Card className="p-8 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-red-200 dark:border-red-800 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-red-800 dark:text-red-200">The Challenge</h3>
              <div className="space-y-3 text-sm text-red-700 dark:text-red-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Fragmented AI initiatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Lack of cohesive strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Slow innovation cycles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Misaligned stakeholders</span>
                </div>
              </div>
            </Card>

            {/* Central Hub */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/20 to-genie-primary/20 border-primary/30 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent)]"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Genie AI Hub</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Unified platform for AI experimentation, development, and enterprise transformation
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Experimentation Engine</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Innovation Framework</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>Collaborative Platform</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Connecting arrows */}
              <div className="hidden lg:block absolute -left-4 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-primary/60" />
              </div>
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-primary/60" />
              </div>
            </div>

            {/* Solution Benefits */}
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-emerald-800 dark:text-emerald-200">The Solution</h3>
              <div className="space-y-3 text-sm text-emerald-700 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Unified AI ecosystem</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Strategic integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Rapid experimentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Value-driven outcomes</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-primary/10 hover:border-primary/30">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">AI Experimentation</h4>
            <p className="text-sm text-muted-foreground">Rapid prototyping and testing of AI solutions in controlled environments</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-genie-teal/10 hover:border-genie-teal/30">
            <div className="w-12 h-12 bg-genie-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-genie-teal" />
            </div>
            <h4 className="font-bold text-lg mb-2">Collaborative Innovation</h4>
            <p className="text-sm text-muted-foreground">Cross-functional teams working together on AI-driven solutions</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-genie-cyan/10 hover:border-genie-cyan/30">
            <div className="w-12 h-12 bg-genie-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-genie-cyan" />
            </div>
            <h4 className="font-bold text-lg mb-2">Strategic Alignment</h4>
            <p className="text-sm text-muted-foreground">Ensuring AI initiatives align with business objectives and value creation</p>
          </Card>
        </div>
      </div>
    </section>
  );
};