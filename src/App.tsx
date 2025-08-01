import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { NewsProvider } from "@/contexts/NewsContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import Books from "./pages/Books";
import News from "./pages/News";
import PYQs from "./pages/PYQs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize global smooth scrolling
  useSmoothScroll();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NewsProvider>
          <div className="relative overflow-x-hidden">
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news" element={<News />} />
              <Route path="/pyqs" element={<PYQs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/books" element={<Books />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        </NewsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
