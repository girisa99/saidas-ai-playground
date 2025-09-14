import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
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
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12">
              <img 
                src={genieLogo} 
                alt="Genie Cell and Gene Technology Navigator" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-primary">Genie AI</span> Hub
              </h1>
              <p className="text-xs text-muted-foreground">I am your technology Navigator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('journey')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <a href="/journey" className="text-muted-foreground hover:text-foreground transition-colors">
                Journey
              </a>
            </button>
            <button 
              onClick={() => scrollToSection('documents')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
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
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('journey')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                <a href="/journey" className="text-left text-muted-foreground hover:text-foreground transition-colors">
                  Journey
                </a>
              </button>
              <button 
                onClick={() => scrollToSection('documents')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 w-fit">
                Connect
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};