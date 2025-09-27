import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Map, Wrench, FileText, Trophy, Search, ExternalLink, Presentation, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
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
    { to: "/about", label: "About Me", icon: User },
    { to: "/journey", label: "My Journey", icon: Map },
    { to: "/technology", label: "Tech Stack Explored", icon: Wrench },
    { to: "/business-use-cases", label: "Business Use Cases", icon: Briefcase },
    { to: "/case-studies", label: "Case Studies", icon: Trophy },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* Logo & Brand - Left aligned, flexible width */}
          <Link to="/" className="enterprise-logo-container group min-w-0 flex-shrink-0">
            <div className="relative flex-shrink-0">
              <img 
                src={genieLogoMain} 
                alt="Genie AI" 
                className="enterprise-logo-image group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Full brand text for extra large screens */}
            <div className="hidden xl:block">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold enterprise-gradient-text whitespace-nowrap">
                  GENIE
                </span>
                <span className="text-base font-semibold text-foreground whitespace-nowrap">AI Hub</span>
              </div>
              <p className="text-xs professional-tagline whitespace-nowrap leading-tight">
                I am your Technology Navigator
              </p>
            </div>
            {/* Compact brand text for large screens */}
            <div className="hidden lg:block xl:hidden">
              <div className="flex items-center space-x-1">
                <span className="text-base font-bold enterprise-gradient-text whitespace-nowrap">
                  GENIE
                </span>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">AI</span>
              </div>
              <p className="text-xs professional-tagline whitespace-nowrap">
                Tech Navigator
              </p>
            </div>
            {/* Mobile - just GENIE */}
            <div className="hidden sm:block lg:hidden">
              <span className="text-sm font-bold enterprise-gradient-text">
                GENIE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center, takes available space */}
          <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2">
            <div className="flex items-center justify-start space-x-1 max-w-full overflow-x-auto px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                
                // Custom labels for responsive display
                const getResponsiveLabel = (label: string) => {
                  switch(label) {
                    case "About Me": return { full: "About Me", short: "About" };
                    case "My Journey": return { full: "My Journey", short: "Journey" };
                    case "Tech Stack Explored": return { full: "Tech Stack Explored", short: "Tech" };
                    case "Business Use Cases": return { full: "Business Use Cases", short: "Business" };
                    case "Case Studies": return { full: "Case Studies", short: "Cases" };
                    default: return { full: label, short: label };
                  }
                };
                
                const responsiveLabel = getResponsiveLabel(item.label);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1 px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 xl:w-5 h-4 xl:h-5 flex-shrink-0" />
                    <span className="hidden xl:inline text-sm">{responsiveLabel.full}</span>
                    <span className="xl:hidden text-xs">{responsiveLabel.short}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions - Right aligned, responsive sizing */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            {/* Search - Hidden on smaller desktop screens */}
            <div className="hidden xl:block relative">
              <SearchBar />
            </div>
            
            {/* Action Buttons - Responsive sizing */}
            <div className="flex items-center space-x-1 xl:space-x-2 pl-3 xl:pl-4 border-l border-border">
              <Button 
                variant="outline"
                size="sm" 
                className="text-xs xl:text-sm font-medium hover:bg-muted/80 whitespace-nowrap h-8 xl:h-10 px-3 xl:px-4"
                onClick={() => window.open('https://www.genieaiexpermentationhub.com', '_blank')}
              >
                <ExternalLink className="w-3 xl:w-4 h-3 xl:h-4 mr-1 xl:mr-2 flex-shrink-0" />
                <span className="hidden xl:inline">Login</span>
                <span className="xl:hidden">Login</span>
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all duration-300 whitespace-nowrap h-8 xl:h-10 px-3 xl:px-4"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                <span className="hidden xl:inline">Connect</span>
                <span className="xl:hidden">Connect</span>
                <ExternalLink className="w-3 xl:w-4 h-3 xl:h-4 ml-1 xl:ml-2 flex-shrink-0" />
              </Button>
            </div>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-6">
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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