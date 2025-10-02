import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, Mail, Linkedin, ArrowUp, X } from "lucide-react";
import { PrivacyDialog, TermsDialog, DisclaimerDialog, CookiesDialog } from "./LegalDialogs";
import { FAQModal } from "./FAQModal";
import { SupportModal } from "./SupportModal";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleEmailClick = () => {
    window.location.href = 'mailto:genieaiexperimentationhub@gmail.com?subject=Contact from GENIE AI HUB&body=Hello Sai,%0A%0AI am reaching out regarding GENIE AI HUB.%0A%0A[Please write your message here]%0A%0ABest regards';
  };
  return (
    <footer id="contact" className="bg-muted/50 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg ai-glow">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            <div>
              <h3 className="text-lg font-bold enterprise-gradient-text">
                GENIE AI HUB
              </h3>
              <p className="text-xs text-muted-foreground">I am your Technology Navigator</p>
            </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Born from a vision to democratize AI expertise, GENIE AI HUB empowers individuals to transform from curious learners to confident AI practitioners. Through the Experiment → Validate → Lead to Deploy framework, we bridge the gap between AI theory and real-world implementation, proving that mastery comes from doing, not just learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <Link to="/journey" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                Personal AI Development Journey
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                About Sai - Value Creation Journey
              </Link>
              <Link to="/technology" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                2 Live Features Tech Stack
              </Link>
              <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                Live Feature Case Studies
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                Genie Use Cases
              </Link>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors block leading-relaxed">
                Documentation
              </Link>
              <FAQModal 
                trigger={
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-left block leading-relaxed">
                    FAQ & Support
                  </button>
                }
              />
              <SupportModal 
                trigger={
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-left block leading-relaxed">
                    Help Center
                  </button>
                }
              />
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
            <div className="space-y-3 sm:space-y-4">
              
              {/* Contact Information */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="text-muted-foreground">
                  <span className="font-medium">Name:</span> Sai Dasika
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  936 Villageview Lane<br />
                  Cary, NC 27519
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-primary" />
                  <a 
                    href="mailto:genieaiexperimentationhub@gmail.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    genieaiexperimentationhub@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  onClick={handleEmailClick}
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  onClick={() => window.open('https://x.com/sai_dasika/', '_blank')}
                  aria-label="X (Twitter)"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={scrollToTop}
                variant="outline" 
                size="sm" 
                className="w-full border-primary/30 hover:border-primary"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 GENIE AI HUB. Powered by innovation and curiosity.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <PrivacyDialog 
              trigger={
                <button className="hover:text-foreground transition-colors">Privacy</button>
              }
            />
            <TermsDialog 
              trigger={
                <button className="hover:text-foreground transition-colors">Terms</button>
              }
            />
            <DisclaimerDialog 
              trigger={
                <button className="hover:text-foreground transition-colors">Disclaimer</button>
              }
            />
            <CookiesDialog 
              trigger={
                <button className="hover:text-foreground transition-colors">Cookies</button>
              }
            />
          </div>
        </div>
      </div>
    </footer>
  );
};