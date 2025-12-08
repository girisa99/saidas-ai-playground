import { NavigationHeader } from "@/components/NavigationHeader";
import { CellGeneHero } from "@/components/cellgene/CellGeneHero";
import { TherapyCarousel } from "@/components/cellgene/TherapyCarousel";
import { TherapeuticComparisonSection } from "@/components/cellgene/TherapeuticComparisonSection";
import { PatientJourneyDiagram } from "@/components/cellgene/PatientJourneyDiagram";
import { Footer } from "@/components/Footer";

const CellGene = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <CellGeneHero />
      <TherapyCarousel />
      <TherapeuticComparisonSection />
      <PatientJourneyDiagram />
      <Footer />
    </div>
  );
};

export default CellGene;
