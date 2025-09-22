import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      question: "What makes your AI implementation approach different?",
      answer: "My approach is based on 21 years of real-world healthcare experience, not just theoretical knowledge. I focus on proven strategies that work in regulated environments, with emphasis on gradual implementation, staff training, and measurable ROI. Every recommendation comes from actual deployments in healthcare organizations."
    },
    {
      question: "How long does AI implementation typically take?",
      answer: "Timeline varies by complexity and organization readiness. Simple automation projects: 2-3 months. Clinical decision support systems: 6-12 months. Enterprise-wide AI transformation: 12-24 months. I always recommend starting with pilot projects to demonstrate value before scaling."
    },
    {
      question: "What's the typical ROI for healthcare AI projects?",
      answer: "Based on my implementations: Administrative automation shows 30-50% efficiency gains within 6 months. Clinical AI tools typically show 15-25% improvement in diagnostic accuracy. Most organizations see positive ROI within 12-18 months when properly implemented."
    },
    {
      question: "How do you handle regulatory compliance (HIPAA, FDA)?",
      answer: "Compliance is built into every implementation from day one. I work with legal and compliance teams to ensure all AI tools meet HIPAA requirements, establish proper data governance, and when needed, navigate FDA approval processes for clinical applications. Documentation and audit trails are standard."
    },
    {
      question: "What if my team lacks technical AI expertise?",
      answer: "This is common and expected. My implementation strategy includes comprehensive training programs, from executive overviews to hands-on technical workshops. I also help establish internal AI governance committees and provide ongoing support during the initial deployment phases."
    },
    {
      question: "Which AI tools do you recommend for getting started?",
      answer: "It depends on your specific needs, but I typically recommend starting with proven, low-risk applications like automated scheduling, document processing, or basic chatbots for common queries. These build confidence and demonstrate value before moving to more complex clinical applications."
    },
    {
      question: "How do you measure AI project success?",
      answer: "I establish clear KPIs before implementation: efficiency metrics (time saved, errors reduced), quality measures (accuracy improvements, patient satisfaction), and financial indicators (cost savings, revenue impact). Regular assessments ensure projects stay on track and deliver promised value."
    },
    {
      question: "What are the biggest AI implementation mistakes to avoid?",
      answer: "Top mistakes: 1) Starting too big without pilot testing, 2) Insufficient staff training and change management, 3) Poor data quality preparation, 4) Lack of clear success metrics, 5) Choosing technology before understanding workflow needs. My methodology specifically addresses these common pitfalls."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50" id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Common questions about AI implementation in healthcare and enterprise environments
          </p>
        </div>

        <Card className="p-8 border border-primary/20">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-primary/5 border border-primary/20">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every organization's AI journey is unique. I'd be happy to discuss your specific situation and provide personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                Schedule a Consultation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
              >
                View Case Studies
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};