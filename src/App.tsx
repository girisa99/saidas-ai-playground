import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import Journey from "./pages/Journey";
import About from "./pages/About";
import TechnologyStack from "./pages/TechnologyStack";
import CaseStudies from "./pages/CaseStudies";
import FAQPage from "./pages/FAQPage";
import Docs from "./pages/Docs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms.tsx";
import Disclaimer from "./pages/Disclaimer.tsx";
import Cookies from "./pages/Cookies.tsx";
import BusinessUseCases from "./pages/BusinessUseCases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieConsent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<TechnologyStack />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/business-use-cases" element={<BusinessUseCases />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/docs" element={<Docs />} />
          
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
