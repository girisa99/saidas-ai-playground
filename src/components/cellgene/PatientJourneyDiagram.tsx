import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Search, Stethoscope, Droplets, Factory, Activity, Pill, Syringe, 
  HeartPulse, Home, Calendar, Dna, ClipboardList, Target, TestTube,
  Radiation, RefreshCw, ArrowRight, Users, Clock, AlertCircle,
  ChevronDown, ChevronUp, Workflow, Truck, Building2, HeartHandshake,
  ExternalLink, Network, Timer
} from "lucide-react";
import { patientJourneyStages, ProcessFlow, JourneyStage } from "@/data/cellgeneTherapeuticComparison";

const iconMap: Record<string, React.ElementType> = {
  Search, Stethoscope, Droplets, Factory, Activity, Pill, Syringe,
  HeartPulse, Home, Calendar, Dna, ClipboardList, Target, TestTube,
  Radiation, RefreshCw
};

const phaseColors = {
  'pre-infusion': 'from-blue-500 to-cyan-500',
  'infusion': 'from-purple-500 to-pink-500',
  'post-infusion': 'from-green-500 to-emerald-500'
};

const phaseBgColors = {
  'pre-infusion': 'bg-blue-500/10 border-blue-500/30',
  'infusion': 'bg-purple-500/10 border-purple-500/30',
  'post-infusion': 'bg-green-500/10 border-green-500/30'
};

interface StageCardProps {
  stage: JourneyStage;
  index: number;
  isLast: boolean;
}

