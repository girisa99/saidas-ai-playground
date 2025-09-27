import * as React from "react"
import { cn } from "@/lib/utils"

const EnterpriseCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "premium" | "executive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "enterprise-card",
    premium: "enterprise-card border-2 border-primary/20 shadow-lg",
    executive: "enterprise-card border-2 border-accent/30 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5"
  }

  return (
    <div
      ref={ref}
      className={cn(
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
EnterpriseCard.displayName = "EnterpriseCard"

const EnterpriseCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
EnterpriseCardHeader.displayName = "EnterpriseCardHeader"

const EnterpriseCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight enterprise-gradient-text",
      className
    )}
    {...props}
  />
))
EnterpriseCardTitle.displayName = "EnterpriseCardTitle"

const EnterpriseCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
EnterpriseCardContent.displayName = "EnterpriseCardContent"

export { EnterpriseCard, EnterpriseCardHeader, EnterpriseCardTitle, EnterpriseCardContent }