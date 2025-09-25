import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import VerticalJourneyInfographic from "@/components/VerticalJourneyInfographic";
import { BusinessImpactInfographic } from "@/components/BusinessImpactInfographic";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award, Brain, Database, Code2, Network, Zap, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import journeyInfographicBg from "@/assets/journey-infographic-bg.jpg";
import timelineVisual from "@/assets/timeline-visual.png";

const Journey = () => {
  useEffect(() => {
    document.title = "Our Journey - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the journey behind Genie AI Experimentation HUB - from concept to enterprise AI transformation platform.');
    }
  }, []);

  const milestones = [
    {
      date: "June 2025",
      month: "June",
      year: "2025",
      phase: "Phase 01: The Spark",
      icon: Lightbulb,
      title: "The Conversation That Changed Everything",
      description: "I remember it like it was yesterday. A typical Tuesday afternoon coffee with my brilliant colleague Prashant sparked a revolutionary question: 'What if AI didn't just assist us, but truly transformed how we built solutions from the ground up?' That single question hit me like lightning - unleashing innovation I hadn't even dared to imagine.",
      touchPoints: [
        "Initial spark from transformative conversation with Prashant",
        "Recognition of fundamental shift beyond incremental innovation",
        "Deep curiosity ignited for AI-driven development transformation"
      ],
      painPoints: [
        "Overwhelming possibilities without clear direction",
        "Limited understanding of AI's true potential",
        "Uncertainty about where to begin exploration"
      ],
      opportunities: [
        "Revolutionary approach to solution development",
        "Potential for enterprise-wide transformation",
        "Personal quest for AI mastery begins"
      ],
      technologies: ["Conceptual Framework", "Strategic Vision"],
      color: "genie-primary",
      impact: "Foundation for AI-first development mindset",
      visualElement: "💡"
    },
    {
      date: "July 2025",
      month: "July", 
      year: "2025",
      phase: "Phase 02: AI Engine Discovery", 
      icon: Brain,
      title: "Building My Personal AI Laboratory",
      description: "What began as pure curiosity transformed into an all-consuming personal mission. I established my comprehensive AI experimentation hub with systematic exploration of foundational models - GPT-4, Claude 3, and Gemini Pro. This involved 200+ hours of deep experimentation across diverse use cases.",
      touchPoints: [
        "Systematically benchmarked 15+ major LLMs across use cases",
        "Developed advanced prompt engineering methodologies", 
        "Created model selection frameworks for specific tasks"
      ],
      painPoints: [
        "Overwhelming number of AI tools and platforms",
        "Inconsistent model performance across tasks",
        "Steep learning curve for prompt optimization"
      ],
      opportunities: [
        "Mastery of AI model capabilities and limitations",
        "Establishment of evaluation frameworks",
        "Foundation for intelligent tool selection"
      ],
      technologies: ["GPT-4", "Claude 3", "Gemini Pro", "Prompt Engineering"],
      color: "genie-teal",
      impact: "Mastery of AI model capabilities and limitations",
      visualElement: "🧠"
    },
    {
      date: "August 2025", 
      month: "August",
      year: "2025",
      phase: "Phase 03: Design & Architecture",
      icon: Target,
      title: "Mapping Complex AI Architectures", 
      description: "This phase focused on bringing process to a stable and reliable state. I mastered advanced visualization methodologies using Visio, draw.io, Miro, and Figma to map complex AI architectures and user flows. My AI tools became co-pilots in navigating this uncharted territory.",
      touchPoints: [
        "Developed AI-specific architectural visualization standards",
        "Created reusable design patterns for complex workflows",
        "Built systematic approach to solution conceptualization"
      ],
      painPoints: [
        "Abstract AI concepts difficult to visualize",
        "Complex workflows hard to communicate",
        "Need for standardized design patterns"
      ],
      opportunities: [
        "Transform abstract concepts into actionable blueprints",
        "Enable clear communication of complex systems",
        "Establish reusable architectural patterns"
      ],
      technologies: ["Visio", "Draw.io", "Miro", "Figma", "Lucidchart"],
      color: "genie-cyan",
      impact: "Transformed abstract AI concepts into actionable blueprints",
      visualElement: "🎯"
    },
    {
      date: "September 2025",
      month: "September",
      year: "2025",
      phase: "Phase 04: Infrastructure Revolution",
      icon: Database,
      title: "Building Unshakeable Technical Foundations",
      description: "I constructed a robust development ecosystem using cutting-edge tools. Mastered Cursor IDE for AI-assisted coding, leveraged Replit for rapid prototyping, and discovered AI-powered solutions that dramatically accelerated front-end development. This persistent learning curve was absolutely critical.",
      touchPoints: [
        "Built scalable TypeScript-based microservices architecture",
        "Implemented containerized development environments", 
        "Established real-time data synchronization patterns"
      ],
      painPoints: [
        "Complex tool integration challenges",
        "Performance optimization bottlenecks",
        "Scaling issues with rapid prototyping"
      ],
      opportunities: [
        "Foundation for rapid AI solution deployment",
        "Streamlined development workflows",
        "Enterprise-grade scalability achieved"
      ],
      technologies: ["Cursor IDE", "Replit", "Docker", "V0 by Vercel", "Supabase", "PostgreSQL"],
      color: "genie-primary",
      impact: "Created foundation for rapid AI solution deployment",
      visualElement: "🚀"
    },
    {
      date: "October 2025",
      month: "October",
      year: "2025",
      phase: "Phase 05: Production Excellence",
      icon: Shield,
      title: "Enterprise-Grade AI Systems",
      description: "I tackled enterprise-critical challenges head-on: single source of truth architecture, intelligent duplicate detection, and hallucination reduction through RAG implementation. Integration of external services like DocuSign and Twilio proved the platform's enterprise readiness.",
      touchPoints: [
        "Implemented comprehensive data consistency frameworks",
        "Developed hallucination reduction achieving 94% accuracy",
        "Built enterprise-grade multi-tenant isolation"
      ],
      painPoints: [
        "Data consistency across multiple systems",
        "AI hallucination and reliability concerns", 
        "Complex multi-tenant security requirements"
      ],
      opportunities: [
        "Enterprise-grade reliability and accuracy",
        "Proven integration capabilities",
        "Production-ready AI solutions"
      ],
      technologies: ["RAG Architecture", "Vector Databases", "DocuSign API", "Twilio", "Redis"],
      color: "genie-teal",
      impact: "Achieved enterprise-grade reliability and accuracy",
      visualElement: "🛡️"
    },
    {
      date: "November 2025",
      month: "November", 
      year: "2025",
      phase: "Phase 06: Agentic AI Breakthrough",
      icon: Network,
      title: "Dynamic Multi-Agent Innovation",
      description: "The breakthrough moment: I built an intelligent platform where specialized AI agents are dynamically generated and orchestrated through advanced prompt engineering. Real-time workflow configuration enables seamless agent collaboration, demonstrated through complete healthcare workflow automation in under 2 hours.",
      touchPoints: [
        "Created dynamic agent generation with 12+ specialized roles",
        "Achieved seamless multi-agent orchestration with conflict resolution",
        "Demonstrated complete healthcare workflow automation"
      ],
      painPoints: [
        "Complex agent coordination challenges",
        "Dynamic workflow configuration complexity",
        "Real-time collaboration synchronization"
      ],
      opportunities: [
        "Revolutionary approach to complex problem-solving",
        "Unlimited scalability through AI collaboration",
        "Rapid solution development and deployment"
      ],
      technologies: ["Agentic AI", "Multi-Agent Systems", "Workflow Orchestration", "Real-time Collaboration"],
      color: "genie-cyan",
      impact: "Revolutionized approach to complex problem-solving through AI collaboration",
      visualElement: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Enhanced Hero Section - Consistent with other pages */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${journeyInfographicBg})` }}
        />
        
        {/* Dark Gradient Overlay - matching other pages */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />
        
        {/* Journey-themed floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/30 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6 sm:mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-5xl">
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-3 sm:mb-4">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              My Learning Journey
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              AI Development <span className="text-genie-accent">Discovery</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              From a simple conversation to building complex applications with AI - follow my ongoing journey since June 2025, 
              discovering how AI tools are democratizing software development and continuously evolving with new breakthroughs.
            </p>
            
            {/* Journey Highlights Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Learning Timeline</h3>
                <p className="text-white/80 text-xs">Ongoing since June 2025</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">AI Collaboration</h3>
                <p className="text-white/80 text-xs">Human-AI development partnership</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Accessibility Growth</h3>
                <p className="text-white/80 text-xs">No-code to advanced development</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Knowledge Sharing</h3>
                <p className="text-white/80 text-xs">Open experimentation results</p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
              <Button 
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
                asChild
              >
                <Link to="/business-use-cases">
                  <Calendar className="w-4 h-4 mr-2" />
                  Explore business use cases
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link to="/about">
                  <Award className="w-4 h-4 mr-2" />
                  About me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Vertical Journey Infographic */}
        <VerticalJourneyInfographic />

        {/* Business Impact Analysis */}
        <BusinessImpactInfographic />

      </main>

      <Footer />
    </div>
  );
};

export default Journey;