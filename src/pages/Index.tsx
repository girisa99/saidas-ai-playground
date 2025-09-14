import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { ValueProposition } from "@/components/ValueProposition";
import { AboutSection } from "@/components/AboutSection";
import { DocumentsSection } from "@/components/DocumentsSection";
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
        <ValueProposition />
        <div id="about">
          <AboutSection />
        </div>
        <div id="documents">
          <DocumentsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
