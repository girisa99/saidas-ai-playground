import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail,
  MessageSquare,
  BookOpen,
  Users,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { PrivacyDialog } from "@/components/LegalDialogs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const FAQ = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { 
          email: email.trim(),
          source: 'website_faq'
        }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Welcome aboard! 🧞‍♂️",
        description: "You've successfully subscribed to our newsletter. Check your email for a welcome message!",
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Unable to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        
        {/* Newsletter Subscription CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Join the AI Experimentation Journey
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Subscribe to receive insights from my AI experiments, successful implementations, failed attempts, 
                and lessons learned. Join fellow AI enthusiasts exploring what works and what doesn't.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 px-6 disabled:opacity-50"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  No spam, unsubscribe at any time. Read my <PrivacyDialog trigger={<button className="underline text-muted-foreground hover:text-foreground">Privacy Policy</button>} />
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Thank you for joining the journey!
                </h4>
                <p className="text-muted-foreground">
                  You'll receive my latest AI experiments and insights soon.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-primary/20">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Experiment Insights</h4>
                <p className="text-sm text-muted-foreground">Real results from AI tools testing and implementation attempts</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Connect and Share</h4>
                <p className="text-sm text-muted-foreground">Connect with other AI experimenters and share discoveries</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Early Access</h4>
                <p className="text-sm text-muted-foreground">Be first to try new tools and techniques I discover</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};