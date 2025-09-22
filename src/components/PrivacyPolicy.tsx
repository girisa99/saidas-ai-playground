import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, Database, CheckCircle } from "lucide-react";

export const PrivacyPolicy = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50" id="privacy">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy and data security are our top priorities
          </p>
        </div>

        <Card className="p-8 border border-primary/20">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Analytics Data:</strong> We collect anonymous usage statistics to improve our platform, 
                  including page views, time spent on site, and general geographic location (country/region level only).
                </p>
                <p>
                  <strong>Contact Information:</strong> When you reach out through our contact forms or LinkedIn, 
                  we collect only the information you voluntarily provide.
                </p>
                <p>
                  <strong>Technical Data:</strong> Basic browser information, IP addresses (anonymized), and 
                  device type for security and optimization purposes.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                How We Protect Your Data
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Encryption:</strong> All data transmission uses SSL/TLS encryption
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Tracking:</strong> We don't use invasive tracking or behavioral monitoring
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Minimal Collection:</strong> We collect only what's necessary for functionality
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Secure Hosting:</strong> Infrastructure hosted on secure, compliant platforms
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                Your Rights
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Access:</strong> You can request information about what data we have about you.
                </p>
                <p>
                  <strong>Correction:</strong> You can request corrections to any inaccurate information.
                </p>
                <p>
                  <strong>Deletion:</strong> You can request deletion of your personal information.
                </p>
                <p>
                  <strong>Opt-out:</strong> You can opt out of analytics tracking at any time.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Sharing
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  ✅ We DO NOT sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
                <p className="text-green-700 mt-2">
                  The only data sharing occurs with essential service providers (hosting, analytics) who are bound by strict confidentiality agreements.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Healthcare Data Compliance
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As a healthcare technology professional, I understand the importance of data privacy in healthcare contexts:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>This platform does not collect or process any protected health information (PHI)</li>
                  <li>All healthcare examples and case studies use anonymized, synthetic, or publicly available data</li>
                  <li>HIPAA compliance principles guide our data handling practices</li>
                  <li>Enterprise implementations follow client-specific compliance requirements</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact & Updates
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Questions?</strong> Contact us through LinkedIn: 
                  <a href="https://www.linkedin.com/in/saidas/" target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline ml-1">
                    linkedin.com/in/saidas
                  </a>
                </p>
                <p>
                  <strong>Updates:</strong> We'll notify users of significant privacy policy changes through 
                  website announcements and direct communication where possible.
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};