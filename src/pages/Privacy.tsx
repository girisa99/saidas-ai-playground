import { NavigationHeader } from "@/components/NavigationHeader";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for Genie AI Hub - Your data privacy and security information.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;