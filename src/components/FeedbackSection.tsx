import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { MessageSquare, Star, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: '',
    rating: 0,
    isAnonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim() || !formData.feedbackType) {
      toast({
        title: "Missing Information",
        description: "Please fill in the feedback type and message.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.isAnonymous && (!formData.name.trim() || !formData.email.trim())) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email, or choose to submit anonymously.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          name: formData.isAnonymous ? null : formData.name.trim(),
          email: formData.isAnonymous ? null : formData.email.trim(),
          feedback_type: formData.feedbackType,
          message: formData.message.trim(),
          rating: formData.rating || null,
          is_anonymous: formData.isAnonymous
        });

      if (error) throw error;

      toast({
        title: "Feedback Submitted! 🎉",
        description: "Thank you for helping us improve the Genie AI Hub. Your feedback is valuable to us!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        feedbackType: '',
        message: '',
        rating: 0,
        isAnonymous: false
      });
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit feedback. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <section id="feedback" className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Share Your Feedback
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your thoughts and suggestions help us build a better AI experimentation platform. 
            We read every piece of feedback and use it to improve our community.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Help Us Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anonymous Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isAnonymous: checked as boolean }))
                  }
                />
                <label 
                  htmlFor="anonymous"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Submit feedback anonymously
                </label>
              </div>

              {/* Name and Email (if not anonymous) */}
              {!formData.isAnonymous && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      required={!formData.isAnonymous}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      required={!formData.isAnonymous}
                    />
                  </div>
                </div>
              )}

              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Feedback Type *
                </label>
                <Select 
                  value={formData.feedbackType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, feedbackType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="bug_report">Bug Report</SelectItem>
                    <SelectItem value="testimonial">Testimonial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Overall Rating (Optional)
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="p-1 rounded-sm hover:bg-primary/10 transition-colors"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Feedback *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  rows={5}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            We respect your privacy. Your feedback helps us create a better AI experimentation platform for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};