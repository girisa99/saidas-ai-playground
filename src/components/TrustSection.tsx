import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, CheckCircle, Award, Briefcase, GraduationCap } from "lucide-react";

export const TrustSection = () => {
  const credentials = [
    {
      icon: Briefcase,
      title: "21+ Years Experience",
      description: "Healthcare Technology Leadership",
      highlight: "Fortune 500 Experience"
    },
    {
      icon: Award,
      title: "95% Success Rate",
      description: "AI Project Implementation",
      highlight: "Enterprise Scale"
    },
    {
      icon: Users,
      title: "500K+ Lives Impacted",
      description: "Through Healthcare AI Solutions",
      highlight: "Real Patient Outcomes"
    },
    {
      icon: GraduationCap,
      title: "AI/ML Certified",
      description: "Stanford, MIT, Google Coursework",
      highlight: "Continuous Learning"
    }
  ];


  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Trust Signals */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            21 years of proven expertise in transforming healthcare organizations through strategic AI implementation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((credential, index) => {
              const IconComponent = credential.icon;
              return (
                <Card key={index} className="p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <Badge variant="secondary" className="mb-3">
                    {credential.highlight}
                  </Badge>
                  <h3 className="font-bold text-foreground mb-2">{credential.title}</h3>
                  <p className="text-muted-foreground text-sm">{credential.description}</p>
                </Card>
              );
            })}
          </div>
        </div>


        {/* Security & Compliance */}
        <div className="text-center">
          <Card className="p-8 bg-primary/5 border border-primary/20">
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">Enterprise Security</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Your data privacy and security are paramount. All implementations follow healthcare industry standards.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};