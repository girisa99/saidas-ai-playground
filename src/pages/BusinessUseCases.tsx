import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import BusinessUseCasesComponent from "@/components/BusinessUseCases";
import { useEffect } from "react";

const BusinessUseCases = () => {
  useEffect(() => {
    document.title = "Business Use Cases - Automation vs Agentic AI - Genie AI Hub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Strategic technology selection for oncology workflows. Comprehensive framework for choosing between automation and agentic AI in patient onboarding and referral processes.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BusinessUseCasesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessUseCases;