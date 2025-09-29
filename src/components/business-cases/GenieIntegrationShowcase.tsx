import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Brain, CheckCircle, Target, Lightbulb, ArrowRight, Zap, Users, Star } from "lucide-react";
import { genieIntegrationPoints, integrationStatus, genieFrameworkIntegration } from "@/data/genieIntegrationUses";

interface GenieIntegrationShowcaseProps {
  selectedUseCase: string;
}

export const GenieIntegrationShowcase = ({ selectedUseCase }: GenieIntegrationShowcaseProps) => {
  const currentIntegration = genieIntegrationPoints[selectedUseCase as keyof typeof genieIntegrationPoints];
  
  if (!currentIntegration) return null;

  const openGeniePopup = () => {
    const event = new CustomEvent('openGeniePopup');
    window.dispatchEvent(event);
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4">
          <MessageCircle className="w-4 h-4 mr-2" />
          Live Feature Integration
        </Badge>
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">
          <span className="text-genie-accent">Genie Conversation</span> in Action
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Demonstrating how our live Genie Conversational AI feature with 80+ knowledge contexts 
          integrates into real healthcare workflows using the proven 3-phase framework.
        </p>
      </div>

      {/* Integration Overview */}
      <Card className="border-genie-accent/20 bg-gradient-to-br from-genie-accent/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-genie-accent/10 rounded-lg">
              <Brain className="w-6 h-6 text-genie-accent" />
            </div>
            {currentIntegration.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            {currentIntegration.description}
          </p>
          
          {/* Integration Points */}
          <div className="space-y-6">
            {currentIntegration.integrationPoints.map((point, index) => {
              const statusInfo = integrationStatus[point.integration.implementation.split(' - ')[0] as keyof typeof integrationStatus];
              const StatusIcon = statusInfo?.icon || CheckCircle;
              
              return (
                <Card key={index} className={`border-l-4 border-genie-primary/30 ${statusInfo?.bgColor || 'bg-gray-100'}/20`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-genie-primary font-bold">#{point.stepId}</span>
                        {point.stepTitle}
                      </CardTitle>
                      <Badge className={`${statusInfo?.bgColor || 'bg-gray-100'} ${statusInfo?.color || 'text-gray-600'} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {point.integration.implementation.split(' - ')[0]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Genie Role:</strong> {point.genieRole}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Tabs defaultValue="capabilities" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                        <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        <TabsTrigger value="status">Status</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="capabilities" className="mt-4">
                        <div className="space-y-2">
                          {point.integration.capabilities.map((capability, capIndex) => (
                            <div key={capIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-genie-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="benefits" className="mt-4">
                        <div className="space-y-2">
                          {point.integration.benefits.map((benefit, benIndex) => (
                            <div key={benIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="status" className="mt-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            <strong>Implementation Status:</strong> {point.integration.implementation}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Context:</strong> {point.integration.context}
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Framework Demonstration */}
      <Card className="border-genie-cyan/20 bg-gradient-to-br from-genie-cyan/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-genie-cyan/10 rounded-lg">
              <Zap className="w-6 h-6 text-genie-cyan" />
            </div>
            {genieFrameworkIntegration.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(genieFrameworkIntegration.phases).map(([phaseKey, phase]) => (
              <Card key={phaseKey} className="border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-genie-primary">{phase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {phase.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-genie-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-genie-accent/30 bg-gradient-to-r from-genie-accent/10 to-genie-primary/10">
        <CardContent className="p-8 text-center">
          <h4 className="text-xl font-bold mb-4">Experience Genie Conversation Live</h4>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Try our live Genie Conversational AI feature with 80+ knowledge contexts. 
            See how the Experiment → Validate → Lead to Deploy framework translates into 
            real, production-ready AI capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={openGeniePopup}
              className="bg-genie-accent hover:bg-genie-accent/90 text-background"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Try Genie Conversation Now
            </Button>
            <Button variant="outline" className="border-genie-primary text-genie-primary hover:bg-genie-primary/10">
              <ArrowRight className="w-4 h-4 mr-2" />
              View All Live Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};