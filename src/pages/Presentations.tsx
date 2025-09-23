import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import GammaPresentationHub from "@/components/GammaPresentationHub";
import { IntelligentContentHub } from "@/components/IntelligentContentHub";
import { useEffect } from "react";

const Presentations = () => {
  useEffect(() => {
    document.title = "AI Presentations & Workflows - Genie AI Hub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Generate stunning enterprise presentations and workflow diagrams with Gamma AI integration. Create professional visual content in seconds.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumbs />
        </div>
        <IntelligentContentHub />
        <GammaPresentationHub />
      </main>
      <Footer />
    </div>
  );
};

export default Presentations;