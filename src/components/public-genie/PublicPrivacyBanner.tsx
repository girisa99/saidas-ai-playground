import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Cookie, User, Mail, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PrivacyDialog, TermsDialog, DisclaimerDialog } from '@/components/LegalDialogs';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
}

type Context = 'technology' | 'healthcare';

interface PublicPrivacyBannerProps {
  onAccept: (userInfo: UserInfo) => void;
  onClose: () => void;
  technologyTopics: string[];
  healthcareTopics: string[];
}

export const PublicPrivacyBanner: React.FC<PublicPrivacyBannerProps> = ({ 
  onAccept, 
  technologyTopics, 
  healthcareTopics
}) => {
  const [step, setStep] = useState<'privacy' | 'info'>('privacy');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const { toast } = useToast();

  const handleAcceptTerms = async () => {
    try {
      // Fetch IP address
      let ipAddress: string | null = null;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
      } catch (error) {
        console.warn('Failed to fetch IP address:', error);
      }

      const { genieAnalyticsService } = await import('@/services/genieAnalyticsService');
      await genieAnalyticsService.trackPrivacyAccept({
        user_email: userInfo.email || 'anonymous',
        user_name: `${userInfo.firstName || 'Anonymous'} ${userInfo.lastName || ''}`.trim(),
        timestamp: new Date().toISOString(),
        ip_address: ipAddress || undefined
      });
    } catch (error) {
      console.error('Failed to track privacy acceptance:', error);
    } finally {
      setStep('info');
    }
  };

  const handleSubmit = async () => {
    if (!userInfo.firstName.trim()) {
      toast({
        title: "First name required",
        description: "Please enter your first name to continue.",
        variant: "destructive",
      });
      return;
    }

    const emailValue = userInfo.email.trim().toLowerCase();
    
    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address (e.g., user@example.com).",
        variant: "destructive",
      });
      return;
    }

    // Check if this email is already registered (for returning users)
    const existingUser = localStorage.getItem('genie_user_info');
    if (existingUser) {
      const parsed = JSON.parse(existingUser);
      if (parsed.email === emailValue) {
        toast({
          title: "Welcome back! 👋",
          description: `You're already registered as ${parsed.firstName}. Continuing your conversation.`,
        });
      } else {
        // Different email - notify user they're switching accounts
        toast({
          title: "Account Switched",
          description: `Switching from ${parsed.email} to ${emailValue}. Rate limits apply to each email.`,
        });
      }
    }

    // Track privacy acceptance with IP
    try {
      // Fetch IP address
      let ipAddress: string | null = null;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
      } catch (error) {
        console.warn('Failed to fetch IP address:', error);
      }

      const { genieAnalyticsService } = await import('@/services/genieAnalyticsService');
      await genieAnalyticsService.trackPrivacyAccept({
        user_email: emailValue,
        user_name: `${userInfo.firstName} ${userInfo.lastName || ''}`.trim(),
        timestamp: new Date().toISOString(),
        ip_address: ipAddress || undefined
      });
    } catch (error) {
      console.error('Failed to track privacy acceptance:', error);
    }

    const finalUserInfo = {
      ...userInfo,
      email: emailValue
    };

    onAccept(finalUserInfo);
  };

  const isEmailValid = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="space-y-4">
        {/* Privacy & Terms */}
        {step === 'privacy' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Welcome to Genie AI</h2>
            </div>
            
            <Alert className="max-h-[400px] overflow-y-auto">
              <Cookie className="h-4 w-4" />
              <AlertDescription className="text-xs leading-relaxed">
                <strong className="text-sm">Privacy & Terms Agreement:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1.5 text-xs">
                  <li className="leading-tight">Experimental AI demonstration</li>
                  <li className="leading-tight">Conversations monitored for quality</li>
                  <li className="leading-tight">Verify AI responses with experts</li>
                  <li className="leading-tight">Confirm medical advice with providers</li>
                  <li className="leading-tight">Welcome emails sent (unsubscribe anytime)</li>
                  <li className="leading-tight">Rate limits: 2/hour, 5/day</li>
                  <li className="leading-tight">Request extended access for legitimate use</li>
                  <li className="leading-tight">Requests reviewed at genieaiexperimentationhub@gmail.com</li>
                  <li className="leading-tight">Minimal cookies for session management</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button onClick={handleAcceptTerms} className="w-full" size="sm">
              I Accept Terms & Continue
            </Button>
          </div>
        )}

        {/* User Information */}
        {step === 'info' && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-center">Tell us about yourself</h3>
            <p className="text-xs text-muted-foreground text-center">
              I'll detect your interests and adapt during our conversation!
            </p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="firstName" className="text-xs">First Name *</Label>
                <Input
                  id="firstName"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                  className="mt-1 h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs">Last Name (Optional)</Label>
                <Input
                  id="lastName"
                  value={userInfo.lastName || ''}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                  className="mt-1 h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  className="mt-1 h-9 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('privacy')} className="flex-1" size="sm">
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!userInfo.firstName || !userInfo.email || !isEmailValid(userInfo.email)}
                className="flex-1"
                size="sm"
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