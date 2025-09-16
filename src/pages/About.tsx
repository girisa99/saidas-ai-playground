import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { BusinessImpactInfographic } from "@/components/BusinessImpactInfographic";
import { AnimatedTextEmergence } from "@/components/AnimatedTextEmergence";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, Users, Heart, Globe, Camera, Bike, Code, Lightbulb, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import saiProfile from "@/assets/sai-profile.jpg";
import genieAnimated from "@/assets/genie-animated.png";

const About = () => {
  const [showImage, setShowImage] = useState(false);
  const [loadingText, setLoadingText] = useState("🧞‍♂️ Genie warming up...");

  useEffect(() => {
    document.title = "About Me - Saidas | AI Innovation Leader & Digital Health Pioneer";
    const metaDescription = document.querySelector("meta[name=\"description\"]");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Meet Saidas - AI innovation leader with 21+ years in digital health. Discover my journey from healthcare to AI experimentation and transformation.");
    }

    // Humorous loading sequence
    const loadingMessages = [
      "🧞‍♂️ Genie warming up...",
      "✨ Mixing pharmaceutical experience with AI magic...",
      "🔮 Conjuring 21+ years of wisdom...",
      "🚀 Preparing epic transformation story...",
      "🎭 Adding a dash of humor...",
      "💫 Ready to blow your mind!"
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 2000);

    // Show image after text animation completes
    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(imageTimer);
    };
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <Badge className="bg-genie-primary/20 text-genie-cyan border-genie-cyan/30 mb-4 animate-fade-in">
                  About Me
                </Badge>
                
                {/* Animated Title */}
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  <AnimatedTextEmergence 
                    text="From Healthcare Trenches to "
                    startDelay={2000}
                    charDelay={80}
                    className="block"
                  />
                  <AnimatedTextEmergence 
                    text="AI Laboratory"
                    startDelay={4000}
                    charDelay={100}
                    className="text-genie-cyan block"
                  />
                </h1>
                
                {/* Animated Description */}
                <div className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  <AnimatedTextEmergence 
                    text="I'm Sai Dasika - where 21+ years of pharmaceutical battlefields meet cutting-edge AI experimentation."
                    startDelay={5500}
                    charDelay={60}
                    className="block mb-4"
                  />
                  <AnimatedTextEmergence 
                    text="This platform is my digital laboratory, transforming decades of healthcare complexity into innovative learning experiences."
                    startDelay={6500}
                    charDelay={50}
                  />
                </div>
                
                {/* Loading Text with Humor */}
                <div className="text-lg text-genie-cyan mb-8 animate-loading-bounce">
                  {loadingText}
                </div>
                
                <div className="opacity-0 animate-fade-in" style={{ animationDelay: "7s", animationFillMode: "forwards" }}>
                  <Link to="/journey">
                    <Button size="lg" className="bg-genie-cyan hover:bg-genie-teal text-white px-8 py-4">
                      Explore My Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Professional Image & Genie */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Genie Character - Working Hard */}
                <div className="relative animate-genie-appear">
                  <img 
                    src={genieAnimated} 
                    alt="AI Innovation Genie - Digital Transformation Magic" 
                    className="w-60 h-60 lg:w-72 lg:h-72 object-contain relative z-10 mx-auto animate-genie-working"
                  />
                  
                  {/* Magic Stream from Genie to Text */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-32 h-1 bg-gradient-to-l from-genie-cyan/80 via-genie-teal/60 to-transparent rounded-full animate-magical-stream" 
                         style={{ animationDelay: "2s" }} />
                    <div className="w-24 h-0.5 bg-gradient-to-l from-white/60 to-transparent rounded-full animate-magical-stream mt-1" 
                         style={{ animationDelay: "2.5s" }} />
                  </div>
                  
                  {/* Continuous Magical Particles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-genie-cyan/80 rounded-full animate-magical-stream"
                        style={{
                          left: `${35 + Math.random() * 30}%`,
                          top: `${25 + Math.random() * 50}%`,
                          animationDelay: `${i * 0.3 + 2}s`,
                          animationDuration: `${1.2 + Math.random() * 0.8}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Genie Glow Effect */}
                  <div className="absolute inset-0 w-60 h-60 lg:w-72 lg:h-72 rounded-full bg-genie-cyan/20 blur-xl animate-pulse-glow" />
                </div>
                
                {/* Professional Image - Grand Entrance */}
                {showImage && (
                  <div className="relative z-20 -mt-20 animate-image-grand-entrance">
                    <img 
                      src={saiProfile} 
                      alt="Sai Dasika - AI Innovation Leader and Healthcare Technology Expert" 
                      className="w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-genie-cyan/50 shadow-2xl mx-auto"
                    />
                    <div className="absolute inset-0 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-genie-cyan/30 blur-xl mx-auto" />
                    
                    {/* Success Sparkles */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-magical-stream"
                          style={{
                            left: `${15 + Math.random() * 70}%`,
                            top: `${15 + Math.random() * 70}%`,
                            animationDelay: `${i * 0.2 + 1}s`,
                            animationDuration: `${0.8 + Math.random() * 0.4}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
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

        {/* Business Impact Infographic */}
        <BusinessImpactInfographic />
      </main>

      <Footer />
    </div>
  );
};

export default About;