import { SmartGammaDetector } from "./SmartGammaDetector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, TrendingUp, Shield, Lightbulb, Target } from "lucide-react";

const AIInnovationVisualHub = () => {
  const innovationData = {
    businessUsers: [
      "Self-service AI creation",
      "Faster time-to-market", 
      "Reduced IT dependency",
      "Direct AI insights",
      "Quick prototyping",
      "Cost savings automation"
    ],
    itUsers: [
      "AI-assisted coding",
      "Reduced technical debt",
      "Standardized frameworks", 
      "Improved reliability",
      "Enhanced security",
      "Scalable infrastructure"
    ],
    businessDrivers: [
      "Operational Efficiency",
      "Enhanced Decision-Making",
      "New Revenue Streams", 
      "Superior Customer Experience"
    ],
    marketOpportunity: [
      "Accelerated Innovation",
      "Data-Driven Advantage",
      "Talent Attraction",
      "Industry Leadership"
    ]
  };

  const visualSections = [
    {
      title: "AI Value by User Type",
      description: "Visual comparison of business vs IT user benefits",
      contentType: "infographic" as const,
      data: innovationData,
      icon: Users,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "AI Innovation Journey", 
      description: "Step-by-step transformation pathway from traditional to AI-powered operations",
      contentType: "journey" as const,
      data: innovationData,
      icon: TrendingUp,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "AI Implementation Workflow",
      description: "Process flow from experimentation to enterprise deployment",
      contentType: "workflow" as const,
      data: innovationData,
      icon: Zap,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Business Impact Timeline",
      description: "ROI progression and milestone achievements over time",
      contentType: "timeline" as const,
      data: innovationData,
      icon: Target,
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-genie-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-genie-primary/30 text-genie-primary">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Innovation Made Accessible
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Visual AI Transformation Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform complex AI concepts into compelling visual narratives. Generate professional presentations 
            with workflows, journeys, and infographics that make AI innovation accessible to every stakeholder.
          </p>
        </div>

        {/* Visual Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {visualSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-genie-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {section.contentType}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-genie-primary transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartGammaDetector
                    content={`AI innovation hub ${section.contentType} showcasing ${section.description}`}
                    title={section.title}
                    data={section.data}
                    forceType={section.contentType}
                    autoGenerate={index === 0} // Auto-generate first one
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access Features */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8 border border-genie-primary/10">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Visual Content Features
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-foreground mb-2">User-Centric Design</h4>
              <p className="text-sm text-muted-foreground">
                Tailored visuals for business users and IT teams
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Enterprise Ready</h4>
              <p className="text-sm text-muted-foreground">
                Professional presentations for stakeholder alignment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Instant Generation</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered visual content in seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIInnovationVisualHub;