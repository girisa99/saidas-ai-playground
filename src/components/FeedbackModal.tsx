import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { MessageSquare, Star, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  trigger: React.ReactNode;
}

export const FeedbackModal = ({ trigger }: FeedbackModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    feedbackType: '',
    message: '',
    rating: 0,
    isAnonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

    if (!formData.isAnonymous && (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim())) {
      toast({
        title: "Missing Information",
        description: "Please provide your first name, last name, and email, or choose to submit anonymously.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          name: formData.isAnonymous ? null : `${formData.firstName.trim()} ${formData.lastName.trim()}`,
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

      // Reset form and close modal
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        feedbackType: '',
        message: '',
        rating: 0,
        isAnonymous: false
      });
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Share Your Learning Feedback
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Help us improve our AI experimentation hub through your insights and suggestions for better knowledge sharing and learning experiences.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                  required={!formData.isAnonymous}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Doe"
                  required={!formData.isAnonymous}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john.doe@example.com"
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
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};