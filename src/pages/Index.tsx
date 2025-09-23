import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { StorySection } from "@/components/StorySection";
import { AIExperimentationBanner } from "@/components/AIExperimentationBanner";
import { ValueProposition } from "@/components/ValueProposition";
import GammaPresentationHub from "@/components/GammaPresentationHub";
import { GammaContentGuide } from "@/components/GammaContentGuide";
import { GammaIntegrationWidget } from "@/components/GammaIntegrationWidget";
import { QuickStart } from "@/components/QuickStart";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Update page metadata
    document.title = "Genie AI Experimentation HUB - Transform Development with AI";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AI Experimentation Hub by Saidas - Comprehensive guide to AI-driven development, enterprise transformation, and intelligent automation solutions.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <MultiHeroSection />
        
        {/* Home Page Gamma Widgets */}
        <section className="py-16 bg-gradient-to-b from-background to-genie-primary/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                AI-Powered Content Generation
              </h2>
              <p className="text-muted-foreground">
                Generate professional presentations and visual content instantly
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <GammaIntegrationWidget
                contentType="infographic"
                title="AI Hub Overview"
                description="Generate comprehensive infographic showcasing the complete AI experimentation ecosystem, tools, and transformation journey"
                autoGenerate={true}
                showInstructions={false}
              />
              
              <GammaIntegrationWidget
                contentType="workflow"
                title="AI Implementation Workflow"
                description="Create visual workflow diagram showing step-by-step AI implementation process for enterprise transformation"
                autoGenerate={false}
                showInstructions={true}
              />
            </div>
          </div>
        </section>
        
        <GammaContentGuide />
        <TrustSection />
        <StorySection />
        <QuickStart />
        <ValueProposition />
        <GammaPresentationHub />
        <FAQ />
        {/* Simplified homepage - detailed sections moved to dedicated pages per UI/UX audit */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;