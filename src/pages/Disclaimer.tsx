import { NavigationHeader } from "@/components/NavigationHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Bot, Lightbulb, Shield, FileWarning, Info } from "lucide-react";

const Disclaimer = () => {
  useEffect(() => {
    document.title = "Disclaimer - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Important disclaimers for Genie AI Experimentation Hub - AI-generated content for learning and experimentation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <p className="text-xl text-muted-foreground">
            Important Information About Our AI-Powered Platform
          </p>
        </div>

        <Card className="mb-8 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Critical Notice - Please Read Carefully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                This platform is exclusively for <strong>experimentation, learning, and knowledge sharing</strong>. 
                All content is AI-generated and may not reflect real-world scenarios. Users must verify all 
                information independently before any practical application.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                AI-Generated Content Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Artificial Intelligence Generated</h4>
                <p className="text-muted-foreground">
                  All content, use cases, examples, code snippets, methodologies, and documentation on this 
                  platform are generated using artificial intelligence technologies. This content is created 
                  for educational and experimental purposes only.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Accuracy & Reliability</h4>
                <p className="text-muted-foreground">
                  AI-generated content may contain inaccuracies, outdated information, or theoretical scenarios 
                  that do not reflect current industry standards or best practices. Always validate information 
                  through authoritative sources.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experimental Nature</h4>
                <p className="text-muted-foreground">
                  Content represents experimental approaches and learning exercises. Results, methodologies, 
                  and outcomes should not be considered production-ready or suitable for commercial implementation 
                  without proper validation and testing.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Use Case & Industry Relevance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Hypothetical Scenarios</h4>
                <p className="text-muted-foreground">
                  Many use cases, business scenarios, and implementation examples are hypothetical and may not 
                  correspond to real industry practices, actual company operations, or existing market conditions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Industry Standards</h4>
                <p className="text-muted-foreground">
                  Examples may not comply with current industry standards, regulatory requirements, or professional 
                  guidelines. Always consult current regulations and professional standards for any real-world 
                  application.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Company References</h4>
                <p className="text-muted-foreground">
                  Any references to companies, organizations, or specific business implementations are used for 
                  educational illustration only and do not represent actual business relationships or endorsements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Responsibility & Liability Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">User Responsibility</h4>
                <p className="text-muted-foreground">
                  Users are solely responsible for verifying the accuracy, applicability, and suitability of any 
                  content before use. Independent research, professional consultation, and proper validation are 
                  required for any practical application.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Warranties</h4>
                <p className="text-muted-foreground">
                  Genie AI Experimentation Hub provides no warranties, express or implied, regarding the accuracy, 
                  completeness, reliability, or suitability of any content for any particular purpose.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                <p className="text-muted-foreground">
                  We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages 
                  arising from the use of this platform or reliance on its content, regardless of the theory of 
                  liability.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-red-500" />
                Professional Advice Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Not Professional Advice</h4>
                <p className="text-muted-foreground">
                  Content does not constitute professional advice in any field including but not limited to: 
                  technical consulting, business strategy, legal guidance, financial planning, medical advice, 
                  or engineering solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Consult Qualified Professionals</h4>
                <p className="text-muted-foreground">
                  For any real-world implementation, business decision, or professional application, always consult 
                  qualified professionals in the relevant field who can provide current, accurate, and applicable 
                  guidance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                <p className="text-muted-foreground">
                  Users are responsible for ensuring compliance with all applicable laws, regulations, industry 
                  standards, and professional guidelines in their jurisdiction and field of application.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-cyan-500" />
                Platform Purpose & Boundaries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Educational Focus</h4>
                <p className="text-muted-foreground">
                  This platform exists solely for educational purposes, knowledge sharing, and collaborative 
                  learning about AI experimentation. It is not a commercial service provider or consulting firm.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Business Relationships</h4>
                <p className="text-muted-foreground">
                  No business, consulting, or professional service relationships are established through platform 
                  use. All interactions are for learning and knowledge sharing purposes only.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Continuous Learning</h4>
                <p className="text-muted-foreground">
                  The platform encourages continuous learning, experimentation, and knowledge sharing while 
                  maintaining clear boundaries about the nature and limitations of AI-generated content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">
            By using this platform, you acknowledge and accept these disclaimers and understand the limitations 
            and responsibilities associated with AI-generated educational content.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;