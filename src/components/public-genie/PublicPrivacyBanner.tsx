import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Cookie, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublicPrivacyBannerProps {
  onAccept: (userInfo: { firstName: string; lastName?: string; email: string; contextType: 'technology' | 'healthcare' }) => void;
  onDecline: () => void;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  contextType: 'technology' | 'healthcare';
}

export const PublicPrivacyBanner: React.FC<PublicPrivacyBannerProps> = ({
  onAccept,
  onDecline
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    contextType: 'technology'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInfo.firstName.trim()) {
      toast({
        title: "First Name Required",
        description: "Please enter your first name to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userInfo.email.trim() || !userInfo.email.includes('@')) {
      toast({
        title: "Valid Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate validation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onAccept({
        firstName: userInfo.firstName.trim(),
        lastName: userInfo.lastName.trim() || undefined,
        email: userInfo.email.trim(),
        contextType: userInfo.contextType
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Welcome to GENIE AI</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Information */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter last name (optional)"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Context Selection */}
          <div>
            <Label htmlFor="contextType">AI Expertise Focus</Label>
            <Select value={userInfo.contextType} onValueChange={(value: 'technology' | 'healthcare') => setUserInfo(prev => ({ ...prev, contextType: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology & AI Innovation</SelectItem>
                <SelectItem value="healthcare">Healthcare & Biotech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy Agreement */}
          <Alert>
            <Cookie className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Privacy & Terms:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                <li>This is a demonstration of AI capabilities</li>
                <li>Conversations may be monitored for quality and safety</li>
                <li>AI responses should be verified with experts</li>
                <li>Medical advice should be confirmed with healthcare providers</li>
                <li>Rate limits apply (10 requests per hour)</li>
                <li>We use minimal cookies to maintain your session</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Starting...' : 'Accept & Start Chat'}
            </Button>
            <Button type="button" variant="outline" onClick={onDecline}>
              Decline
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-muted-foreground text-center">
          By continuing, you accept our privacy policy and terms of use.
        </p>
      </div>
    </div>
  );
};