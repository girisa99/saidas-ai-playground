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
import { Link } from "react-router-dom";

export const FAQ = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      console.log("Subscribed email:", email);
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
                  <Button type="submit" className="bg-primary hover:bg-primary/90 px-6">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  No spam, unsubscribe at any time. Read my <Link to="/privacy" className="underline">Privacy Policy</Link>
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
                <h4 className="font-semibold text-foreground mb-1">Community Learning</h4>
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

        {/* Learning Focus Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Want to Share Your AI Experiments?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  I'm always interested in learning what's working for others. Share your AI experiments, 
                  failed attempts, or interesting discoveries. Let's learn together!
                </p>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
                >
                  Connect & Share
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};