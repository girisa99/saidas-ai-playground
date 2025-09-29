import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import { CTASection } from "@/components/CTASection";

import { AnimatedTextEmergence } from "@/components/AnimatedTextEmergence";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, Users, Heart, Globe, Camera, Bike, Code, Lightbulb, Target, Award, Building2, Zap, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import saiProfile from "@/assets/sai-profile.jpg";
import genieAnimated from "@/assets/genie-animated.png";
import genieBottle from "@/assets/genie-bottle.png";

const About = () => {
  const [showPersonalImage, setShowPersonalImage] = useState(false);
  const [showGenieImage, setShowGenieImage] = useState(false);
  const [showBottle, setShowBottle] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [desc1Done, setDesc1Done] = useState(false);
  const [desc2Done, setDesc2Done] = useState(false);
  useEffect(() => {
    document.title = "About Me - Saidas | Personal AI Change Agent & 2 Live Feature Creator";
    const metaDescription = document.querySelector("meta[name=\"description\"]");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Meet Saidas - Personal AI change agent who built 2 live features: GenieAI Hub Platform & Genie Conversation (80+ contexts). 25+ years experience helping individuals become AI leaders through proven 3-phase framework.");
    }

    // Animation sequence phases (bottle shows first; text animation begins)
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setShowBottle(true), 1000));
    timers.push(window.setTimeout(() => setCurrentPhase(1), 2000));

    return () => timers.forEach(clearTimeout);
  }, []);

  // After all text lines finish, reveal images and hide bottle
  useEffect(() => {
    const allDone = titleDone && subtitleDone && desc1Done && desc2Done;
    if (!allDone) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setShowPersonalImage(true), 300));
    timers.push(window.setTimeout(() => setShowGenieImage(true), 1200));
    timers.push(window.setTimeout(() => setShowBottle(false), 2000));
    return () => timers.forEach(clearTimeout);
  }, [titleDone, subtitleDone, desc1Done, desc2Done]);

  const stats = [
    { number: "21+", label: "Years Experience", icon: Briefcase, color: "genie-primary" },
    { number: "8+", label: "Validated Use Cases", icon: Lightbulb, color: "genie-teal" },
    { number: "3x", label: "Faster Development", icon: Code, color: "genie-cyan" },
    { number: "90%", label: "Risk Reduction", icon: Target, color: "genie-primary" }
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "Framework Development Expertise",
      description: "Created systematic AI innovation methodology based on 21+ years of healthcare technology leadership"
    },
    {
      icon: Briefcase,
      title: "Enterprise Validation Experience",
      description: "Applied framework across major organizations: Novartis, Bayer, Conduent, Amgen, Pfizer, and McKesson"
    },
    {
      icon: Target,
      title: "Proven Risk Reduction Results",
      description: "Achieved 90% risk reduction and 3x faster development through systematic experimentation and validation"
    },
    {
      icon: Lightbulb,
      title: "Knowledge Sharing Leadership",
      description: "Documenting 8+ business cases and complete implementation blueprints through GenieAI Hub"
    }
  ];

  const personalInterests = [
    { name: "Cary, NC", icon: Globe, color: "bg-blue-100 text-blue-600" },
    { name: "22 Years Married", icon: Heart, color: "bg-pink-100 text-pink-600" },
    { name: "Two Children", icon: Users, color: "bg-green-100 text-green-600" },
    { name: "Motorcycling", icon: Bike, color: "bg-orange-100 text-orange-600" },
    { name: "International Travel", icon: Globe, color: "bg-purple-100 text-purple-600" },
    { name: "Community Service", icon: Heart, color: "bg-red-100 text-red-600" },
    { name: "Technology Innovation", icon: Code, color: "bg-blue-100 text-blue-600" },
    { name: "Photography", icon: Camera, color: "bg-indigo-100 text-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
        
        {/* Hero Section with Genie */}
        <section className="relative bg-gradient-to-br from-genie-dark via-genie-navy to-genie-primary/20 text-white py-24 lg:py-32 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-genie-cyan/60 rounded-full animate-float genie-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-start mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Text Content Centered with proper spacing to avoid cutoff */}
          <div className="relative z-20 text-center lg:text-left px-4 sm:px-6 md:px-8 lg:pl-44 lg:pr-16">
            <Badge className="bg-genie-primary/20 text-genie-cyan border-genie-cyan/30 mb-4 opacity-0 animate-fade-in" 
                   style={{ animationDelay: "2s", animationFillMode: "forwards" }}>
              About Me
            </Badge>
            
            {/* Animated Title - Entrepreneurial & Impactful */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto lg:mx-0">
              <AnimatedTextEmergence 
                text="Meet Sai Dasika"
                startDelay={2000}
                charDelay={80}
                className="block text-white font-extrabold"
                flyFromBottle={true}
                bottlePosition={{ x: 75, y: 50 }}
                onComplete={() => setTitleDone(true)}
              />
            </h1>
            
             <h2 className="text-2xl lg:text-3xl font-bold text-genie-cyan mb-6 max-w-5xl mx-auto lg:mx-0">
                <AnimatedTextEmergence 
                  text="Creator & Owner of GenieAI Experimentation Hub Platform"
                  startDelay={3500}
                  charDelay={50}
                  className="block font-bold"
                  flyFromBottle={true}
                  bottlePosition={{ x: 75, y: 50 }}
                  onComplete={() => setSubtitleDone(true)}
                />
             </h2>
            
            {/* Animated Description - AI Innovation Focus */}
            <div className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-6xl mx-auto lg:mx-0">
               <div className="mb-4">
                 <AnimatedTextEmergence 
                   text="Built my personal GenieAI Experimentation Hub through 21+ years of healthcare innovation. This platform represents my private laboratory where I test, validate, and refine AI solutions."
                   startDelay={5000}
                   charDelay={40}
                   className="block"
                   flyFromBottle={true}
                   bottlePosition={{ x: 75, y: 50 }}
                   onComplete={() => setDesc1Done(true)}
                 />
               </div>
               <div className="text-white/80 font-medium">
                 <AnimatedTextEmergence 
                   text="Sharing my learnings, methodologies, and real-world case studies from this private platform. Learn from my experiments to build your own AI solutions and frameworks."
                   startDelay={6500}
                   charDelay={30}
                   className="block"
                   flyFromBottle={true}
                   bottlePosition={{ x: 75, y: 50 }}
                   onComplete={() => setDesc2Done(true)}
                 />
               </div>
            </div>
            
            <div className="opacity-0 animate-fade-in mb-8" style={{ animationDelay: "10s", animationFillMode: "forwards" }}>
              <Link to="/journey">
                <Button size="lg" className="bg-genie-cyan hover:bg-genie-teal text-white px-8 py-4 text-lg font-bold">
                  🚀 EXPERIENCE THE TRANSFORMATION
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Genie Bottle - Center for animation source */}
          {showBottle && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in z-30">
              <img 
                src={genieBottle} 
                alt="Magic Genie Bottle" 
                className="w-32 h-40 lg:w-40 lg:h-48 object-contain animate-genie-working"
              />
              
              {/* Magical Smoke from Bottle */}
              {currentPhase >= 1 && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-20 bg-gradient-to-t from-genie-cyan/60 to-transparent rounded-full blur-sm animate-smoke" />
                  <div className="w-12 h-16 bg-gradient-to-t from-genie-teal/40 to-transparent rounded-full blur-sm animate-smoke absolute top-2 left-2" 
                       style={{ animationDelay: "0.3s" }} />
                  
                  {/* Characters streaming out */}
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-genie-cyan rounded-full animate-magical-stream-to-left"
                      style={{
                        left: `${-10 + Math.random() * 20}px`,
                        top: `${-20 - Math.random() * 30}px`,
                        animationDelay: `${i * 60}ms`,
                        animationDuration: `${1000 + Math.random() * 500}ms`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Corner Images (appear only after text completes) */}
          {showPersonalImage && (
            <div className="pointer-events-none absolute top-24 left-2 sm:left-6 z-10 animate-emerge-from-bottle">
              <div className="relative">
                 <img 
                  src={saiProfile} 
                  alt="Sai Dasika - AI Innovation Leader and Healthcare Technology Expert" 
                  className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-genie-cyan/50 shadow-2xl"
                />
                <div className="absolute inset-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-genie-cyan/30 blur-xl animate-pulse-glow" />
              </div>
            </div>
          )}

            {showGenieImage && (
              <div className="mt-6 flex justify-end pr-2 sm:pr-6">
                <div className="relative pointer-events-none animate-emerge-from-bottle" style={{ animationDelay: "0.5s" }}>
                  <img 
                    src={genieAnimated} 
                    alt="AI Innovation Genie" 
                    className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain animate-genie-working"
                  />
                  <div className="absolute inset-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-genie-teal/20 rounded-full blur-2xl animate-pulse-glow" />
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                    <div className="text-genie-cyan text-xs lg:text-sm font-bold animate-loading-bounce whitespace-nowrap">
                      🎯 INNOVATION UNLEASHED! 🎯
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </section>

      
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color}/10 rounded-lg mb-4`}>
                      <IconComponent className={`w-8 h-8 text-${stat.color}`} />
                    </div>
                    <div className={`text-4xl font-bold text-${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Professional Journey Section */}
        <section className="py-20 bg-gradient-to-br from-genie-dark/5 via-background to-genie-primary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
                <Award className="w-4 h-4 mr-2" />
                Professional Evolution
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                The Journey to <span className="text-genie-primary">Framework Creation</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                How 21+ years of healthcare technology leadership led to a systematic approach 
                for accelerating AI innovation while minimizing risk.
              </p>
            </div>

            {/* Professional Background Narrative */}
            <div className="prose prose-xl max-w-5xl mx-auto text-muted-foreground mb-16 leading-relaxed">
              <Card className="p-8 lg:p-12 bg-gradient-to-br from-genie-primary/5 to-background border-genie-primary/20">
                 <p className="mb-6">
                   My career spans technology leadership roles at industry giants including <strong className="text-genie-primary">Novartis, Bayer, 
                   Conduent, Amgen, and Pfizer</strong>, where I consistently observed a common pattern: innovative AI projects often failed not due to technical limitations, 
                   but because of inadequate validation and rushed deployment. This led me to develop the <strong className="text-genie-teal">Experiment → Validate → Lead to Deploy framework</strong> - 
                   a systematic approach that dramatically improves success rates while reducing risk. Currently serving as 
                   <strong className="text-genie-primary">Director of Product owner/solution Architect for CGAT (PSaS) supporting InspiroGene at McKesson</strong>, 
                   I apply this framework across complex healthcare technology initiatives.
                 </p>
                 <p className="mb-6">
                   The <strong className="text-genie-cyan">GenieAI Experimentation Hub</strong> emerged from this methodology - 
                   your personal laboratory for AI discovery and skill building. This hub demonstrates how individual curiosity and systematic experimentation 
                   create the expertise needed to become an AI change agent. Rather than theoretical concepts, every experiment here shows 
                   real applications, measurable outcomes, and the journey from "what if" to working solution. 
                   It's where personal learning transforms into professional leadership capability.
                 </p>
                 <p>
                   What sets this Hub apart is its emphasis on <strong className="text-genie-primary">individual empowerment through systematic experimentation</strong>. 
                   By sharing real experiments, clear validation criteria, and honest documentation of both successes and failures, 
                   you can accelerate your own AI journey without repeating common mistakes. The GenieAI Hub demonstrates the full spectrum - 
                   from initial curiosity and experimentation to building production-ready solutions that establish you as an AI innovator in your field.
                 </p>
              </Card>
            </div>

            {/* Career Progression Timeline */}
            <div className="relative mb-16">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-genie-primary via-genie-teal to-genie-cyan opacity-30" />
              
              <div className="space-y-16">
                {(() => {
                  const phases = [
                    {
                      phase: "Current Experience",
                      companies: "McKesson • Present",
                      focus: "Director of Product owner/solution Architect for CGAT (PSaS) supporting InspiroGene",
                      achievements: "Managing 3PL/SD, Specialty Pharmacy (Biologics), Ontada (Provider onboarding/Order management), and Patient services initiatives",
                      icon: Building2,
                      color: "genie-primary"
                    },
                    {
                      phase: "AI Innovation & Knowledge Sharing",
                      companies: "GenieAI Experimentation Hub • Personal Initiative",
                      focus: "Democratizing AI possibilities through practical experimentation and knowledge sharing across multiple AI platforms and frameworks.",
                      achievements: "Creating comprehensive AI application frameworks demonstrating healthcare transformation potential. Live production deployment with advanced RAG architecture and multi-model intelligence.",
                      icon: Lightbulb,
                      color: "genie-cyan"
                    },
                    {
                      phase: "Pharmaceutical Technology Leadership",
                      companies: "Novartis • Bayer • Pfizer • Amgen • Conduent",
                      focus: "Digital transformation across commercial operations, clinical R&D, regulatory affairs, and supply chain",
                      achievements: "Led enterprise-wide technology initiatives, streamlined therapeutic development processes",
                      icon: Briefcase,
                      color: "genie-primary"
                    },
                    {
                      phase: "Strategic Business Foundation", 
                      companies: "Cornell University Johnson School • MBA",
                      focus: "Strategic business acumen combined with deep technical expertise",
                      achievements: "Developed frameworks bridging technology solutions with business outcomes",
                      icon: GraduationCap,
                      color: "genie-teal"
                    }
                  ];

                  const rows: any[] = [];
                  for (let i = 0; i < phases.length; i += 2) {
                    rows.push([phases[i], phases[i + 1]]);
                  }

                  return rows.map((pair, rowIndex) => {
                    const left = pair[0];
                    const right = pair[1];
                    const LeftIcon = left.icon as any;
                    const RightIcon = right?.icon as any;
                    return (
                      <div key={rowIndex} className="flex items-stretch">
                        {/* Left column */}
                        <div className="w-1/2 pr-8">
                          <Card className={`p-8 border-${left.color}/20 bg-gradient-to-br from-${left.color}/5 to-background hover:shadow-xl transition-all duration-300 group`}>
                            <div className="flex items-center gap-4 mb-6">
                              <div className={`p-4 bg-${left.color}/10 rounded-xl group-hover:scale-110 transition-transform`}>
                                <LeftIcon className={`w-8 h-8 text-${left.color}`} />
                              </div>
                              <div>
                                <h3 className={`text-xl font-bold text-${left.color} mb-1`}>{left.phase}</h3>
                                <p className="text-sm text-muted-foreground font-medium">{left.companies}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className={`p-4 bg-${left.color}/5 rounded-lg border border-${left.color}/10`}>
                                <h4 className="font-bold text-foreground mb-2">🎯 Focus Areas</h4>
                                <p className="text-muted-foreground">{left.focus}</p>
                              </div>
                              <div className={`p-4 bg-${left.color}/5 rounded-lg border border-${left.color}/10`}>
                                <h4 className="font-bold text-foreground mb-2">🚀 Key Achievements</h4>
                                <p className="text-muted-foreground">{left.achievements}</p>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Center dot */}
                        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                          <div className={`w-12 h-12 bg-genie-primary rounded-full flex items-center justify-center shadow-2xl`}>
                            <div className="w-6 h-6 bg-white rounded-full" />
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="w-1/2 pl-8">
                          {right ? (
                            <Card className={`p-8 border-${right.color}/20 bg-gradient-to-br from-${right.color}/5 to-background hover:shadow-xl transition-all duration-300 group`}>
                              <div className="flex items-center gap-4 mb-6">
                                <div className={`p-4 bg-${right.color}/10 rounded-xl group-hover:scale-110 transition-transform`}>
                                  <RightIcon className={`w-8 h-8 text-${right.color}`} />
                                </div>
                                <div>
                                  <h3 className={`text-xl font-bold text-${right.color} mb-1`}>{right.phase}</h3>
                                  <p className="text-sm text-muted-foreground font-medium">{right.companies}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className={`p-4 bg-${right.color}/5 rounded-lg border border-${right.color}/10`}>
                                  <h4 className="font-bold text-foreground mb-2">🎯 Focus Areas</h4>
                                  <p className="text-muted-foreground">{right.focus}</p>
                                </div>
                                
                                {/* Highlight GenieAI Hub Launch for AI Innovation */}
                                {right.phase === "AI Innovation & Knowledge Sharing" && (
                                  <div className="p-6 bg-background border-2 border-genie-cyan rounded-lg shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                      <Badge className="bg-genie-cyan text-background font-bold px-3 py-1">
                                        🚀 HUB LAUNCHED
                                      </Badge>
                                      <span className="text-sm font-bold text-genie-cyan bg-genie-cyan/10 px-3 py-1 rounded-full">
                                        Platform Ready
                                      </span>
                                    </div>
                                    <h4 className="font-bold text-genie-cyan text-xl mb-4">
                                      GenieAI Experimentation Hub
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-genie-cyan rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                          <p className="font-semibold text-foreground">Knowledge Sharing Platform</p>
                                          <p className="text-muted-foreground text-sm">Live experimentation hub for AI innovation</p>
                                        </div>
                                      </div>
                                       <div className="flex items-start gap-3">
                                         <div className="w-2 h-2 bg-genie-cyan rounded-full mt-2 flex-shrink-0"></div>
                                         <div>
                                           <p className="font-semibold text-foreground">Genie Conversation Feature</p>
                                           <p className="text-muted-foreground text-sm">Advanced conversational AI with comprehensive capabilities</p>
                                           <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-muted-foreground">
                                             <div>• 80+ Knowledge Contexts</div>
                                             <div>• Multi-Model Intelligence</div>
                                             <div>• Split-Screen Conversations</div>
                                             <div>• Model Comparison Mode</div>
                                             <div>• Advanced RAG Architecture</div>
                                             <div>• Context Switching</div>
                                           </div>
                                         </div>
                                       </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-genie-cyan rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                          <p className="font-semibold text-foreground">Progressive Launch Strategy</p>
                                          <p className="text-muted-foreground text-sm">More experiments releasing in 2-3 weeks</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-genie-cyan rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                          <p className="font-semibold text-foreground">Framework in Action</p>
                                          <p className="text-muted-foreground text-sm">Demonstrating Experiment → Validate → Deploy methodology</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                <div className={`p-4 bg-${right.color}/5 rounded-lg border border-${right.color}/10`}>
                                  <h4 className="font-bold text-foreground mb-2">🚀 Key Achievements</h4>
                                  <p className="text-muted-foreground">{right.achievements}</p>
                                </div>
                              </div>
                            </Card>
                          ) : null}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Personal Learning & Knowledge Sharing Platform */}
            <Card className="p-12 bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10 border-genie-primary/20">
              <div className="text-center">
                <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-6">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Personal Learning Platform
                </Badge>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  <span className="text-genie-primary">Individual Learning</span> • <span className="text-genie-teal">Knowledge Sharing</span> • <span className="text-genie-cyan">Experimentation Hub</span>
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-5xl mx-auto">
                  This platform represents my personal journey exploring AI possibilities through practical experimentation, 
                  sharing insights from 21+ years of healthcare technology experience, and demonstrating how emerging technologies 
                  can transform digital health through hands-on learning and open knowledge sharing.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  {[
                    {
                      title: "Learning Laboratory",
                      description: "Personal experimentation with AI, automation, and innovative digital solutions in healthcare",
                      icon: Lightbulb,
                      color: "genie-primary",
                      highlights: ["Hands-on AI exploration", "Healthcare technology experiments", "Continuous skill development"]
                    },
                    {
                      title: "Knowledge Democratization", 
                      description: "Sharing insights and learnings from enterprise healthcare technology transformation",
                      icon: Users,
                      color: "genie-teal",
                      highlights: ["Open learning approach", "Experience-based insights", "Community knowledge sharing"]
                    },
                    {
                      title: "Innovation Showcase",
                      description: "Demonstrating practical applications of cutting-edge technologies working together",
                      icon: Rocket,
                      color: "genie-cyan",
                      highlights: ["Multi-technology integration", "Real-world applications", "Future-focused exploration"]
                    }
                  ].map((pillar, index) => {
                    const IconComponent = pillar.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-16 h-16 bg-${pillar.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className={`w-8 h-8 text-${pillar.color}`} />
                        </div>
                        <h4 className={`text-lg font-bold text-${pillar.color} mb-3`}>
                          {pillar.title}
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          {pillar.description}
                        </p>
                        <div className="space-y-2">
                          {pillar.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center justify-center gap-2 text-sm text-foreground/70">
                              <div className={`w-1 h-1 bg-${pillar.color} rounded-full`} />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Platform Disclaimer */}
                <div className="mt-12 p-6 bg-background/50 rounded-lg border border-border/50">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong>Platform Focus:</strong> This platform serves as a personal learning environment and knowledge sharing initiative, 
                    representing individual exploration, experimentation, and educational insights gained through 
                    hands-on experience with emerging healthcare technologies and AI innovation.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Personal Life Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Personal Life & Community Engagement
              </h2>
              <p className="text-xl text-muted-foreground">
                Balancing technology passion with rich family life and community service
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Based in Cary, NC, I balance my passion for technology and innovation with a rich family life. 
                  Married for 22 years with two children, I find joy in exploring new technologies, motorcycling 
                  adventures, and international travel.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  My interests span across various technology domains including artificial intelligence, 
                  biotechnology, and digital transformation. I enjoy experimenting with new programming languages, 
                  exploring AI tools, and staying current with breakthrough innovations in healthcare technology. 
                  Photography during our travels has become another passion, allowing me to capture the intersection 
                  of technology and culture in different parts of the world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond technology, I'm deeply committed to community service, particularly volunteering with 
                  nonprofit organizations in Cary to cook and serve meals at homeless shelters over weekends. 
                  This hands-on community engagement provides meaningful perspective on how technology innovations 
                  can create real-world impact beyond the corporate environment.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {personalInterests.map((interest, index) => {
                    const IconComponent = interest.icon;
                    return (
                      <div key={index} className={`p-4 rounded-lg ${interest.color} text-center`}>
                        <IconComponent className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">{interest.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Let's Connect & Collaborate
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Interested in exploring how AI and emerging technologies can transform healthcare? 
              Let's discuss the possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/journey">
                <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                  Explore My Journey
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-genie-primary text-genie-primary hover:bg-genie-primary/10 px-8 py-4"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                Connect on LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-genie-primary text-genie-primary hover:bg-genie-primary/10 px-8 py-4"
                onClick={() => window.open('https://x.com/sai_dasika/', '_blank')}
              >
                Follow on X
              </Button>
            </div>
           </div>
          </section>

          {/* Clear navigation CTAs */}
          <CTASection currentPage="about" />
          
        </main>

       <Footer />
     </div>
   );
 };

 export default About;