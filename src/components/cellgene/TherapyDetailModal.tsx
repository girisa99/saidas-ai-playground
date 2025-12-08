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
  Download,
  FlaskConical,
  Package,
  Building2,
  Globe,
  Calendar,
  Hash,
  Pill,
  Stethoscope,
  Microscope,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TherapyType } from "@/data/cellgeneTherapyData";
import { clinicalDataByModality, ClinicalTrial, CommercialProduct, Manufacturer, ExperimentationArea } from "@/data/cellgeneClinicalData";
import { useState } from "react";

interface TherapyDetailModalProps {
  therapy: TherapyType;
  onClose: () => void;
}

export const TherapyDetailModal = ({ therapy, onClose }: TherapyDetailModalProps) => {
  const [resourcesSubTab, setResourcesSubTab] = useState("references");
  
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

  // Get clinical data for this modality
  const modalityData = clinicalDataByModality[therapy.id as keyof typeof clinicalDataByModality];

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
        className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
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

                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Key Highlights
                  </h3>
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
                
                <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Why Choose {therapy.title}?</h4>
                  <p className="text-sm text-muted-foreground">
                    {therapy.title} offers {therapy.differentiators.length} key advantages over traditional approaches. 
                    These differentiators make it particularly effective for various therapeutic applications.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                {/* Sub-navigation for Resources */}
                <div className="flex flex-wrap gap-2 mb-4 p-1 bg-muted/50 rounded-lg">
                  {[
                    { id: 'references', label: 'References', icon: Link2 },
                    { id: 'clinical-trials', label: 'Clinical Trials', icon: FlaskConical },
                    { id: 'commercial', label: 'Commercial Products', icon: Package },
                    { id: 'manufacturers', label: 'Manufacturers', icon: Building2 },
                    { id: 'experimentation', label: 'Experimentation Areas', icon: Microscope },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setResourcesSubTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        resourcesSubTab === tab.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* References Sub-Tab */}
                {resourcesSubTab === 'references' && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Link2 className="w-5 h-5 text-primary" />
                      Scientific References
                    </h3>
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

                    <div className="space-y-3 mt-6">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <FileText className="w-5 h-5 text-primary" />
                        Documents & Resources
                      </h3>
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
                  </div>
                )}

                {/* Clinical Trials Sub-Tab */}
                {resourcesSubTab === 'clinical-trials' && modalityData && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <FlaskConical className="w-5 h-5 text-primary" />
                      Clinical Trials for {therapy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Active and completed trials from CROs, sponsors, and research institutions.
                    </p>
                    <div className="grid gap-3">
                      {modalityData.clinicalTrials.map((trial: ClinicalTrial, idx: number) => (
                        <motion.div
                          key={trial.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-foreground text-sm">{trial.title}</h4>
                            <Badge variant={trial.status === 'Completed' ? 'default' : trial.status === 'Recruiting' ? 'secondary' : 'outline'} className="text-xs">
                              {trial.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              <span>{trial.nctNumber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FlaskConical className="w-3 h-3" />
                              <span>{trial.phase}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span>{trial.sponsor}</span>
                            </div>
                            {trial.cro && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>CRO: {trial.cro}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Pill className="w-3 h-3" />
                              <span>{trial.therapyName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Stethoscope className="w-3 h-3" />
                              <span>{trial.disease}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Globe className="w-3 h-3" />
                              <span>{trial.locations.slice(0, 2).join(', ')}{trial.locations.length > 2 ? ` +${trial.locations.length - 2}` : ''}</span>
                            </div>
                            <button
                              onClick={(e) => handleLinkClick(trial.url, e)}
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              View on ClinicalTrials.gov <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Commercial Products Sub-Tab */}
                {resourcesSubTab === 'commercial' && modalityData && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Package className="w-5 h-5 text-primary" />
                      FDA/EMA Approved Products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Commercial products with NDC codes, ICD codes, and manufacturer information.
                    </p>
                    <div className="grid gap-3">
                      {modalityData.commercialProducts.map((product: CommercialProduct, idx: number) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 bg-muted/30 rounded-xl border border-border/50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{product.brandName}</h4>
                              <p className="text-xs text-muted-foreground">{product.genericName}</p>
                            </div>
                            {product.price && (
                              <Badge variant="outline" className="text-xs bg-primary/5">
                                {product.price}
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span>{product.manufacturer}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              <span>NDC: {product.ndcCode}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Approved: {product.approvalDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Stethoscope className="w-3 h-3" />
                              <span>{product.disease}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs text-muted-foreground">ICD Codes:</span>
                            {product.icdCodes.map((code, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {code}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <strong>Indication:</strong> {product.indication}
                          </p>
                          <button
                            onClick={(e) => handleLinkClick(product.url, e)}
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                          >
                            Product Website <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manufacturers Sub-Tab */}
                {resourcesSubTab === 'manufacturers' && modalityData && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Building2 className="w-5 h-5 text-primary" />
                      Key Organizations in {therapy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pharma, biotech, CROs, research institutes, and healthcare organizations specializing in this modality.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {modalityData.manufacturers.map((mfr: Manufacturer, idx: number) => (
                        <motion.div
                          key={mfr.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 bg-muted/30 rounded-xl border border-border/50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-foreground">{mfr.name}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {mfr.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Globe className="w-3 h-3" />
                              <span>{mfr.headquarters}</span>
                            </div>
                            {mfr.clinicalTrials && (
                              <div className="flex items-center gap-1">
                                <FlaskConical className="w-3 h-3" />
                                <span>{mfr.clinicalTrials} clinical trials</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {mfr.specializations.slice(0, 3).map((spec, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          {mfr.products && mfr.products.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              <strong>Products:</strong> {mfr.products.join(', ')}
                            </p>
                          )}
                          <button
                            onClick={(e) => handleLinkClick(mfr.website, e)}
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                          >
                            Visit Website <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experimentation Areas Sub-Tab */}
                {resourcesSubTab === 'experimentation' && modalityData && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Microscope className="w-5 h-5 text-primary" />
                      Emerging Experimentation Areas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cutting-edge research directions and organizations driving innovation in {therapy.title.toLowerCase()}.
                    </p>
                    <div className="grid gap-3">
                      {modalityData.experimentationAreas.map((area: ExperimentationArea, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 rounded-r-xl`}
                          style={{ borderLeftColor: `hsl(var(--primary))` }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-foreground">{area.area}</h4>
                            <Badge variant="outline" className="text-xs">
                              {area.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{area.description}</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-muted-foreground">Key Players:</span>
                            {area.organizations.map((org, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {org}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main URL CTA */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl mt-6">
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
