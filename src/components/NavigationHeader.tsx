import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Map, Wrench, FileText, Trophy, Search, ExternalLink, Presentation, Briefcase } from "lucide-react";
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
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">{/* Mobile-optimized height */}
          {/* Logo & Brand - Left aligned, flexible width */}
          <Link to="/" className="enterprise-logo-container group min-w-fit flex-shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10">
            <div className="relative flex-shrink-0">
              <LazyImage 
                src={genieLogoMain} 
                alt="Genie AI" 
                className="enterprise-logo-image group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Full brand text for extra large screens */}
            <div className="hidden xl:block">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold enterprise-gradient-text whitespace-nowrap">
                  GENIE AI HUB
                </span>
              </div>
              <p className="text-xs professional-tagline whitespace-nowrap leading-tight">
                I am your Technology Navigator
              </p>
            </div>
            {/* Compact brand text for large screens */}
            <div className="hidden lg:block xl:hidden">
              <div className="flex items-center space-x-1">
                <span className="text-base font-bold enterprise-gradient-text whitespace-nowrap">
                  GENIE AI HUB
                </span>
              </div>
              <p className="text-xs professional-tagline whitespace-nowrap">
                I am your Technology Navigator
              </p>
            </div>
            {/* Mobile - GENIE AI HUB with tagline */}
            <div className="hidden sm:block lg:hidden">
              <span className="text-sm font-bold enterprise-gradient-text whitespace-nowrap">
                GENIE AI HUB
              </span>
              <p className="text-xs professional-tagline whitespace-nowrap">
                I am your Technology Navigator
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Center, takes available space */}
          <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-1">
            <div className="flex items-center justify-center gap-0.5 flex-nowrap">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                
                // Custom labels for responsive display
                const getResponsiveLabel = (label: string) => {
                  switch(label) {
                    case "About Sai Dasika": return { full: "About Sai", short: "About" };
                    case "AI Development Journey": return { full: "AI Journey", short: "Journey" };
                    case "3-Phase Tech Framework": return { full: "Tech Framework", short: "Tech" };
                    case "Gartner Business Solutions": return { full: "Business Solutions", short: "Business" };
                    case "Validated Case Studies": return { full: "Case Studies", short: "Studies" };
                    default: return { full: label, short: label };
                  }
                };
                
                const responsiveLabel = getResponsiveLabel(item.label);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1 px-1.5 lg:px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden xl:inline text-xs">{responsiveLabel.full}</span>
                    <span className="xl:hidden text-[11px]">{responsiveLabel.short}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions - Right aligned, responsive sizing */}
          <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {/* Search - Compact size */}
            <div className="relative">
              <SearchBar compact />
            </div>
            
            {/* Action Buttons - Responsive sizing */}
            <div className="flex items-center space-x-1 pl-1.5 border-l border-border min-w-0">
              <Button 
                variant="outline"
                size="sm" 
                className="text-xs font-medium hover:bg-muted/80 whitespace-nowrap h-7 px-2"
                onClick={() => window.open('https://www.genieaiexpermentationhub.com', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>Login</span>
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