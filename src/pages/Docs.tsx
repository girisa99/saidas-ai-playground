import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { DocumentsSection } from "@/components/DocumentsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Docs = () => {
  useEffect(() => {
    // Update page metadata
    document.title = "Documentation - AI Experimentation Knowledge Repository";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive documentation and insights from AI experimentation journey - practical guides for transformation and strategic implementation.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12">
              <Link to="/">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation Hub
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                AI Experimentation Knowledge Repository
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dive deep into comprehensive guides, personal insights, and practical methodologies 
                from my AI experimentation journey. Learn from real implementations, successes, and failures.
              </p>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <DocumentsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Docs;