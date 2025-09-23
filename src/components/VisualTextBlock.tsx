import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface VisualTextBlockProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  icon?: ReactNode;
  variant?: "default" | "gradient" | "accent";
  size?: "sm" | "md" | "lg";
}

export const VisualTextBlock = ({ 
  badge,
  title, 
  subtitle,
  description, 
  highlights = [],
  icon,
  variant = "default",
  size = "md"
}: VisualTextBlockProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5 border-genie-primary/20";
      case "accent":
        return "bg-accent/5 border-accent/20";
      default:
        return "bg-card border-border";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-4 space-y-3";
      case "lg":
        return "p-8 space-y-6";
      default:
        return "p-6 space-y-4";
    }
  };

  const getTitleClasses = () => {
    switch (size) {
      case "sm":
        return "text-lg font-semibold";
      case "lg":
        return "text-3xl font-bold";
      default:
        return "text-xl font-bold";
    }
  };

  return (
    <Card className={`${getVariantClasses()} ${getSizeClasses()} hover:shadow-lg transition-all duration-300`}>
      {badge && (
        <Badge variant="secondary" className="w-fit text-xs font-medium bg-genie-primary/10 text-genie-primary border-genie-primary/20">
          {badge}
        </Badge>
      )}
      
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10 flex items-center justify-center text-genie-primary">
              {icon}
            </div>
          </div>
        )}
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className={`${getTitleClasses()} text-foreground leading-tight`}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-base text-genie-primary font-medium mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          {highlights.length > 0 && (
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-genie-primary"></div>
                  <span className="text-sm text-foreground font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};