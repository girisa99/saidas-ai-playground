import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
      year: "2019",
      phase: "Discovery",
      icon: Lightbulb,
      title: "The Spark of Innovation",
      description: "Recognizing the gap between AI research and practical business implementation while working with enterprise clients.",
      achievements: [
        "Identified key barriers in AI adoption",
        "Conducted extensive market research",
        "Built initial concept framework"
      ],
      color: "genie-primary"
    },
    {
      year: "2020",
      phase: "Foundation",
      icon: Cog,
      title: "Building the Framework",
      description: "Developing core methodologies and testing initial approaches with pilot projects across different industries.",
      achievements: [
        "Created AI experimentation methodology",
        "Launched first pilot programs",
        "Established key partnerships"
      ],
      color: "genie-teal"
    },
    {
      year: "2021",
      phase: "Validation",
      icon: Target,
      title: "Proving the Concept",
      description: "Successfully implementing AI solutions in healthcare, finance, and manufacturing sectors with measurable ROI.",
      achievements: [
        "Completed 15+ successful implementations",
        "Achieved 300% average ROI for clients",
        "Developed sector-specific frameworks"
      ],
      color: "genie-cyan"
    },
    {
      year: "2022",
      phase: "Scale",
      icon: Rocket,
      title: "Expanding Horizons",
      description: "Scaling operations globally and establishing the comprehensive HUB platform for enterprise AI transformation.",
      achievements: [
        "Launched in 12 countries",
        "Built comprehensive platform",
        "Trained 500+ AI practitioners"
      ],
      color: "genie-primary"
    },
    {
      year: "2023",
      phase: "Innovation",
      icon: TrendingUp,
      title: "Leading the Future",
      description: "Pioneering next-generation AI experimentation tools and establishing industry standards for responsible AI deployment.",
      achievements: [
        "Released advanced analytics platform",
        "Established AI ethics guidelines",
        "Created open-source frameworks"
      ],
      color: "genie-teal"
    },
    {
      year: "2024",
      phase: "Excellence",
      icon: Award,
      title: "Industry Recognition",
      description: "Recognized as a leader in AI experimentation and transformation, continuing to push boundaries in enterprise AI adoption.",
      achievements: [
        "Industry leadership awards",
        "Published research papers",
        "Global community of 10,000+ practitioners"
      ],
      color: "genie-cyan"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-genie-dark via-genie-navy to-genie-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-genie-cyan/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
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
              From Vision to <span className="text-genie-cyan">Reality</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              The story of how Genie AI Experimentation HUB evolved from a simple idea 
              to a comprehensive platform transforming how organizations approach AI innovation.
            </p>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                The Evolution Timeline
              </h2>
              <p className="text-xl text-muted-foreground">
                Key milestones that shaped our journey
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="hidden lg:flex items-center justify-center w-4 h-4 bg-genie-primary rounded-full relative">
                      <div className="absolute w-8 h-8 bg-genie-primary/20 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Content card */}
                    <Card className={`flex-1 p-8 border-${milestone.color}/20 bg-gradient-to-br from-${milestone.color}/5 to-${milestone.color}/10`}>
                      <div className="flex items-start gap-6">
                        <div className={`p-4 bg-${milestone.color}/10 rounded-lg`}>
                          <IconComponent className={`w-8 h-8 text-${milestone.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <Badge variant="outline" className={`border-${milestone.color} text-${milestone.color}`}>
                              {milestone.year}
                            </Badge>
                            <Badge className={`bg-${milestone.color}/20 text-${milestone.color}`}>
                              {milestone.phase}
                            </Badge>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-foreground mb-3">
                            {milestone.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {milestone.description}
                          </p>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {milestone.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                  <div className={`w-2 h-2 bg-${milestone.color} rounded-full`} />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Impact Today
              </h2>
              <p className="text-xl text-muted-foreground">
                The tangible results of our journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-primary mb-2">50+</div>
                <div className="text-muted-foreground">Enterprise Clients</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-teal mb-2">200+</div>
                <div className="text-muted-foreground">AI Implementations</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-cyan mb-2">$50M+</div>
                <div className="text-muted-foreground">Value Generated</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Practitioners Trained</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Become part of the next chapter in AI experimentation and transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                  Explore Our Solutions
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-genie-primary text-genie-primary hover:bg-genie-primary/10 px-8 py-4">
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Journey;