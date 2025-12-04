import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dna, HeartPulse, Atom, Target, Radiation, FileText, Link2, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { TherapyDetailModal } from "./TherapyDetailModal";
import { therapyData, TherapyType } from "@/data/cellgeneTherapyData";

export const TherapyCarousel = () => {
  const [selectedTherapy, setSelectedTherapy] = useState<TherapyType | null>(null);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ElementType> = { HeartPulse, Dna, Atom, Target, Radiation };
    return icons[iconName] || Dna;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4"><Sparkles className="w-3 h-3 mr-1" />Advanced Therapeutics</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Therapeutic Modalities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore cutting-edge cell and gene therapies powered by AI-driven insights</p>
        </motion.div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {therapyData.map((therapy, index) => {
              const Icon = getIcon(therapy.icon);
              return (
                <CarouselItem key={therapy.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group cursor-pointer overflow-hidden" onClick={() => setSelectedTherapy(therapy)}>
                      <div className="relative h-40 overflow-hidden">
                        <img src={therapy.image} alt={therapy.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${therapy.gradient} opacity-40`} />
                        <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg bg-gradient-to-br ${therapy.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <CardHeader className="pb-2 pt-4">
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{therapy.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{therapy.shortDescription}</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Highlights</h4>
                          <div className="flex flex-wrap gap-1">
                            {therapy.highlights.slice(0, 3).map((highlight, idx) => (<Badge key={idx} variant="secondary" className="text-xs">{highlight.name}</Badge>))}
                            {therapy.highlights.length > 3 && <Badge variant="outline" className="text-xs">+{therapy.highlights.length - 3} more</Badge>}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applications</h4>
                          <ul className="space-y-1">
                            {therapy.applications.slice(0, 2).map((app, idx) => (<li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" /><span className="line-clamp-1">{app.name}</span></li>))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Link2 className="w-3 h-3" />{therapy.references.length}</span>
                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{therapy.attachments.length}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs h-7 px-2 group-hover:text-primary">Learn More<ChevronRight className="w-3 h-3 ml-1" /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
        <p className="text-center text-sm text-muted-foreground mt-6 md:hidden">Swipe to explore more therapies →</p>
      </div>
      <AnimatePresence>{selectedTherapy && <TherapyDetailModal therapy={selectedTherapy} onClose={() => setSelectedTherapy(null)} />}</AnimatePresence>
    </section>
  );
};
