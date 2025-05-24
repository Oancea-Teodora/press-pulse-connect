
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { BusinessDashboard } from "./pages/business/Dashboard";
import { NewRequest } from "./pages/business/NewRequest";
import { AgencyDashboard } from "./pages/agency/Dashboard";
import { AgencyClients } from "./pages/agency/Clients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Business Routes */}
            <Route path="/business/dashboard" element={<BusinessDashboard />} />
            <Route path="/business/new-request" element={<NewRequest />} />
            
            {/* Agency Routes */}
            <Route path="/agency/dashboard" element={<AgencyDashboard />} />
            <Route path="/agency/clients" element={<AgencyClients />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
