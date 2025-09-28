import { Button } from "@/components/ui/button";
import { CheckCircle, Activity, Wrench, Target, ArrowDown, FileText } from "lucide-react";

interface BusinessUseCasesHeroProps {
  onViewExperiments: () => void;
  showDecisionFramework: boolean;
  onToggleFramework: () => void;
}

export const BusinessUseCasesHero = ({ 
  onViewExperiments, 
  showDecisionFramework, 
  onToggleFramework 
}: BusinessUseCasesHeroProps) => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/hero-ai-background.jpg')` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-primary/80 via-genie-primary/60 to-genie-secondary/70" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-genie-accent/10 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-white/5 rounded-full blur-xl animate-pulse delay-2000" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
          <span className="text-genie-accent">3-Phase Framework</span> Applications
          <span className="block text-white mt-2">Real-World Experiments</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
          Real-world validation of the <span className="text-genie-accent font-semibold">Experiment → Validate → Deploy</span> framework through healthcare AI implementations, following Gartner value methodology. Exploring various scenarios where some are implemented and actively being tested, while others are in development phases as part of our ongoing experimentation initiatives.
        </p>
        
        {/* Key Features Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mb-2" />
            <h3 className="font-semibold text-white text-xs sm:text-sm">DEPLOY Phase</h3>
            <p className="text-white/80 text-xs">Deployed & Working</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
            <h3 className="font-semibold text-white text-xs sm:text-sm">VALIDATE Phase</h3>
            <p className="text-white/80 text-xs">Active Validation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mb-2" />
            <h3 className="font-semibold text-white text-xs sm:text-sm">EXPERIMENT Phase</h3>
            <p className="text-white/80 text-xs">Building Components</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 mb-2" />
            <h3 className="font-semibold text-white text-xs sm:text-sm">Step-by-Step</h3>
            <p className="text-white/80 text-xs">Gradual Implementation</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
          <Button 
            className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark"
            onClick={onViewExperiments}
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            View Our Experiments
          </Button>
          <Button 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/5"
            onClick={onToggleFramework}
          >
            <FileText className="w-4 h-4 mr-2" />
            {showDecisionFramework ? 'Hide' : 'View'} Experiment Framework
          </Button>
        </div>
      </div>
    </section>
  );
};