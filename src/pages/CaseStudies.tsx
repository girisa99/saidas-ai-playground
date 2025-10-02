import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";
import { PatientOnboardingCaseStudy } from "@/components/CaseStudyTemplate";
import { CTASection } from "@/components/CTASection";
import { genieHubCaseStudy, genieConversationCaseStudy } from "@/data/genieFeaturesCaseStudies";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, TrendingUp, Users, Zap, Target, Shield, Activity, ArrowLeft, Award, BarChart3, FileText, UserCheck, Code, MessageCircle, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import successStoriesBg from "@/assets/hero-success-stories.jpg";

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDetailedCase, setSelectedDetailedCase] = useState("patient-onboarding");

  useEffect(() => {
    document.title = "3-Phase Framework Results - 2 Live Features & Personal AI Expertise";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '2 Live Features Launched: GenieAI Hub Platform & Genie Conversation with 80+ contexts. Proven Experiment → Validate → Lead to Deploy framework builds personal AI expertise and professional development capabilities.');
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
              Demonstrating the <span className="text-genie-accent font-semibold">Experiment → Validate → Lead to Deploy</span> framework through real implementations — <strong>2 live features launched</strong> (GenieAI Hub + Genie Conversation) with <strong>10+ experiments across pipeline</strong>, sharing comprehensive learning insights for individual growth and transformation.
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
                <p className="text-white/80 text-xs">2 live features launched</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">PIPELINE</h3>
                <p className="text-white/80 text-xs">10+ Experiments</p>
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
                <div className="max-w-6xl mx-auto space-y-8">
                  
                  {/* Live Features Case Studies - NEW SECTION */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center mb-8 text-genie-accent">
                      🌟 Live Features Case Studies - 2 Production Deployments
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* GenieAI Hub Platform Case Study */}
                      <Card className="p-6 border-genie-cyan/20 hover:border-genie-cyan/40 transition-colors bg-gradient-to-br from-genie-cyan/5 to-background">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-genie-cyan/10 rounded-lg">
                            <Code className="w-6 h-6 text-genie-cyan" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-foreground mb-1">
                              GenieAI Hub Platform
                            </h4>
                            <p className="text-genie-cyan font-semibold text-sm mb-2">
                              🚀 LIVE: Complete Platform - 2 weeks concept to production
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          Full-stack experimentation platform built using Lovable + Supabase. Demonstrates complete Experiment → Validate → Lead to Deploy framework with knowledge sharing, case studies, and interactive features.
                        </p>
                        
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="text-center p-2 bg-white/60 rounded border">
                              <div className="font-bold text-genie-cyan">2</div>
                              <div className="text-muted-foreground">Weeks Build</div>
                            </div>
                            <div className="text-center p-2 bg-white/60 rounded border">
                              <div className="font-bold text-genie-cyan">100%</div>
                              <div className="text-muted-foreground">Framework</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          <Badge variant="secondary" className="text-xs">Full-Stack Platform</Badge>
                          <Badge variant="secondary" className="text-xs">Live Production</Badge>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-genie-cyan border-genie-cyan hover:bg-genie-cyan/10"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedDetailedCase("genie-hub");
                            setActiveTab("detailed");
                          }}
                        >
                          <Target className="w-4 h-4 mr-2" />
                          View Platform Case Study
                        </Button>
                      </Card>

                      {/* Genie Conversation AI Case Study */}
                      <Card className="p-6 border-genie-accent/20 hover:border-genie-accent/40 transition-colors bg-gradient-to-br from-genie-accent/5 to-background">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-genie-accent/10 rounded-lg">
                            <MessageCircle className="w-6 h-6 text-genie-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-foreground mb-1">
                              Genie Conversational AI
                            </h4>
                            <p className="text-genie-accent font-semibold text-sm mb-2">
                              🚀 LIVE: Advanced RAG + 80+ Contexts - 3 weeks to production
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          Personal AI learning project with multi-model intelligence, split-screen conversations, and advanced RAG architecture. Hands-on experimentation demonstrating AI capabilities through the Experiment → Validate → Lead to Deploy framework. Active exploration of scalability (tested 1,000+ concurrent scenarios), performance optimization ({"<"}2.5s response targets), and system design patterns.
                        </p>
                        
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="text-center p-2 bg-white/60 rounded border">
                              <div className="font-bold text-genie-accent">80+</div>
                              <div className="text-muted-foreground">Contexts</div>
                            </div>
                            <div className="text-center p-2 bg-white/60 rounded border">
                              <div className="font-bold text-genie-accent">Multi</div>
                              <div className="text-muted-foreground">Models</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          <Badge variant="secondary" className="text-xs">Advanced RAG</Badge>
                          <Badge variant="secondary" className="text-xs">Multi-Model AI</Badge>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full text-genie-accent border-genie-accent hover:bg-genie-accent/10"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedDetailedCase("genie-conversation");
                            setActiveTab("detailed");
                          }}
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          View AI Case Study
                        </Button>
                      </Card>
                    </div>
                  </div>

                  {/* Original Case Study */}
                  <div>
                    <h3 className="text-2xl font-bold text-center mb-8">
                      Healthcare Implementation Case Study
                    </h3>
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
                          <div className="text-xl font-bold text-genie-primary">2</div>
                          <div className="text-xs text-muted-foreground">Live Features Deployed</div>
                        </div>
                        <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border">
                          <div className="text-xl font-bold text-genie-primary">10+</div>
                          <div className="text-xs text-muted-foreground">Experiments Across Pipeline</div>
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
                        setSelectedDetailedCase("patient-onboarding");
                        setActiveTab("detailed");
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Detailed Case Study
                    </Button>
                  </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-8">
                {/* Case Study Selector */}
                <div className="max-w-md mx-auto mb-8">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Case Study for Detailed Analysis
                  </label>
                  <Select value={selectedDetailedCase} onValueChange={setSelectedDetailedCase}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a case study..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genie-hub">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-genie-cyan" />
                          GenieAI Hub Platform
                        </div>
                      </SelectItem>
                      <SelectItem value="genie-conversation">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-genie-accent" />
                          Genie Conversational AI
                        </div>
                      </SelectItem>
                      <SelectItem value="patient-onboarding">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-genie-primary" />
                          Patient Onboarding System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Case Study Content */}
                {selectedDetailedCase === "patient-onboarding" && <PatientOnboardingCaseStudy />}
                {selectedDetailedCase === "genie-hub" && <CaseStudyTemplate caseStudyData={genieHubCaseStudy} />}
                {selectedDetailedCase === "genie-conversation" && <CaseStudyTemplate caseStudyData={genieConversationCaseStudy} />}
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