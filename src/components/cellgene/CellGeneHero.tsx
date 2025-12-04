import { motion } from "framer-motion";
import { Brain, Lightbulb, Users, Truck, Clock, TrendingUp } from "lucide-react";
import heroBannerImg from "@/assets/cellgene-hero-banner.jpg";

export const CellGeneHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBannerImg} 
          alt="Cell and Gene Advanced Therapies Knowledge Hub" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Part of Genie AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Part of Genie AI Experimentation Hub</span>
          </motion.div>

          {/* Main title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">CGAT </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-foreground/90 font-medium max-w-3xl mx-auto">
            Understanding How Medicine & Science Are Transforming Cures
          </p>

          {/* Main Description - Knowledge Hub Focus */}
          <div className="space-y-4 text-base md:text-lg text-muted-foreground max-w-4xl mx-auto">
            <p>
              Cell and Gene Advanced Therapies (CGAT) represent a <span className="text-primary font-medium">paradigm shift</span> from 
              traditional therapeutics—moving beyond symptom management to addressing diseases at their genetic and cellular root.
            </p>
            <p>
              This knowledge hub consolidates <span className="text-foreground font-medium">learnings, processes, customer journeys, 
              and industry developments</span> to help you understand why CGAT is fundamentally different from conventional 
              therapeutic areas like oncology, cardiology, or infectious diseases.
            </p>
          </div>

          {/* Why CGAT is Different Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/60 backdrop-blur-md rounded-xl border border-border/50 p-6 text-left"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Why CGAT is Different from Traditional Therapeutics
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>• <span className="text-foreground font-medium">One-Time vs. Chronic:</span> Single treatments can provide lifelong benefits, unlike daily medications</p>
                <p>• <span className="text-foreground font-medium">Root Cause vs. Symptoms:</span> Addresses underlying genetic defects, not just disease manifestations</p>
                <p>• <span className="text-foreground font-medium">Living Therapies:</span> Cells that adapt, proliferate, and respond—unlike static drug molecules</p>
              </div>
              <div className="space-y-2">
                <p>• <span className="text-foreground font-medium">Personalization:</span> Treatments made from patient's own cells for perfect compatibility</p>
                <p>• <span className="text-foreground font-medium">Complex Manufacturing:</span> Requires specialized facilities, logistics, and expertise</p>
                <p>• <span className="text-foreground font-medium">Value-Based Models:</span> Outcomes-based pricing due to curative potential</p>
              </div>
            </div>
          </motion.div>

          {/* AI/Vibe Tools Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md rounded-xl border border-primary/30 p-6 text-left"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Imagine: AI Democratizing CGAT Development & Access
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              This hub showcases how <span className="text-foreground font-medium">Genie AI Experimentation Hub</span> demonstrates 
              the ease of AI-powered development. Imagine leveraging these vibe tools and concepts to support the CGAT ecosystem:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Cost Optimization</p>
                  <p className="text-xs text-muted-foreground">AI-driven manufacturing efficiency</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Go-to-Market</p>
                  <p className="text-xs text-muted-foreground">Accelerated therapy development</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Patient Access</p>
                  <p className="text-xs text-muted-foreground">Streamlined enrollment & care</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Logistics</p>
                  <p className="text-xs text-muted-foreground">Cold chain & coordination</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              Reducing time-to-treatment and improving outcomes for patients, providers, and the entire CGAT ecosystem.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-muted-foreground mt-6"
          >
            Explore the therapeutic modalities below to understand the breakthroughs, applications, and how they differ 
            from traditional therapeutics →
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
