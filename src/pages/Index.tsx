import { NavigationHeader } from "@/components/NavigationHeader";
import { UnifiedHeroBanner } from "@/components/UnifiedHeroBanner";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { QuickStart } from "@/components/QuickStart";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Update page metadata
    document.title = "Genie AI Experimentation HUB - 2 Live Features: Personal AI Change Agent Development";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '2 Live Features Launched: GenieAI Hub Platform & Genie Conversation (80+ contexts). Personal AI learning journey building change agent expertise through proven Experiment → Validate → Lead to Deploy framework.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <UnifiedHeroBanner />
      <main>
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