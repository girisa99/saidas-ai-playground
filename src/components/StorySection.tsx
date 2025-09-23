import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const StorySection = () => {
  return (
    <section id="story" className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-genie-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-genie-primary/10 px-3 sm:px-4 py-2 rounded-full text-genie-primary text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            What is Genie AI Hub?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            AI Innovation Made <span className="text-genie-primary">Accessible</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            A personal journey to democratize AI experimentation, transforming how enterprises 
            approach digital health innovation and technology solutions.
          </p>
        </div>

        {/* Story Flow */}
        <div className="relative mb-8 sm:mb-12 lg:mb-16">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 xl:w-24 h-0.5 bg-gradient-to-r from-genie-primary to-genie-secondary z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Business Impact Card */}
            <Card className="p-4 sm:p-6 lg:p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-genie-secondary/5 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-primary/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
              
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
                <div className="p-3 sm:p-4 bg-primary/10 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Strategic Genesis</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Accelerating innovation through AI experimentation</p>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Self-service AI creation for business users</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Faster time-to-market for AI solutions</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Reduced dependency on IT resources</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Direct access to AI insights for decision-making</span>
                </div>
              </div>
            </Card>

            {/* Technical Excellence Card */}
            <Card className="p-4 sm:p-6 lg:p-8 border-genie-secondary/20 bg-gradient-to-br from-genie-secondary/5 to-accent/5 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-genie-secondary/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-genie-secondary/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
              
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
                <div className="p-3 sm:p-4 bg-genie-secondary/10 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8 text-genie-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Technical Vision</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Empowering developers with AI-assisted frameworks</p>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-genie-secondary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">AI-assisted coding for developer productivity</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-genie-secondary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Standardized development frameworks</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-genie-secondary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Enhanced security through built-in governance</span>
                </div>
                <div className="flex items-start gap-3 group/item hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-genie-secondary rounded-full mt-1.5 sm:mt-2 group-hover/item:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-foreground/80">Scalable infrastructure for enterprise deployment</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Market Opportunity Flow */}
        <div className="relative mb-8 sm:mb-12 lg:mb-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-genie-secondary/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-full"></div>
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 bg-genie-secondary/10 rounded-full"></div>
          
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-primary text-sm font-medium mb-4 sm:mb-6">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                Strategic AI Integration
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Why AI Experimentation Hub <span className="text-primary">Now?</span>
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                The competitive edge demands rapid AI adoption. Strategic integration is no longer optional.
              </p>
            </div>
            
            {/* Flow Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Market Opportunity */}
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary/20">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-primary/20 rounded-lg sm:rounded-xl">
                      <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">Seizing Market Opportunity</h4>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: "⚡", text: "Operational Efficiency: Automate & optimize workflows" },
                      { icon: "🎯", text: "Enhanced Decision-Making: Data-driven insights" },
                      { icon: "💰", text: "New Revenue Streams: AI-powered innovations" },
                      { icon: "⭐", text: "Superior Customer Experience: Personalization" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                        <div className="text-lg sm:text-2xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">{item.icon}</div>
                        <span className="text-sm sm:text-base text-foreground/80 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Competitive Advantage */}
              <div className="relative">
                <div className="bg-gradient-to-br from-genie-secondary/10 to-genie-secondary/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-genie-secondary/20">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-genie-secondary/20 rounded-lg sm:rounded-xl">
                      <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-genie-secondary" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">Competitive Advantage</h4>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { icon: "🚀", text: "Accelerated Innovation: Rapid prototype deployment" },
                      { icon: "📊", text: "Data-Driven Edge: Proprietary capabilities" },
                      { icon: "👥", text: "Talent Attraction: Leading AI positioning" },
                      { icon: "🏆", text: "Industry Leadership: Define standards & disrupt" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4 group hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-200">
                        <div className="text-lg sm:text-2xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">{item.icon}</div>
                        <span className="text-sm sm:text-base text-foreground/80 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Flow Arrow */}
            <div className="flex justify-center my-6 sm:my-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-primary to-genie-secondary"></div>
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-primary to-genie-secondary"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="text-center p-4 sm:p-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Experimentation First</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Learning through doing. Every AI initiative starts with controlled experimentation.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-genie-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-genie-secondary/20 transition-colors duration-300">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-genie-secondary" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Human-Centered</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              Technology serves people. Solutions enhance human capabilities.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 group hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors duration-300">
              <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-accent" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Scalable Impact</h4>
            <p className="text-sm sm:text-base text-muted-foreground">
              From proof-of-concept to enterprise deployment, solutions grow with needs.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-4">
            Ready to explore the complete journey behind my AI experimentation platform?
          </p>
          <Link to="/journey">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold genie-glow w-full sm:w-auto">
              Discover My Journey
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};