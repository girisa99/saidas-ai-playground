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
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { PrivacyDialog } from "@/components/LegalDialogs";
import { FeedbackModal } from "@/components/FeedbackModal";
import { ContactModal } from "@/components/ContactModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const FAQ = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    total_subscribers: 0,
    total_likes: 0,
    total_dislikes: 0
  });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    // Check if user has already voted
    const existingVote = localStorage.getItem('genie-hub-vote');
    if (existingVote === 'like' || existingVote === 'dislike') {
      setUserVote(existingVote);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('site_stats')
        .select('stat_name, stat_value');

      if (error) throw error;

      const statsObj = {
        total_subscribers: 0,
        total_likes: 0,
        total_dislikes: 0
      };

      data?.forEach((stat) => {
        if (stat.stat_name in statsObj) {
          statsObj[stat.stat_name as keyof typeof statsObj] = stat.stat_value;
        }
      });

      setStats(statsObj);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (userVote) {
      toast({
        title: "Already Voted",
        description: "You've already shared your feedback. Thank you!",
        variant: "destructive"
      });
      return;
    }

    setIsVoting(true);

    try {
      const { error } = await supabase.functions.invoke('update-site-stats', {
        body: { statName: voteType === 'like' ? 'total_likes' : 'total_dislikes' }
      });

      if (error) throw error;

      localStorage.setItem('genie-hub-vote', voteType);
      setUserVote(voteType);

      setStats(prev => ({
        ...prev,
        [voteType === 'like' ? 'total_likes' : 'total_dislikes']: 
          prev[voteType === 'like' ? 'total_likes' : 'total_dislikes'] + 1
      }));

      toast({
        title: "Thank you!",
        description: `Your ${voteType} has been recorded. We appreciate your feedback!`,
      });
    } catch (error: any) {
      console.error('Error recording vote:', error);
      toast({
        title: "Error",
        description: "Unable to record your vote. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your first name, last name, and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { 
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          source: 'website_faq'
        }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setFirstName("");
      setLastName("");
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
        
        {/* Community Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold genie-gradient-text mb-2">
            Join Our Growing Community
          </h2>
          <p className="genie-tagline text-lg">I am your Technology Navigator</p>
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.total_subscribers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleVote('like')}
                disabled={isVoting || !!userVote}
                size="sm"
                variant={userVote === 'like' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                {stats.total_likes}
              </Button>
              <Button
                onClick={() => handleVote('dislike')}
                disabled={isVoting || !!userVote}
                size="sm"
                variant={userVote === 'dislike' ? 'destructive' : 'outline'}
                className="flex items-center gap-2"
              >
                <ThumbsDown className="w-4 h-4" />
                {stats.total_dislikes}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Newsletter Subscription CTA */}
        <div className="max-w-xl mx-auto">
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold genie-gradient-text mb-2">
                Join the GENIE AI Journey
              </h3>
              <p className="genie-tagline mb-2 text-sm">I am your Technology Navigator</p>
              <p className="text-muted-foreground text-sm">
                Subscribe to receive insights from my AI experiments, successful implementations, failed attempts, 
                and lessons learned. Join fellow AI experimenters exploring what works and what doesn't.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-sm mx-auto">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="text-sm"
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-sm"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                    size="sm"
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

            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-primary/20">
              <div className="text-center">
                <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Experiment Insights</h4>
                <p className="text-xs text-muted-foreground">Real results from AI tools testing and implementation attempts</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Connect and Share</h4>
                <p className="text-xs text-muted-foreground">Connect with other AI experimenters and share discoveries</p>
              </div>
              <div className="text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Early Access</h4>
                <p className="text-xs text-muted-foreground">Be first to try new tools and techniques I discover</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2 mt-4">
              <ContactModal 
                trigger={
                  <Button variant="default" size="sm" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Connect & Learn
                  </Button>
                }
              />
              <FeedbackModal 
                trigger={
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Share Feedback
                  </Button>
                }
              />
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};