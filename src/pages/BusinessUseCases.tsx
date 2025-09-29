import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import BusinessUseCasesComponent from "@/components/BusinessUseCases";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";

const BusinessUseCases = () => {
  useEffect(() => {
    document.title = "3-Phase Framework Applications - Real-World AI Experiments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real-world validation of the Experiment → Validate → Lead to Deploy framework through healthcare AI implementations. Strategic technology selection following Gartner value methodology for oncology workflows.');
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