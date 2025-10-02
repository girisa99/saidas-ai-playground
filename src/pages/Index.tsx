import { NavigationHeader } from "@/components/NavigationHeader";
import { UnifiedHeroBanner } from "@/components/UnifiedHeroBanner";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { QuickStart } from "@/components/QuickStart";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { useEffect } from "react";

const Index = () => {
  // Set page metadata on mount
  useEffect(() => {
    document.title = "Genie AI Hub — Proven Value Creation Framework";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '2 live features and 80+ contexts delivering measurable business value through systematic AI experimentation and validation.');
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
      </main>
      <NewsletterSubscription />
      <Footer />
    </div>
  );
};

export default Index;