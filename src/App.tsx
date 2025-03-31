
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import { LanguageProvider } from '@/contexts/language-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { Toaster } from '@/components/ui/toaster';
import { supabase } from "@/integrations/supabase/client";

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePinPage from './pages/CreatePinPage';
import VerifyPinPage from './pages/VerifyPinPage';
import ResetPinPage from './pages/ResetPinPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import DriversPage from './pages/DriversPage';
import NotFound from './pages/NotFound';

// Add the new routes
import DriverDetailPage from './pages/DriverDetailPage';
import AdminDriversPage from './pages/drivers/AdminDriversPage';

function App() {
  const [cookies, setCookie] = useCookies(['session_id']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if session_id exists in cookies
    if (!cookies.session_id) {
      // Generate a unique session ID
      const sessionId = uuidv4();

      // Set the session ID as a cookie
      setCookie('session_id', sessionId, { path: '/', maxAge: 3600 }); // Expires in 1 hour
      
      // Store session information in Supabase
      const storeSessionInfo = async () => {
        try {
          // Get browser info
          const deviceInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenSize: `${window.screen.width}x${window.screen.height}`
          };
          
          // Store anonymous session (will be linked to user when they log in)
          await supabase.from('user_sessions').insert({
            session_id: sessionId,
            device_info: JSON.stringify(deviceInfo),
            is_active: true
          });
        } catch (error) {
          console.error('Error storing session:', error);
        }
      };
      
      storeSessionInfo();
    }
  }, [cookies.session_id, setCookie]);

  // Prevent access to create-pin, verify-pin, and reset-pin pages if already on account page
  useEffect(() => {
    const allowedPaths = ['/create-pin', '/verify-pin', '/reset-pin'];
    const isOnAllowedPath = allowedPaths.includes(location.pathname);
    const hasPin = localStorage.getItem('pin');

    if (isOnAllowedPath && hasPin) {
      navigate('/account');
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create-pin" element={<CreatePinPage />} />
      <Route path="/verify-pin" element={<VerifyPinPage />} />
      <Route path="/reset-pin" element={<ResetPinPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/drivers/:driverId" element={<DriverDetailPage />} />
      <Route path="/admin/drivers" element={<AdminDriversPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function RootApp() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-react-theme">
      <LanguageProvider>
        <App />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default RootApp;
