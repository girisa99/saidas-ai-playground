import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { NewsletterService } from "@/services/newsletterService";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

export const NewsletterSubscription = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !firstName || !lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await NewsletterService.subscribe({
        email,
        firstName,
        lastName,
      });

      if (result.success) {
        setIsSubscribed(true);
        toast({
          title: "Successfully Subscribed! 🎉",
          description: result.message,
        });
        // Clear form
        setFirstName("");
        setLastName("");
        setEmail("");
        // Reset subscribed state after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        toast({
          title: "Subscription Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Stay Updated with GENIE</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Subscribe to receive weekly AI insights, platform updates, and exclusive community content from your Technology Navigator.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="bg-card rounded-xl shadow-lg p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || isSubscribed}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Subscribed!
              </>
            ) : (
              <>
                <Mail className="mr-2 h-5 w-5" />
                Subscribe to Newsletter
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By subscribing, you agree to receive our newsletter. You can{" "}
            <button
              type="button"
              onClick={() => window.open("/contact", "_blank")}
              className="underline hover:text-primary transition-colors"
            >
              unsubscribe
            </button>{" "}
            at any time. Read our{" "}
            <button
              type="button"
              onClick={() => window.open("/privacy", "_blank")}
              className="underline hover:text-primary transition-colors"
            >
              Privacy Policy
            </button>
            .
          </p>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            What you'll receive:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Weekly AI Insights
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Platform Updates
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Exclusive Content
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Community Events
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
