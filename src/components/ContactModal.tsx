import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building, MessageSquare, Send, CheckCircle, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  children: React.ReactNode;
}

export const ContactModal = ({ children }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    companyName: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          contactMethod: 'Website Contact Form',
          subject: formData.subject || 'Knowledge Sharing & Learning Enquiry from Genie AI Hub'
        }
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
      });

      // Reset form
      setFormData({
        senderName: "",
        senderEmail: "",
        companyName: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });

    } catch (error: any) {
      console.error('Error sending contact email:', error);
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary">Knowledge Sharing & Learning</Badge>
          </div>
          <DialogTitle className="text-2xl text-center">Connect for Learning</DialogTitle>
          <p className="text-muted-foreground text-center">
            Ready to transform your development with AI? Let's discuss how Genie AI can accelerate your innovation journey through knowledge sharing and collaborative learning.
          </p>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Thank You for Connecting!
                </h3>
                <p className="text-muted-foreground">
                  Your message has been sent successfully. Saidas will personally review your enquiry and respond within 24-48 hours to discuss learning opportunities.
                </p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
                <Button onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senderName" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderEmail" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={formData.senderEmail}
                  onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Optional Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Company/Organization</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Your organization (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+1 (555) 123-4567 (optional)"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Learning Topic/Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="What AI/development topic would you like to explore?"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Your Learning Goals *</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us about your learning goals, current challenges, or specific AI development topics you'd like to explore through knowledge sharing..."
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Connect for Learning
                </>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              * Required fields. This platform is dedicated to knowledge sharing and collaborative learning in AI development.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};