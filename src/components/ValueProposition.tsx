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
            AI Experimentation Hub Technologies & Impact
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real-World Impact: Building Healthcare Solutions at Lightning Speed
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Proven AI framework culminating in breakthrough implementations - from experimentation 
            to real-world healthcare solutions with measurable business impact and accelerated development timelines.
          </p>
        </div>

        {/* Technology Stack Highlights */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">15+</div>
            <div className="text-sm font-medium text-foreground mb-1">AI Models Mastered</div>
            <div className="text-xs text-muted-foreground">GPT-4, Claude 3, Gemini Pro</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-teal/20 hover:border-genie-teal/40 transition-colors">
            <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-genie-teal" />
            </div>
            <div className="text-2xl font-bold text-genie-teal mb-2">94%</div>
            <div className="text-sm font-medium text-foreground mb-1">Accuracy Rate</div>
            <div className="text-xs text-muted-foreground">Hallucination reduction via RAG</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-cyan/20 hover:border-genie-cyan/40 transition-colors">
            <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-genie-cyan" />
            </div>
            <div className="text-2xl font-bold text-genie-cyan mb-2">12+</div>
            <div className="text-sm font-medium text-foreground mb-1">Specialized AI Agents</div>
            <div className="text-xs text-muted-foreground">Dynamic orchestration system</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">300%</div>
            <div className="text-sm font-medium text-foreground mb-1">Average ROI</div>
            <div className="text-xs text-muted-foreground">Within 12-18 months</div>
          </Card>
        </div>

        {/* Main Content - Two Column Layout like reference */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Proven Healthcare Solutions Development
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Journey culminated in a true victory lap, witnessing how AI experimentation 
                and learning translated directly into solving real-world business challenges. 
                The comprehensive toolkit I meticulously assembled wasn't just a collection of 
                technologies; it was a powerful engine enabling rapid development of 
                sophisticated, Healthcare-specific solutions.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-primary rounded-full"></div>
                  <span className="text-sm font-medium">AI-Accelerated Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-teal rounded-full"></div>
                  <span className="text-sm font-medium">Significant Cost Savings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-cyan rounded-full"></div>
                  <span className="text-sm font-medium">Unprecedented Efficiency Gains</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-genie-primary rounded-full"></div>
                  <span className="text-sm font-medium">Enterprise-Grade Solutions</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Timeline Process Flow */}
            <div className="relative">
              <div className="bg-gradient-to-br from-genie-primary/10 to-genie-teal/5 p-6 rounded-lg border border-genie-primary/20">
                <h4 className="text-xl font-bold text-foreground mb-6">
                  Real-World Impact: Building Healthcare Solutions at Lightning Speed
                </h4>
                <p className="text-sm text-muted-foreground mb-8">
                  This journey culminated in a true victory lap, witnessing how AI experimentation and learning translated 
                  directly into solving real-world business challenges. The comprehensive toolkit I had meticulously assembled 
                  wasn't just a collection of technologies; it was a powerful engine enabling the rapid development of 
                  sophisticated, healthcare-specific solutions. It was incredibly rewarding to see these tools come together, 
                  proving their immense potential.
                </p>
                
                {/* Timeline Flow */}
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-primary/20">
                        <h5 className="font-semibold text-foreground mb-1">Patient Management Systems</h5>
                        <p className="text-sm text-muted-foreground">
                          Developed robust systems for secure patient data handling, streamlining administrative tasks and 
                          improving care coordination.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-primary/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-teal/20">
                        <h5 className="font-semibold text-foreground mb-1">User Management Modules</h5>
                        <p className="text-sm text-muted-foreground">
                          Built flexible modules for managing diverse user roles and access within healthcare platforms, ensuring 
                          data security.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-teal/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-cyan text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-cyan/20">
                        <h5 className="font-semibold text-foreground mb-1">Module Management Frameworks</h5>
                        <p className="text-sm text-muted-foreground">
                          Created foundational frameworks for rapid development and integration of new features.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-cyan/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-primary/20">
                        <h5 className="font-semibold text-foreground mb-1">Treatment Center Onboarding Workflows</h5>
                        <p className="text-sm text-muted-foreground">
                          Designed automated workflows for quick and compliant onboarding of new treatment centers, 
                          accelerating network expansion.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-primary/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-teal/20">
                        <h5 className="font-semibold text-foreground mb-1">Manufacturing Onboarding Processes</h5>
                        <p className="text-sm text-muted-foreground">
                          Streamlined and accelerated onboarding of manufacturing partners, crucial for scaling production and 
                          distribution.
                        </p>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-genie-teal/40 ml-4 mt-2"></div>
                  </div>
                  
                  {/* Step 6 */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-genie-cyan text-white rounded-full flex items-center justify-center text-sm font-bold">
                        6
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg flex-1 border border-genie-cyan/20">
                        <h5 className="font-semibold text-foreground mb-1">Patient Onboarding Systems</h5>
                        <p className="text-sm text-muted-foreground">
                          Implemented intuitive systems to simplify patient onboarding, from registration to initial consultation.
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
                      <div className="text-sm font-semibold">AI-Accelerated Development</div>
                      <div className="text-xs text-muted-foreground">Accelerated development drastically reduced timelines. What once took months now takes weeks or even days.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-genie-teal" />
                    <div>
                      <div className="text-sm font-semibold">Significant Cost Savings</div>
                      <div className="text-xs text-muted-foreground">The accelerated pace led to significant cost savings, freeing resources for bigger, traditional development and quicker time to market.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-genie-cyan" />
                    <div>
                      <div className="text-sm font-semibold">Unprecedented Efficiency Gains</div>
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

        {/* Bottom Section */}
        <div className="bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10 rounded-lg p-8 text-center border border-genie-primary/20">
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
      </div>
    </section>
  );
};