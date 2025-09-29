import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import { PatientOnboardingCaseStudy } from "@/components/CaseStudyTemplate";
import { CTASection } from "@/components/CTASection";
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
    document.title = "3-Phase Framework Results - What I Learned & Built";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real-world validation of the Experiment → Validate → Lead to Deploy framework through detailed case studies. Following Gartner value methodology with 94% accuracy and proven healthcare implementations.');
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
        
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
              3-Phase Framework Results
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              What I <span className="text-genie-accent">Learned & Built</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              How the <span className="text-genie-accent font-semibold">Experiment → Validate → Deploy</span> framework enabled rapid learning and innovation, 
              following Gartner value methodology — sharing knowledge and insights for individual growth and business transformation.
            </p>
            
            {/* Framework Impact Metrics Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">EXPERIMENT</h3>
                <p className="text-white/80 text-xs">Rapid prototyping journey</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">VALIDATE</h3>
                <p className="text-white/80 text-xs">94% accuracy achieved</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">DEPLOY</h3>
                <p className="text-white/80 text-xs">8+ validated use cases</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">GARTNER</h3>
                <p className="text-white/80 text-xs">Framework aligned value</p>
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
                Explore Framework Results
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white bg-white/10 hover:bg-white/20 hover:border-white/70 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  See Framework Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      
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
                          Framework validation: Built in 3 days with 94% accuracy
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Comprehensive patient enrollment application demonstrating the Experiment → Validate → Deploy framework in action. 
                      Features complete technology stack validation, Gartner value methodology integration, and real-world healthcare solutions.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">3-Phase Framework Validation Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">3</div>
                          <div className="text-xs text-muted-foreground">Days to Design, Build & Test</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">94%</div>
                          <div className="text-xs text-muted-foreground">Framework Accuracy</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">8+</div>
                          <div className="text-xs text-muted-foreground">Validated Use Cases</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">3</div>
                          <div className="text-xs text-muted-foreground">Gartner Phases</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="secondary" className="text-xs">3-Phase Framework</Badge>
                      <Badge variant="secondary" className="text-xs">Healthcare Transformation</Badge>
                      <Badge variant="secondary" className="text-xs">Gartner Value Method</Badge>
                      <Badge variant="secondary" className="text-xs">Experiment → Validate → Deploy</Badge>
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

        
        {/* Strategic next steps for users */}
        <CTASection currentPage="case-studies" />
        
        </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;