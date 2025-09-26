import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Shield,
  Users,
  Brain,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

export const AIValueProposition = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-primary/5 to-genie-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary),0.1),transparent)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--genie-teal),0.1),transparent)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Transform Your Business with AI
          </div>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-fade-in">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-genie-teal">Genie AI Hub?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
            The fastest path from AI experimentation to enterprise transformation
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Speed & Agility */}
          <Card className="group p-8 bg-gradient-to-br from-white to-primary/5 dark:from-slate-900 dark:to-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">10x Faster Development</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Accelerate AI project delivery from months to weeks with our pre-built frameworks and automation tools.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Speed is everything</span>
              </div>
            </div>
          </Card>

          {/* Enterprise Security */}
          <Card className="group p-8 bg-gradient-to-br from-white to-genie-teal/5 dark:from-slate-900 dark:to-genie-teal/10 border-2 border-genie-teal/20 hover:border-genie-teal/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-genie-teal to-genie-teal/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Enterprise-Grade Security</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Built-in governance, compliance, and security frameworks that meet the highest enterprise standards.
              </p>
              <div className="flex items-center gap-2 text-genie-teal font-medium">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Security first</span>
              </div>
            </div>
          </Card>

          {/* Team Collaboration */}
          <Card className="group p-8 bg-gradient-to-br from-white to-genie-cyan/5 dark:from-slate-900 dark:to-genie-cyan/10 border-2 border-genie-cyan/20 hover:border-genie-cyan/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-genie-cyan to-genie-cyan/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Cross-Functional Teams</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Enable business users and IT teams to collaborate seamlessly on AI initiatives with intuitive tools.
              </p>
              <div className="flex items-center gap-2 text-genie-cyan font-medium">
                <Users className="w-4 h-4" />
                <span className="text-sm">Better together</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ROI Impact Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 lg:p-16 mb-16 relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.2),transparent)]"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Proven <span className="text-blue-400">Business Impact</span>
              </h3>
              <p className="text-blue-200 text-lg">Real results from AI experimentation initiatives</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-12 h-12 text-blue-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">300%</div>
                <div className="text-blue-200">ROI Increase</div>
                <div className="text-sm text-blue-300 mt-2">Average within 12 months</div>
              </div>
              
              <div className="text-center group">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-12 h-12 text-emerald-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">75%</div>
                <div className="text-blue-200">Faster Time-to-Market</div>
                <div className="text-sm text-blue-300 mt-2">From concept to production</div>
              </div>
              
              <div className="text-center group">
                <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-12 h-12 text-purple-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-blue-200">AI Models Deployed</div>
                <div className="text-sm text-blue-300 mt-2">Across enterprise functions</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to Transform?
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
            Start Your AI <span className="text-primary">Experimentation Journey</span>
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join forward-thinking organizations already leveraging AI to drive innovation and competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/journey">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold genie-glow group">
                Explore My Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link to="/business-use-cases">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold hover:bg-primary/5">
                View Use Cases
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};