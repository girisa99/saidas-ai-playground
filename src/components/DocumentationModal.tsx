import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { DocumentsSection } from "./DocumentsSection";

interface DocumentationModalProps {
  trigger: React.ReactNode;
}

export const DocumentationModal = ({ trigger }: DocumentationModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation Hub
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              AI Experimentation Knowledge Repository
            </h2>
            <p className="text-base text-muted-foreground font-normal max-w-3xl mx-auto">
              Dive deep into comprehensive guides, personal insights, and practical methodologies 
              from my AI experimentation journey. Learn from real implementations, successes, and failures.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <DocumentsSection />
        </div>
      </DialogContent>
    </Dialog>
  );
};