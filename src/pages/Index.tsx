import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { ContactModal } from "@/components/ContactModal";
import { AIExperimentationBanner } from "@/components/AIExperimentationBanner";
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
        
        <TrustSection />
        <GartnerValueSection />
        <QuickStart />
        
        
        <FAQ />
        {/* Simplified homepage - detailed sections moved to dedicated pages per UI/UX audit */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;