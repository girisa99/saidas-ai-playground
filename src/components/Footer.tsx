import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, Mail, Linkedin, Github, ArrowUp } from "lucide-react";
import { PrivacyDialog, TermsDialog, DisclaimerDialog, CookiesDialog } from "./LegalDialogs";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-muted/50 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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
              Transforming development workflows through AI-accelerated solutions. 
              From curiosity to reality - building the future of intelligent development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/journey" className="text-muted-foreground hover:text-foreground transition-colors block">
                AI Journey
              </a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors block">
                About Me
              </a>
              <a href="/technology" className="text-muted-foreground hover:text-foreground transition-colors block">
                Technology Stack
              </a>
              <a href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors block">
                Case Studies
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-2 text-sm">
              <a href="/business-use-cases" className="text-muted-foreground hover:text-foreground transition-colors block">
                Business Use Cases
              </a>
              <a href="/docs" className="text-muted-foreground hover:text-foreground transition-colors block">
                Documentation Hub
              </a>
              <a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors block">
                FAQ & Support
              </a>
              <a href="/#experimentation" className="text-muted-foreground hover:text-foreground transition-colors block">
                AI Experimentation
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ready to embark on your AI transformation journey?
              </p>
              
              {/* Contact Information */}
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">
                  <span className="font-medium">Name:</span> Sai Dasika
                </div>
                <div className="text-muted-foreground">
                  936 Villageview Lane<br />
                  Cary, NC 27519
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-primary" />
                  <a 
                    href="mailto:genieaiexpermentationhub@gmail.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    genieaiexpermentationhub@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" className="p-2">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2">
                  <Github className="h-4 w-4" />
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