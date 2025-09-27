import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Cookie, X } from 'lucide-react';

interface PublicPrivacyBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  onCookiesAccept: () => void;
}

export const PublicPrivacyBanner: React.FC<PublicPrivacyBannerProps> = ({
  onAccept,
  onDecline,
  onCookiesAccept
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-background border rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Privacy & Terms</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <p>
            Welcome to GENIE AI public demo. By using this service, you agree to:
          </p>
          
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>This is a demonstration of AI capabilities</li>
            <li>Conversations may be monitored for quality and safety</li>
            <li>AI responses should be verified with experts</li>
            <li>Medical advice should be confirmed with healthcare providers</li>
            <li>Rate limits apply (10 requests per hour)</li>
          </ul>
          
          <Alert>
            <Cookie className="h-4 w-4" />
            <AlertDescription>
              We use minimal cookies to maintain your session and prevent abuse.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onAccept} className="flex-1">
            Accept & Continue
          </Button>
          <Button variant="outline" onClick={onDecline}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          By continuing, you accept our privacy policy and terms of use.
        </p>
      </div>
    </div>
  );
};