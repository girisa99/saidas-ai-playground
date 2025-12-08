import { useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, TrendingUp, Package, Dna, Globe, DollarSign, Brain, 
  AlertTriangle, CheckCircle2, Building2, Target, Beaker, Sparkles,
  ArrowLeftRight, ChevronRight
} from "lucide-react";
import { 
  therapeuticDifferences, 
  marketTrends, 
  marketChallenges, 
  therapeuticExpansions,
  industryShiftReasons,
  marketSegments
} from "@/data/cellgeneTherapeuticComparison";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Package, Dna, Globe, DollarSign, Brain
};

export const TherapeuticComparisonSection = () => {
  const [activeTab, setActiveTab] = useState("differences");

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
            Explore how these innovative treatments differ in approach, manufacturing, delivery, and outcomes.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="differences">Key Differences</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="expansion">Expansion</TabsTrigger>
            <TabsTrigger value="why-shift">Why Shift</TabsTrigger>
          </TabsList>

          <TabsContent value="differences">
            <Carousel opts={{ align: "start" }} className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {therapeuticDifferences.map((diff, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                          <Badge variant="secondary" className="w-fit mb-2">{diff.aspect}</Badge>
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
                              <Badge variant="outline" className="text-xs">{trend.growth}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{trend.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

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
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <CardTitle className="text-base">{challenge.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            <strong className="text-foreground">Mitigation:</strong> {challenge.mitigation}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

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
                          <div className="flex items-center gap-2">
                            <Dna className="w-5 h-5 text-primary" />
                            <CardTitle className="text-lg">{expansion.modality}</CardTitle>
                          </div>
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
                              <div>
                                <h4 className="font-semibold text-foreground">{reason.reason}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
                                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                                  <ChevronRight className="w-3 h-3" />
                                  {reason.evidence}
                                </p>
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
                            <span className="text-sm text-primary font-bold">{segment.percentage}%</span>
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
