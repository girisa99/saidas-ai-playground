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

// Import generated artwork images
import phase01Spark from "@/assets/journey-phase-01-spark.jpg";
import phase02CuriosityArtwork from "@/assets/journey-phase-02-curiosity-artwork.jpg";
import phase03BreakthroughArtwork from "@/assets/journey-phase-03-breakthrough-artwork.jpg";
import phase04ScalableArtwork from "@/assets/journey-phase-04-scalable-artwork.jpg";
import phase05ResilientHubArtwork from "@/assets/journey-phase-05-resilient-hub-artwork.jpg";

const VerticalJourneyInfographic = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const phases = [
    {
      id: 1,
      title: "Spark & Curiosity Combined",
      subtitle: "Initial AI Exploration & Discovery",
      date: "May-September 2025",
      icon: Lightbulb,
      image: phase01Spark,
      description: "The initial spark and curiosity phase combining transformative conversations with deep AI exploration across multiple models and frameworks.",
      experiment: {
        title: "EXPERIMENT",
        description: "Initial spark from transformative conversation combined with deep curiosity for AI exploration",
        activities: [
          "Initial spark from transformative conversation with Prashant K and community members",
          "Recognition of fundamental shift potential in AI landscape",
          "Deep curiosity ignited for comprehensive AI exploration",
          "Established personal AI experimentation hub with systematic model comparison",
          "Conducted 45-day intensive deep dive across GPT, Claude, and Gemini models"
        ],
        challenges: [
          "Overwhelming possibilities without clear direction or starting point",
          "Limited understanding of AI's true potential beyond surface-level applications",
          "Overwhelming complexity of AI model selection and optimization decisions",
          "Uncertainty about where to begin the AI transformation journey"
        ],
        technologies: ["Strategic Vision", "Conceptual Framework", "GPT Series", "Claude", "Gemini"]
      },
      validate: {
        title: "VALIDATE",
        description: "Breakthrough realization of AI's creative potential transformed into validated, production-ready foundations",
        activities: [
          "Developed foundational understanding of prompt engineering and model optimization",
          "Built prototypes using Bolt, Loveable, and Solid frameworks with TypeScript",
          "Integrated AI into real-world workflows with GitHub, DocuSign, and Twilio APIs",
          "Breakthrough realization of AI's creative potential beyond coding assistance",
          "Applied 45-day deep dive lessons to architect scalable MVP foundations"
        ],
        challenges: [
          "Challenges preventing redundancy and ensuring application stability",
          "Steep learning curve requiring methodical experimentation approach",
          "Trial and error process in understanding proper AI project structures",
          "Frustrating moments of 'why isn't this working?' during foundational learning"
        ],
        technologies: ["Bolt", "Loveable", "Solid", "TypeScript", "Supabase", "PostgreSQL"]
      },
      deploy: {
        title: "DEPLOY",
        description: "Successfully integrated healthcare systems with NPI, CMS, FDA, and EMR platforms for patient workflows",
        activities: [
          "Successfully integrated healthcare systems: NPI, CMS credentialing, FDA tracking",
          "Implemented ICD 9/10 code integration and Changehealth EMR for insurance verification",
          "Successfully orchestrated multiple agents for patient onboarding use cases",
          "Built enterprise-grade multi-tenant isolation with comprehensive security frameworks",
          "Demonstrated full-scale healthcare workflow automation across integrated platforms"
        ],
        challenges: [
          "Complex healthcare system integration challenges across NPI, CMS, FDA, and EMR platforms",
          "Coordinating agent orchestration while maintaining HIPAA compliance and data integrity",
          "Managing data consistency across multiple healthcare data sources and validation systems",
          "Performance optimization across integrated systems without compromising stability"
        ],
        technologies: ["Multi-Agent Systems", "NPI Integration", "CMS Credentialing", "FDA APIs", "ICD 9/10", "Changehealth EMR", "Healthcare Compliance"]
      },
      color: "genie-primary",
      bgColor: "bg-gradient-to-br from-genie-primary/5 to-genie-primary/10"
    },
    {
      id: 2,
      title: "Breakthrough: Code to Creativity",
      subtitle: "AI Lab Infrastructure",
      date: "May-September 2025",
      icon: Target,
      image: phase03BreakthroughArtwork,
      description: "The pivotal shift from viewing AI purely as a utility to embracing it as an invaluable creative partner. This breakthrough came through integrating powerful AI-powered design and development tools, building resilient systems with sophisticated error handling, and creating intelligent data foundations with vector databases.",
      experiment: {
        title: "EXPERIMENT",
        description: "The pivotal shift from viewing AI purely as a utility to embracing it as an invaluable creative partner",
        activities: [
          "Breakthrough realization of AI's creative potential beyond coding assistance",
          "Integrated powerful AI-powered design and development tools",
          "Transformed coding with Cursor IDE's AI-native capabilities and dynamic dialogue",
          "Integrated visual design tools (Visio, draw.io, Miro, Figma) for collaborative brainstorming",
          "Built resilient systems with sophisticated error handling and feedback loops"
        ],
        challenges: [
          "Moving past static data storage to intelligent, learning data systems",
          "Balancing rapid prototyping with robust, scalable architectures",
          "Complex tool integration challenges across multiple development environments",
          "Implementing guardrails that enhance rather than hinder development workflow"
        ],
        technologies: ["Cursor IDE", "Visio", "Draw.io", "Miro", "Figma", "Vector Databases"]
      },
      validate: {
        title: "VALIDATE",
        description: "Comprehensive validation systems and enterprise-grade security frameworks implementation",
        activities: [
          "Implemented comprehensive TypeScript-database schema alignment and validation",
          "Built intelligent guardrail systems with small verification agents",
          "Established single source of truth patterns to eliminate data inconsistencies",
          "Created automated duplicate detection and redundancy prevention systems",
          "Deployed robust security frameworks with RLS policies and schema validation"
        ],
        challenges: [
          "Eliminating accumulated technical debt while maintaining development velocity",
          "Building comprehensive security frameworks without over-engineering solutions",
          "Managing complexity of verification agents and validation systems effectively",
          "Ensuring TypeScript types perfectly align with database schemas without friction"
        ],
        technologies: ["TypeScript", "Schema Validation", "RLS Policies", "Security Scanning", "Verification Agents"]
      },
      deploy: {
        title: "DEPLOY",
        description: "Production deployment of Label Studio for RAG and comprehensive data management with real-time testing",
        activities: [
          "Built modular component verification systems before feature deployment",
          "Established enterprise-grade CI/CD pipelines with security scanning",
          "Created comprehensive monitoring and vulnerability assessment frameworks",
          "Deployed Label Studio for RAG and knowledge base with comprehensive data management",
          "Integrated Twilio contact center with Langwatch and Artiz for real-time testing"
        ],
        challenges: [
          "Preventing feature redundancy while encouraging innovation and experimentation",
          "Optimizing for both development speed and production stability simultaneously",
          "Real-time synchronization challenges between multiple agents and external healthcare APIs",
          "Balancing system resilience with the flexibility needed for healthcare experimentation"
        ],
        technologies: ["CI/CD Pipelines", "Monitoring", "Label Studio", "RAG Architecture", "Twilio", "Langwatch", "Artiz"]
      },
      color: "genie-teal",
      bgColor: "bg-gradient-to-br from-genie-teal/5 to-genie-teal/10"
    },
    {
      id: 3,
      title: "Scalable MVP Foundation",
      subtitle: "45-Day Lessons to Production Architecture",
      date: "August-September 2025",
      icon: Network,
      image: phase05ResilientHubArtwork,
      description: "Transforming 45-day experimental lessons into production-ready architecture. Built unbreakable, stable AI platform foundation serving as the backbone for enterprise-scale experimentation and deployment.",
      experiment: {
        title: "EXPERIMENT",
        description: "Transforming 45-day experimental lessons into production-ready architecture foundations",
        activities: [
          "Applied 45-day deep dive lessons to architect scalable MVP foundations",
          "Built unbreakable, stable AI platform foundation serving as experimentation backbone",
          "Created dynamic agent generation system with seamless multi-agent coordination",
          "Implemented comprehensive database optimization and duplicate detection systems",
          "Designed vulnerability assessment frameworks with Docker containerization"
        ],
        challenges: [
          "Transforming experimental insights into robust production architectures",
          "Ensuring platform stability while supporting rapid experimentation and agent deployment",
          "Complex multi-tenant security requirements for healthcare compliance and data protection",
          "Balancing rapid MVP development with robust architectural foundations"
        ],
        technologies: ["Database Optimization", "Duplicate Detection", "Vulnerability Assessment", "Replit", "Docker"]
      },
      validate: {
        title: "VALIDATE",
        description: "Comprehensive monitoring, vulnerability assessment, and hallucination reduction validation",
        activities: [
          "Achieved 94% accuracy in hallucination reduction through robust validation systems",
          "Built enterprise-grade multi-tenant isolation with comprehensive security frameworks",
          "Implemented advanced monitoring and vulnerability assessment frameworks",
          "Created comprehensive database optimization with intelligent duplicate detection",
          "Validated multi-agent coordination systems for production readiness"
        ],
        challenges: [
          "Managing data consistency across multiple healthcare data sources and validation systems",
          "Optimizing for both development speed and production stability simultaneously",
          "Implementing guardrails that enhance rather than hinder development workflow",
          "Balancing system resilience with flexibility needed for healthcare experimentation"
        ],
        technologies: ["Monitoring", "Database Optimization", "Duplicate Detection", "Vulnerability Assessment", "Multi-Agent Systems"]
      },
      deploy: {
        title: "DEPLOY",
        description: "Full-scale healthcare workflow automation with agentic AI and HIPAA-compliant multi-agent coordination",
        activities: [
          "Successfully orchestrated multiple agents for patient onboarding use cases",
          "Achieved 94% accuracy in hallucination reduction through robust validation systems",
          "Built enterprise-grade multi-tenant isolation with comprehensive security frameworks",
          "Created dynamic agent generation system with seamless multi-agent coordination",
          "Demonstrated full-scale healthcare workflow automation across integrated platforms"
        ],
        challenges: [
          "Complex healthcare system integration challenges across NPI, CMS, FDA, and EMR platforms",
          "Ensuring platform stability while supporting rapid experimentation and agent deployment",
          "Coordinating agent orchestration while maintaining HIPAA compliance and data integrity",
          "Performance optimization across integrated systems without compromising stability"
        ],
        technologies: ["Multi-Agent Systems", "Agentic AI", "Healthcare Compliance", "Vector Databases"]
      },
      color: "genie-cyan",
      bgColor: "bg-gradient-to-br from-genie-cyan/5 to-genie-cyan/10"
    }
  ];

  // Auto-play functionality with extended timing for full slide view including touch points and pain points
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setActivePhase((prev) => {
          const nextPhase = prev + 1;
          if (nextPhase >= phases.length) {
            // Stop autoplay when we reach the end - no continuous loop
            setIsAutoPlay(false);
            return prev; // Stay on the last phase
          }
          return nextPhase;
        });
      }, 8000); // Extended to 8 seconds to allow time to read touch points and pain points
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4">
            My Journey
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            AI Transformation <span className="text-foreground">Journey</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground mb-6 sm:mb-8 leading-relaxed px-2">
            An ongoing comprehensive exploration from May 2025 to present - evolving from curiosity to breakthrough AI capabilities and beyond
          </p>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <Button
              onClick={toggleAutoPlay}
              variant={isAutoPlay ? "default" : "outline"}
              className="gap-2 w-full sm:w-auto"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAutoPlay ? "Pause" : "Auto Play"}
            </Button>
            <Button onClick={resetToStart} variant="outline" className="gap-2 w-full sm:w-auto">
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
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                        {/* Content Side */}
                        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                          {/* Header */}
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <div className={`p-2 rounded-lg w-fit ${
                                phase.color === 'genie-primary' ? 'bg-genie-primary' :
                                phase.color === 'genie-teal' ? 'bg-genie-teal' :
                                'bg-genie-cyan'
                              }`}>
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <Badge variant="outline" className="text-xs sm:text-sm font-medium w-fit">
                                {phase.date}
                              </Badge>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                              {phase.title}
                            </h3>
                            <p className="text-base sm:text-lg font-medium text-foreground/80">
                              {phase.subtitle}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-foreground leading-relaxed">
                            {phase.description}
                          </p>

                          {/* Three Phase Structure */}
                          <div className="space-y-4">
                            {/* Experiment Phase */}
                            <div className="border rounded-lg p-4 bg-background/50">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-genie-primary text-white flex items-center justify-center text-xs font-bold">E</div>
                                <h4 className="font-semibold text-foreground">{phase.experiment.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{phase.experiment.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {phase.experiment.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-genie-primary/10 text-genie-primary border-genie-primary/20">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Validate Phase */}
                            <div className="border rounded-lg p-4 bg-background/50">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-genie-teal text-white flex items-center justify-center text-xs font-bold">V</div>
                                <h4 className="font-semibold text-foreground">{phase.validate.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{phase.validate.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {phase.validate.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-genie-teal/10 text-genie-teal border-genie-teal/20">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Deploy Phase */}
                            <div className="border rounded-lg p-4 bg-background/50">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-genie-cyan text-white flex items-center justify-center text-xs font-bold">D</div>
                                <h4 className="font-semibold text-foreground">{phase.deploy.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{phase.deploy.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {phase.deploy.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-genie-cyan/10 text-genie-cyan border-genie-cyan/20">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
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
                          <div className="grid lg:grid-cols-3 gap-6">
                            {/* Experiment Details */}
                            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-genie-primary text-white flex items-center justify-center text-xs font-bold">E</div>
                                Experiment Activities
                              </h4>
                              <ul className="space-y-2 mb-4">
                                 {phase.experiment.activities.map((activity, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                     {activity}
                                   </li>
                                 ))}
                              </ul>
                              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Challenges</h5>
                              <ul className="space-y-1">
                                 {phase.experiment.challenges.map((challenge, i) => (
                                   <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                     <div className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                     {challenge}
                                   </li>
                                 ))}
                              </ul>
                            </div>

                            {/* Validate Details */}
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                              <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-genie-teal text-white flex items-center justify-center text-xs font-bold">V</div>
                                Validate Activities
                              </h4>
                              <ul className="space-y-2 mb-4">
                                 {phase.validate.activities.map((activity, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                     {activity}
                                   </li>
                                 ))}
                              </ul>
                              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Challenges</h5>
                              <ul className="space-y-1">
                                 {phase.validate.challenges.map((challenge, i) => (
                                   <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                     <div className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                     {challenge}
                                   </li>
                                 ))}
                              </ul>
                            </div>

                            {/* Deploy Details */}
                            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                              <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-genie-cyan text-white flex items-center justify-center text-xs font-bold">D</div>
                                Deploy Activities
                              </h4>
                              <ul className="space-y-2 mb-4">
                                 {phase.deploy.activities.map((activity, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                     <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 flex-shrink-0" />
                                     {activity}
                                   </li>
                                 ))}
                              </ul>
                              <h5 className="font-medium text-cyan-600 dark:text-cyan-400 mb-2">Challenges</h5>
                              <ul className="space-y-1">
                                 {phase.deploy.challenges.map((challenge, i) => (
                                   <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                     <div className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                                     {challenge}
                                   </li>
                                 ))}
                              </ul>
                            </div>
                          </div>

                           {/* Business Use Cases Link - Only show for the final phase */}
                           {phase.id === 3 && (
                             <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                               <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                                 🚀 Explore Real-World Applications
                               </h4>
                               <p className="text-sm text-foreground mb-3">
                                 Explore some of the business use cases I have been working and implemented so far with the learnings till date.
                               </p>
                               <Button 
                                 variant="outline" 
                                 size="sm"
                                 onClick={() => window.location.href = '/business-use-cases'}
                                 className="border-purple-300 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900/20 w-full sm:w-auto"
                               >
                                 View Business Use Cases →
                               </Button>
                             </div>
                           )}
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