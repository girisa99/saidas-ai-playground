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

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      company: "Metro Health System",
      content: "Saidas' AI implementation roadmap saved us 18 months of trial and error. The ROI was evident within 3 months.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "TechCorp Solutions",
      content: "The practical insights from real healthcare implementations were exactly what we needed for our AI strategy.",
      rating: 5
    },
    {
      name: "Dr. James Park",
      role: "Innovation Director",
      company: "Regional Medical Center",
      content: "Finally, an AI consultant who speaks both technology and healthcare. Results exceeded our expectations.",
      rating: 5
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

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-12">
            What Healthcare Leaders Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border border-primary/20">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </Card>
            ))}
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