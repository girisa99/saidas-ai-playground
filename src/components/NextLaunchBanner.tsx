import { Clock, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const NextLaunchBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left side - Next launch info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary animate-pulse" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                Next Innovation
              </Badge>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="w-4 h-4" />
                <span>Tentative: Early February 2025</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Healthcare Workflow Optimization • Business-Led Development
              </p>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Expected: 40% efficiency improvement
            </span>
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="text-xs bg-background/50 hover:bg-background border-primary/30 hover:border-primary"
            >
              <Link to="/business-use-cases" className="flex items-center gap-1">
                Preview
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};