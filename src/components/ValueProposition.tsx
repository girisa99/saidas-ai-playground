import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Shield, Brain, Zap, Database, Target, Award, Rocket } from "lucide-react";
import healthcareImpact from "@/assets/healthcare-solutions-impact.png";

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            AI Experimentation Hub: From Vision to Enterprise Reality
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Strategic AI Implementation Framework
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Systematic 6-month journey transforming theoretical AI potential into tangible business value. 
            Advanced AI technologies, enterprise-grade infrastructure, and proven methodologies for 
            organizational AI transformation and digital innovation.
          </p>
        </div>

        {/* Strategic Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">70%</div>
            <div className="text-sm font-medium text-foreground mb-1">AI-Driven Business Value</div>
            <div className="text-xs text-muted-foreground">Projected increase by 2030</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-teal/20 hover:border-genie-teal/40 transition-colors">
            <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-genie-teal" />
            </div>
            <div className="text-2xl font-bold text-genie-teal mb-2">$1.3B</div>
            <div className="text-sm font-medium text-foreground mb-1">Global AI Market</div>
            <div className="text-xs text-muted-foreground">USD value by 2029</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-cyan/20 hover:border-genie-cyan/40 transition-colors">
            <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-genie-cyan" />
            </div>
            <div className="text-2xl font-bold text-genie-cyan mb-2">25%</div>
            <div className="text-sm font-medium text-foreground mb-1">Productivity Boost</div>
            <div className="text-xs text-muted-foreground">Average in early adopters</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">88%</div>
            <div className="text-sm font-medium text-foreground mb-1">Executive Agreement</div>
            <div className="text-xs text-muted-foreground">AI critical for competitive advantage</div>
          </Card>
        </div>

        {/* From Curiosity to Impact Section */}
        <div className="bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10 rounded-lg p-8 text-center border border-genie-primary/20 mb-16">
          <div className="flex justify-center gap-4 mb-4">
            <Brain className="h-8 w-8 text-genie-primary" />
            <Database className="h-8 w-8 text-genie-teal" />
            <Zap className="h-8 w-8 text-genie-cyan" />
          </div>
          <h3 className="text-2xl font-bold mb-4">AI Experimentation Hub: From Vision to Enterprise Reality</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Systematic 6-month journey culminating in breakthrough healthcare solutions with proven business impact. 
            Advanced AI technologies, enterprise-grade infrastructure, and measurable ROI - transforming how organizations 
            approach digital health innovation and therapeutic development.
          </p>
        </div>

        {/* Main Content - Two Column Layout like reference */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Strategic AI Implementation Framework
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Systematic 4-phase approach transforming theoretical AI potential into tangible business value. 
                Each phase builds strategic alignment, validated learning, and sustainable growth for long-term success.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-primary rounded-full"></div>
                  <span className="text-sm font-medium">Strategic Agility & Innovation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-teal rounded-full"></div>
                  <span className="text-sm font-medium">Sustainable Growth Models</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-cyan rounded-full"></div>
                  <span className="text-sm font-medium">Enhanced Operational Resilience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-primary rounded-full"></div>
                  <span className="text-sm font-medium">Future-Proof Capabilities</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Timeline Process Flow */}
            <div className="relative">
              <div className="bg-gradient-to-br from-genie-primary/10 to-genie-teal/5 p-6 rounded-lg border border-genie-primary/20">
                <h4 className="text-xl font-bold text-foreground mb-6">
                  Strategic 4-Phase AI Implementation Roadmap
                </h4>
                <p className="text-sm text-muted-foreground mb-8">
                  Structured approach guiding organizations through systematic AI adoption with clear milestones and measurable outcomes.
                </p>
                
                {/* Timeline Flow */}
                <div className="space-y-4">
                  {/* Phase 1: Assess */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-primary/20">
                        <h5 className="font-semibold text-foreground mb-1">Phase 1: Assess (Weeks 1-4)</h5>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive understanding of current capabilities and identification of high-impact AI opportunities 
                          aligned with core business objectives.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-primary/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Phase 2: Pilot */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-teal/20">
                        <h5 className="font-semibold text-foreground mb-1">Phase 2: Pilot (Weeks 5-12)</h5>
                        <p className="text-sm text-muted-foreground">
                          Validation of AI concepts through focused experimentation, generating empirical data and practical 
                          insights for strategic decision-making.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-teal/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Phase 3: Scale */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-cyan text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-cyan/20">
                        <h5 className="font-semibold text-foreground mb-1">Phase 3: Scale (Months 4-9)</h5>
                        <p className="text-sm text-muted-foreground">
                          Expansion of successful pilots, seamless integration of AI solutions into core operations, and 
                          development of robust internal AI capabilities.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-cyan/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Phase 4: Transform */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-primary/20">
                        <h5 className="font-semibold text-foreground mb-1">Phase 4: Transform (Months 10+)</h5>
                        <p className="text-sm text-muted-foreground">
                          Cultivating an AI-first culture that drives continuous innovation, unlocks new business models, 
                          and secures long-term market leadership.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                {/* Bottom Summary */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-genie-primary/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-genie-primary" />
                    <div>
                      <div className="text-sm font-semibold">Rapid Innovation & Growth</div>
                      <div className="text-xs text-muted-foreground">Accelerated development enables quick adaptation to market changes and emerging trends.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-genie-teal" />
                    <div>
                      <div className="text-sm font-semibold">Sustainable Competitive Edge</div>
                      <div className="text-xs text-muted-foreground">Building foundational AI capabilities for long-term innovation and market leadership.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-genie-cyan" />
                    <div>
                      <div className="text-sm font-semibold">Strategic Business Value</div>
                      <div className="text-xs text-muted-foreground">Measurable ROI through enhanced efficiency, new revenue streams, and data-driven insights.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Technology Stack */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-genie-primary/10 rounded-lg">
                <Brain className="h-8 w-8 text-genie-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-genie-primary">Agentic AI & LLMs</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced multi-agent systems with autonomous AI that interprets, reasons, plans, and executes actions independently.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs mr-2">GPT-4 & Claude 3</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">Gemini Pro</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">Agentic Orchestration</Badge>
                  <Badge variant="secondary" className="text-xs">Multi-Agent Systems</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-genie-teal/20 hover:border-genie-teal/40 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-genie-teal/10 rounded-lg">
                <Database className="h-8 w-8 text-genie-teal" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-genie-teal">Enterprise Infrastructure</h3>
                <p className="text-muted-foreground mb-4">
                  Robust development ecosystem with containerization, real-time databases, and enterprise-grade architecture.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs mr-2">Docker & Kubernetes</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">Supabase & PostgreSQL</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">TypeScript</Badge>
                  <Badge variant="secondary" className="text-xs">Vector Databases</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-genie-cyan/20 hover:border-genie-cyan/40 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-genie-cyan/10 rounded-lg">
                <Shield className="h-8 w-8 text-genie-cyan" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-genie-cyan">RAG & Security</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced RAG implementation for hallucination reduction, enterprise security, and compliance frameworks.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs mr-2">RAG Architecture</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">94% Accuracy</Badge>
                  <Badge variant="secondary" className="text-xs mr-2">Enterprise Security</Badge>
                  <Badge variant="secondary" className="text-xs">Compliance Ready</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Business Use Cases */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-background">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-genie-primary/10 rounded-lg">
                <TrendingUp className="h-8 w-8 text-genie-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Healthcare Digital Transformation</h3>
                <p className="text-muted-foreground mb-4">
                  Implemented comprehensive solutions including patient management systems, treatment center onboarding workflows, 
                  and manufacturing process automation with measurable ROI.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-primary mr-2" />
                    Patient onboarding systems with automated workflows
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-primary mr-2" />
                    Treatment center operational optimization
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-primary mr-2" />
                    Manufacturing partner integration frameworks
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-primary mr-2" />
                    User management modules with secure access control
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-background">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-genie-teal/10 rounded-lg">
                <Award className="h-8 w-8 text-genie-teal" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Enterprise AI Strategy & ROI</h3>
                <p className="text-muted-foreground mb-4">
                  Strategic AI integration delivering 150-300% ROI within 12-18 months through automated workflows, 
                  predictive analytics, and operational efficiency improvements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-teal mr-2" />
                    60% automated inquiry handling reducing support costs
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-teal mr-2" />
                    15-20% employee time savings across departments
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-teal mr-2" />
                    30% reduction in research time with 25% decision accuracy improvement
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-genie-teal mr-2" />
                    Scalable frameworks for enterprise-wide deployment
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};