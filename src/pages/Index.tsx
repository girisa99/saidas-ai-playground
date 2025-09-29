import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { QuickStart } from "@/components/QuickStart";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";

const Index = () => {
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
        {/* Clear navigation flow to guide users */}
        <CTASection currentPage="home" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;