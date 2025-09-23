import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { DevelopmentJourneyMap } from "@/components/DevelopmentJourneyMap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award, Brain, Database, Code2, Network, Zap, Shield } from "lucide-react";
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
      phase: "The Spark",
      icon: Lightbulb,
      title: "The Conversation That Changed Everything",
      description: "A typical Tuesday afternoon coffee with my colleague Prashant sparked a revolutionary question: 'What if AI didn't just assist us, but truly transformed how we built solutions from the ground up?' That single question hit me like lightning - this wasn't about incremental improvements, but fundamental transformation.",
      achievements: [
        "Initial curiosity ignited by transformative conversation with Prashant",
        "Recognized profound shift beyond incremental innovation", 
        "Committed to personal quest for AI-driven development transformation"
      ],
      technologies: ["Conceptual Framework", "Strategic Thinking"],
      color: "genie-primary",
      impact: "Foundation for AI-first development mindset"
    },
    {
      date: "July 2025",
      month: "July", 
      year: "2025",
      phase: "AI Engine Exploration", 
      icon: Brain,
      title: "Building My Personal AI Laboratory",
      description: "Established my comprehensive AI experimentation hub with systematic exploration of foundational models. Deep-dive into OpenAI's GPT-4, Anthropic's Claude 3, and Google's Gemini Pro. This phase involved 200+ hours of prompt engineering, model comparison, and architectural analysis.",
      achievements: [
        "Systematically benchmarked 15+ major LLMs across use cases",
        "Developed advanced prompt engineering methodologies",
        "Created model selection frameworks for specific tasks"
      ],
      technologies: ["GPT-4", "Claude 3", "Gemini Pro", "Prompt Engineering"],
      color: "genie-teal",
      impact: "Mastery of AI model capabilities and limitations"
    },
    {
      date: "August 2025", 
      month: "August",
      year: "2025",
      phase: "Conceptualization & Design",
      icon: Target,
      title: "Mapping Complex AI Architectures",
      description: "Overcame complexity through advanced visualization methodologies. Mastered Visio for enterprise architecture, draw.io for system flows, Miro for collaborative design, and Figma for user experience mapping. Created comprehensive visual frameworks for AI solution design.",
      achievements: [
        "Developed AI-specific architectural visualization standards",
        "Created reusable design patterns for complex workflows",
        "Built systematic approach to solution conceptualization"
      ],
      technologies: ["Visio", "Draw.io", "Miro", "Figma", "Lucidchart"],
      color: "genie-cyan",
      impact: "Transformed abstract AI concepts into actionable blueprints"
    },
    {
      date: "September 2025",
      month: "September",
      year: "2025",
      phase: "Infrastructure Development",
      icon: Database,
      title: "Building Unshakeable Technical Foundations",
      description: "Constructed robust development ecosystem using cutting-edge tools. Mastered Cursor IDE for AI-assisted coding, leveraged Replit for rapid prototyping, implemented Docker for containerization, and integrated V0 by Vercel for UI generation. Established enterprise-grade data architecture with Supabase and PostgreSQL.",
      achievements: [
        "Built scalable TypeScript-based microservices architecture",
        "Implemented containerized development environments",
        "Established real-time data synchronization patterns"
      ],
      technologies: ["Cursor IDE", "Replit", "Docker", "V0 by Vercel", "Supabase", "PostgreSQL", "TypeScript"],
      color: "genie-primary",
      impact: "Created foundation for rapid AI solution deployment"
    },
    {
      date: "October 2025",
      month: "October",
      year: "2025",
      phase: "Advanced System Engineering",
      icon: Shield,
      title: "Building Production-Ready AI Systems",
      description: "Tackled enterprise-critical challenges: single source of truth architecture, intelligent duplicate detection, hallucination reduction through RAG implementation, and multi-tenant stability. Integrated external services including DocuSign for document workflows and Twilio for communications.",
      achievements: [
        "Implemented comprehensive data consistency frameworks",
        "Developed hallucination reduction techniques achieving 94% accuracy", 
        "Built enterprise-grade multi-tenant isolation"
      ],
      technologies: ["RAG Architecture", "Vector Databases", "DocuSign API", "Twilio", "Redis", "Kubernetes"],
      color: "genie-teal",
      impact: "Achieved enterprise-grade reliability and accuracy"
    },
    {
      date: "November 2025",
      month: "November",
      year: "2025",
      phase: "Agentic AI Revolution",
      icon: Network,
      title: "Dynamic Multi-Agent Platform Innovation",
      description: "Breakthrough achievement in agentic AI: built intelligent platform where specialized AI agents are dynamically generated and orchestrated through advanced prompt engineering. Real-time workflow configuration enables agents to collaborate seamlessly, demonstrated through rapid healthcare solution prototyping.",
      achievements: [
        "Created dynamic agent generation system with 12+ specialized roles",
        "Achieved seamless multi-agent orchestration with conflict resolution",
        "Demonstrated complete healthcare workflow automation in under 2 hours"
      ],
      technologies: ["Agentic AI", "Multi-Agent Systems", "Workflow Orchestration", "Real-time Collaboration"],
      color: "genie-cyan",
      impact: "Revolutionized approach to complex problem-solving through AI collaboration"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${journeyInfographicBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/95 via-genie-navy/90 to-genie-primary/70" />
        </div>
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-genie-cyan/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="bg-genie-primary/20 text-genie-cyan border-genie-cyan/30 mb-4">
              Our Journey
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              My AI Innovation <span className="text-genie-cyan">Journey</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-6">
              From a simple conversation to revolutionary AI systems - the methodical experimentation 
              journey that transformed how I approach technology solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-genie-cyan/20 text-genie-cyan border-genie-cyan/30">2025 Timeline</Badge>
              <Badge className="bg-white/10 text-white border-white/20">6 Major Phases</Badge>
              <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30">Enterprise Impact</Badge>
            </div>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Executive Summary: AI Transformation Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A comprehensive 6-month intensive exploration resulting in breakthrough agentic AI capabilities, 
                enterprise-grade infrastructure, and proven healthcare solution deployment methodologies.
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Timeline line for desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-genie-primary/30 to-genie-teal/30 transform -translate-x-1/2" />
                    
                    <div className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} relative`}>
                      {/* Timeline dot */}
                      <div className="hidden lg:flex items-center justify-center w-6 h-6 bg-white border-4 border-genie-primary rounded-full relative z-10 shadow-lg">
                        <div className="w-2 h-2 bg-genie-primary rounded-full" />
                      </div>
                      
                      {/* Content card */}
                      <Card className={`flex-1 p-8 border-${milestone.color}/20 bg-gradient-to-br from-${milestone.color}/5 to-${milestone.color}/10 hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                        <div className="flex items-start gap-6">
                          <div className={`p-4 bg-${milestone.color}/10 rounded-xl shadow-sm`}>
                            <IconComponent className={`w-8 h-8 text-${milestone.color}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <Badge variant="outline" className={`border-${milestone.color} text-${milestone.color} font-semibold`}>
                                {milestone.year}
                              </Badge>
                              <Badge className={`bg-${milestone.color}/20 text-${milestone.color} font-medium`}>
                                {milestone.phase}
                              </Badge>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                              {milestone.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                              {milestone.description}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {milestone.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                      <div className={`w-1.5 h-1.5 bg-${milestone.color} rounded-full mt-2 flex-shrink-0`} />
                                      <span className="text-sm">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <Code2 className="w-4 h-4" />
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.technologies.map((tech, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="mt-4">
                                  <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                    <Zap className="w-3 h-3" />
                                    Impact
                                  </h5>
                                  <p className="text-sm text-muted-foreground italic">
                                    {milestone.impact}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Development Journey Map */}
        <DevelopmentJourneyMap />

        {/* Strategic Value for Enterprise Leadership */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Strategic Value for Enterprise Leadership
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                This journey demonstrates proven methodologies for AI transformation that can be scaled across 
                enterprise environments with measurable ROI and risk mitigation.
              </p>
            </div>

            {/* Executive Takeaways */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 border-genie-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-genie-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Proven Methodology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Systematic approach to AI integration with measurable milestones and risk mitigation strategies
                </p>
              </Card>
              
              <Card className="p-8 border-genie-teal/20 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-genie-teal" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Enterprise Readiness</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Production-grade architecture with security, compliance, and scalability built-in
                </p>
              </Card>
              
              <Card className="p-8 border-genie-cyan/20 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-genie-cyan" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Rapid Time-to-Value</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Demonstrated ability to deliver complex solutions in accelerated timeframes
                </p>
              </Card>
            </div>

            {/* AI Experimentation Hub Framework */}
            <div className="bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                AI Experimentation Hub Framework
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-genie-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Cross-Functional</h4>
                  <p className="text-sm text-muted-foreground">
                    Supporting multiple business functions with unified AI capabilities
                  </p>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-genie-teal/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-6 h-6 text-genie-teal" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Rapid Prototyping</h4>
                  <p className="text-sm text-muted-foreground">
                    Quick-to-build, quick-to-fail approach minimizing time investment
                  </p>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-genie-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-6 h-6 text-genie-cyan" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Reusable Components</h4>
                  <p className="text-sm text-muted-foreground">
                    Shared component library enabling rapid cross-functional deployment
                  </p>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-genie-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Quick Wins</h4>
                  <p className="text-sm text-muted-foreground">
                    Demonstrable value and ROI through targeted pilot implementations
                  </p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-genie-primary" />
                </div>
                <div className="text-3xl font-bold text-genie-primary mb-2">15+</div>
                <div className="text-muted-foreground font-medium">Business Functions Supported</div>
                <div className="text-xs text-muted-foreground mt-2">HR, Finance, Operations, etc.</div>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-6 h-6 text-genie-teal" />
                </div>
                <div className="text-3xl font-bold text-genie-teal mb-2">2-4 Hrs</div>
                <div className="text-muted-foreground font-medium">Prototype to Demo</div>
                <div className="text-xs text-muted-foreground mt-2">Rapid validation cycles</div>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Network className="w-6 h-6 text-genie-cyan" />
                </div>
                <div className="text-3xl font-bold text-genie-cyan mb-2">50+</div>
                <div className="text-muted-foreground font-medium">Reusable Components</div>
                <div className="text-xs text-muted-foreground mt-2">Cross-functional library</div>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-genie-primary" />
                </div>
                <div className="text-3xl font-bold text-genie-primary mb-2">80%</div>
                <div className="text-muted-foreground font-medium">Success Rate</div>
                <div className="text-xs text-muted-foreground mt-2">Pilot to production</div>
              </Card>
            </div>

            {/* Real-World Business Use Cases */}
            <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Proven Business Use Cases & Outcomes
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Real implementations demonstrating the transformation from AI experimentation to enterprise-grade healthcare solutions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-background/50 rounded-lg border border-genie-primary/20">
                  <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Patient Management Systems</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Developed robust systems for secure patient data handling, streamlining administrative tasks and improving care delivery.
                  </p>
                  <div className="text-xs text-genie-primary font-medium">
                    ✓ Automated data handling ✓ Improved care workflows
                  </div>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-genie-teal/20">
                  <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-genie-teal" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">User Management Modules</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Built flexible modules for managing diverse user roles and access within healthcare platforms, ensuring data security.
                  </p>
                  <div className="text-xs text-genie-teal font-medium">
                    ✓ Secure role management ✓ Platform flexibility
                  </div>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-genie-cyan/20">
                  <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-genie-cyan" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Module Management Frameworks</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Created foundational frameworks for rapid development and integration of new features across healthcare systems.
                  </p>
                  <div className="text-xs text-genie-cyan font-medium">
                    ✓ Rapid development ✓ Feature integration
                  </div>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-genie-primary/20">
                  <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Treatment Center Workflows</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Designed automated workflows for quick and compliant onboarding of new treatment centers, accelerating network expansion.
                  </p>
                  <div className="text-xs text-genie-primary font-medium">
                    ✓ Automated onboarding ✓ Network growth
                  </div>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-genie-teal/20">
                  <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mb-4">
                    <Cog className="w-6 h-6 text-genie-teal" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Manufacturing Integration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Streamlined and accelerated onboarding of manufacturing partners, crucial for scaling production and distribution.
                  </p>
                  <div className="text-xs text-genie-teal font-medium">
                    ✓ Partner integration ✓ Production scaling
                  </div>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-genie-cyan/20">
                  <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-genie-cyan" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Patient Onboarding Systems</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Implemented intuitive systems to simplify patient onboarding, from registration to initial consultation workflows.
                  </p>
                  <div className="text-xs text-genie-cyan font-medium">
                    ✓ Simplified registration ✓ Improved experience
                  </div>
                </div>
              </div>
            </Card>

            {/* Quantifiable Business Impact */}
            <Card className="p-8 mt-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-genie-cyan/5">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Measurable Business Impact & ROI
                </h3>
                <p className="text-muted-foreground">
                  Demonstrable results from systematic AI implementation with real-world healthcare transformation metrics
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-genie-primary mb-2">300%</div>
                  <div className="font-semibold text-foreground mb-2">Average ROI</div>
                  <div className="text-sm text-muted-foreground">Within 12-18 months of strategic AI implementation across healthcare operations</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-genie-teal mb-2">60%</div>
                  <div className="font-semibold text-foreground mb-2">Automated Inquiries</div>
                  <div className="text-sm text-muted-foreground">Achieved in customer service, reducing support costs by $1.5M annually</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-genie-cyan mb-2">20%</div>
                  <div className="font-semibold text-foreground mb-2">Time Savings</div>
                  <div className="text-sm text-muted-foreground">Employee time freed up across sales, HR, and finance for higher-value work</div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-lg border border-genie-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-genie-primary/20 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">AI-Accelerated Development Benefits</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>• AI-accelerated development drastically reduced timelines</div>
                  <div>• What once took months to build, can now be done in weeks</div>
                  <div>• Significant cost savings by reducing need for large development teams</div>
                  <div>• Rapid prototyping cuts down overheads and time-to-market</div>
                  <div>• Unprecedented efficiency gains achieved through intelligent automation</div>
                  <div>• Competitive advantage through faster innovation cycles</div>
                </div>
              </div>
            </Card>

            {/* Key Capabilities */}
            <Card className="p-8 mt-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Core Capabilities Developed
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-genie-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-genie-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Enterprise Architecture</h4>
                  <p className="text-sm text-muted-foreground">Scalable, multi-tenant AI systems with enterprise-grade security and compliance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-genie-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-genie-teal" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Agentic AI Systems</h4>
                  <p className="text-sm text-muted-foreground">Dynamic multi-agent platforms with real-time orchestration and conflict resolution</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-genie-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-genie-cyan" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Rapid Prototyping</h4>
                  <p className="text-sm text-muted-foreground">Complete healthcare workflows deployed in under 2 hours with full functionality</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Journey;