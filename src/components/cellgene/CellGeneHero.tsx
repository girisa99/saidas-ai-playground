import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Lightbulb, Target, Rocket, Map, Brain, Users, Trophy, Beaker, GraduationCap, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroBannerImg from "@/assets/cellgene-hero-banner.jpg";

export const CellGeneHero = () => {
  return (
    <section className="relative w-full min-h-[90vh]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBannerImg})` }}
      />
      
      {/* Dark Gradient Overlay - Matching site theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/95 via-genie-primary/80 to-genie-secondary/85" />

      {/* Animated Background Particles - Matching main banner */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-genie-accent/30 rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Header Section - Connected narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4 text-sm px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Extending the Experimentation Journey
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Where AI Experimentation
            <span className="block text-genie-accent mt-2">Meets Healthcare Innovation</span>
          </h1>
          <div className="w-24 h-1 bg-genie-accent mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto mb-4">
            Applying 25+ years of technology leadership and systematic AI experimentation methodologies 
            to one of healthcare's most complex frontiers—Cell & Gene Advanced Therapies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-genie-accent" />
              <span><strong>Knowledge Sharing:</strong> Real learnings from industry experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Beaker className="w-4 h-4 text-genie-accent" />
              <span><strong>Applied Research:</strong> Where tech meets therapeutics</span>
            </div>
          </div>
        </motion.div>

        {/* Two-Tile Layout - Matching main site */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Left Tile - The Connection Story */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-genie-accent to-genie-teal text-genie-dark">
                  <Trophy className="w-4 h-4 mr-1" />
                  From Experience to Application
                </Badge>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-white">
                Why This Knowledge Hub Exists
              </h2>
              
              <p className="text-white/80 text-base leading-relaxed">
                After decades in healthcare technology and AI experimentation, this hub consolidates 
                learnings about how advanced therapies are transforming medicine—and how the same 
                AI frameworks can accelerate this transformation.
              </p>

              {/* Framework Steps - Matching main site pattern */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <Target className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">Experiment → Validate → Lead</h3>
                    <p className="text-white/70 text-xs">Same methodology from the main hub, applied to CGAT</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">Knowledge Consolidation</h3>
                    <p className="text-white/70 text-xs">Curated insights from clinical trials, manufacturers, and patient journeys</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-genie-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm">Industry Transparency</h3>
                    <p className="text-white/70 text-xs">Market dynamics, challenges, and opportunities in CGAT</p>
                  </div>
                </div>
              </div>

              {/* Stats - Connecting to main site */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">25+</div>
                  <div className="text-white/70 text-xs">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">5</div>
                  <div className="text-white/70 text-xs">Therapy Modalities</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">65+</div>
                  <div className="text-white/70 text-xs">Organizations Tracked</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Tile - AI + CGAT Connection */}
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
                  Applied AI Learning
                </Badge>
              </div>

              <h2 className="text-xl lg:text-2xl font-bold text-white">
                How the Tech Stack Applies Here
              </h2>
              
              <p className="text-white/80 text-base leading-relaxed">
                The same AI tools, RAG architectures, and multi-model approaches demonstrated 
                in the Experimentation Hub have direct applications in transforming CGAT—from 
                patient coordination to manufacturing optimization.
              </p>

              {/* Technology Connection */}
              <div className="bg-white/5 rounded-lg p-4 border border-genie-accent/20">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-genie-accent" />
                  From Hub to Healthcare Application
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-white/70">• Genie AI → Patient Navigation</div>
                  <div className="text-white/70">• RAG Systems → Treatment Matching</div>
                  <div className="text-white/70">• Multi-Model → Clinical Decision Support</div>
                  <div className="text-white/70">• Knowledge Base → Provider Education</div>
                  <div className="text-white/70">• Analytics → Outcome Tracking</div>
                  <div className="text-white/70">• Automation → Logistics Optimization</div>
                </div>
              </div>

              {/* Connected Learning */}
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Explore the Full Journey
                </h4>
                <p className="text-white/70 text-xs mb-3">
                  See how the case studies, technology stack, and business use cases from the 
                  main experimentation hub translate to healthcare innovation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/case-studies" className="text-xs text-purple-300 hover:text-purple-200 underline">Case Studies</Link>
                  <span className="text-white/30">•</span>
                  <Link to="/technology" className="text-xs text-purple-300 hover:text-purple-200 underline">Tech Stack</Link>
                  <span className="text-white/30">•</span>
                  <Link to="/business-use-cases" className="text-xs text-purple-300 hover:text-purple-200 underline">Use Cases</Link>
                  <span className="text-white/30">•</span>
                  <Link to="/about" className="text-xs text-purple-300 hover:text-purple-200 underline">About Me</Link>
                </div>
              </div>

              {/* CTAs - Link to main site sections */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold flex-1"
                >
                  <Link to="/journey" className="flex items-center justify-center gap-2">
                    View AI Journey
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm flex-1"
                  onClick={() => {
                    const event = new CustomEvent('openGeniePopup');
                    window.dispatchEvent(event);
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try Genie AI
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation - Smooth transition to content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto border border-white/10">
            <h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5 text-genie-accent" />
              Continue Your Learning Journey
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Explore the therapeutic modalities, manufacturer landscape, clinical trials, and patient journeys 
              that make CGAT one of healthcare's most exciting frontiers.
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
                  AI Journey Map
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <Link to="/case-studies">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Case Studies
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
                asChild 
                variant="ghost" 
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <Link to="/about">
                  <Users className="w-4 h-4 mr-2" />
                  About the Author
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};