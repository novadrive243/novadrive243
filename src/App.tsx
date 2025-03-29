
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/language-context";

// Pages
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AccountPage from "./pages/AccountPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePinPage from "./pages/CreatePinPage";
import VerifyPinPage from "./pages/VerifyPinPage";
import ResetPinPage from "./pages/ResetPinPage";

const queryClient = new QueryClient();

// Auth Protection Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  
  // Check if user is registered
  const userData = localStorage.getItem('userData');
  if (!userData) {
    // Redirect to registration if not registered
    return <Navigate to="/register" state={{ from: location }} replace />;
  }
  
  // Check if the user has a PIN set
  const hasPin = localStorage.getItem('userPin') !== null;
  if (!hasPin) {
    // Redirect to PIN creation if no PIN
    return <Navigate to="/create-pin" state={{ from: location }} replace />;
  }
  
  // Check if PIN is verified in this session
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
              {/* Public routes - redirect to register by default if no user */}
              <Route 
                path="/" 
                element={
                  localStorage.getItem('userData') 
                    ? <Navigate to="/verify-pin" replace /> 
                    : <Navigate to="/register" replace />
                } 
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create-pin" element={<CreatePinPage />} />
              <Route path="/verify-pin" element={<VerifyPinPage />} />
              <Route path="/reset-pin" element={<ResetPinPage />} />
              
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
