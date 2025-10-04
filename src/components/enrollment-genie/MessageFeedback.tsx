import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MessageFeedbackProps {
  conversationId: string;
  messageIndex: number;
  domain: string;
  knowledgeBaseIds?: string[];
}

export const MessageFeedback: React.FC<MessageFeedbackProps> = ({
  conversationId,
  messageIndex,
  domain,
  knowledgeBaseIds = []
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'helpful' | 'not_helpful' | null>(null);
  const [showFeedbackText, setShowFeedbackText] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitFeedback = async (type: 'helpful' | 'not_helpful', text?: string) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('conversation_learning_feedback')
        .insert({
          conversation_id: conversationId,
          message_index: messageIndex,
          feedback_type: type,
          feedback_score: type === 'helpful' ? 5 : 1,
          feedback_text: text || null,
          knowledge_base_ids: knowledgeBaseIds.length > 0 ? knowledgeBaseIds : null,
          domain: domain,
          metadata: {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        });

      if (error) throw error;

      setFeedbackGiven(type);
      setShowFeedbackText(false);
      setFeedbackText('');
      
      toast({
        title: 'Thank you for your feedback! 🙏',
        description: 'Your input helps Genie learn and improve.',
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: 'Failed to submit feedback',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbsUp = () => {
    if (feedbackGiven) return;
    submitFeedback('helpful');
  };

  const handleThumbsDown = () => {
    if (feedbackGiven) return;
    setShowFeedbackText(true);
  };

  const handleSubmitWithText = () => {
    submitFeedback('not_helpful', feedbackText);
  };

  if (feedbackGiven) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Thanks for your feedback!</span>
        {feedbackGiven === 'helpful' ? (
          <ThumbsUp className="w-3 h-3 text-green-500 fill-green-500" />
        ) : (
          <ThumbsDown className="w-3 h-3 text-orange-500 fill-orange-500" />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {!showFeedbackText ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleThumbsUp}
            disabled={isSubmitting}
          >
            <ThumbsUp className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleThumbsDown}
            disabled={isSubmitting}
          >
            <ThumbsDown className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Textarea
            placeholder="What could be improved? (optional)"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[60px] text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSubmitWithText}
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowFeedbackText(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
