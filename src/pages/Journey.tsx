import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
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
      date: "June 2024",
      month: "June",
      year: "2024",
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
      date: "July 2024",
      month: "July", 
      year: "2024",
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
      date: "August 2024", 
      month: "August",
      year: "2024",
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
      date: "September 2024",
      month: "September",
      year: "2024",
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
      date: "October 2024",
      month: "October",
      year: "2024",
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
      date: "November 2024",
      month: "November",
      year: "2024",
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

        {/* Executive Impact Summary */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Quantifiable Impact & ROI
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Demonstrable results from systematic AI experimentation with measurable business impact potential
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-genie-primary" />
                </div>
                <div className="text-3xl font-bold text-genie-primary mb-2">15+</div>
                <div className="text-muted-foreground font-medium">AI Technologies Mastered</div>
                <div className="text-xs text-muted-foreground mt-2">GPT-4, Claude, Gemini, etc.</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-6 h-6 text-genie-teal" />
                </div>
                <div className="text-3xl font-bold text-genie-teal mb-2">200+</div>
                <div className="text-muted-foreground font-medium">Hours Intensive Development</div>
                <div className="text-xs text-muted-foreground mt-2">Structured learning & building</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Network className="w-6 h-6 text-genie-cyan" />
                </div>
                <div className="text-3xl font-bold text-genie-cyan mb-2">12+</div>
                <div className="text-muted-foreground font-medium">Specialized AI Agents</div>
                <div className="text-xs text-muted-foreground mt-2">Dynamic orchestration system</div>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-genie-primary" />
                </div>
                <div className="text-3xl font-bold text-genie-primary mb-2">94%</div>
                <div className="text-muted-foreground font-medium">Accuracy Achievement</div>
                <div className="text-xs text-muted-foreground mt-2">Hallucination reduction</div>
              </Card>
            </div>

            {/* Key Capabilities */}
            <Card className="p-8">
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

        {/* Strategic Value Proposition */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Strategic Value for Enterprise Leadership
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                This journey demonstrates proven methodologies for AI transformation that can be scaled 
                across enterprise environments with measurable ROI and risk mitigation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Executive Takeaways</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-genie-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-genie-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Proven Methodology</h4>
                      <p className="text-muted-foreground">Systematic approach to AI integration with measurable milestones and risk mitigation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-genie-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-genie-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Enterprise Readiness</h4>
                      <p className="text-muted-foreground">Production-grade architecture with security, compliance, and scalability built-in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-genie-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-genie-cyan" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Rapid Time-to-Value</h4>
                      <p className="text-muted-foreground">Demonstrated ability to deliver complex solutions in accelerated timeframes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="p-8 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Ready to Transform Your Organization?</h3>
                <p className="text-muted-foreground mb-6">
                  Learn how these AI methodologies can be adapted for your enterprise environment. 
                  Let's discuss implementation strategies and potential ROI for your specific use cases.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about">
                    <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-6 py-3 w-full sm:w-auto">
                      Learn About My Background
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-genie-primary text-genie-primary hover:bg-genie-primary/10 px-6 py-3"
                    onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
                  >
                    Connect on LinkedIn
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Journey;