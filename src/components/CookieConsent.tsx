import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CookiesDialog } from "./LegalDialogs";
import { Cookie, X } from "lucide-react";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto border-primary/20 bg-background/95 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-amber-500" />
            Cookie Consent - AI Learning Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your learning experience on our AI experimentation platform. 
            These help us understand how you interact with our educational content and improve 
            platform functionality. We do not sell your data or use it for commercial purposes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <CookiesDialog 
                trigger={
                  <Button variant="outline" size="sm">
                    Learn More About Cookies
                  </Button>
                }
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={declineCookies}
                className="text-muted-foreground"
              >
                Decline
              </Button>
              <Button 
                size="sm" 
                onClick={acceptCookies}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Accept All Cookies
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <strong>Essential cookies are always active</strong> - they're required for basic platform functionality like 
            security, session management, and core learning features.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};