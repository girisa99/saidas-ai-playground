import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import GammaPresentationHub from "@/components/GammaPresentationHub";
import { IntelligentContentHub } from "@/components/IntelligentContentHub";
import BusinessUseCases from "@/components/BusinessUseCases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools">AI Content Tools</TabsTrigger>
              <TabsTrigger value="business">Business Use Cases</TabsTrigger>
              <TabsTrigger value="gamma">Gamma Hub</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools" className="mt-6">
              <IntelligentContentHub />
            </TabsContent>
            
            <TabsContent value="business" className="mt-6">
              <BusinessUseCases />
            </TabsContent>
            
            <TabsContent value="gamma" className="mt-6">
              <GammaPresentationHub />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Presentations;