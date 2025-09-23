import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const StorySection = () => {
  return (
    <section id="story" className="py-16 lg:py-24 bg-gradient-to-b from-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-genie-primary/10 px-4 py-2 rounded-full text-genie-primary text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            What is Genie AI Hub?
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            AI Innovation Made <span className="text-genie-primary">Accessible</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A personal journey to democratize AI experimentation, transforming how enterprises 
            approach digital health innovation and technology solutions.
          </p>
        </div>

        {/* Story Flow */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-genie-primary to-genie-teal z-10"></div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Business Impact Card */}
            <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-genie-primary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-genie-primary/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="p-4 bg-genie-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-8 h-8 text-genie-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Strategic Genesis</h3>
                  <p className="text-muted-foreground">Accelerating innovation through AI experimentation</p>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-primary rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Self-service AI creation for business users</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-primary rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Faster time-to-market for AI solutions</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-primary rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Reduced dependency on IT resources</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-primary rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Direct access to AI insights for decision-making</span>
                </div>
              </div>
            </Card>

            {/* Technical Excellence Card */}
            <Card className="p-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-genie-cyan/5 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-genie-teal/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-genie-teal/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="p-4 bg-genie-teal/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-genie-teal" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Technical Vision</h3>
                  <p className="text-muted-foreground">Empowering developers with AI-assisted frameworks</p>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-teal rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">AI-assisted coding for developer productivity</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-teal rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Standardized development frameworks</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-teal rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Enhanced security through built-in governance</span>
                </div>
                <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-200">
                  <div className="w-3 h-3 bg-genie-teal rounded-full group-hover/item:scale-125 transition-transform duration-200"></div>
                  <span className="text-foreground/80">Scalable infrastructure for enterprise deployment</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Market Opportunity Flow */}
        <div className="relative mb-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-genie-primary/5 via-transparent to-genie-teal/5 rounded-3xl"></div>
          <div className="absolute top-4 left-4 w-16 h-16 bg-genie-primary/10 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-genie-teal/10 rounded-full"></div>
          
          <div className="relative z-10 p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-genie-primary/10 px-6 py-3 rounded-full text-genie-primary text-sm font-medium mb-6">
                <Zap className="w-5 h-5" />
                Strategic AI Integration
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why AI Experimentation Hub <span className="text-genie-primary">Now?</span>
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The competitive edge demands rapid AI adoption. Strategic integration is no longer optional.
              </p>
            </div>
            
            {/* Flow Diagram */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Market Opportunity */}
              <div className="relative">
                <div className="bg-gradient-to-br from-genie-primary/10 to-genie-primary/5 rounded-2xl p-8 border border-genie-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-genie-primary/20 rounded-xl">
                      <Zap className="w-8 h-8 text-genie-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Seizing Market Opportunity</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "⚡", text: "Operational Efficiency: Automate & optimize workflows" },
                      { icon: "🎯", text: "Enhanced Decision-Making: Data-driven insights" },
                      { icon: "💰", text: "New Revenue Streams: AI-powered innovations" },
                      { icon: "⭐", text: "Superior Customer Experience: Personalization" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-200">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
                        <span className="text-foreground/80 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Competitive Advantage */}
              <div className="relative">
                <div className="bg-gradient-to-br from-genie-teal/10 to-genie-teal/5 rounded-2xl p-8 border border-genie-teal/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-genie-teal/20 rounded-xl">
                      <Rocket className="w-8 h-8 text-genie-teal" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Competitive Advantage</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "🚀", text: "Accelerated Innovation: Rapid prototype deployment" },
                      { icon: "📊", text: "Data-Driven Edge: Proprietary capabilities" },
                      { icon: "👥", text: "Talent Attraction: Leading AI positioning" },
                      { icon: "🏆", text: "Industry Leadership: Define standards & disrupt" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-200">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
                        <span className="text-foreground/80 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Flow Arrow */}
            <div className="flex justify-center my-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-genie-primary to-genie-teal"></div>
                <ArrowRight className="w-6 h-6 text-genie-primary" />
                <div className="w-8 h-0.5 bg-gradient-to-r from-genie-primary to-genie-teal"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Key Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-genie-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-genie-primary/20 transition-colors duration-300">
              <Zap className="w-8 h-8 text-genie-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Experimentation First</h4>
            <p className="text-muted-foreground">
              Learning through doing. Every AI initiative starts with controlled experimentation.
            </p>
          </div>
          <div className="text-center p-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-genie-teal/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-genie-teal/20 transition-colors duration-300">
              <Users className="w-8 h-8 text-genie-teal" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Human-Centered</h4>
            <p className="text-muted-foreground">
              Technology serves people. Solutions enhance human capabilities.
            </p>
          </div>
          <div className="text-center p-6 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-genie-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-genie-cyan/20 transition-colors duration-300">
              <Rocket className="w-8 h-8 text-genie-cyan" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Scalable Impact</h4>
            <p className="text-muted-foreground">
              From proof-of-concept to enterprise deployment, solutions grow with needs.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore the complete journey behind my AI experimentation platform?
          </p>
          <Link to="/journey">
            <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4 text-lg font-semibold genie-glow">
              Discover My Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};