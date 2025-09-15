import { Card } from "@/components/ui/card";
import { CheckCircle, Users, TrendingUp, Shield } from "lucide-react";

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Digital Health Innovation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven frameworks for implementing AI in healthcare, digital therapeutics, 
            and enterprise health platforms with measurable outcomes.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Healthcare AI Strategy</h3>
                <p className="text-muted-foreground mb-4">
                  Digital health transformation strategies focused on patient outcomes, 
                  therapeutic innovation, and sustainable healthcare technology adoption.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Digital therapeutics development
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Healthcare AI integration
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Patient outcome optimization
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Governance & Security</h3>
                <p className="text-muted-foreground mb-4">
                  Enterprise-grade security protocols, compliance frameworks, and 
                  governance structures for responsible AI deployment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Regulatory compliance frameworks
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Data privacy and security protocols
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Risk management strategies
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="bg-secondary/50 rounded-lg p-8 text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Trusted Healthcare Innovation</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proven methodologies helping healthcare organizations implement AI solutions 
            that improve patient outcomes and drive sustainable digital transformation.
          </p>
        </div>
      </div>
    </section>
  );
};