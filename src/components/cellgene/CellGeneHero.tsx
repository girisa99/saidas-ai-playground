import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Lightbulb, Target, Rocket, Map, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroBannerImg from "@/assets/cellgene-hero-banner.jpg";

export const CellGeneHero = () => {
  return (
    <section className="relative w-full min-h-[85vh]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBannerImg})` }}
      />
      
      {/* Dark Gradient Overlay - Matching site theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/95 via-genie-primary/80 to-genie-secondary/85" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4 text-sm px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Part of Genie AI Experimentation Hub
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Cell & Gene Advanced Therapies
            <span className="block text-genie-accent mt-2">Knowledge & Learning Hub</span>
          </h1>
          <div className="w-24 h-1 bg-genie-accent mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Exploring how AI experimentation and modern development approaches can transform the CGAT ecosystem—
            from patient access to manufacturing optimization.
          </p>
        </motion.div>

        {/* Two-Tile Layout - Matching main site */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Left Tile - What is CGAT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-genie-accent to-genie-teal text-genie-dark">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Knowledge Base
                </Badge>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-white">
                Why CGAT is Different
              </h2>
              
              <p className="text-white/80 text-base leading-relaxed">
                Unlike traditional therapeutics (oncology, cardio, infectious diseases) that manage symptoms, 
                CGAT addresses diseases at their genetic and cellular root—offering potential one-time cures.
              </p>

              {/* Key Differences */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <Target className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">Root Cause Treatment</h3>
                    <p className="text-white/70 text-xs">Genetic correction vs. symptom management</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">One-Time Potential</h3>
                    <p className="text-white/70 text-xs">Single treatments vs. lifelong medications</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <Users className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">Personalized Living Therapies</h3>
                    <p className="text-white/70 text-xs">Patient-specific cells that adapt and persist</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">5</div>
                  <div className="text-white/70 text-xs">Modalities</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">30+</div>
                  <div className="text-white/70 text-xs">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">25+</div>
                  <div className="text-white/70 text-xs">Differentiators</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Tile - AI Connection */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary/30"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-none">
                  <Brain className="w-4 h-4 mr-1" />
                  AI Opportunity
                </Badge>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-white">
                Where AI Experimentation Applies
              </h2>
              
              <p className="text-white/80 text-base leading-relaxed">
                This hub demonstrates how the same AI tools and approaches from the Experimentation Hub 
                could transform CGAT—reducing costs, accelerating access, and improving outcomes.
              </p>

              {/* AI Applications in CGAT */}
              <div className="bg-white/5 rounded-lg p-4 border border-genie-accent/20">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-genie-accent" />
                  Potential AI Impact Areas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-white/70">• Manufacturing optimization</div>
                  <div className="text-white/70">• Patient journey coordination</div>
                  <div className="text-white/70">• Treatment center matching</div>
                  <div className="text-white/70">• Cold chain logistics</div>
                  <div className="text-white/70">• Insurance navigation</div>
                  <div className="text-white/70">• Provider education</div>
                </div>
              </div>

              {/* Connection to Site */}
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Connected Learning
                </h4>
                <p className="text-white/70 text-xs">
                  Explore how the same AI frameworks, case studies, and technology stack 
                  from this experimentation hub apply to healthcare and CGAT specifically.
                </p>
              </div>

              {/* CTAs - Link to main site sections */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold flex-1"
                >
                  <Link to="/case-studies" className="flex items-center justify-center gap-2">
                    View Case Studies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm flex-1"
                >
                  <Link to="/technology">
                    Tech Stack
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-white/70 text-sm mb-4">
            Explore the therapeutic modalities below to understand the breakthroughs, applications, 
            and how they differ from traditional therapeutics
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Link to="/journey">
                <Map className="w-4 h-4 mr-2" />
                AI Journey
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Link to="/business-use-cases">
                <Target className="w-4 h-4 mr-2" />
                Business Use Cases
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => {
                const event = new CustomEvent('openGeniePopup');
                window.dispatchEvent(event);
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try Genie AI
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
