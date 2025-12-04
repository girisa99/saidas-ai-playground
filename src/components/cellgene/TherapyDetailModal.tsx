import { motion } from "framer-motion";
import { 
  X, 
  ExternalLink, 
  FileText, 
  Link2, 
  CheckCircle2,
  Sparkles,
  Target,
  Lightbulb,
  Dna,
  HeartPulse,
  Atom,
  Radiation,
  ArrowUpRight,
  BookOpen,
  Layers,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapyType } from "@/data/cellgeneTherapyData";

interface TherapyDetailModalProps {
  therapy: TherapyType;
  onClose: () => void;
}

export const TherapyDetailModal = ({ therapy, onClose }: TherapyDetailModalProps) => {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ElementType> = {
      HeartPulse,
      Dna,
      Atom,
      Target,
      Radiation,
    };
    return icons[iconName] || Dna;
  };

  const Icon = getIcon(therapy.icon);

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-48 md:h-56">
          <img 
            src={therapy.image} 
            alt={therapy.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${therapy.gradient} opacity-70`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 z-10"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
            <div className={`p-3 bg-gradient-to-br ${therapy.gradient} rounded-xl shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {therapy.title}
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-2xl drop-shadow">
                {therapy.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(90vh-224px)]">
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="text-xs md:text-sm">
                  <BookOpen className="w-4 h-4 mr-1.5 hidden sm:block" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="applications" className="text-xs md:text-sm">
                  <Target className="w-4 h-4 mr-1.5 hidden sm:block" />
                  Applications
                </TabsTrigger>
                <TabsTrigger value="differentiators" className="text-xs md:text-sm">
                  <Layers className="w-4 h-4 mr-1.5 hidden sm:block" />
                  Differentiators
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-xs md:text-sm">
                  <FileText className="w-4 h-4 mr-1.5 hidden sm:block" />
                  Resources
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Full Description */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <BookOpen className="w-5 h-5 text-primary" />
                    About {therapy.title}
                  </h3>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-muted-foreground leading-relaxed">
                      {therapy.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Key Highlights - Expandable */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Key Highlights
                  </h3>
                  <p className="text-sm text-muted-foreground">Click on each to learn more.</p>
                  <div className="grid gap-2">
                    {therapy.highlights.map((highlight, idx) => (
                      <div key={idx} className="p-3 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                        <span className="font-medium text-foreground">{highlight.name}</span>
                        <p className="text-xs text-muted-foreground mt-1">{highlight.description}</p>
                        {highlight.keyPoints && (
                          <ul className="mt-2 space-y-1">
                            {highlight.keyPoints.slice(0, 2).map((point, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-primary" />{point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official URL */}
                {therapy.url && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <button onClick={(e) => handleLinkClick(therapy.url, e)} className="flex items-center gap-3 text-primary hover:underline w-full text-left group">
                      <div className="p-2 bg-primary/10 rounded-lg"><ExternalLink className="w-5 h-5" /></div>
                      <div className="flex-1">
                        <span className="font-medium">Official Resource</span>
                        <p className="text-sm text-muted-foreground">{new URL(therapy.url).hostname}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  Clinical Applications for {therapy.title}
                </h3>
                <p className="text-sm text-muted-foreground">Click on each application for detailed information.</p>
                <div className="grid gap-2">
                  {therapy.applications.map((app, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${therapy.gradient}`}><CheckCircle2 className="w-4 h-4 text-white" /></div>
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{app.name}</span>
                          <p className="text-sm text-muted-foreground mt-1">{app.description}</p>
                          {app.keyPoints && (
                            <ul className="mt-2 grid gap-1">
                              {app.keyPoints.map((point, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />{point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="differentiators" className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  What Makes {therapy.title} Unique
                </h3>
                <p className="text-sm text-muted-foreground">Click on each differentiator for details.</p>
                <div className="grid gap-2">
                  {therapy.differentiators.map((diff, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 rounded-r-xl" style={{ borderLeftColor: `hsl(var(--primary))` }}>
                      <div className="flex items-start gap-3">
                        <div className={`p-1.5 rounded-full bg-gradient-to-br ${therapy.gradient}`}><Lightbulb className="w-4 h-4 text-white" /></div>
                        <div className="flex-1">
                          <span className="font-medium text-foreground">{diff.name}</span>
                          <p className="text-sm text-muted-foreground mt-1">{diff.description}</p>
                          {diff.keyPoints && (
                            <ul className="mt-2 grid gap-1">
                              {diff.keyPoints.map((point, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />{point}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Comparison Summary */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Why Choose {therapy.title}?</h4>
                  <p className="text-sm text-muted-foreground">
                    {therapy.title} offers {therapy.differentiators.length} key advantages over traditional approaches. 
                    These differentiators make it particularly effective for various therapeutic applications.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                {/* References */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Link2 className="w-5 h-5 text-primary" />
                    Scientific References
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Peer-reviewed publications and official resources for {therapy.title.toLowerCase()}.
                  </p>
                  <div className="grid gap-2">
                    {therapy.references.map((ref, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={(e) => handleLinkClick(ref.url, e)}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group text-left w-full border border-transparent hover:border-primary/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Link2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
                              {ref.title}
                            </span>
                            <p className="text-xs text-muted-foreground">{ref.source}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <FileText className="w-5 h-5 text-primary" />
                    Documents & Resources
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Guidelines, protocols, and educational materials for {therapy.title.toLowerCase()}.
                  </p>
                  <div className="grid gap-2">
                    {therapy.attachments.map((attachment, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={(e) => handleLinkClick(attachment.url, e)}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group text-left w-full border border-transparent hover:border-accent/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Download className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
                              {attachment.title}
                            </span>
                            <p className="text-xs text-muted-foreground">{attachment.type}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs group-hover:border-primary/50">
                          {attachment.type}
                        </Badge>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Main URL CTA */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
                  <button 
                    onClick={(e) => handleLinkClick(therapy.url, e)}
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${therapy.gradient}`}>
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        Visit Official {therapy.title} Resource
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Access comprehensive information at {new URL(therapy.url).hostname}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
};