const StageCard = ({ stage, index, isLast }: StageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[stage.icon] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 w-8 z-0">
          <div className={`h-0.5 bg-gradient-to-r ${phaseColors[stage.phase]} opacity-30`} />
          <ArrowRight className={`absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-${stage.phase === 'pre-infusion' ? 'blue' : stage.phase === 'infusion' ? 'purple' : 'green'}-500/50`} />
        </div>
      )}

      <Card 
        className={`w-72 md:w-80 flex-shrink-0 border ${phaseBgColors[stage.phase]} backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer group`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${phaseColors[stage.phase]} flex items-center justify-center shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {stage.duration}
              </Badge>
              {stage.leadTime && (
                <Badge variant="secondary" className="text-xs bg-primary/10">
                  <Timer className="w-3 h-3 mr-1" />
                  {stage.leadTime}
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-3">
            <Badge 
              variant="secondary" 
              className={`text-xs mb-2 ${
                stage.phase === 'pre-infusion' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' :
                stage.phase === 'infusion' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300' :
                'bg-green-500/20 text-green-700 dark:text-green-300'
              }`}
            >
              {stage.phase.replace('-', ' ').toUpperCase()}
            </Badge>
            <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {stage.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Activities Preview */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Activities</h4>
            <ul className="space-y-1">
              {stage.activities.slice(0, isExpanded ? undefined : 3).map((activity, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${phaseColors[stage.phase]}`} />
                  {activity}
                </li>
              ))}
              {!isExpanded && stage.activities.length > 3 && (
                <li className="text-xs text-primary">+{stage.activities.length - 3} more...</li>
              )}
            </ul>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-3 overflow-hidden"
              >
                {/* Stakeholders */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Stakeholders
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {stage.stakeholders.map((stakeholder, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{stakeholder}</Badge>
                    ))}
                  </div>
                </div>

                {/* Critical Factors */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Critical Factors
                  </h4>
                  <ul className="space-y-1">
                    {stage.criticalFactors.map((factor, idx) => (
                      <li key={idx} className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hub Services */}
                {stage.hubServices && stage.hubServices.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                      <HeartHandshake className="w-3 h-3" /> Hub Services
                    </h4>
                    <ul className="space-y-1">
                      {stage.hubServices.map((service, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Distribution Role */}
                {stage.distributionRole && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Distribution
                    </h4>
                    <p className="text-xs text-muted-foreground">{stage.distributionRole}</p>
                  </div>
                )}

                {/* Ecosystem Connections */}
                {stage.ecosystemConnections && stage.ecosystemConnections.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Network className="w-3 h-3" /> Ecosystem
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {stage.ecosystemConnections.map((conn, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{conn}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs h-7"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          >
            {isExpanded ? (
              <>Less Details <ChevronUp className="w-3 h-3 ml-1" /></>
            ) : (
              <>More Details <ChevronDown className="w-3 h-3 ml-1" /></>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ProcessFlowDiagramProps {
  flow: ProcessFlow;
}

const ProcessFlowDiagram = ({ flow }: ProcessFlowDiagramProps) => {
  const preInfusionStages = flow.stages.filter(s => s.phase === 'pre-infusion');
  const infusionStages = flow.stages.filter(s => s.phase === 'infusion');
  const postInfusionStages = flow.stages.filter(s => s.phase === 'post-infusion');

  return (
    <div className="space-y-8">
      {/* Order Model & Lead Time Summary */}
      <Card className="border-primary/30 bg-primary/5 max-w-4xl mx-auto">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">{flow.orderModel.type}</Badge>
              <p className="text-sm font-medium text-foreground">Order Model</p>
              <p className="text-xs text-muted-foreground mt-1">{flow.orderModel.description}</p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-2">
                <Clock className="w-3 h-3 mr-1" />
                {flow.totalLeadTime}
              </Badge>
              <p className="text-sm font-medium text-foreground">Total Lead Time</p>
              <p className="text-xs text-muted-foreground mt-1">From referral to treatment completion</p>
            </div>
            <div className="text-center">
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {flow.orderModel.characteristics.slice(0, 2).map((char, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{char}</Badge>
                ))}
              </div>
              <p className="text-sm font-medium text-foreground">Key Characteristics</p>
              {flow.orderModel.characteristics.length > 2 && (
                <p className="text-xs text-muted-foreground mt-1">+{flow.orderModel.characteristics.length - 2} more</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-cyan-500" />
          <span className="text-sm text-muted-foreground">Pre-Infusion ({preInfusionStages.length} stages)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-pink-500" />
          <span className="text-sm text-muted-foreground">Infusion ({infusionStages.length} stages)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-emerald-500" />
          <span className="text-sm text-muted-foreground">Post-Infusion ({postInfusionStages.length} stages)</span>
        </div>
      </div>

      {/* Timeline Diagram */}
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-w-max px-4">
          {flow.stages.map((stage, index) => (
            <StageCard 
              key={stage.id} 
              stage={stage} 
              index={index}
              isLast={index === flow.stages.length - 1}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/80">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-primary">{flow.stages.length}</p>
            <p className="text-xs text-muted-foreground">Total Stages</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-blue-500/10">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{preInfusionStages.length}</p>
            <p className="text-xs text-muted-foreground">Pre-Infusion</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-purple-500/10">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-purple-500">{infusionStages.length}</p>
            <p className="text-xs text-muted-foreground">Infusion</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-green-500/10">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-green-500">{postInfusionStages.length}</p>
            <p className="text-xs text-muted-foreground">Post-Infusion</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const PatientJourneyDiagram = () => {
  const [activeModality, setActiveModality] = useState(patientJourneyStages[0].modality);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <Workflow className="w-3 h-3 mr-1" />
            Patient Journey & Process Flows
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Treatment Journey
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore the detailed patient journey for each CGAT modality—from initial identification through 
            long-term follow-up. Each stage includes lead times, hub services integration, and ecosystem connections.
          </p>
        </motion.div>

        <Tabs value={activeModality} onValueChange={setActiveModality} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            {patientJourneyStages.map((flow) => (
              <TabsTrigger key={flow.modality} value={flow.modality} className="text-xs md:text-sm">
                {flow.modality.replace(" Therapy", "").replace(" Cell", "")}
              </TabsTrigger>
            ))}
          </TabsList>

          {patientJourneyStages.map((flow) => (
            <TabsContent key={flow.modality} value={flow.modality}>
              <ProcessFlowDiagram flow={flow} />
            </TabsContent>
          ))}
        </Tabs>

        {/* Phase-Specific Considerations with Ecosystem Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-xl font-semibold text-foreground text-center mb-6">
            Phase-Specific Considerations & Ecosystem Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pre-Infusion */}
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-white" />
                  </div>
                  Pre-Infusion Phase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Activities</h4>
                  <ul className="space-y-1">
                    {[
                      "Patient identification & eligibility screening",
                      "Insurance pre-authorization & benefits verification",
                      "Cell collection (leukapheresis) coordination",
                      "Manufacturing slot scheduling",
                      "Bridging therapy management",
                      "Lymphodepletion conditioning"
                    ].map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-blue-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <HeartHandshake className="w-3 h-3 inline mr-1" />
                    Hub Services Role
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Benefits Verification</Badge>
                    <Badge variant="outline" className="text-xs">Prior Auth</Badge>
                    <Badge variant="outline" className="text-xs">Financial Assistance</Badge>
                    <Badge variant="outline" className="text-xs">Slot Coordination</Badge>
                  </div>
                </div>
                <div className="pt-2 border-t border-blue-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <Truck className="w-3 h-3 inline mr-1" />
                    3PL/Distribution
                  </h4>
                  <p className="text-xs text-muted-foreground">Apheresis product pickup → cryogenic transport → manufacturing facility delivery</p>
                </div>
              </CardContent>
            </Card>

            {/* Infusion */}
            <Card className="border-purple-500/30 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Syringe className="w-4 h-4 text-white" />
                  </div>
                  Infusion Phase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Activities</h4>
                  <ul className="space-y-1">
                    {[
                      "Product receipt & chain of custody verification",
                      "Final patient assessment",
                      "Pre-medication administration",
                      "Cell/gene therapy infusion",
                      "Real-time vital monitoring",
                      "REMS documentation completion"
                    ].map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <HeartHandshake className="w-3 h-3 inline mr-1" />
                    Hub Services Role
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Product Delivery Tracking</Badge>
                    <Badge variant="outline" className="text-xs">REMS Compliance</Badge>
                    <Badge variant="outline" className="text-xs">Infusion Confirmation</Badge>
                  </div>
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <Truck className="w-3 h-3 inline mr-1" />
                    3PL/Distribution
                  </h4>
                  <p className="text-xs text-muted-foreground">Just-in-time cryogenic delivery → bedside thaw → lot number verification</p>
                </div>
              </CardContent>
            </Card>

            {/* Post-Infusion */}
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-white" />
                  </div>
                  Post-Infusion Phase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Activities</h4>
                  <ul className="space-y-1">
                    {[
                      "Acute toxicity monitoring (CRS, ICANS)",
                      "Tocilizumab/steroid intervention if needed",
                      "Recovery & stabilization",
                      "Response assessment",
                      "Discharge planning",
                      "Long-term follow-up (15 years)"
                    ].map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-green-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <HeartHandshake className="w-3 h-3 inline mr-1" />
                    Hub Services Role
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Adverse Event Tracking</Badge>
                    <Badge variant="outline" className="text-xs">IVIG Coordination</Badge>
                    <Badge variant="outline" className="text-xs">Registry Compliance</Badge>
                    <Badge variant="outline" className="text-xs">Long-term Follow-up</Badge>
                  </div>
                </div>
                <div className="pt-2 border-t border-green-500/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    <Building2 className="w-3 h-3 inline mr-1" />
                    Specialty Pharmacy
                  </h4>
                  <p className="text-xs text-muted-foreground">Tocilizumab access → IVIG replacement → supportive care medications</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
