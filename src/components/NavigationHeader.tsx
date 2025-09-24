import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Map, Wrench, FileText, Trophy, Search, ExternalLink, Presentation, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import genieLogo from "@/assets/genie-logo-nav.png";

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
    { to: "/journey", label: "Journey", icon: Map },
    { to: "/technology", label: "Tech Exploration", icon: Wrench },
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
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand - Left aligned, flexible width */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0 flex-shrink-0">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10 p-1 shadow-lg group-hover:shadow-genie-primary/20 transition-all duration-300 border border-genie-primary/20">
                <img 
                  src={genieLogo} 
                  alt="Genie AI Experimentation Hub" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Desktop brand text - hidden on smaller screens to prevent overflow */}
            <div className="hidden lg:block min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-lg xl:text-xl font-bold bg-gradient-to-r from-genie-primary to-genie-secondary bg-clip-text text-transparent whitespace-nowrap">
                  Genie AI
                </span>
                <span className="text-sm xl:text-lg font-semibold text-foreground whitespace-nowrap">Hub</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium whitespace-nowrap leading-tight">
                I am your Technology navigator
              </p>
            </div>
            {/* Medium screens brand text */}
            <div className="hidden md:block lg:hidden">
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold bg-gradient-to-r from-genie-primary to-genie-secondary bg-clip-text text-transparent whitespace-nowrap">
                  Genie AI
                </span>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">Hub</span>
              </div>
            </div>
            {/* Mobile brand text */}
            <div className="md:hidden">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold bg-gradient-to-r from-genie-primary to-genie-secondary bg-clip-text text-transparent whitespace-nowrap">
                  Genie AI
                </span>
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">Hub</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on smaller screens, flexible layout */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 overflow-hidden">
            <div className="flex items-center space-x-1 max-w-fit">
              {navItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.label.split(' ')[0]}</span>
                  </Link>
                );
              })}
              {navItems.slice(4).map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.label.split(' ')[0]}</span>
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
            <div className="flex items-center space-x-1 xl:space-x-2 pl-2 xl:pl-3 border-l border-border">
              <Button 
                variant="outline"
                size="sm" 
                className="text-xs xl:text-sm font-medium hover:bg-muted/80 whitespace-nowrap h-8 xl:h-9 px-2 xl:px-4"
                onClick={() => window.open('https://preview--cgat-patient-hcp-care-ecosystem.lovable.app/', '_blank')}
              >
                <ExternalLink className="w-3 xl:w-4 h-3 xl:h-4 mr-1 xl:mr-2 flex-shrink-0" />
                <span className="hidden xl:inline">Login</span>
                <span className="xl:hidden">Login</span>
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-genie-primary to-genie-secondary hover:from-genie-primary/90 hover:to-genie-secondary/90 text-white font-medium shadow-lg hover:shadow-genie-primary/25 transition-all duration-300 whitespace-nowrap h-8 xl:h-9 px-2 xl:px-4"
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
                <button 
                  onClick={() => scrollToSection('documents')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 w-full text-left"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Documentation</span>
                </button>
              </nav>
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full justify-center font-medium h-12"
                  onClick={() => {
                    window.open('https://preview--cgat-patient-hcp-care-ecosystem.lovable.app/', '_blank');
                    setIsMenuOpen(false);
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                  Login to Platform
                </Button>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-genie-primary to-genie-secondary hover:from-genie-primary/90 hover:to-genie-secondary/90 text-white font-medium shadow-lg h-12"
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