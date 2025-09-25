import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { DevelopmentJourneyMap } from "@/components/DevelopmentJourneyMap";
import { BusinessImpactInfographic } from "@/components/BusinessImpactInfographic";

import { GammaIntegrationWidget } from "@/components/GammaIntegrationWidget";
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
              From a simple conversation to building complex applications with AI - follow my 6-month journey 
              discovering how AI tools are democratizing software development for everyone.
            </p>
            
            {/* Journey Highlights Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Learning Timeline</h3>
                <p className="text-white/80 text-xs">6 months of experimentation</p>
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
              >
                <Calendar className="w-4 h-4 mr-2" />
                Follow My Timeline
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
                asChild
              >
                <Link to="/case-studies">
                  <Award className="w-4 h-4 mr-2" />
                  See What I Built
                </Link>
              </Button>
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

            {/* Gamma Integration Widget for Journey Timeline */}
            <div className="mb-12 max-w-md mx-auto">
              <GammaIntegrationWidget
                contentType="journey"
                title="AI Journey Timeline"
                description="Generate interactive presentation of my complete AI learning journey with milestones, achievements, and technology evolution"
                data={milestones}
                autoGenerate={false}
                showInstructions={true}
              />
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


        {/* Business Impact Analysis */}
        <BusinessImpactInfographic />

      </main>

      <Footer />
    </div>
  );
};

export default Journey;