import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveTreatmentCenterMap } from "@/components/public-genie/InteractiveTreatmentCenterMap";
import { MapPin, Building2, Users, Stethoscope } from "lucide-react";

export const TreatmentCenterSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Treatment Centers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Locate specialized Cell & Gene Therapy treatment centers near you. 
            View available therapies, specialists, and contact information.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Distance Search</p>
                <p className="text-sm text-muted-foreground">Find sites near you</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-genie-teal/10">
                <Building2 className="h-5 w-5 text-genie-teal" />
              </div>
              <div>
                <p className="font-medium text-foreground">Treatment Details</p>
                <p className="text-sm text-muted-foreground">Therapies offered</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-genie-accent/10">
                <Stethoscope className="h-5 w-5 text-genie-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Specialists</p>
                <p className="text-sm text-muted-foreground">Expert providers</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Contact Info</p>
                <p className="text-sm text-muted-foreground">Direct connections</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Component */}
        <InteractiveTreatmentCenterMap filterByType="gene_therapy" />
      </div>
    </section>
  );
};
