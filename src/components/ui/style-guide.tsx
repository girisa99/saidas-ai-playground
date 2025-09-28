// Style Guide Component - Ensures consistency across the site
import { Button } from "./button";
import { Badge } from "./badge";
import { Card } from "./card";
import { ResponsiveText } from "./mobile-optimized";
import { 
  Home, User, Map, Wrench, Trophy, Briefcase, 
  ArrowRight, ExternalLink, CheckCircle, 
  AlertCircle, Info, Zap 
} from "lucide-react";

export const StyleGuide = () => {
  return (
    <div className="max-w-6xl mx-auto mobile-safe-padding py-8 space-y-12">
      
      {/* Typography Scale */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Typography Scale
        </ResponsiveText>
        <div className="space-y-4">
          <ResponsiveText as="h1" size="heading-1">Heading 1 - Primary Headlines</ResponsiveText>
          <ResponsiveText as="h2" size="heading-2">Heading 2 - Section Headlines</ResponsiveText>
          <ResponsiveText as="h3" size="heading-3">Heading 3 - Subsection Headlines</ResponsiveText>
          <ResponsiveText as="h4" size="heading-4">Heading 4 - Card Headlines</ResponsiveText>
          <ResponsiveText as="p" size="body-lg">Body Large - Important descriptions and lead text</ResponsiveText>
          <ResponsiveText as="p" size="body">Body - Standard paragraph text for readability</ResponsiveText>
          <ResponsiveText as="span" size="caption">Caption - Small text for labels and metadata</ResponsiveText>
        </div>
      </section>

      {/* Color Palette */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Genie Color Palette
        </ResponsiveText>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-genie-primary rounded-lg"></div>
            <ResponsiveText as="p" size="caption">Genie Primary</ResponsiveText>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-genie-secondary rounded-lg"></div>
            <ResponsiveText as="p" size="caption">Genie Secondary</ResponsiveText>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-genie-teal rounded-lg"></div>
            <ResponsiveText as="p" size="caption">Genie Teal</ResponsiveText>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-genie-accent rounded-lg"></div>
            <ResponsiveText as="p" size="caption">Genie Accent</ResponsiveText>
          </div>
        </div>
      </section>

      {/* Button Variants */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Button Variants
        </ResponsiveText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <ResponsiveText as="h4" size="heading-4">Primary Actions</ResponsiveText>
            <Button variant="default" size="sm">Small Primary</Button>
            <Button variant="default">Default Primary</Button>
            <Button variant="default" size="lg">Large Primary</Button>
          </div>
          <div className="space-y-3">
            <ResponsiveText as="h4" size="heading-4">Secondary Actions</ResponsiveText>
            <Button variant="outline" size="sm">Small Outline</Button>
            <Button variant="outline">Default Outline</Button>
            <Button variant="secondary" size="lg">Large Secondary</Button>
          </div>
          <div className="space-y-3">
            <ResponsiveText as="h4" size="heading-4">Special Variants</ResponsiveText>
            <Button variant="gradient" size="sm">Gradient</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="accent" size="lg">Accent Button</Button>
          </div>
        </div>
      </section>

      {/* Icon Set */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Consistent Icon Set
        </ResponsiveText>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
          {[
            { icon: Home, label: "Home" },
            { icon: User, label: "Profile" },
            { icon: Map, label: "Journey" },
            { icon: Wrench, label: "Tools" },
            { icon: Trophy, label: "Success" },
            { icon: Briefcase, label: "Business" },
            { icon: ArrowRight, label: "Navigate" },
            { icon: ExternalLink, label: "External" },
            { icon: CheckCircle, label: "Success" },
            { icon: AlertCircle, label: "Warning" },
            { icon: Info, label: "Info" },
            { icon: Zap, label: "Energy" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center space-y-2">
              <div className="flex justify-center">
                <Icon className="w-6 h-6 text-genie-primary" />
              </div>
              <ResponsiveText as="span" size="caption">{label}</ResponsiveText>
            </div>
          ))}
        </div>
      </section>

      {/* Badge Variants */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Badge System
        </ResponsiveText>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30">
            Primary Badge
          </Badge>
          <Badge className="bg-genie-secondary/20 text-genie-secondary border-genie-secondary/30">
            Secondary Badge
          </Badge>
          <Badge className="bg-genie-teal/20 text-genie-teal border-genie-teal/30">
            Teal Badge
          </Badge>
          <Badge className="bg-success/20 text-success border-success/30">
            Success Badge
          </Badge>
          <Badge className="bg-warning/20 text-warning border-warning/30">
            Warning Badge
          </Badge>
        </div>
      </section>

      {/* Card Examples */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Card Layouts
        </ResponsiveText>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="mobile-card">
            <ResponsiveText as="h3" size="heading-3" className="mb-2">Standard Card</ResponsiveText>
            <ResponsiveText as="p" size="body">
              Consistent padding and styling across all devices with proper mobile optimization.
            </ResponsiveText>
          </Card>
          <Card className="mobile-card border-genie-primary/20">
            <ResponsiveText as="h3" size="heading-3" className="mb-2 text-genie-primary">
              Branded Card
            </ResponsiveText>
            <ResponsiveText as="p" size="body">
              Using genie brand colors for consistency and visual hierarchy.
            </ResponsiveText>
          </Card>
          <Card className="mobile-card bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5">
            <ResponsiveText as="h3" size="heading-3" className="mb-2">
              Gradient Card
            </ResponsiveText>
            <ResponsiveText as="p" size="body">
              Subtle gradient backgrounds using brand colors for visual interest.
            </ResponsiveText>
          </Card>
        </div>
      </section>

      {/* Mobile Best Practices */}
      <section>
        <ResponsiveText as="h2" size="heading-2" className="mb-6 text-genie-primary">
          Mobile UX Guidelines
        </ResponsiveText>
        <Card className="mobile-card">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <ResponsiveText as="span" size="body">
                <strong>Touch Targets:</strong> Minimum 44px for all interactive elements
              </ResponsiveText>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <ResponsiveText as="span" size="body">
                <strong>Safe Areas:</strong> Respect device safe areas and notches
              </ResponsiveText>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <ResponsiveText as="span" size="body">
                <strong>Typography:</strong> Responsive text scaling from mobile to desktop
              </ResponsiveText>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <ResponsiveText as="span" size="body">
                <strong>Navigation:</strong> Collapsible menus with clear visual hierarchy
              </ResponsiveText>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <ResponsiveText as="span" size="body">
                <strong>Performance:</strong> Optimized images and smooth scrolling
              </ResponsiveText>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};