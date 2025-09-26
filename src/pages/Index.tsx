import { NavigationHeader } from "@/components/NavigationHeader";
import { MultiHeroSection } from "@/components/MultiHeroSection";
import { TrustSection } from "@/components/TrustSection";
import { GartnerValueSection } from "@/components/GartnerValueSection";
import { ContactForm } from "@/components/ContactForm";
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
        
        {/* Contact Section */}
        <section id="contact-form" className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Transform Your Development?
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with Saidas to explore how AI can accelerate your innovation journey.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </section>
        
        <FAQ />
        {/* Simplified homepage - detailed sections moved to dedicated pages per UI/UX audit */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;