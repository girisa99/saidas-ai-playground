import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingGenie } from "@/components/FloatingGenie";
import { MobileOptimizations } from "@/components/MobileOptimizations";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Journey = lazy(() => import("./pages/Journey"));
const About = lazy(() => import("./pages/About"));
const TechnologyStack = lazy(() => import("./pages/TechnologyStack"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CellGene = lazy(() => import("./pages/CellGene"));
const Docs = lazy(() => import("./pages/Docs"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Cookies = lazy(() => import("./pages/Cookies"));
const BusinessUseCases = lazy(() => import("./pages/BusinessUseCases"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EmailTest = lazy(() => import("./pages/EmailTest"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  useVisitorTracking();
  
  return (
    <>
      <FloatingGenie />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<TechnologyStack />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/cellgene" element={<CellGene />} />
          <Route path="/business-use-cases" element={<BusinessUseCases />} />
          
          <Route path="/docs" element={<Docs />} />
          <Route path="/email-test" element={<EmailTest />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MobileOptimizations />
    <Toaster />
    <Sonner />
    <CookieConsent />
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
