import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Cookie, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
}

type Context = 'technology' | 'healthcare';

interface PublicPrivacyBannerProps {
  onAccept: (userInfo: UserInfo, context: Context, topic: string) => void;
  technologyTopics: string[];
  healthcareTopics: string[];
}

export const PublicPrivacyBanner: React.FC<PublicPrivacyBannerProps> = ({ 
  onAccept, 
  technologyTopics, 
  healthcareTopics
}) => {
  const [step, setStep] = useState<'privacy' | 'info' | 'context' | 'topic'>('privacy');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [context, setContext] = useState<Context | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (userInfo.firstName && userInfo.email && context && selectedTopic) {
      onAccept(userInfo, context, selectedTopic);
    }
  };

  const isEmailValid = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Privacy & Terms */}
        {step === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Welcome to Genie AI</h2>
            </div>
            
            <Alert>
              <Cookie className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Privacy & Terms Agreement:</strong>
                <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                  <li>This is a demonstration of AI capabilities</li>
                  <li>Conversations may be monitored for quality and safety</li>
                  <li>AI responses should be verified with experts</li>
                  <li>Medical advice should be confirmed with healthcare providers</li>
                  <li>We will send you welcome emails and newsletters (you can unsubscribe anytime)</li>
                  <li>Rate limits apply (10 requests per hour)</li>
                  <li>We use minimal cookies to maintain your session</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button onClick={() => setStep('info')} className="w-full">
              I Accept Terms & Continue
            </Button>
          </div>
        )}

        {/* User Information */}
        {step === 'info' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Tell us about yourself</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name (Optional)</Label>
                <Input
                  id="lastName"
                  value={userInfo.lastName || ''}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('privacy')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep('context')}
                disabled={!userInfo.firstName || !userInfo.email || !isEmailValid(userInfo.email)}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Context Selection */}
        {step === 'context' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Choose Your Area of Interest</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={context === 'technology' ? 'default' : 'outline'}
                onClick={() => setContext('technology')}
                className="p-4 h-auto flex flex-col gap-2"
              >
                <span className="text-lg">🚀</span>
                <span className="font-medium">Technology</span>
                <span className="text-xs text-muted-foreground">AI, Software, Innovation</span>
              </Button>
              <Button
                variant={context === 'healthcare' ? 'default' : 'outline'}
                onClick={() => setContext('healthcare')}
                className="p-4 h-auto flex flex-col gap-2"
              >
                <span className="text-lg">🏥</span>
                <span className="font-medium">Healthcare</span>
                <span className="text-xs text-muted-foreground">Medical, Wellness, Research</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('info')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => setStep('topic')}
                disabled={!context}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Topic Selection */}
        {step === 'topic' && context && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Select Your {context === 'technology' ? 'Tech' : 'Healthcare'} Focus
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {(context === 'technology' ? technologyTopics : healthcareTopics).map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? 'default' : 'outline'}
                  onClick={() => setSelectedTopic(topic)}
                  className="p-2 h-auto text-xs"
                >
                  {topic}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('context')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!selectedTopic}
                className="flex-1"
              >
                Start Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};