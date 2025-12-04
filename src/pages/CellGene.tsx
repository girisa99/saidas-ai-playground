import { NavigationHeader } from "@/components/NavigationHeader";
import { CellGeneHero } from "@/components/cellgene/CellGeneHero";
import { TherapyCarousel } from "@/components/cellgene/TherapyCarousel";
import { Footer } from "@/components/Footer";

const CellGene = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <CellGeneHero />
      <TherapyCarousel />
      <Footer />
    </div>
  );
};

export default CellGene;
