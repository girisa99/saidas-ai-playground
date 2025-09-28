import React from 'react';
import { Clock, Shield, Info, ExternalLink, BookOpen, Code, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { ConversationLimits } from '@/services/conversationLimitService';

interface ConversationLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  limits: ConversationLimits;
  context: 'technology' | 'healthcare';
}

export const ConversationLimitModal: React.FC<ConversationLimitModalProps> = ({
  isOpen,
  onClose,
  limits,
  context
}) => {
  const getContextIcon = () => {
    return context === 'technology' ? <Code className="w-5 h-5" /> : <Shield className="w-5 h-5" />;
  };

  const getContextColor = () => {
    return context === 'technology' ? 'bg-blue-500' : 'bg-green-500';
  };

  const resetTime = new Date(limits.reset_time);
  const timeUntilReset = Math.ceil((resetTime.getTime() - Date.now()) / (1000 * 60));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${getContextColor()} text-white`}>
              {getContextIcon()}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Conversation Limit Reached
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Help us maintain quality conversations for everyone
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Usage */}
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Current Usage</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Hourly:</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {limits.hourly_count} / {limits.hourly_limit}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Daily:</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {limits.daily_count} / {limits.daily_limit}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-muted-foreground">
                  Resets in: <strong>{timeUntilReset} minutes</strong>
                </span>
              </div>
            </div>
          </Card>

          {/* Educational Content */}
          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-4 h-4 text-blue-500" />
              <h3 className="font-semibold text-blue-700">About Conversational AI Limits</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                We implement conversation limits to ensure quality interactions and prevent system abuse. 
                This is a common practice in AI platforms to maintain performance and fairness.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Why Limits Matter:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Ensures equal access for all users</li>
                  <li>• Maintains system performance and reliability</li>
                  <li>• Prevents automated abuse and spam</li>
                  <li>• Encourages thoughtful, purposeful conversations</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Implementation Tips */}
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-center space-x-2 mb-3">
              <Code className="w-4 h-4 text-green-500" />
              <h3 className="font-semibold text-green-700">Building Conversational Engines</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Interested in implementing your own conversational AI? Here are key considerations:
              </p>
              <div className="grid gap-3">
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-2">Rate Limiting Strategies:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• IP-based throttling for anonymous users</li>
                    <li>• User-based limits for authenticated sessions</li>
                    <li>• Dynamic limits based on conversation complexity</li>
                    <li>• Graceful degradation with informative messages</li>
                  </ul>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
                  <h4 className="font-medium text-amber-700 mb-2">Best Practices:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Store conversation context efficiently</li>
                    <li>• Implement progressive response strategies</li>
                    <li>• Use database functions for complex logic</li>
                    <li>• Monitor usage patterns and adjust limits</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Knowledge Sharing */}
          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-purple-700">Community & Learning</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                This platform is designed for experimentation and learning. We encourage responsible use and knowledge sharing.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Documentation
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  GitHub Examples
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Community
                </Button>
              </div>
            </div>
          </Card>

          {/* Access Request Section */}
          {limits.restriction_reason === 'permanent_block' || (limits.daily_count >= limits.daily_limit && limits.hourly_count >= limits.hourly_limit) ? (
            <Card className="p-4 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-4 h-4 text-red-500" />
                <h3 className="font-semibold text-red-700">Need More Access?</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-red-600 dark:text-red-400">
                  You've reached your daily limit. If you need extended access for legitimate use cases, 
                  you can request additional quota by submitting a request through our system.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-red-200 text-red-700 hover:bg-red-50"
                  onClick={async () => {
                    const requestReason = prompt("Please describe your use case and why you need extended access:");
                    if (requestReason && requestReason.trim()) {
                      try {
                        // Get user info from the parent component or context
                        const userEmail = prompt("Please provide your email address:") || "anonymous@domain.com";
                        
                        const response = await fetch("https://ithspbabhmdntioslfqe.supabase.co/functions/v1/submit-access-request", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            user_email: userEmail,
                            ip_address: window.location.hostname,
                            request_reason: requestReason
                          })
                        });
                        
                        if (response.ok) {
                          alert("Access request submitted successfully! You will be contacted at genieaiexpermentationhub@gmail.com within 1-2 business days.");
                        } else {
                          throw new Error("Failed to submit request");
                        }
                      } catch (error) {
                        console.error("Error submitting access request:", error);
                        // Fallback to email
                        window.open(`mailto:genieaiexpermentationhub@gmail.com?subject=Genie AI Access Request&body=Use Case: ${encodeURIComponent(requestReason)}`, '_blank');
                      }
                    }
                  }}
                >
                  Request Extended Access
                </Button>
              </div>
            </Card>
          ) : (
            <div className="text-xs text-muted-foreground text-center py-2">
              Limits reset automatically every hour
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} className="min-w-[100px]">
              Understood
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};