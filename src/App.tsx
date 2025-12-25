import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportFoundItem from "./pages/ReportFoundItem";
import ReportLostItem from "./pages/ReportLostItem";
import Matches from "./pages/Matches";
import ImageMatching from "./pages/ImageMatching";
import TextMatching from "./pages/TextMatching";
import QRRecovery from "./pages/QRRecovery";
import NearbyItems from "./pages/NearbyItems";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report-found" element={<ReportFoundItem />} />
          <Route path="/report-lost" element={<ReportLostItem />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/image-matching" element={<ImageMatching />} />
          <Route path="/text-matching" element={<TextMatching />} />
          <Route path="/qr-recovery" element={<QRRecovery />} />
          <Route path="/nearby" element={<NearbyItems />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
