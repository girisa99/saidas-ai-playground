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
            <Rocket className="w-4 h-4" />
            Personal AI Experimentation Journey
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Connecting <span className="text-genie-primary">Personal Experimentation</span> to Enterprise Value
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Demonstrating how individual initiatives, when properly structured with robust guardrails, align seamlessly with <strong>Gartner's Value Creation & Realization</strong> framework through the <strong>Experiment → Validate → Lead to Deploy</strong> pipeline.
          </p>
        </div>

        {/* Value Creation vs Value Realization Framework */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
            <span className="text-genie-primary">Gartner's Value Framework:</span> Creation vs Realization
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Value Creation (Give) */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Stakeholders' Priorities & Concerns</p>
                  <h4 className="text-2xl font-bold text-foreground">Value Creation</h4>
                  <p className="text-sm text-muted-foreground">(Give)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <Cog className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Self-service AI application creation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <Zap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Accelerated development frameworks</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Enterprise-grade security & governance</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-500">
                    <Database className="w-5 h-5" />
                    <p className="font-semibold">Value Levers</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Value Realization (Get) */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Multi-Stakeholder Impacts</p>
                  <h4 className="text-2xl font-bold text-foreground">Value Realization</h4>
                  <p className="text-sm text-muted-foreground">(Get)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <BarChart3 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Measurable ROI & business impact</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <Users className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Enhanced team productivity</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <Target className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Competitive market advantage</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                    <p className="font-semibold">Realized Return to Organization</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Value Logic Connector */}
          <div className="flex justify-center my-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/20 border-2 border-amber-500/30 rounded-full">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-600 dark:text-amber-400">Value Logic</span>
              <ArrowRight className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Mapping to Day 0-45 and Day 45-90 */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
            <span className="text-genie-primary">Phased Implementation:</span> Mapping to Real Outcomes
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Day 0-45: Foundational Guardrails */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Day 0-45</h4>
                  <p className="text-sm text-muted-foreground">Foundational Guardrails → Value Creation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    What We Invested (Value Creation)
                  </h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span><strong>Self-service AI:</strong> Defining guardrails, ethical frameworks, compliance standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span><strong>Accelerated frameworks:</strong> Secure, scalable foundational architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span><strong>Security & governance:</strong> Risk mitigation and data governance protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span><strong>Education:</strong> AI principles and safe usage guidelines</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    What We Gained (Value Levers)
                  </h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Reduced Risk: Minimized legal, ethical, operational pitfalls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Accelerated Setup: Expedited future development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Enhanced Security: Robust data protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>Clear Direction: Framework for safe AI exploration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Day 45-90: Practical Implementation */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Day 45-90</h4>
                  <p className="text-sm text-muted-foreground">Implementation & Results → Value Realization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-500" />
                    What We Invested (Continued Creation)
                  </h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Application: Iterative use case refinement and prototyping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Integration: Healthcare systems (NPI, CMS, FDA, EMR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Platform Development: Multi-tenant experimental environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Deployment: Validated concepts to public products</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    What We Gained (Value Realization)
                  </h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span><strong>Measurable ROI:</strong> Real-world validated AI solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span><strong>Enhanced productivity:</strong> 10+ validated use cases across 3 areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span><strong>Market advantage:</strong> 2 live features launched publicly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span><strong>Return to org:</strong> AI democratization insights & knowledge transfer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Gartner Value Creation in Action
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              See how our AI experimentation framework delivers measurable business value across all stakeholder groups through systematic implementation and validation.
            </p>
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
                Why <span className="text-primary">Personal AI Experimentation</span> Now?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Individual experiments showcase AI's immense power, fueling personal growth and driving AI democratization through hands-on learning.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Unlocking Business Drivers */}
              <Card className="p-6 bg-gradient-to-br from-genie-primary/10 to-genie-primary/5 border-genie-primary/20">
                <h4 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6 text-genie-primary" />
                  Personal Capability Building
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Skill Development:</strong> Build AI expertise that makes you indispensable</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Career Future-Proofing:</strong> Stay ahead of disruption with cutting-edge knowledge</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Leadership Positioning:</strong> Become the AI champion your organization needs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Innovation Confidence:</strong> Learn through hands-on experimentation</span>
                  </div>
                </div>
              </Card>

              {/* Seizing Market Opportunity */}
              <Card className="p-6 bg-gradient-to-br from-genie-teal/10 to-genie-teal/5 border-genie-teal/20">
                <h4 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-genie-teal" />
                  Change Agent Advantage
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>First Mover Advantage:</strong> Lead AI adoption in your field before competitors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Proven Credibility:</strong> Build track record through documented success cases</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Position Yourself as Leader:</strong> Become the AI change agent your field needs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-genie-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm"><strong>Market Differentiation:</strong> Stand out with unique AI implementation knowledge</span>
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