import { motion } from "framer-motion";
import heroBannerImg from "@/assets/cellgene-hero-banner.jpg";

export const CellGeneHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBannerImg} 
          alt="Cell and Gene Advanced Therapies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Main title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Cell & Gene
            </span>
            <span className="text-foreground"> Advanced Therapies</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-foreground/90 font-medium max-w-3xl mx-auto">
            Transforming Medicine Through Living Therapies
          </p>

          {/* Main Description */}
          <div className="space-y-4 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            <p>
              Cell and Gene Advanced Therapies (CGAT) represent a paradigm shift in healthcare—moving from 
              treating symptoms to addressing the root cause of disease at the cellular and genetic level.
            </p>
            <p>
              Unlike traditional pharmaceuticals that require repeated dosing, these therapies offer the 
              potential for <span className="text-primary font-medium">one-time treatments</span> that can 
              provide lasting or even curative outcomes for conditions once considered untreatable.
            </p>
          </div>

          {/* Why CGAT Matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/60 backdrop-blur-md rounded-xl border border-border/50 p-6 mt-8 text-left"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Why CGAT is Reshaping Healthcare</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>• <span className="text-foreground font-medium">Precision Medicine:</span> Treatments designed for your unique genetic makeup</p>
                <p>• <span className="text-foreground font-medium">Curative Potential:</span> Addressing disease causes, not just symptoms</p>
                <p>• <span className="text-foreground font-medium">One-Time Treatments:</span> Potential to replace lifelong medication regimens</p>
              </div>
              <div className="space-y-2">
                <p>• <span className="text-foreground font-medium">Rare Disease Hope:</span> New options for previously untreatable conditions</p>
                <p>• <span className="text-foreground font-medium">Cancer Revolution:</span> CAR-T and other cellular immunotherapies</p>
                <p>• <span className="text-foreground font-medium">Regenerative Medicine:</span> Repairing and replacing damaged tissues</p>
              </div>
            </div>
          </motion.div>

          {/* Knowledge Hub Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground italic mt-6"
          >
            This knowledge hub consolidates insights on how science and medicine are converging to cure 
            diseases—explore the therapeutic modalities below to understand the breakthroughs shaping 
            the future of treatment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
