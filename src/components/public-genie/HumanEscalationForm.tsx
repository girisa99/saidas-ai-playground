import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Send, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
}

type Context = 'technology' | 'healthcare';

interface HumanEscalationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: any) => void;
  userInfo: UserInfo;
  context: Context;
}

export const HumanEscalationForm: React.FC<HumanEscalationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userInfo,
  context
}) => {
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        message: message.trim(),
        urgency,
        context
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Request Human Agent
          </DialogTitle>
        </DialogHeader>
        
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Our {context} experts typically respond within 2-24 hours. We'll send updates to {userInfo.email}.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="urgency">Priority Level</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Need guidance</SelectItem>
                <SelectItem value="high">High - Time sensitive</SelectItem>
                <SelectItem value="urgent">Urgent - Critical support needed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="message">How can our human expert help you?</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Describe what ${context} expertise you need...`}
              rows={4}
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
              <Send className="h-4 w-4 ml-2" />
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};