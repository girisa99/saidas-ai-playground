import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatientOnboardingCaseStudy } from "@/components/CaseStudyTemplate";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, TrendingUp, Users, Zap, Target, Shield, Activity, ArrowLeft, Award, BarChart3, FileText, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import successStoriesBg from "@/assets/hero-success-stories.jpg";

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    document.title = "Case Studies - AI Implementation Success Stories - Genie AI Hub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Detailed case studies of successful AI implementations in healthcare. See step-by-step transformation of patient onboarding with 75% efficiency gains and 95% accuracy.');
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <Breadcrumbs />
        </div>
        
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${successStoriesBg})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />
        
        {/* Success Metrics Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/30 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
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
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Learning Outcomes
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              What I <span className="text-genie-accent">Built</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              Real applications and experiments showcasing how AI tools enable rapid development 
              and innovation - from healthcare solutions to business applications.
            </p>
            
            {/* Impact Metrics Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Development Speed</h3>
                <p className="text-white/80 text-xs">10x faster with AI tools</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Learning Curve</h3>
                <p className="text-white/80 text-xs">Accessible to non-developers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Experimentation</h3>
                <p className="text-white/80 text-xs">Rapid prototyping enabled</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Knowledge Sharing</h3>
                <p className="text-white/80 text-xs">Open source insights</p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
              <Button 
                type="button"
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("detailed");
                }}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Explore My Projects
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white/20 hover:border-white/70 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  See My Learning Path
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main>
        {/* Main Content Tabs */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Case Studies Overview
                </TabsTrigger>
                <TabsTrigger value="detailed" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Detailed Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                {/* Case Studies Grid */}
                <div className="max-w-4xl mx-auto">
                  {/* Featured Case Study Card */}
                  <Card className="lg:col-span-2 p-8 border-genie-primary/20 hover:border-genie-primary/40 transition-colors bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-genie-primary/10 rounded-lg">
                        <UserCheck className="w-6 h-6 text-genie-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          AI-Powered Patient Onboarding System
                        </h3>
                        <p className="text-genie-primary font-semibold mb-4">
                          Fully functional application built in 3 days with 90% accuracy
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Comprehensive patient enrollment application demonstrating rapid AI-powered development. 
                      Features complete technology stack analysis, Gartner value framework integration, and market challenge solutions.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Market Challenge Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">3</div>
                          <div className="text-xs text-muted-foreground">Days to Design, Build & Test</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">90%</div>
                          <div className="text-xs text-muted-foreground">System Accuracy</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">&gt;70%</div>
                          <div className="text-xs text-muted-foreground">Dev Cost Saved</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">9.2/10</div>
                          <div className="text-xs text-muted-foreground">Tech Rating</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="secondary" className="text-xs">Hybrid AI-Automation</Badge>
                      <Badge variant="secondary" className="text-xs">Healthcare Transformation</Badge>
                      <Badge variant="secondary" className="text-xs">Gartner Framework</Badge>
                      <Badge variant="secondary" className="text-xs">Step-by-Step Guide</Badge>
                    </div>
                    
                    <Button 
                      type="button"
                      variant="default" 
                      className="w-full bg-genie-primary hover:bg-genie-primary/90"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("detailed");
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Detailed Case Study
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-8">
                {/* Detailed Patient Onboarding Case Study */}
                <PatientOnboardingCaseStudy />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how these proven AI strategies can be adapted for your organization's unique challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/technology">
                  <Zap className="w-4 h-4 mr-2" />
                  Explore Technology
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;