import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building, MessageSquare, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
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
          subject: formData.subject || 'Contact Form Enquiry from Genie AI Hub'
        }
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your enquiry. We'll get back to you within 24-48 hours.",
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

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Thank You for Your Enquiry!
              </h3>
              <p className="text-muted-foreground">
                Your message has been sent successfully. Saidas will personally review your enquiry and respond within 24-48 hours.
              </p>
            </div>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary">Contact Form</Badge>
        </div>
        <CardTitle className="text-2xl">Get in Touch</CardTitle>
        <p className="text-muted-foreground">
          Ready to transform your development with AI? Let's discuss how Genie AI can accelerate your innovation journey.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                <span>Company Name</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company (optional)"
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
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="What would you like to discuss?"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Message *</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your project, goals, or how we can help you leverage AI in your development process..."
              rows={6}
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
                Send Message
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            * Required fields. We'll respond within 24-48 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};