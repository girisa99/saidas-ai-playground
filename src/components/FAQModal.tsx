import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Lightbulb,
  Brain,
  Target,
  MessageSquare,
  ExternalLink,
  Map,
  Wrench,
  Briefcase,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FAQModalProps {
  trigger: React.ReactNode;
}

export const FAQModal = ({ trigger }: FAQModalProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: "Genie AI Capabilities & Overview",
      icon: Brain,
      color: "text-genie-primary",
      bgColor: "bg-genie-primary/10",
      borderColor: "border-genie-primary/20",
      questions: [
        {
          question: "What is Genie AI and how can it help me?",
          answer: "Genie AI is your intelligent assistant specializing in Technology and Healthcare concepts. I can support discussions on AI innovation, Gartner Value Framework, tech stack mapping, experimentation hub methodologies, and healthcare business use cases. I'm designed to guide users through complex topics with personalized insights and practical recommendations."
        },
        {
          question: "What topics can Genie AI discuss?",
          answer: "I specialize in: • AI Innovation & Value Creation • Gartner Value Framework mapping • Technology stack architecture • Healthcare business use cases • Digital therapeutics (DTx) • Cell & gene therapies • Experimentation methodologies • Security and compliance topics • Journey mapping and case studies"
        },
        {
          question: "How does Genie AI adapt to different contexts?",
          answer: "I intelligently detect whether you're asking about technology or healthcare topics and adapt my responses accordingly. I can switch between formal, casual, or empathetic communication styles based on your needs and provide contextual suggestions to guide our conversation."
        }
      ]
    },
    {
      category: "Gartner Value Framework & AI Innovation",
      icon: Target,
      color: "text-genie-teal",
      bgColor: "bg-genie-teal/10",
      borderColor: "border-genie-teal/20",
      questions: [
        {
          question: "How does Genie AI map Gartner's Value Framework to tech stacks?",
          answer: "I help you understand how Gartner's AI Value Framework translates into practical technology implementations. This includes mapping value creation to data layers, MLOps platforms, application architectures, and infrastructure components. I can guide you through short-term, medium-term, and long-term value realization strategies with specific KPIs and outcomes."
        },
        {
          question: "What are the key value realization phases in AI implementation?",
          answer: "Short-term (3-6 months): Quick wins and proof of concepts with immediate ROI. Medium-term (6-18 months): Scaled implementations with measurable business impact. Long-term (18+ months): Strategic transformation and competitive advantage through AI-driven innovation."
        },
        {
          question: "How do you measure AI value creation and ROI?",
          answer: "Key metrics include: • Efficiency gains (time saved, process automation) • Cost reductions (operational savings, resource optimization) • Quality improvements (accuracy, error reduction) • Revenue generation (new capabilities, enhanced products) • Strategic advantages (market differentiation, innovation speed)"
        }
      ]
    },
    {
      category: "My AI Journey - 5 Phase Transformation",
      icon: Map,
      color: "text-genie-secondary",
      bgColor: "bg-genie-secondary/10",
      borderColor: "border-genie-secondary/20",
      questions: [
        {
          question: "What are the 5 phases of your AI experimentation journey?",
          answer: "Phase 1: The Spark - Initial curiosity and AI exploration. Phase 2: Curiosity Ignited - Deep dive into AI fundamentals and tool testing. Phase 3: The Breakthrough - First successful implementations and real-world applications. Phase 4: Scalable Innovation - Building robust, production-ready solutions. Phase 5: The Resilient Hub - Establishing sustainable AI practices and knowledge sharing."
        },
        {
          question: "How long does each phase of the AI journey take?",
          answer: "Discovery & Learning (Months 1-3): Technology exploration, use case identification, skill development. Experimentation & Validation (Months 4-9): Hypothesis testing, pilot implementation, user feedback. Scale & Integration (Months 10-18): Production deployment, system integration, team scaling. Each phase builds upon the previous one with overlapping activities."
        },
        {
          question: "What should I expect in my own AI transformation journey?",
          answer: "Expect excitement, challenges, and continuous learning. Start with curiosity and small experiments. Document everything - successes AND failures. Focus on solving real problems rather than using AI for its own sake. Build gradually from simple tools to complex systems. Most importantly, share your learnings with the community."
        },
        {
          question: "What are common challenges in the AI journey and how to overcome them?",
          answer: "Common challenges: Information overload, tool selection paralysis, unrealistic expectations, lack of clear use cases. Solutions: Start small with specific problems, focus on learning over perfection, join communities for support, document your experiments, celebrate small wins, and remember that failure is part of learning."
        }
      ]
    },
    {
      category: "Technology Stack & AI Tools Explored",
      icon: Wrench,
      color: "text-genie-cyan",
      bgColor: "bg-genie-cyan/10",
      borderColor: "border-genie-cyan/20",
      questions: [
        {
          question: "What AI models and LLMs have you extensively tested?",
          answer: "Large Language Models: GPT-5, GPT-4, Claude 3.5, Gemini, Local models (Llama, Mistral), Specialized healthcare models. Each tested for specific use cases including reasoning, creativity, coding, and domain-specific applications with detailed performance comparisons."
        },
        {
          question: "What AI platforms and development tools do you recommend?",
          answer: "Platforms: OpenAI API, Anthropic Claude, Supabase for backend, React + TypeScript for frontend. Development: Cursor IDE, GitHub Copilot, Tailwind CSS. Infrastructure: Edge functions, database management, authentication systems, file storage. Each chosen for specific strengths and integration capabilities."
        },
        {
          question: "How do you evaluate and select AI technologies for projects?",
          answer: "Evaluation criteria: Problem fit, ease of integration, cost-effectiveness, scalability, community support, security features. Process: Start with free tiers, test specific use cases, benchmark performance, evaluate total cost of ownership, assess long-term viability, and consider team expertise requirements."
        },
        {
          question: "What emerging AI technologies should I focus on in 2025?",
          answer: "Key areas: Agentic AI and multi-agent systems, No-code/low-code AI platforms, Edge AI and local model deployment, RAG (Retrieval Augmented Generation), Model Context Protocol (MCP), AI observability and monitoring tools. Focus on technologies that solve real business problems rather than following hype."
        }
      ]
    },
    {
      category: "Business Use Cases & Strategic Implementation",
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      questions: [
        {
          question: "How do you decide between automation and agentic AI for business processes?",
          answer: "Automation for: Repetitive, rule-based tasks with clear inputs/outputs, high-volume processing, cost reduction focus. Agentic AI for: Complex decision-making, multi-step reasoning, adaptive responses, customer interaction, creative problem-solving. Consider data complexity, decision requirements, and human oversight needs."
        },
        {
          question: "What are key business use cases you've implemented successfully?",
          answer: "Healthcare: Patient onboarding automation (40% time reduction), diagnostic assistance, clinical decision support. Financial: Fraud detection (80% improvement), automated reporting, risk assessment. Operations: Process optimization, intelligent document processing, workflow automation. Each with detailed ROI metrics and lessons learned."
        },
        {
          question: "How do you approach AI implementation in healthcare workflows?",
          answer: "Start with regulatory compliance (HIPAA, FDA), focus on patient safety and privacy, implement gradual rollouts with clinician feedback, measure patient outcomes not just efficiency, ensure human oversight for critical decisions, and maintain detailed audit trails for accountability."
        },
        {
          question: "What's your framework for AI business case development?",
          answer: "1. Problem Definition: Clear pain point identification. 2. Solution Design: AI approach selection and architecture. 3. ROI Analysis: Cost-benefit with timeline. 4. Risk Assessment: Technical, regulatory, and operational risks. 5. Implementation Plan: Phased approach with milestones. 6. Success Metrics: Quantifiable outcomes and KPIs."
        }
      ]
    },
    {
      category: "Case Studies & Success Stories",
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      questions: [
        {
          question: "Can you share details about your healthcare AI transformation case study?",
          answer: "Challenge: 40% reduction in diagnosis time needed. Solution: AI-powered diagnostic assistance with computer vision and NLP. Technologies: Clinical decision support, pattern recognition, real-time processing. Outcomes: Faster diagnosis, improved accuracy, reduced clinician workload, better patient satisfaction. Key lesson: Human-AI collaboration is more effective than replacement."
        },
        {
          question: "What was achieved in your financial services automation project?",
          answer: "Challenge: 80% improvement in fraud detection needed. Solution: Machine learning fraud prevention system. Technologies: Anomaly detection, pattern recognition, real-time processing. Outcomes: Reduced fraud losses, faster detection, lower false positives, improved customer experience. Key insight: Continuous model retraining is essential for accuracy."
        },
        {
          question: "How do you document and share case study insights?",
          answer: "Structure: Challenge definition, solution approach, technologies used, implementation timeline, quantifiable results, lessons learned, failure points, recommendations. Focus on practical insights, honest assessment of what didn't work, and actionable advice for others facing similar challenges."
        },
        {
          question: "What common patterns emerge across successful AI implementations?",
          answer: "Success patterns: Clear problem definition, stakeholder buy-in, phased implementation, continuous feedback loops, human-AI collaboration, robust testing, change management. Failure patterns: Technology-first approach, unrealistic expectations, insufficient data, poor user adoption, lack of monitoring."
        }
      ]
    },
    {
      category: "Healthcare & Digital Therapeutics Expertise",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      questions: [
        {
          question: "What are Digital Therapeutics (DTx) and their reimbursement landscape?",
          answer: "DTx are evidence-based therapeutic interventions driven by high-quality software programs. Reimbursement includes CPT codes (90834, 90837, 96116), coverage through Medicare Part B and commercial insurance. Categories: mental health DTx, chronic disease management, rehabilitation platforms. Key: Clinical evidence and regulatory approval drive reimbursement."
        },
        {
          question: "How do Cell & Gene Therapies work with reimbursement and AI applications?",
          answer: "Revolutionary treatments using patient's own cells face unique challenges: high costs ($100K-$500K+), outcome-based contracts, prior authorization requirements. AI applications: Patient selection optimization, treatment response prediction, supply chain management, outcome monitoring. Examples: CAR-T therapies, gene replacement treatments."
        },
        {
          question: "What should I know about 340B drug pricing and AI optimization?",
          answer: "340B Program requires manufacturers to provide 20-50% discounts to eligible safety-net providers. AI applications: Eligibility verification, contract pharmacy optimization, inventory management, audit compliance automation. Key considerations: GPO pricing comparison, WAC cost analysis, regulatory compliance monitoring."
        },
        {
          question: "How does AI enhance patient care in healthcare settings?",
          answer: "Applications: Diagnostic assistance, treatment personalization, risk prediction, workflow optimization, patient engagement. Benefits: Improved accuracy, faster decisions, reduced costs, better outcomes. Challenges: Regulatory compliance, data privacy, clinician adoption, integration complexity. Success requires human-AI collaboration, not replacement."
        }
      ]
    },
    {
      category: "Security, Compliance & Implementation Best Practices",
      icon: ExternalLink,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      questions: [
        {
          question: "How do you handle security and compliance in AI implementations?",
          answer: "Security measures: Adversarial attack protection, data poisoning prevention, model validation and testing, privacy-preserving techniques, bias detection and mitigation. Compliance: GDPR, HIPAA, industry-specific regulations. Monitoring: Continuous audit trails, performance monitoring, security assessments."
        },
        {
          question: "What data protection measures do you implement for AI systems?",
          answer: "Protection measures: IP-based session isolation, encrypted data transmission, no cross-user data sharing, audit logging for sensitive access, regular security assessments. Privacy: Minimal data collection, user consent management, data deletion options, anonymization techniques. Always prioritize user privacy and regulatory compliance."
        },
        {
          question: "What are your recommendations for responsible AI development?",
          answer: "Principles: Transparency in AI decision-making, bias testing and mitigation, human oversight for critical decisions, clear error handling, user consent and control. Implementation: Regular audits, diverse testing datasets, stakeholder feedback, ethical review processes, continuous monitoring for unintended consequences."
        },
        {
          question: "How do you ensure AI system reliability and performance?",
          answer: "Reliability: Comprehensive testing with edge cases, gradual rollout strategies, fallback mechanisms, performance monitoring. Quality: Model validation, accuracy benchmarking, user feedback integration, continuous improvement cycles. Always plan for failure scenarios and maintain human oversight capabilities."
        }
      ]
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              Knowledge Base
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              AI Experimentation Questions & Insights
            </h2>
            <p className="text-base text-muted-foreground font-normal">
              Real questions and practical insights from my AI experimentation journey.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className={`${category.bgColor} ${category.borderColor} border rounded-lg p-4`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-white rounded-lg ${category.borderColor} border`}>
                    <IconComponent className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{category.category}</h3>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const itemIndex = categoryIndex * 10 + index;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <Card key={index} className="bg-white border border-border/50">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full p-4 text-left hover:bg-background/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-foreground pr-4">
                              {faq.question}
                            </h4>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Have a Question Not Listed Here?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                I'm always learning and experimenting. Connect with me to discuss AI tools and share experiments!
              </p>
              <Button 
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                Connect & Discuss
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};