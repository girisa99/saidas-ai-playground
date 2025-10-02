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
          <h3 className="text-2xl font-bold mb-4">2 Live Features: Dual Context AI with Enterprise Performance</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            <strong>GenieAI Hub Platform & Genie Conversation</strong> - featuring Dual Context System (Tech ↔ Healthcare), 
            Split-Screen Interface, Smart Session Management, and proven performance (&lt;2.5s response, 1,000+ concurrent users). 
            Demonstrating the Experiment → Validate → Lead to Deploy framework with real implementations and documented outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};