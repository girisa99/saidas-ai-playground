import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Database, 
  TrendingUp, 
  Scale,
  Users,
  Building,
  Lightbulb,
  Target
} from "lucide-react";

export const ValueEquationInfographic = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-genie-teal/20">
            <Scale className="w-4 h-4 mr-2" />
            Gartner Value Equation
          </Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            Enterprise <span className="text-genie-teal">Value Framework</span>
          </h2>
        </div>

        {/* Value Equation Visual */}
        <div className="relative mb-16">
          <div className="max-w-6xl mx-auto">
            {/* Central Value Story */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-genie-teal/10 to-genie-cyan/10 rounded-full transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 lg:p-12 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.2),transparent)]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">Value Story</h3>
                  <p className="text-lg text-blue-200 mb-6">Strategic AI integration framework aligning stakeholder value creation with measurable business outcomes</p>
                  
                  {/* Value Equation Visual */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
                    
                    {/* Value Creation (Give) */}
                    <div className="relative">
                      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Database className="w-8 h-8 text-blue-300" />
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-white">Value Creation</h4>
                        <p className="text-sm text-blue-200 mb-4">(Give)</p>
                        <div className="space-y-2 text-xs">
                          <div className="bg-white/5 p-2 rounded">Self-service AI tools</div>
                          <div className="bg-white/5 p-2 rounded">Accelerated frameworks</div>
                          <div className="bg-white/5 p-2 rounded">Enterprise governance</div>
                        </div>
                      </Card>
                    </div>

                    {/* Central Arrow */}
                    <div className="flex justify-center">
                      <div className="bg-amber-400 text-slate-900 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap">
                        Value Logic
                      </div>
                    </div>

                    {/* Value Realization (Get) */}
                    <div className="relative">
                      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-8 h-8 text-emerald-300" />
                        </div>
                        <h4 className="text-xl font-bold mb-3 text-white">Value Realization</h4>
                        <p className="text-sm text-blue-200 mb-4">(Get)</p>
                        <div className="space-y-2 text-xs">
                          <div className="bg-white/5 p-2 rounded">Measurable ROI</div>
                          <div className="bg-white/5 p-2 rounded">Enhanced productivity</div>
                          <div className="bg-white/5 p-2 rounded">Market advantage</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stakeholder Impact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Stakeholder Priorities */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Stakeholder Priorities</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-blue-900/20 rounded-lg">
                <Target className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">Business Leaders</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Strategic competitive advantage and measurable ROI</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-blue-900/20 rounded-lg">
                <Building className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">IT Teams</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Scalable infrastructure and reduced technical debt</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-blue-900/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">End Users</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Intuitive AI tools and improved productivity</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Multi-Stakeholder Impacts */}
          <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">Multi-Stakeholder Impacts</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-emerald-900/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <div className="font-medium text-emerald-900 dark:text-emerald-100">Innovation Acceleration</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Faster time-to-market for AI-powered solutions</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-emerald-900/20 rounded-lg">
                <Scale className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <div className="font-medium text-emerald-900 dark:text-emerald-100">Operational Efficiency</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Streamlined processes and reduced costs</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-emerald-900/20 rounded-lg">
                <Target className="w-5 h-5 text-emerald-600 mt-1" />
                <div>
                  <div className="font-medium text-emerald-900 dark:text-emerald-100">Strategic Positioning</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Market leadership and competitive differentiation</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Value Enablers vs Realized Return */}
        <div className="bg-gradient-to-r from-primary/5 via-transparent to-genie-teal/5 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-4">
                <Database className="w-4 h-4" />
                Value Enablers
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Internal Development Capabilities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Building security and governance frameworks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>DevOps and container management platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Observability SDKs and internal platforms</span>
                </li>
              </ul>
            </div>

            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-2 bg-genie-teal/10 px-4 py-2 rounded-full text-genie-teal text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Realized Return
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Enterprise Domain Impact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 justify-end lg:justify-start lg:flex-row-reverse">
                  <span>Improved customer satisfaction and engagement</span>
                  <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                </li>
                <li className="flex items-center gap-2 justify-end lg:justify-start lg:flex-row-reverse">
                  <span>Revenue growth through innovative solutions</span>
                  <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                </li>
                <li className="flex items-center gap-2 justify-end lg:justify-start lg:flex-row-reverse">
                  <span>Market positioning and industry leadership</span>
                  <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};