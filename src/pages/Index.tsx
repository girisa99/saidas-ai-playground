import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { ContactModal } from "@/components/ContactModal";
import { AIExperimentationBanner } from "@/components/AIExperimentationBanner";
import { QuickStart } from "@/components/QuickStart";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { PublicGenieInterface } from "@/components/public-genie/PublicGenieInterface";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";

import { useEffect, useState } from "react";

const Index = () => {
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  useEffect(() => {
    // Update page metadata
    document.title = "Genie AI Experimentation HUB - Learn AI Development & Experimentation";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'AI Experimentation Hub by Saidas - Personal learning journey in AI-driven development, sharing experiments and insights for individual growth.');
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
      
      {/* Floating Genie Button */}
      <Button
        onClick={() => setIsGenieOpen(true)}
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transform hover:scale-105 transition-all duration-300 z-40"
        size="lg"
      >
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <Sparkles className="h-4 w-4" />
        </div>
      </Button>

      {/* Public Genie Interface */}
      <PublicGenieInterface
        isOpen={isGenieOpen}
        onClose={() => setIsGenieOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default Index;