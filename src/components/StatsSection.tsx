import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface SiteStats {
  total_subscribers: number;
  total_likes: number;
  total_dislikes: number;
}

export const StatsSection = () => {
  const [stats, setStats] = useState<SiteStats>({
    total_subscribers: 0,
    total_likes: 0,
    total_dislikes: 0
  });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    // Check if user has already voted (stored in localStorage)
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

      const statsObj: SiteStats = {
        total_subscribers: 0,
        total_likes: 0,
        total_dislikes: 0
      };

      data?.forEach((stat) => {
        if (stat.stat_name in statsObj) {
          statsObj[stat.stat_name as keyof SiteStats] = stat.stat_value;
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

    setIsLoading(true);

    try {
      // Call Supabase function to update stats
      const { error } = await supabase.functions.invoke('update-site-stats', {
        body: { statName: voteType === 'like' ? 'total_likes' : 'total_dislikes' }
      });

      if (error) throw error;

      // Store vote in localStorage
      localStorage.setItem('genie-hub-vote', voteType);
      setUserVote(voteType);

      // Update local stats
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
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Community Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of AI enthusiasts and researchers making a difference in the world of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Subscribers Count */}
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stats.total_subscribers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Newsletter Subscribers
              </div>
            </CardContent>
          </Card>

          {/* Likes */}
          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950 dark:to-green-900 dark:border-green-800">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stats.total_likes.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground font-medium mb-3">
                Community Likes
              </div>
              <Button
                onClick={() => handleVote('like')}
                disabled={isLoading || !!userVote}
                size="sm"
                variant={userVote === 'like' ? 'default' : 'outline'}
                className="w-full"
              >
                {userVote === 'like' ? 'Liked!' : 'Like This Hub'}
              </Button>
            </CardContent>
          </Card>

          {/* Dislikes */}
          <Card className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-950 dark:to-red-900 dark:border-red-800">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsDown className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stats.total_dislikes.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground font-medium mb-3">
                Improvement Feedback
              </div>
              <Button
                onClick={() => handleVote('dislike')}
                disabled={isLoading || !!userVote}
                size="sm"
                variant={userVote === 'dislike' ? 'destructive' : 'outline'}
                className="w-full"
              >
                {userVote === 'dislike' ? 'Feedback Sent' : 'Needs Improvement'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {userVote && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Thank you for your feedback! Want to share more thoughts? 
              <a href="#feedback" className="text-primary hover:underline ml-1">
                Leave detailed feedback below
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};