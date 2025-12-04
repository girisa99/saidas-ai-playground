import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Map, Wrench, FileText, Trophy, Search, ExternalLink, Presentation, Briefcase, Dna } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { LazyImage } from "@/components/LazyImage";
import genieLogoMain from "@/assets/genie-logo-main.png";

export const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About Sai Dasika", icon: User },
    { to: "/journey", label: "AI Development Journey", icon: Map },
    { to: "/technology", label: "Tech Stack", icon: Wrench },
    { to: "/business-use-cases", label: "Gartner Business Solutions", icon: Briefcase },
    { to: "/case-studies", label: "Validated Case Studies", icon: Trophy },
    { to: "/cellgene", label: "CellGene", icon: Dna },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/98 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between gap-3">{/* Increased height for better spacing */}
          <Link to="/" className="enterprise-logo-container group flex-shrink-0">
            <div className="relative">
              <LazyImage 
                src={genieLogoMain} 
                alt="Genie AI" 
                className="h-11 w-11 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent whitespace-nowrap">
                GENIE AI HUB
              </span>
              <p className="text-[10px] text-muted-foreground font-medium whitespace-nowrap -mt-0.5">
                Technology Navigator
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Single line, no wrapping */}
          <nav className="hidden lg:flex items-center justify-center flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 whitespace-nowrap">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                
                const getCompactLabel = (label: string) => {
                  const labels: Record<string, string> = {
                    "About Sai Dasika": "About",
                    "AI Development Journey": "Journey",
                    "Tech Stack": "Tech",
                    "Gartner Business Solutions": "Solutions",
                    "Validated Case Studies": "Studies",
                    "Home": "Home",
                    "CellGene": "CellGene"
                  };
                  return labels[label] || label;
                };
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{getCompactLabel(item.label)}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <SearchBar compact />
            </div>
            
            <Button 
              variant="outline"
              size="sm" 
              className="text-sm font-medium hover:bg-muted/80 whitespace-nowrap border-border/60"
              onClick={() => window.open('https://www.genieaiexpermentationhub.com', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-1.5" />
              Login
            </Button>
          </div>

          {/* Mobile Menu Button - Right aligned */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/98 backdrop-blur-md">
            <div className="px-4 py-5 space-y-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Mobile Search */}
              <div className="relative">
                <SearchBar />
              </div>
              
              {/* Mobile Nav Items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.to);
                  
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full justify-center font-medium h-12"
                  onClick={() => {
                    window.open('https://www.genieaiexpermentationhub.com', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                  Login to Platform
                </Button>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium shadow-lg h-12"
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/saidas/', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  Connect with Me
                  <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};