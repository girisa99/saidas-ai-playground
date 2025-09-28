import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Mobile-optimized wrapper components for consistent UX

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export const MobileContainer = ({ children, className }: MobileContainerProps) => (
  <div className={cn("mobile-safe-padding w-full", className)}>
    {children}
  </div>
);

interface MobileCardProps {
  children: ReactNode;
  className?: string;
}

export const MobileCard = ({ children, className }: MobileCardProps) => (
  <div className={cn("mobile-card", className)}>
    {children}
  </div>
);

interface MobileStackProps {
  children: ReactNode;
  className?: string;
}

export const MobileStack = ({ children, className }: MobileStackProps) => (
  <div className={cn("mobile-button-group", className)}>
    {children}
  </div>
);

interface ResponsiveTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  size: 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'body-lg' | 'body' | 'caption';
  children: ReactNode;
  className?: string;
}

export const ResponsiveText = ({ 
  as: Component = 'p', 
  size, 
  children, 
  className 
}: ResponsiveTextProps) => (
  <Component className={cn(`text-${size}`, className)}>
    {children}
  </Component>
);

// Touch-friendly icon button for mobile
interface TouchIconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-label': string;
}

export const TouchIconButton = ({ 
  icon, 
  onClick, 
  className, 
  'aria-label': ariaLabel 
}: TouchIconButtonProps) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn(
      "touch-target flex items-center justify-center rounded-lg hover:bg-genie-primary/10 transition-colors duration-200",
      className
    )}
  >
    {icon}
  </button>
);