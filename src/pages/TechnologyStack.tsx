import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { TechnologyStackSection } from "@/components/TechnologyStackSection";

const TechnologyStack = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-20">
        <TechnologyStackSection />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyStack;