import { Button } from "@/components/ui/button";
import { Menu, Home, User, Map, Wrench, FileText, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import genieLogo from "@/assets/genie-logo-nav.png";

export const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Clickable to go home */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12">
              <img 
                src={genieLogo} 
                alt="Genie AI Digital Health Technology Navigator" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-primary">Genie AI</span> Hub
              </h1>
              <p className="text-xs text-muted-foreground">I am your technology Navigator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link to="/about" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">About Me</span>
            </Link>
            <Link to="/journey" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              <Map className="w-4 h-4" />
              <span className="text-sm font-medium">Journey</span>
            </Link>
            <Link to="/technology" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              <Wrench className="w-4 h-4" />
              <span className="text-sm font-medium">Tech Stack</span>
            </Link>
            <Link to="/case-studies" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Case Studies</span>
            </Link>
            <button 
              onClick={() => scrollToSection('documents')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Docs</span>
            </button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={() => window.open('https://preview--cgat-patient-hcp-care-ecosystem.lovable.app/', '_blank')}
            >
              Login
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
            >
              Connect
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/40 pt-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <User className="w-4 h-4" />
                <span>About Me</span>
              </Link>
              <Link 
                to="/journey" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <Map className="w-4 h-4" />
                <span>Journey</span>
              </Link>
              <Link 
                to="/technology" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <Wrench className="w-4 h-4" />
                <span>Tech Stack</span>
              </Link>
              <Link 
                to="/case-studies" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <Trophy className="w-4 h-4" />
                <span>Case Studies</span>
              </Link>
              <button 
                onClick={() => scrollToSection('documents')}
                className="flex items-center gap-3 text-left text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
              </button>
              <div className="pt-4 border-t border-border/40 space-y-2">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    window.open('https://preview--cgat-patient-hcp-care-ecosystem.lovable.app/', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 w-full"
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/saidas/', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Connect
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};