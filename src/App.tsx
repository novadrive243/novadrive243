
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/language-context";

// Pages
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import CreatePinPage from "./pages/CreatePinPage";
import VerifyPinPage from "./pages/VerifyPinPage";

const queryClient = new QueryClient();

// Auth Protection Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const hasPin = localStorage.getItem('userPin') !== null;
  
  // Check if the user has a PIN set
  // If yes, they need to verify their PIN when accessing protected routes
  // If not, they need to create a PIN first
  
  if (!hasPin) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if the user is coming from login or PIN creation
  // and is already verified in this session
  const isPinVerified = sessionStorage.getItem('pinVerified') === 'true';
  
  if (!isPinVerified && location.pathname !== '/verify-pin') {
    // Redirect to PIN verification
    return <Navigate to="/verify-pin" state={{ from: location }} replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes - redirect to login by default */}
              <Route 
                path="/" 
                element={<Navigate to="/login" replace />} 
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-pin" element={<CreatePinPage />} />
              <Route path="/verify-pin" element={<VerifyPinPage />} />
              
              {/* Protected routes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/book" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={
                <ProtectedRoute>
                  <PricingPage />
                </ProtectedRoute>
              } />
              <Route path="/services" element={
                <ProtectedRoute>
                  <ServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
