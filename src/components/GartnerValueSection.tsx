import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Brain, 
  Database, 
  Zap, 
  Target, 
  Users, 
  Shield,
  TrendingUp,
  Lightbulb,
  Rocket,
  BarChart3,
  Cog,
  Eye,
  Scale,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export const GartnerValueSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="gartner-value" className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-genie-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-genie-primary/10 px-3 sm:px-4 py-2 rounded-full text-genie-primary text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            Knowledge Sharing & AI Experimentation Hub
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Aligning <span className="text-genie-primary">Gartner's Value Framework</span> with AI Innovation
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Exploring how AI experimentation creates multi-stakeholder value through strategic framework alignment, differentiated capabilities, and measurable enterprise outcomes.
          </p>
        </div>

        {/* Gartner Value Equation Visual */}
        <div className="relative mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Value Creation (Give) */}
            <Card className="relative p-8 bg-gradient-to-br from-blue-900/90 to-blue-800/90 text-white border-blue-600/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent)]"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Brain className="w-8 h-8 text-amber-400" />
                  <span className="text-sm font-medium text-blue-200">Stakeholders' Priorities & Concerns</span>
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  Value Creation
                  <div className="text-lg font-normal text-blue-200">(Give)</div>
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Cog className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Self-service AI application creation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Accelerated development frameworks</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Enterprise-grade security & governance</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-amber-400 font-medium">
                    <Database className="w-5 h-5" />
                    <span className="text-sm">Value Levers</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Value Realization (Get) */}
            <Card className="relative p-8 bg-gradient-to-br from-blue-900/90 to-blue-800/90 text-white border-blue-600/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent)]"></div>
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Scale className="w-8 h-8 text-amber-400" />
                  <span className="text-sm font-medium text-blue-200">Multi-Stakeholder Impacts</span>
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  Value Realization
                  <div className="text-lg font-normal text-blue-200">(Get)</div>
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <BarChart3 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Measurable ROI & business impact</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Users className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Enhanced team productivity</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Target className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Competitive market advantage</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-amber-400 font-medium">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">Realized Return to Organization</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Central Value Logic Connector */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="bg-amber-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap">
              Value Logic
            </div>
          </div>
        </div>

        {/* Steps for Value Framework */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
            <span className="text-genie-primary">Steps to Create Value</span>
          </h3>
          
          <div className="relative">
            {/* Scroll Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-8">
              {/* Step 1: Listen & Sense */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-genie-primary/20 hover:border-genie-primary/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">1</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Listen & Sense</h4>
                <p className="text-sm text-muted-foreground mb-4">Understanding stakeholder priorities and market demands</p>
                <div className="flex justify-center">
                  <Eye className="w-6 h-6 text-genie-primary" />
                </div>
              </Card>

              {/* Step 2: Assess Materiality */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-genie-teal/20 hover:border-genie-teal/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">2</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Assess Materiality</h4>
                <p className="text-sm text-muted-foreground mb-4">Evaluating business impact and resource requirements</p>
                <div className="flex justify-center">
                  <BarChart3 className="w-6 h-6 text-genie-teal" />
                </div>
              </Card>

              {/* Step 3: Develop Options */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-genie-cyan/20 hover:border-genie-cyan/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">3</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Develop Options</h4>
                <p className="text-sm text-muted-foreground mb-4">Creating strategic AI implementation pathways</p>
                <div className="flex justify-center">
                  <Lightbulb className="w-6 h-6 text-genie-cyan" />
                </div>
              </Card>

              {/* Step 4: Assess Trade-Offs */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-purple-500/20 hover:border-purple-500/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">4</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Assess Trade-Offs</h4>
                <p className="text-sm text-muted-foreground mb-4">Balancing innovation speed with risk management</p>
                <div className="flex justify-center">
                  <Scale className="w-6 h-6 text-purple-500" />
                </div>
              </Card>

              {/* Step 5: Measure Actual Give/Get Gap */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-orange-500/20 hover:border-orange-500/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">5</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Measure Gap</h4>
                <p className="text-sm text-muted-foreground mb-4">Tracking actual value delivery vs. expectations</p>
                <div className="flex justify-center">
                  <Target className="w-6 h-6 text-orange-500" />
                </div>
              </Card>

              {/* Step 6: Adjust & Iterate */}
              <Card className="flex-none w-80 p-6 text-center group hover:shadow-xl transition-all duration-300 border-2 border-emerald-500/20 hover:border-emerald-500/40 snap-center">
                <div className="relative w-16 h-16 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background/60">
                  <span className="relative text-xl font-bold">6</span>
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Adjust & Iterate</h4>
                <p className="text-sm text-muted-foreground mb-4">Continuous optimization and scaling successful models</p>
                <div className="flex justify-center">
                  <Rocket className="w-6 h-6 text-emerald-500" />
                </div>
              </Card>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-genie-primary/30 rounded-full"></div>
                <div className="w-2 h-2 bg-genie-primary/30 rounded-full"></div>
                <div className="w-2 h-2 bg-genie-primary/30 rounded-full"></div>
                <div className="w-2 h-2 bg-genie-primary rounded-full"></div>
                <div className="w-2 h-2 bg-genie-primary/30 rounded-full"></div>
                <div className="w-2 h-2 bg-genie-primary/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Why AI Experimentation Hub Now? */}
        <div className="relative mb-12 lg:mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-genie-secondary/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="relative z-10 p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Strategic AI Integration
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why AI Experimentation Hub <span className="text-primary">Now?</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Unlocking Business Drivers */}
              <Card className="p-6 bg-gradient-to-br from-genie-primary/10 to-genie-primary/5 border-genie-primary/20">
                <h4 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6 text-genie-primary" />
                  Unlocking Business Drivers
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Operational Efficiency:</strong> Automate tasks, optimize workflows, reduce costs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Enhanced Decision-Making:</strong> Gain deeper insights via smarter data analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>New Revenue Streams:</strong> Create innovative products and services</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Superior Customer Experience:</strong> Personalize interactions and improve satisfaction</span>
                  </div>
                </div>
              </Card>

              {/* Seizing Market Opportunity */}
              <Card className="p-6 bg-gradient-to-br from-genie-teal/10 to-genie-teal/5 border-genie-teal/20">
                <h4 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-genie-teal" />
                  Seizing Market Opportunity
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Accelerated Innovation:</strong> Rapidly prototype and deploy AI solutions ahead of competitors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Data-Driven Advantage:</strong> Leverage proprietary data to create unique AI capabilities</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Talent Attraction:</strong> Position your organization at the forefront of AI development</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Industry Leadership:</strong> Define new standards and disrupt existing markets</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Stakeholder Benefits */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
            <span className="text-genie-primary">Multi-Stakeholder</span> Value Creation
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Users */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
              <h4 className="text-xl font-bold mb-4 text-foreground text-center">Business Users</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Self-service AI application creation through no-code/low-code tools – <span className="text-genie-primary font-medium">enabling rapid innovation</span> without deep technical expertise</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Faster time-to-market for business solutions – <span className="text-genie-primary font-medium">accelerating the deployment</span> of AI-powered features and products</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Reduced dependency on IT for simple AI implementations – <span className="text-genie-primary font-medium">freeing up IT resources</span> for more complex strategic projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Direct access to AI insights for decision-making – <span className="text-genie-primary font-medium">empowering data-driven strategies</span> and operational improvements</span>
                </div>
              </div>
            </Card>

            {/* IT Users */}
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
              <h4 className="text-xl font-bold mb-4 text-foreground text-center">IT Users</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Accelerated development through AI-assisted coding – <span className="text-genie-teal font-medium">boosting developer productivity</span> and reducing manual effort</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Reduced technical debt through automated code quality – <span className="text-genie-teal font-medium">ensuring robust and maintainable</span> AI solutions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Standardized development frameworks and components – <span className="text-genie-teal font-medium">promoting consistency and reusability</span> across projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Enhanced security through built-in governance – <span className="text-genie-teal font-medium">mitigating risks and ensuring compliance</span> with enterprise policies</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-base sm:text-lg text-muted-foreground mb-6 px-4">
            Ready to explore how the Gartner Value Equation drives my AI experimentation framework?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/journey">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold genie-glow w-full sm:w-auto">
                Discover My Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/technology">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                Explore Technology Stack
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};