import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, Lock, User, Share2, Heart, Mail, AlertTriangle, BookOpen, Users, 
  Gavel, FileText, Bot, Lightbulb, FileWarning, Info, Cookie, Settings, BarChart 
} from "lucide-react";

interface LegalDialogProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const LegalDialog = ({ trigger, title, children }: LegalDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export const PrivacyDialog = ({ trigger }: { trigger: React.ReactNode }) => (
  <LegalDialog trigger={trigger} title="Privacy Policy - AI Experimentation & Learning Platform">
    <div className="space-y-6">
      <Card>
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
              This platform is designed for <strong>AI experimentation, learning, and knowledge sharing</strong>. 
              All data collection serves to enhance the educational experience and facilitate collaborative learning. 
              We do not provide commercial services or consulting.
            </p>
          </div>
        </CardContent>
      </Card>

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
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Name and email address for account creation</li>
              <li>Learning preferences and interests</li>
              <li>Collaboration and sharing activities</li>
              <li>Community participation and contributions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Platform Usage Analytics</h4>
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
            <h4 className="font-semibold mb-2">No Commercial Data Sharing</h4>
            <p className="text-muted-foreground">
              We do not sell, trade, or commercialize personal information. Data is used solely for educational 
              platform operations and improvement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </LegalDialog>
);

export const TermsDialog = ({ trigger }: { trigger: React.ReactNode }) => (
  <LegalDialog trigger={trigger} title="Terms of Use - AI-Powered Experimentation & Knowledge Sharing">
    <div className="space-y-6">
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Important Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
            <p className="text-orange-800 font-medium">
              This platform is designed exclusively for <strong>experimentation, learning, and knowledge sharing</strong>. 
              We do not provide consulting services, professional advice, or sell any products. All content is AI-generated 
              for educational purposes only.
            </p>
          </div>
        </CardContent>
      </Card>

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
            <FileText className="h-5 w-5 text-indigo-500" />
            Intellectual Property & Content Ownership
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-2">Platform Ownership</h4>
          <p className="text-muted-foreground">
            All content, methodologies, frameworks, and materials shared on or generated through 
            this platform are owned by <strong>Genie AI Experimentation Hub</strong>. Users do not 
            acquire ownership rights to platform content.
          </p>
        </CardContent>
      </Card>
    </div>
  </LegalDialog>
);

export const DisclaimerDialog = ({ trigger }: { trigger: React.ReactNode }) => (
  <LegalDialog trigger={trigger} title="Disclaimer - Important Information About Our AI-Powered Platform">
    <div className="space-y-6">
      <Card className="border-orange-200 bg-orange-50/50">
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
            <Shield className="h-5 w-5 text-green-500" />
            Responsibility & Liability Limitations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-2">User Responsibility</h4>
          <p className="text-muted-foreground">
            Users are solely responsible for verifying the accuracy, applicability, and suitability of any 
            content before use. Independent research, professional consultation, and proper validation are 
            required for any practical application.
          </p>
        </CardContent>
      </Card>
    </div>
  </LegalDialog>
);

export const CookiesDialog = ({ trigger }: { trigger: React.ReactNode }) => (
  <LegalDialog trigger={trigger} title="Cookie Policy - How We Use Cookies on Our AI Learning Platform">
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-amber-500" />
            What Are Cookies?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cookies are small text files stored on your device when you visit our AI experimentation platform. 
            We use cookies to enhance your learning experience, remember your preferences, and improve our 
            educational content delivery.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-500" />
            Types of Cookies We Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Essential Cookies
            </h4>
            <p className="text-muted-foreground">
              These cookies are necessary for the platform to function properly and provide core learning features.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-purple-500" />
              Analytics Cookies
            </h4>
            <p className="text-muted-foreground">
              Help us understand how users interact with our learning content to improve the educational experience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" />
              Functional Cookies
            </h4>
            <p className="text-muted-foreground">
              Enable enhanced functionality and personalization for a better learning experience.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Control & Choices</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold mb-2">Browser Settings</h4>
          <p className="text-muted-foreground">
            You can control cookies through your browser settings. Most browsers allow you to refuse cookies, 
            delete existing cookies, or receive notifications when cookies are being set.
          </p>
        </CardContent>
      </Card>
    </div>
  </LegalDialog>
);