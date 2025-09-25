import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Brain, 
  Target, 
  Database, 
  Shield, 
  Network,
  ChevronDown,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

// Import generated images
import phase01Spark from "@/assets/journey-phase-01-spark.jpg";
import phase02CuriosityBreakthrough from "@/assets/journey-phase-02-curiosity-breakthrough.jpg";
import phase03Design from "@/assets/journey-phase-03-design.jpg";
import phase04Infrastructure from "@/assets/journey-phase-04-infrastructure.jpg";
import phase05Production from "@/assets/journey-phase-05-production.jpg";
import phase06Agentic from "@/assets/journey-phase-06-agentic.jpg";

const VerticalJourneyInfographic = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const phases = [
    {
      id: 1,
      title: "The Spark",
      subtitle: "The Conversation That Changed Everything",
      date: "May 2025",
      icon: Lightbulb,
      image: phase01Spark,
      description: "Evening coffee time over weekend with community members, including close friend and associate Prashant K, sparked a revolutionary question about AI transformation that ignited this ongoing journey.",
      touchPoints: [
        "Initial spark from transformative conversation",
        "Recognition of fundamental shift potential",
        "Deep curiosity ignited for AI exploration"
      ],
      painPoints: [
        "Overwhelming possibilities without direction",
        "Limited understanding of AI's true potential",
        "Uncertainty about where to begin"
      ],
      technologies: ["Strategic Vision", "Conceptual Framework"],
      color: "genie-primary",
      bgColor: "bg-gradient-to-br from-genie-primary/5 to-genie-primary/10"
    },
    {
      id: 2,
      title: "From Curiosity to Breakthrough",
      subtitle: "The 45-Day Deep Dive: Building My AI Lab",
      date: "May-June 2025",
      icon: Brain,
      image: phase02CuriosityBreakthrough,
      description: "What began as pure curiosity quickly transformed into an all-consuming personal mission. After two decades in the industry, AI felt profoundly different - a fundamental shift demanding deep, hands-on exploration through intensive experimentation and learning.",
      touchPoints: [
        "Established personal AI experimentation hub with systematic model comparison",
        "Conducted 45-day intensive deep dive across GPT, Claude, and Gemini models",
        "Developed foundational understanding of prompt engineering and model optimization",
        "Built prototypes using Bolt, Loveable, and Solid frameworks with TypeScript",
        "Integrated AI into real-world workflows with GitHub, DocuSign, and Twilio APIs"
      ],
      painPoints: [
        "Overwhelming complexity of AI model selection and optimization",
        "Challenges preventing redundancy and ensuring application stability",
        "Steep learning curve requiring methodical experimentation approach",
        "Trial and error process in understanding proper AI project structures",
        "Frustrating moments of 'why isn't this working?' during foundational learning"
      ],
      technologies: ["GPT Series", "Claude", "Gemini", "Bolt", "Loveable", "Solid", "TypeScript", "Supabase", "PostgreSQL", "Vector Databases"],
      color: "genie-teal",
      bgColor: "bg-gradient-to-br from-genie-teal/5 to-genie-teal/10"
    },
    {
      id: 3,
      title: "Design & Architecture",
      subtitle: "Mapping Complex AI Architectures",
      date: "August 2025",
      icon: Target,
      image: phase03Design,
      description: "Mastered visualization methodologies using Visio, draw.io, Miro, and Figma to map complex AI workflows.",
      touchPoints: [
        "Developed AI-specific visualization standards",
        "Created reusable design patterns",
        "Built systematic solution conceptualization"
      ],
      painPoints: [
        "Abstract AI concepts difficult to visualize",
        "Complex workflows hard to communicate",
        "Need for standardized design patterns"
      ],
      technologies: ["Visio", "Draw.io", "Miro", "Figma", "Lucidchart"],
      color: "genie-cyan",
      bgColor: "bg-gradient-to-br from-genie-cyan/5 to-genie-cyan/10"
    },
    {
      id: 4,
      title: "Infrastructure Revolution",
      subtitle: "Building Unshakeable Technical Foundations",
      date: "September 2025",
      icon: Database,
      image: phase04Infrastructure,
      description: "Constructed robust development ecosystem with Cursor IDE, Replit, Docker, and enterprise-grade architecture.",
      touchPoints: [
        "Built scalable TypeScript microservices",
        "Implemented containerized environments",
        "Established real-time data synchronization"
      ],
      painPoints: [
        "Complex tool integration challenges",
        "Performance optimization bottlenecks",
        "Scaling issues with rapid prototyping"
      ],
      technologies: ["Cursor IDE", "Replit", "Docker", "V0 by Vercel", "Supabase"],
      color: "genie-primary",
      bgColor: "bg-gradient-to-br from-genie-primary/5 to-genie-primary/10"
    },
    {
      id: 5,
      title: "Production Excellence",
      subtitle: "Enterprise-Grade AI Systems",
      date: "October 2025",
      icon: Shield,
      image: phase05Production,
      description: "Tackled enterprise challenges: data consistency, hallucination reduction through RAG, and multi-tenant architecture.",
      touchPoints: [
        "Implemented data consistency frameworks",
        "Achieved 94% accuracy in hallucination reduction",
        "Built enterprise-grade multi-tenant isolation"
      ],
      painPoints: [
        "Data consistency across multiple systems",
        "AI hallucination and reliability concerns",
        "Complex multi-tenant security requirements"
      ],
      technologies: ["RAG Architecture", "Vector Databases", "DocuSign API", "Twilio"],
      color: "genie-teal",
      bgColor: "bg-gradient-to-br from-genie-teal/5 to-genie-teal/10"
    },
    {
      id: 6,
      title: "Agentic AI Breakthrough",
      subtitle: "Dynamic Multi-Agent Innovation",
      date: "November 2025",
      icon: Network,
      image: phase06Agentic,
      description: "Revolutionary agentic AI platform with dynamic agent generation and seamless orchestration - the journey continues with new innovations emerging.",
      touchPoints: [
        "Created dynamic agent generation system",
        "Achieved seamless multi-agent orchestration",
        "Demonstrated healthcare workflow automation"
      ],
      painPoints: [
        "Complex agent coordination challenges",
        "Dynamic workflow configuration complexity",
        "Real-time collaboration synchronization"
      ],
      technologies: ["Agentic AI", "Multi-Agent Systems", "Workflow Orchestration"],
      color: "genie-cyan",
      bgColor: "bg-gradient-to-br from-genie-cyan/5 to-genie-cyan/10"
    }
  ];

  // Auto-play functionality with smooth scrolling - plays once and stops
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setActivePhase((prev) => {
          const nextPhase = prev + 1;
          if (nextPhase >= phases.length) {
            // Stop autoplay when we reach the end
            setIsAutoPlay(false);
            return prev; // Stay on the last phase
          }
          return nextPhase;
        });
      }, 4000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlay, phases.length]);

  // Smooth scroll to active phase
  useEffect(() => {
    if (phaseRefs.current[activePhase] && isAutoPlay) {
      const element = phaseRefs.current[activePhase];
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [activePhase, isAutoPlay]);

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
    setIsAutoPlay(false);
    // Scroll to clicked phase
    if (phaseRefs.current[index]) {
      phaseRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const resetToStart = () => {
    setActivePhase(0);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4">
            My Journey
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            AI Transformation <span className="text-foreground">Journey</span>
          </h2>
          <p className="text-xl text-foreground mb-8 leading-relaxed">
            An ongoing comprehensive exploration from June 2025 to present - evolving from curiosity to breakthrough AI capabilities and beyond
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={toggleAutoPlay}
              variant={isAutoPlay ? "default" : "outline"}
              className="gap-2"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAutoPlay ? "Pause" : "Auto Play"}
            </Button>
            <Button onClick={resetToStart} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Journey Flow */}
        <div className="relative">
          {/* Flowing Connection Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-genie-primary via-genie-teal to-genie-cyan transform -translate-x-1/2 opacity-30" />
          
          {/* Phase Cards */}
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isActive = activePhase === index;
              const isCompleted = activePhase > index;
              
              return (
                <div
                  key={phase.id}
                  ref={(el) => (phaseRefs.current[index] = el)}
                  className={`relative transition-all duration-500 ${
                    isActive ? 'scale-105 z-10' : 'scale-100'
                  }`}
                >
                  {/* Phase Number Circle */}
                  <div className="absolute left-1/2 top-8 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className={`w-full h-full rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isCompleted ? 
                        phase.color === 'genie-primary' ? 'bg-genie-primary border-genie-primary text-white' :
                        phase.color === 'genie-teal' ? 'bg-genie-teal border-genie-teal text-white' :
                        'bg-genie-cyan border-genie-cyan text-white' :
                      isActive ? 
                        phase.color === 'genie-primary' ? 'bg-genie-primary border-genie-primary text-white' :
                        phase.color === 'genie-teal' ? 'bg-genie-teal border-genie-teal text-white' :
                        'bg-genie-cyan border-genie-cyan text-white' :
                        phase.color === 'genie-primary' ? 'bg-background border-genie-primary/30 text-muted-foreground' :
                        phase.color === 'genie-teal' ? 'bg-background border-genie-teal/30 text-muted-foreground' :
                        'bg-background border-genie-cyan/30 text-muted-foreground'
                    }`}>
                      {isCompleted ? '✓' : phase.id}
                    </div>
                  </div>

                  {/* Main Card */}
                  <Card 
                    className={`${phase.bgColor} border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                      isActive ? 
                        phase.color === 'genie-primary' ? 'border-genie-primary shadow-2xl' :
                        phase.color === 'genie-teal' ? 'border-genie-teal shadow-2xl' :
                        'border-genie-cyan shadow-2xl' :
                        phase.color === 'genie-primary' ? 'border-transparent hover:border-genie-primary/50' :
                        phase.color === 'genie-teal' ? 'border-transparent hover:border-genie-teal/50' :
                        'border-transparent hover:border-genie-cyan/50'
                    }`}
                    onClick={() => handlePhaseClick(index)}
                  >
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Content Side */}
                        <div className="space-y-6">
                          {/* Header */}
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${
                                phase.color === 'genie-primary' ? 'bg-genie-primary' :
                                phase.color === 'genie-teal' ? 'bg-genie-teal' :
                                'bg-genie-cyan'
                              }`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <Badge variant="outline" className="text-sm font-medium">
                                {phase.date}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">
                              {phase.title}
                            </h3>
                            <p className="text-lg font-medium text-foreground/80">
                              {phase.subtitle}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-foreground leading-relaxed">
                            {phase.description}
                          </p>

                          {/* Technologies */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Key Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Visual Side */}
                        <div className="relative">
                          <div className={`rounded-xl overflow-hidden shadow-lg p-1 ${
                            phase.color === 'genie-primary' ? 'bg-genie-primary' :
                            phase.color === 'genie-teal' ? 'bg-genie-teal' :
                            'bg-genie-cyan'
                          }`}>
                            <img
                              src={phase.image}
                              alt={phase.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {isActive && (
                        <div className="mt-8 pt-8 border-t border-border/50 animate-fade-in">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Touch Points */}
                            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">
                                ✓ Touch Points
                              </h4>
                              <ul className="space-y-2">
                                 {phase.touchPoints.map((point, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                     {point}
                                   </li>
                                 ))}
                              </ul>
                            </div>

                            {/* Pain Points */}
                            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                              <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3">
                                ⚠ Pain Points
                              </h4>
                              <ul className="space-y-2">
                                 {phase.painPoints.map((pain, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                     <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                     {pain}
                                   </li>
                                 ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Flow Arrow */}
                  {index < phases.length - 1 && (
                    <div className="flex justify-center mt-6 mb-2">
                      <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
                        isCompleted ? 
                          phase.color === 'genie-primary' ? 'text-genie-primary' :
                          phase.color === 'genie-teal' ? 'text-genie-teal' :
                          'text-genie-cyan' :
                          phase.color === 'genie-primary' ? 'text-genie-primary/50' :
                          phase.color === 'genie-teal' ? 'text-genie-teal/50' :
                          'text-genie-cyan/50'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalJourneyInfographic;