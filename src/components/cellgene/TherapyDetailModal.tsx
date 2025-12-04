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
  Radiation
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
        {/* Header */}
        <div className={`relative p-6 bg-gradient-to-r ${therapy.gradient}`}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {therapy.title}
              </h2>
              <p className="text-white/80 max-w-2xl">
                {therapy.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="h-[calc(90vh-200px)]">
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="differentiators">Differentiators</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Full Description */}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {therapy.fullDescription}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Key Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {therapy.highlights.map((highlight, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* URL */}
                {therapy.url && (
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <a 
                      href={therapy.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Learn more at {new URL(therapy.url).hostname}
                    </a>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  Clinical Applications
                </h3>
                <div className="grid gap-3">
                  {therapy.applications.map((app, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{app}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="differentiators" className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Key Differentiators
                </h3>
                <div className="grid gap-3">
                  {therapy.differentiators.map((diff, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary rounded-r-xl"
                    >
                      <span className="text-foreground font-medium">{diff}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                {/* References */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Link2 className="w-5 h-5 text-primary" />
                    References
                  </h3>
                  <div className="grid gap-2">
                    {therapy.references.map((ref, idx) => (
                      <a
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Link2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {ref.title}
                            </span>
                            <p className="text-xs text-muted-foreground">{ref.source}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <FileText className="w-5 h-5 text-primary" />
                    Attachments & Documents
                  </h3>
                  <div className="grid gap-2">
                    {therapy.attachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <FileText className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {attachment.title}
                            </span>
                            <p className="text-xs text-muted-foreground">{attachment.type}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {attachment.type}
                        </Badge>
                      </a>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
};
