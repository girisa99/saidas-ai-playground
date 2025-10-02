import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import BusinessUseCasesComponent from "@/components/BusinessUseCases";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";

const BusinessUseCases = () => {
  useEffect(() => {
    document.title = "3-Phase Framework Applications - 2 Live Features in Healthcare AI";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '2 Live Features with Documented Outcomes: GenieAI Hub Platform & Genie Conversation demonstrating Experiment → Share Results → Thought Leadership framework. Real case studies proving how AI disrupts development - shared learnings from healthcare AI applications with proven scalability and performance metrics.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BusinessUseCasesComponent />
        </div>
        
        {/* Strategic next steps */}
        <CTASection currentPage="business-cases" />
      </main>
      <Footer />
    </div>
  );
};

export default BusinessUseCases;