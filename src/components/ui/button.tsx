import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target",
  {
    variants: {
      variant: {
        default: "bg-genie-primary text-white hover:bg-genie-primary/90 shadow-md hover:shadow-lg active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg active:scale-95",
        outline: "border border-genie-primary/30 bg-background text-genie-primary hover:bg-genie-primary/10 shadow-sm hover:shadow-md active:scale-95",
        secondary: "bg-genie-secondary text-white hover:bg-genie-secondary/90 shadow-sm hover:shadow-md active:scale-95",
        ghost: "hover:bg-genie-primary/10 hover:text-genie-primary active:scale-95",
        link: "text-genie-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-genie-primary to-genie-secondary text-white hover:from-genie-primary/90 hover:to-genie-secondary/90 shadow-lg hover:shadow-xl active:scale-95",
        accent: "bg-genie-accent text-white hover:bg-genie-accent/90 shadow-md hover:shadow-lg active:scale-95",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base font-semibold",
        xl: "h-14 px-8 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
