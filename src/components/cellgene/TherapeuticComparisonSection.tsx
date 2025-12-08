import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  ArrowRight, TrendingUp, Package, Dna, Globe, DollarSign, Brain, 
  AlertTriangle, CheckCircle2, Building2, Target, Beaker, Sparkles,
  ArrowLeftRight, ChevronRight, ExternalLink, Truck, Users, Clock,
  Building, Network, Package2, Warehouse, FileCheck, HeartHandshake,
  Pill, TestTube
} from "lucide-react";
import { 
  therapeuticDifferences, 
  marketTrends, 
  marketChallenges, 
  therapeuticExpansions,
  industryShiftReasons,
  marketSegments,
  hubServiceProviders,
  distributionModels,
  ecosystemComponents
} from "@/data/cellgeneTherapeuticComparison";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Package, Dna, Globe, DollarSign, Brain, Building2
};

export const TherapeuticComparisonSection = () => {
  const [activeTab, setActiveTab] = useState("differences");
  const [activeSubTab, setActiveSubTab] = useState("hub");

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <ArrowLeftRight className="w-3 h-3 mr-1" />
            CGAT vs Traditional Therapeutics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understanding the Paradigm Shift
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Cell and Gene Advanced Therapies represent a fundamental shift from traditional pharmaceuticals. 
            Explore the ecosystem, supply chain, and operational differences that define CGAT.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex w-max min-w-full max-w-none mx-auto mb-8 p-1">
              <TabsTrigger value="differences" className="text-xs md:text-sm whitespace-nowrap">Key Differences</TabsTrigger>
              <TabsTrigger value="ecosystem" className="text-xs md:text-sm whitespace-nowrap">Ecosystem & Hub Services</TabsTrigger>
              <TabsTrigger value="trends" className="text-xs md:text-sm whitespace-nowrap">Market Trends</TabsTrigger>
              <TabsTrigger value="challenges" className="text-xs md:text-sm whitespace-nowrap">Challenges</TabsTrigger>
              <TabsTrigger value="expansion" className="text-xs md:text-sm whitespace-nowrap">Expansion</TabsTrigger>
              <TabsTrigger value="why-shift" className="text-xs md:text-sm whitespace-nowrap">Why Shift</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Key Differences Tab */}
          <TabsContent value="differences">
            <Carousel opts={{ align: "start" }} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {therapeuticDifferences.map((diff, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="w-fit">{diff.aspect}</Badge>
                            {diff.reference && (
                              <a href={diff.reference} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Traditional</p>
                                <p className="text-sm text-foreground">{diff.traditional}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">CGAT</p>
                                <p className="text-sm text-foreground font-medium">{diff.cgat}</p>
                              </div>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-border/50">
                            <p className="text-xs text-primary flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" />
                              {diff.impact}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </TabsContent>

          {/* NEW: Ecosystem & Hub Services Tab */}
          <TabsContent value="ecosystem">
            <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-6">
                <TabsTrigger value="hub" className="text-xs">Hub Services</TabsTrigger>
                <TabsTrigger value="distribution" className="text-xs">Distribution Models</TabsTrigger>
                <TabsTrigger value="providers" className="text-xs">Ecosystem Partners</TabsTrigger>
              </TabsList>

              {/* Hub Services Sub-Tab */}
              <TabsContent value="hub">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {hubServiceProviders.map((hub, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50 bg-card/80 hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                {hub.name.includes("Hub") ? <HeartHandshake className="w-5 h-5 text-primary" /> :
                                 hub.name.includes("3PL") ? <Truck className="w-5 h-5 text-primary" /> :
                                 hub.name.includes("Specialty") ? <Pill className="w-5 h-5 text-primary" /> :
                                 hub.name.includes("Treatment") ? <Building2 className="w-5 h-5 text-primary" /> :
                                 <TestTube className="w-5 h-5 text-primary" />}
                              </div>
                              <CardTitle className="text-sm">{hub.name}</CardTitle>
                            </div>
                            {hub.website && (
                              <a href={hub.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-xs text-muted-foreground">{hub.role}</p>
                          
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</h4>
                            <ul className="space-y-1">
                              {hub.services.slice(0, 4).map((service, idx) => (
                                <li key={idx} className="text-xs text-foreground flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {service}
                                </li>
                              ))}
                              {hub.services.length > 4 && (
                                <li className="text-xs text-primary">+{hub.services.length - 4} more</li>
                              )}
                            </ul>
                          </div>

                          {hub.improvements && (
                            <div className="pt-2 border-t border-border/50">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                <Sparkles className="w-3 h-3 inline mr-1" />
                                Innovations
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {hub.improvements.slice(0, 3).map((improvement, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{improvement}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {hub.modalities.map((modality, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{modality.replace(" Therapy", "")}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Distribution Models Sub-Tab */}
              <TabsContent value="distribution">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {distributionModels.map((model, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`h-full border-border/50 ${
                        model.type.includes("1:1") ? "bg-purple-500/5 border-purple-500/30" :
                        model.type.includes("SelectMany") ? "bg-blue-500/5 border-blue-500/30" :
                        "bg-green-500/5 border-green-500/30"
                      }`}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              model.type.includes("1:1") ? "bg-purple-500/20" :
                              model.type.includes("SelectMany") ? "bg-blue-500/20" :
                              "bg-green-500/20"
                            }`}>
                              {model.type.includes("1:1") ? <Users className="w-6 h-6 text-purple-500" /> :
                               model.type.includes("SelectMany") ? <Network className="w-6 h-6 text-blue-500" /> :
                               <Package2 className="w-6 h-6 text-green-500" />}
                            </div>
                            <div>
                              <CardTitle className="text-base">{model.type}</CardTitle>
                              <p className="text-xs text-muted-foreground">{model.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Characteristics</h4>
                            <ul className="space-y-1">
                              {model.characteristics.map((char, idx) => (
                                <li key={idx} className="text-xs text-foreground flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  {char}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Lead Times
                            </h4>
                            <div className="space-y-1">
                              {Object.entries(model.leadTimes).map(([key, value], idx) => (
                                <div key={idx} className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span className="font-medium text-foreground">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              <Truck className="w-3 h-3 inline mr-1" />
                              Providers
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {model.providers.map((provider, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{provider}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modalities</h4>
                            <div className="flex flex-wrap gap-1">
                              {model.modalities.map((modality, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{modality}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Ecosystem Partners Sub-Tab */}
              <TabsContent value="providers">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                  {ecosystemComponents.map((component, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50 bg-card/80">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-primary" />
                            <CardTitle className="text-base">{component.category}</CardTitle>
                          </div>
                          <p className="text-xs text-muted-foreground">{component.role}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Providers</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {component.providers.slice(0, 4).map((provider, idx) => (
                                <a 
                                  key={idx} 
                                  href={provider.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline flex items-center gap-1"
                                >
                                  {provider.name}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</h4>
                            <div className="flex flex-wrap gap-1">
                              {component.services.map((service, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{service}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Journey Integration Points</h4>
                            <div className="flex flex-wrap gap-1">
                              {component.journeyIntegration.map((point, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{point}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {marketTrends.map((trend, index) => {
                const Icon = iconMap[trend.icon] || TrendingUp;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all group">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{trend.title}</h3>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">{trend.growth}</Badge>
                                {trend.reference && (
                                  <a href={trend.reference} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                            {trend.details && (
                              <ul className="space-y-1">
                                {trend.details.map((detail, idx) => (
                                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {marketChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-border/50 bg-card/80">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <CardTitle className="text-base">{challenge.title}</CardTitle>
                        </div>
                        {challenge.reference && (
                          <a href={challenge.reference} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      
                      {challenge.impact && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          <strong>Impact:</strong> {challenge.impact}
                        </p>
                      )}
                      
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">Mitigation:</strong> {challenge.mitigation}
                          </span>
                        </p>
                      </div>

                      {challenge.stakeholders && (
                        <div className="flex flex-wrap gap-1">
                          {challenge.stakeholders.map((stakeholder, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{stakeholder}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Expansion Tab */}
          <TabsContent value="expansion">
            <Carousel opts={{ align: "start" }} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {therapeuticExpansions.map((expansion, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50 bg-card/80">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Dna className="w-5 h-5 text-primary" />
                              <CardTitle className="text-lg">{expansion.modality}</CardTitle>
                            </div>
                            {expansion.orderModel && (
                              <Badge variant="secondary" className="text-xs">
                                {expansion.orderModel.type}
                              </Badge>
                            )}
                          </div>
                          {expansion.orderModel && (
                            <p className="text-xs text-muted-foreground mt-2">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Lead Time: {expansion.orderModel.leadTime}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Current Therapeutic Areas</h4>
                            <div className="flex flex-wrap gap-1">
                              {expansion.currentAreas.map((area, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{area}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Emerging Areas</h4>
                            <div className="flex flex-wrap gap-1">
                              {expansion.emergingAreas.map((area, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs border-primary/30 text-primary">{area}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Research Focus</h4>
                            <div className="flex flex-wrap gap-1">
                              {expansion.researchFocus.map((focus, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{focus}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-border/50">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              <Building2 className="w-3 h-3 inline mr-1" />
                              Major Manufacturers
                            </h4>
                            <p className="text-sm text-foreground">{expansion.majorManufacturers.join(" • ")}</p>
                          </div>
                          {expansion.references && expansion.references.length > 0 && (
                            <div className="pt-2 border-t border-border/50">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">References</h4>
                              <div className="flex flex-wrap gap-2">
                                {expansion.references.map((ref, idx) => (
                                  <a 
                                    key={idx}
                                    href={ref.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline flex items-center gap-1"
                                  >
                                    {ref.name}
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </TabsContent>

          {/* Why Shift Tab */}
          <TabsContent value="why-shift">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Why Industry is Shifting to CGAT
                  </h3>
                  <div className="space-y-3">
                    {industryShiftReasons.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-border/50 bg-card/80">
                          <CardContent className="py-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-sm">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-foreground">{reason.reason}</h4>
                                  {reason.reference && (
                                    <a href={reason.reference} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
                                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                                  <ChevronRight className="w-3 h-3" />
                                  {reason.evidence}
                                </p>
                                {reason.details && (
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {reason.details.map((detail, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">{detail}</Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Market Segment Distribution
                  </h3>
                  <Card className="border-border/50 bg-card/80">
                    <CardContent className="pt-6 space-y-4">
                      {marketSegments.map((segment, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-foreground">{segment.segment}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-primary font-bold">{segment.percentage}%</span>
                              {segment.reference && (
                                <a href={segment.reference} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${segment.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{segment.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {segment.keyPlayers.map((player, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{player}</Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
