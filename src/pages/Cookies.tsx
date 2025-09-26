import { NavigationHeader } from "@/components/NavigationHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cookie, Settings, Shield, BarChart, User } from "lucide-react";

const Cookies = () => {
  useEffect(() => {
    document.title = "Cookie Policy - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Cookie Policy for Genie AI Experimentation Hub - How we use cookies for learning platform optimization.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground">
            How We Use Cookies on Our AI Learning Platform
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-amber-500" />
              What Are Cookies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your device when you visit this personal AI experimentation 
              platform by Saidas. This initiative is completely separate from his professional work at McKesson. 
              We use cookies to enhance your learning experience and improve educational content delivery.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Types of Cookies We Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Essential Cookies
                </h4>
                <p className="text-muted-foreground mb-2">
                  These cookies are necessary for the platform to function properly and provide core learning features.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic platform functionality</li>
                  <li>User preference storage (theme, language)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-purple-500" />
                  Analytics Cookies
                </h4>
                <p className="text-muted-foreground mb-2">
                  Help us understand how users interact with our learning content to improve the educational experience.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Page views and navigation patterns</li>
                  <li>Learning path effectiveness</li>
                  <li>Content engagement metrics</li>
                  <li>Platform performance monitoring</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-500" />
                  Functional Cookies
                </h4>
                <p className="text-muted-foreground mb-2">
                  Enable enhanced functionality and personalization for a better learning experience.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Learning progress tracking</li>
                  <li>Personalized content recommendations</li>
                  <li>User interface customization</li>
                  <li>Collaboration features</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Cookie Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Learning Platform Optimization</h4>
                <p className="text-muted-foreground">
                  We analyze how users interact with our AI experimentation content to identify the most effective 
                  learning materials, improve content structure, and enhance the overall educational experience.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Personalized Learning Paths</h4>
                <p className="text-muted-foreground">
                  Cookies help us understand your learning preferences and progress to provide more relevant 
                  AI experimentation examples and knowledge sharing opportunities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Platform Performance</h4>
                <p className="text-muted-foreground">
                  We monitor platform performance to ensure smooth access to learning materials, minimize 
                  loading times, and optimize the delivery of AI-generated content.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Community Features</h4>
                <p className="text-muted-foreground">
                  Cookies enable collaboration features, allowing users to share insights, track contributions, 
                  and participate in the learning community effectively.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Privacy & Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">No Personal Information Sale</h4>
                <p className="text-muted-foreground">
                  We never sell personal information or cookie data to third parties. All data is used exclusively 
                  for improving the educational experience on our platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Anonymized Analytics</h4>
                <p className="text-muted-foreground">
                  Analytics cookies collect aggregated, anonymized data about platform usage. Individual users 
                  cannot be identified from this data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secure Storage</h4>
                <p className="text-muted-foreground">
                  All cookie data is stored securely and accessed only by authorized platform administrators 
                  for the purposes of platform improvement and user support.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Control & Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Browser Settings</h4>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. Most browsers allow you to refuse cookies, 
                  delete existing cookies, or receive notifications when cookies are being set.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies Required</h4>
                <p className="text-muted-foreground">
                  Please note that disabling essential cookies may affect platform functionality and your ability 
                  to access certain learning features and collaboration tools.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics Opt-Out</h4>
                <p className="text-muted-foreground">
                  You can opt out of analytics cookies while still maintaining full access to learning content 
                  and platform features. This will not affect your educational experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Educational Tools Integration</h4>
                <p className="text-muted-foreground">
                  Our platform may integrate with third-party educational tools and AI services to enhance the 
                  learning experience. These services may set their own cookies according to their privacy policies.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">External Links</h4>
                <p className="text-muted-foreground">
                  Links to external resources, documentation, or tools may direct you to websites with their own 
                  cookie policies. We encourage you to review these policies when visiting external sites.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            For questions about our cookie policy or to request information about the data we collect, 
            please contact us through our platform.
          </p>
          <p className="text-sm text-muted-foreground">
            This cookie policy is part of our commitment to transparent data practices in our AI learning community.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;