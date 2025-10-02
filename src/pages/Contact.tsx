import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Mail, MapPin, Clock, MessageSquare, Linkedin } from "lucide-react";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    // Update page metadata
    document.title = "Contact Sai Dasika - Creator of 2 Live AI Features & AI Expertise Development Expert";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Sai Dasika - Creator of 2 live AI features (GenieAI Hub & Genie Conversation). Learn how to build personal AI expertise and become an AI-proficient professional in your field.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="secondary" className="text-sm">
                Let's Connect
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Ready to Transform Your Development?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with Saidas to explore how AI can accelerate your innovation journey. 
              From rapid prototyping to enterprise-scale solutions, let's discuss your vision.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground">
                    Ready to explore the possibilities? Let's start a conversation about 
                    how AI can transform your development workflow and accelerate your innovation.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">genieaiexperimentationhub@gmail.com</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Direct line to Saidas for all enquiries
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Location</h3>
                          <p className="text-muted-foreground">
                            936 Villageview Lane<br />
                            Cary, NC 27519
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based in North Carolina's tech corridor
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/20 bg-blue-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Linkedin className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Connect on LinkedIn</h3>
                          <p className="text-muted-foreground mb-3">
                            Sai Dasika - AI Innovation Leader
                          </p>
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            Connect & Network
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Response Time</h3>
                          <p className="text-muted-foreground">Within 24-48 hours</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Personal review and response by Saidas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* What to Expect */}
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">What to Expect</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Personal consultation on your AI development needs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Strategic guidance on AI implementation roadmap</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Discussion of potential collaboration opportunities</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Access to exclusive AI experimentation insights</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Strategic navigation back to content */}
        <CTASection currentPage="contact" variant="minimal" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;