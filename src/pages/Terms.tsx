import { NavigationHeader } from "@/components/NavigationHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, BookOpen, Users, Shield, Gavel, FileText } from "lucide-react";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms of Use - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Use for Genie AI Experimentation Hub - AI-powered learning and knowledge sharing platform.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Experimentation & Knowledge Sharing Platform
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm">
                This platform is designed exclusively for <strong>experimentation, learning, and knowledge sharing</strong>. 
                We do not provide consulting services, professional advice, or sell any products. All content is AI-generated 
                for educational purposes only.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Platform Purpose & Nature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">AI-Generated Content</h4>
                <p className="text-muted-foreground">
                  All content, use cases, examples, and materials on this platform are generated through 
                  artificial intelligence for experimentation and learning purposes. Content may not reflect 
                  real industry practices or actual business scenarios.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Educational Focus</h4>
                <p className="text-muted-foreground">
                  This platform serves as a knowledge repository for AI experimentation, learning, and sharing 
                  experiences. Users engage for personal development and collaborative learning only.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Commercial Services</h4>
                <p className="text-muted-foreground">
                  We explicitly do not offer consulting services, professional advice, software sales, 
                  or any commercial services. This is purely an educational and experimental platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                User Responsibilities & Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Independent Verification</h4>
                <p className="text-muted-foreground">
                  Users are solely responsible for verifying, validating, and learning from any content 
                  independently. Do not rely on platform content for business decisions or professional 
                  implementations without proper validation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Liability</h4>
                <p className="text-muted-foreground">
                  Genie AI Experimentation Hub and its operators assume no responsibility or liability 
                  for any use, misuse, or outcomes from content accessed through this platform. Users 
                  engage at their own risk and discretion.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experimental Nature</h4>
                <p className="text-muted-foreground">
                  All tools, examples, and methodologies presented are experimental and for learning 
                  purposes. Results may vary and should not be considered production-ready solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Registration & Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Purpose of Registration</h4>
                <p className="text-muted-foreground">
                  User registration facilitates collaboration, learning, and knowledge sharing among 
                  the community. Personal information is used solely for platform improvement and 
                  communication purposes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Community Guidelines</h4>
                <p className="text-muted-foreground">
                  Users agree to engage respectfully, share knowledge constructively, and maintain 
                  the educational focus of the platform. Misuse for commercial purposes is prohibited.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Intellectual Property & Content Ownership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Platform Ownership</h4>
                <p className="text-muted-foreground">
                  All content, methodologies, frameworks, and materials shared on or generated through 
                  this platform are owned by <strong>Genie AI Experimentation Hub</strong>. Users do not 
                  acquire ownership rights to platform content.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">User Contributions</h4>
                <p className="text-muted-foreground">
                  Any content, insights, or materials contributed by users become part of the collective 
                  knowledge base owned by Genie AI Experimentation Hub. Users grant perpetual rights to 
                  use, modify, and distribute their contributions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Third-Party Content</h4>
                <p className="text-muted-foreground">
                  References to third-party tools, platforms, or methodologies are for educational 
                  purposes only and do not imply endorsement or partnership.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-red-500" />
                Legal Disclaimers & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">No Professional Advice</h4>
                <p className="text-muted-foreground">
                  Content provided is not professional, legal, financial, or technical advice. Consult 
                  qualified professionals for specific business or technical implementations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                <p className="text-muted-foreground">
                  Under no circumstances shall Genie AI Experimentation Hub be liable for any direct, 
                  indirect, incidental, or consequential damages arising from platform use.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Indemnification</h4>
                <p className="text-muted-foreground">
                  Users agree to indemnify and hold harmless Genie AI Experimentation Hub from any 
                  claims, damages, or losses resulting from their use of the platform or violation 
                  of these terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            By accessing and using this platform, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Use.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;