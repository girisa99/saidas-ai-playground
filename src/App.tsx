import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingGenie } from "@/components/FloatingGenie";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Journey = lazy(() => import("./pages/Journey"));
const About = lazy(() => import("./pages/About"));
const TechnologyStack = lazy(() => import("./pages/TechnologyStack"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Docs = lazy(() => import("./pages/Docs"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Cookies = lazy(() => import("./pages/Cookies"));
const BusinessUseCases = lazy(() => import("./pages/BusinessUseCases"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <CookieConsent />
    
    <BrowserRouter>
      {/* Floating Genie AI Assistant */}
      <FloatingGenie />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<TechnologyStack />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/business-use-cases" element={<BusinessUseCases />} />
          
          <Route path="/docs" element={<Docs />} />
          <Route path="/contact" element={<Contact />} />
          

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
