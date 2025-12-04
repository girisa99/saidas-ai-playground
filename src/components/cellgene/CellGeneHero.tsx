import { motion } from "framer-motion";
import { Dna, Brain, Sparkles, Zap } from "lucide-react";

export const CellGeneHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* DNA helix pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dna-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dna-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Icon cluster */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-primary/10 rounded-full"
            >
              <Dna className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 bg-accent/10 rounded-full"
            >
              <Brain className="w-12 h-12 text-accent" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-primary/10 rounded-full"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              CellGene
            </span>
            <span className="text-foreground"> AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing Healthcare with AI-Powered 
            <span className="text-primary font-semibold"> Cell & Gene Therapies</span>
          </p>

          {/* Key stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {[
              { icon: Dna, label: "Gene Therapies", value: "500+" },
              { icon: Brain, label: "AI Models", value: "50+" },
              { icon: Zap, label: "Clinical Trials", value: "1000+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
              >
                <stat.icon className="w-6 h-6 text-primary mb-2" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
