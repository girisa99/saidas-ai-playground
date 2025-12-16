import { NavigationHeader } from "@/components/NavigationHeader";
import { CellGeneHero } from "@/components/cellgene/CellGeneHero";
import { TherapyCarousel } from "@/components/cellgene/TherapyCarousel";
import { IndustryOutlook2025 } from "@/components/cellgene/IndustryOutlook2025";
import { TherapeuticComparisonSection } from "@/components/cellgene/TherapeuticComparisonSection";
import { ManufacturerInfographic } from "@/components/cellgene/ManufacturerInfographic";
import { PatientJourneyDiagram } from "@/components/cellgene/PatientJourneyDiagram";
import { TreatmentCenterSection } from "@/components/cellgene/TreatmentCenterSection";
import { Footer } from "@/components/Footer";

const CellGene = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <CellGeneHero />
      <TherapyCarousel />
      <IndustryOutlook2025 />
      <ManufacturerInfographic />
      <TherapeuticComparisonSection />
      <PatientJourneyDiagram />
      <TreatmentCenterSection />
      <Footer />
    </div>
  );
};

export default CellGene;
