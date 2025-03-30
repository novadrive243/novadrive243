import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { BackButton } from "./components/ui/back-button";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CreatePinPage = lazy(() => import("./pages/CreatePinPage"));
const VerifyPinPage = lazy(() => import("./pages/VerifyPinPage"));
const ResetPinPage = lazy(() => import("./pages/ResetPinPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

// Layout component to add back button
const PageLayout = ({ children, showBackButton = true }: { children: React.ReactNode, showBackButton?: boolean }) => {
  return (
    <div className="relative">
      {showBackButton && <BackButton />}
      {children}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="h-screen w-screen bg-nova-black flex items-center justify-center text-nova-gold">Loading...</div>}>
        <Routes>
          <Route path="/" element={<PageLayout showBackButton={false}><HomePage /></PageLayout>} />
          <Route path="/home" element={<PageLayout showBackButton={false}><HomePage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/services" element={<PageLayout><ServicesPage /></PageLayout>} />
          <Route path="/pricing" element={<PageLayout><PricingPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="/book" element={<PageLayout><BookingPage /></PageLayout>} />
          <Route path="/login" element={<PageLayout><LoginPage /></PageLayout>} />
          <Route path="/register" element={<PageLayout><RegisterPage /></PageLayout>} />
          <Route path="/create-pin" element={<PageLayout><CreatePinPage /></PageLayout>} />
          <Route path="/verify-pin" element={<PageLayout><VerifyPinPage /></PageLayout>} />
          <Route path="/reset-pin" element={<PageLayout><ResetPinPage /></PageLayout>} />
          <Route path="/account" element={<PageLayout><AccountPage /></PageLayout>} />
          <Route path="/admin" element={<PageLayout><AdminPage /></PageLayout>} />
          <Route path="/terms" element={<PageLayout><TermsPage /></PageLayout>} />
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
        <Toaster />
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
