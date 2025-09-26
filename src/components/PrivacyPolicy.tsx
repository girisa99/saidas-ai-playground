import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, User, Share2, Heart, Mail } from "lucide-react";

export const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground">
          AI Experimentation & Learning Platform Data Privacy
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Platform Nature & Data Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm">
              This platform is a <strong>personal knowledge sharing and AI experimentation initiative</strong> 
              by Saidas. It is completely separate from his professional role and has no affiliation with 
              McKesson or any other employer. All content is for learning and educational purposes only.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Information We Collect for Learning Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Registration & Collaboration Data</h4>
              <p className="text-muted-foreground mb-2">
                Information collected to facilitate learning collaboration and knowledge sharing:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Name and email address for account creation</li>
                <li>Learning preferences and interests</li>
                <li>Collaboration and sharing activities</li>
                <li>Community participation and contributions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Platform Usage Analytics</h4>
              <p className="text-muted-foreground mb-2">
                Data to improve the learning experience and platform functionality:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Learning path navigation and progress</li>
                <li>Content engagement and effectiveness</li>
                <li>Platform performance and optimization data</li>
                <li>AI experimentation tool usage patterns</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              Data Security & Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Educational Platform Security</h4>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your learning data and personal information 
                within our AI experimentation platform environment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI-Generated Content Privacy</h4>
              <p className="text-muted-foreground">
                Your interactions with AI-generated content are protected and used only to improve the 
                learning experience and platform functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-orange-500" />
              Knowledge Sharing & IP Ownership
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Platform Content Ownership</h4>
              <p className="text-muted-foreground">
                All content, methodologies, and materials shared on or generated through this platform are 
                owned by <strong>Genie AI Experimentation Hub</strong>. This includes user contributions and 
                collaborative content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Learning Data Usage</h4>
              <p className="text-muted-foreground">
                Personal information is used exclusively for platform improvement, learning enhancement, and 
                facilitating collaboration among users. We do not share data with third parties for commercial purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">No Commercial Data Sharing</h4>
              <p className="text-muted-foreground">
                We do not sell, trade, or commercialize personal information. Data is used solely for educational 
                platform operations and improvement.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              AI Experimentation & Data Responsibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Experimental Content Disclaimer</h4>
              <p className="text-muted-foreground">
                All AI-generated content and experimental data on this platform are for educational purposes. 
                Users are responsible for independent verification of any information before practical application.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Learning Context</h4>
              <p className="text-muted-foreground">
                Data processing occurs within the context of AI experimentation and learning. No real-world 
                implementation or commercial application should rely solely on platform content.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-500" />
              Your Rights & Platform Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Learning Data Rights</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access your learning progress and platform data</li>
                <li>Correct personal information and preferences</li>
                <li>Delete your account and associated learning data</li>
                <li>Export your contributions and learning history</li>
                <li>Control collaboration and sharing settings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact for Privacy Matters</h4>
              <p className="text-muted-foreground">
                For privacy questions, data requests, or concerns about our AI experimentation platform 
                data practices, contact us through our platform support channels.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};