import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, GraduationCap, Users, Heart, Globe, Camera, Bike, Code, Lightbulb, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import aboutHeroBg from "@/assets/about-hero-bg.jpg";
import statsInfographic from "@/assets/stats-infographic.jpg";
import saiProfile from "@/assets/sai-profile.jpg";

const About = () => {
  useEffect(() => {
    document.title = "About Sai Dasika - Technology Innovator & Digital Health Visionary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet Sai Dasika, Technology Innovator with 21+ years bridging advanced technology solutions with complex business challenges in healthcare and digital therapeutics.');
    }
  }, []);

  const stats = [
    { number: "21+", label: "Years Experience", icon: Briefcase, color: "genie-primary" },
    { number: "45+", label: "Days Learning", icon: Users, color: "genie-teal" },
    { number: "40-60%", label: "Dev Acceleration", icon: Code, color: "genie-cyan" },
    { number: "60-80%", label: "Cost Reduction", icon: Heart, color: "genie-primary" }
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "MBA from Cornell University's Johnson School",
      description: "Strategic business acumen combined with deep technical expertise"
    },
    {
      icon: Briefcase,
      title: "Technology Leadership at Industry Giants",
      description: "Novartis, Bayer, Conduent, Amgen, and Pfizer"
    },
    {
      icon: Target,
      title: "Digital Transformation Pioneer",
      description: "Led initiatives across commercial operations, clinical R&D, regulatory affairs, and supply chain"
    },
    {
      icon: Lightbulb,
      title: "Entrepreneurial Innovation",
      description: "Passion for bridging cutting-edge technical capabilities with real-world healthcare applications"
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
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-navy/80 to-genie-primary/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-genie-primary/20 text-genie-cyan border-genie-cyan/30 mb-4">
                About Me
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Meet <span className="text-genie-cyan">Sai Dasika</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-genie-cyan font-medium mb-4">
                Healthcare Transformation Through Technology Innovation
              </p>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                <span className="font-semibold text-genie-cyan">21+ years</span> of pioneering technology solutions 
                that revolutionize healthcare operations and accelerate therapeutic breakthroughs. From pharmaceutical 
                giants to emerging digital platforms, I architect the intersection where advanced technology 
                meets complex healthcare challenges, transforming how we develop, deliver, and optimize patient outcomes.
              </p>
              <Link to="/journey">
                <Button size="lg" className="bg-genie-cyan hover:bg-genie-teal text-white px-8 py-4">
                  Explore My Journey
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-genie-cyan to-genie-primary rounded-full animate-pulse opacity-75" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <img 
                    src={saiProfile} 
                    alt="Sai Dasika - Technology Innovator & Digital Health Visionary"
                    className="w-72 h-72 rounded-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative">
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Professional Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                My career spans technology leadership roles at industry giants, consistently leading 
                digital transformation initiatives across the pharmaceutical and life sciences ecosystem.
              </p>
            </div>

            <div className="prose prose-lg max-w-4xl mx-auto text-muted-foreground mb-12">
              <p>
                My career spans technology leadership roles at industry giants including Novartis, Bayer, 
                Conduent, Amgen, and Pfizer, where I've consistently led digital transformation initiatives 
                across commercial operations, clinical R&D, regulatory affairs, and supply chain management. 
                With an MBA from Cornell University's Johnson School, I've developed a unique perspective 
                that combines deep technical expertise with strategic business acumen, focusing on implementing 
                innovative technology solutions to streamline operations and accelerate therapeutic development.
              </p>
              <p>
                Throughout my journey, I've cultivated strong entrepreneurial skills and a passion for 
                identifying opportunities where technology can solve complex business challenges. This 
                entrepreneurial mindset has driven me to explore emerging technologies, develop innovative 
                solutions, and bridge the gap between cutting-edge technical capabilities and real-world 
                healthcare applications. My approach emphasizes practical innovation that delivers measurable 
                impact in therapeutic development and patient outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-genie-primary/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-genie-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Platform Mission Section */}
        <section className="py-16 bg-gradient-to-b from-background to-genie-primary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Platform Mission
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                This platform represents the convergence of deep industry expertise and cutting-edge innovation.
              </p>
            </div>

            <Card className="p-8 lg:p-12 text-center">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
                This platform is designed to democratize access to complex therapeutic knowledge while 
                showcasing how individual passion and technical excellence can create meaningful impact 
                in healthcare technology.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-genie-primary mb-4">
                    Educational & Experimental Focus
                  </h3>
                  <p className="text-muted-foreground">
                    This platform serves as a learning laboratory for exploring how emerging technologies 
                    can transform the digital health landscape. Through hands-on experimentation with AI, automation, 
                    and innovative digital solutions, we demonstrate practical applications that could 
                    revolutionize healthcare delivery and digital therapeutics.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-genie-teal mb-4">
                    Multi-Technology Ecosystem
                  </h3>
                  <p className="text-muted-foreground">
                    The healthcare value chain is complex and multifaceted—no single technology can address all 
                    challenges. This platform experiments with integrating diverse technological solutions, 
                    from AI-powered analytics to process automation, showcasing how multiple cutting-edge 
                    technologies must work together to create meaningful impact in digital health.
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;