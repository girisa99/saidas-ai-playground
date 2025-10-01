import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, Mail, Linkedin, ArrowUp, X, ChevronDown } from "lucide-react";
import { PrivacyDialog, TermsDialog, DisclaimerDialog, CookiesDialog } from "./LegalDialogs";
import { FAQModal } from "./FAQModal";
import { SupportModal } from "./SupportModal";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const emailServices = [
    {
      name: 'Contact Form',
      action: () => {
        // Scroll to contact section or open contact form
        const contactSection = document.getElementById('contact-form');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If no contact form on page, navigate to a contact page
          window.location.href = '/contact';
        }
      }
    },
    {
      name: 'Gmail',
      action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=genieaiexperimentationhub@gmail.com&su=Contact%20from%20Genie%20AI%20Hub&body=Hello%20Sai,%0A%0AI%20am%20reaching%20out%20regarding%20your%20Genie%20AI%20Experimentation%20Hub.%0A%0A[Please%20write%20your%20message%20here]%0A%0ABest%20regards', '_blank')
    },
    {
      name: 'Outlook',
      action: () => window.open('https://outlook.live.com/mail/0/deeplink/compose?to=genieaiexperimentationhub@gmail.com&subject=Contact%20from%20Genie%20AI%20Hub&body=Hello%20Sai,%0A%0AI%20am%20reaching%20out%20regarding%20your%20Genie%20AI%20Experimentation%20Hub.%0A%0A[Please%20write%20your%20message%20here]%0A%0ABest%20regards', '_blank')
    },
    {
      name: 'Yahoo Mail',
      action: () => window.open('https://compose.mail.yahoo.com/?to=genieaiexperimentationhub@gmail.com&subject=Contact%20from%20Genie%20AI%20Hub&body=Hello%20Sai,%0A%0AI%20am%20reaching%20out%20regarding%20your%20Genie%20AI%20Experimentation%20Hub.%0A%0A[Please%20write%20your%20message%20here]%0A%0ABest%20regards', '_blank')
    },
    {
      name: 'Default Email App',
      action: () => window.open('mailto:genieaiexperimentationhub@gmail.com?subject=Contact%20from%20Genie%20AI%20Hub&body=Hello%20Sai,%0A%0AI%20am%20reaching%20out%20regarding%20your%20Genie%20AI%20Experimentation%20Hub.%0A%0A[Please%20write%20your%20message%20here]%0A%0ABest%20regards', '_blank')
    }
  ];
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
                <h3 className="text-lg font-bold">
                  <span className="text-primary">Genie AI</span> Hub
                </h3>
                <p className="text-xs text-muted-foreground">Innovation through AI</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              GenieAI Experimentation Hub - empowering individuals to build AI expertise through hands-on learning using the Experiment → Validate → Lead to Deploy framework. 
              <strong>2 Live Features:</strong> GenieAI Hub Platform & Genie Conversation with 80+ knowledge contexts, advanced RAG architecture, and multi-model intelligence demonstrating professional AI capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <Link to="/journey" className="text-muted-foreground hover:text-foreground transition-colors block">
                Personal AI Development Journey
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors block">
                About Sai - Value Creation Journey
              </Link>
              <Link to="/technology" className="text-muted-foreground hover:text-foreground transition-colors block">
                2 Live Features Tech Stack
              </Link>
              <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors block">
                Live Feature Case Studies
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <Link to="/business-use-cases" className="text-muted-foreground hover:text-foreground transition-colors block">
                Gartner Business Solutions
              </Link>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors block">
                Documentation Hub
              </Link>
              <FAQModal 
                trigger={
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-left block">
                    FAQ & Questions
                  </button>
                }
              />
              <SupportModal 
                trigger={
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-left block">
                    Support Center
                  </button>
                }
              />
              <Link to="/#experimentation" className="text-muted-foreground hover:text-foreground transition-colors block">
                AI Experimentation
              </Link>
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
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="p-2"
                      aria-label="Choose email service"
                    >
                      <Mail className="h-4 w-4" />
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {emailServices.map((service) => (
                      <DropdownMenuItem
                        key={service.name}
                        onClick={service.action}
                        className="cursor-pointer"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        {service.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  onClick={() => window.open('https://x.com/sai_dasika/', '_blank')}
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
            © 2025 Genie AI Experimentation Hub. Powered by innovation and curiosity.
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