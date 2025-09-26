import { Card } from "@/components/ui/card";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Brain, 
  Lightbulb, 
  Rocket, 
  BarChart3, 
  Shield,
  ArrowDown,
  ArrowRight,
  Zap,
  Building,
  Cog,
  Eye
} from "lucide-react";

export const StrategicValueInfographic = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Strategic AI Value Creation Framework
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Multi-Stakeholder <span className="text-primary">Value Creation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive framework for strategic AI integration that creates measurable value across all organizational stakeholders
          </p>
        </div>

        {/* Main Infographic */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Central Hub */}
          <div className="relative">
            
            {/* Core Value Engine */}
            <div className="flex justify-center mb-16">
              <Card className="relative p-8 bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 max-w-md">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Value Engine</h3>
                  <p className="text-sm text-muted-foreground">Strategic integration hub for multi-stakeholder value creation</p>
                </div>
              </Card>
            </div>

            {/* Stakeholder Value Circles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              
              {/* Business Leaders */}
              <Card className="relative p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Business Leaders</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Strategic ROI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Market advantage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Risk mitigation</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* IT Teams */}
              <Card className="relative p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Cog className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold text-green-900 dark:text-green-100 mb-3">IT Teams</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Infrastructure efficiency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Automated operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Security enhancement</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* End Users */}
              <Card className="relative p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3">End Users</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Enhanced productivity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Intuitive interfaces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Reduced workload</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Customers */}
              <Card className="relative p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Customers</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Personalized experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Faster service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Enhanced satisfaction</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Value Creation Process Flow */}
            <div className="relative mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Value Creation Process</h3>
                <p className="text-muted-foreground">Strategic steps to maximize stakeholder value</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Phase 1: Discovery & Assessment */}
                <div className="relative">
                  <Card className="p-6 h-full bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20 border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <h4 className="font-bold text-cyan-900 dark:text-cyan-100">Discovery & Assessment</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Eye className="w-4 h-4 text-cyan-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Stakeholder needs analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-cyan-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Current state assessment</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-cyan-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Value opportunity mapping</span>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="md:hidden flex justify-center mt-4">
                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>

                {/* Phase 2: Strategy & Design */}
                <div className="relative">
                  <Card className="p-6 h-full bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20 border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <h4 className="font-bold text-indigo-900 dark:text-indigo-100">Strategy & Design</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">AI solution architecture</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Risk mitigation planning</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Stakeholder alignment</span>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Arrow */}
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="md:hidden flex justify-center mt-4">
                    <ArrowDown className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>

                {/* Phase 3: Implementation & Scale */}
                <div>
                  <Card className="p-6 h-full bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Implementation & Scale</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Rocket className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Agile deployment</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Continuous optimization</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">Value measurement</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Key Metrics Dashboard */}
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Expected Value Outcomes</h3>
                <p className="text-muted-foreground">Measurable impacts across key performance indicators</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Productivity Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">60%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3x</div>
                  <div className="text-sm text-muted-foreground">Innovation Speed</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};