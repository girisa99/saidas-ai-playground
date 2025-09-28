import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { EmailIntegrationTester } from "@/components/EmailIntegrationTester";
import { useEffect } from "react";

const EmailTest = () => {
  useEffect(() => {
    document.title = "Email Integration Test - Genie AI Hub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test email integration including newsletter subscriptions, contact forms, and Genie AI auto-subscription flow.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
        <EmailIntegrationTester />
      </main>
      <Footer />
    </div>
  );
};

export default EmailTest;