import { Brain, Database, Zap } from "lucide-react";

export const AIExperimentationBanner = () => {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* AI Experimentation Hub Banner */}
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