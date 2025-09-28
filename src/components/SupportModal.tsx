import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  ExternalLink,
  Mail,
  FileText,
  BookOpen,
  Users,
  Lightbulb,
  Headphones,
  Calendar,
  Star
} from "lucide-react";
import { ContactModal } from "./ContactModal";
import { FeedbackModal } from "./FeedbackModal";
import { DocumentationModal } from "./DocumentationModal";

interface SupportModalProps {
  trigger: React.ReactNode;
}

export const SupportModal = ({ trigger }: SupportModalProps) => {
  const supportOptions = [
    {
      title: "Direct Contact",
      description: "Get in touch directly for specific questions or collaboration opportunities",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      action: "contact"
    },
    {
      title: "Share Feedback",
      description: "Share your thoughts, suggestions, or your own AI experimentation experiences",
      icon: Star,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      action: "feedback"
    },
    {
      title: "LinkedIn Connect",
      description: "Connect with me on LinkedIn for ongoing discussions and networking",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      action: "linkedin"
    },
    {
      title: "Documentation",
      description: "Browse through detailed documentation and implementation guides",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      action: "docs"
    }
  ];

  const handleAction = (action: string) => {
    switch (action) {
      case 'linkedin':
        window.open('https://www.linkedin.com/in/saidas/', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              Support Center
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              How Can I Help You?
            </h2>
            <p className="text-base text-muted-foreground font-normal">
              Choose the best way to get the support or information you need.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card key={index} className={`${option.bgColor} ${option.borderColor} border-2 p-6 hover:shadow-lg transition-all duration-200`}>
                <div className="text-center">
                  <div className={`w-12 h-12 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border ${option.borderColor}`}>
                    <IconComponent className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  
                  {option.action === 'contact' && (
                    <ContactModal 
                      trigger={
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          Contact Me
                          <MessageSquare className="ml-2 h-4 w-4" />
                        </Button>
                      }
                    />
                  )}
                  
                  {option.action === 'feedback' && (
                    <FeedbackModal 
                      trigger={
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                          Share Feedback
                          <Star className="ml-2 h-4 w-4" />
                        </Button>
                      }
                    />
                  )}
                  
                  {option.action === 'linkedin' && (
                    <Button 
                      onClick={() => handleAction(option.action)}
                      className="w-full"
                    >
                      Connect on LinkedIn
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  
                  {option.action === 'docs' && (
                    <DocumentationModal 
                      trigger={
                        <Button className="w-full" variant="outline">
                          View Documentation
                          <FileText className="ml-2 h-4 w-4" />
                        </Button>
                      }
                    />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Quick Support Tips
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong>Technical Questions:</strong> Use the contact form for detailed technical discussions
                </div>
                <div>
                  <strong>Collaboration:</strong> Connect on LinkedIn for partnership opportunities
                </div>
                <div>
                  <strong>General Feedback:</strong> Use the feedback form to share your thoughts
                </div>
                <div>
                  <strong>Documentation:</strong> Check the docs section for implementation guides
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};