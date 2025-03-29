
import { Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/toaster";

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
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="h-screen w-screen bg-nova-black flex items-center justify-center text-nova-gold">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-pin" element={<CreatePinPage />} />
          <Route path="/verify-pin" element={<VerifyPinPage />} />
          <Route path="/reset-pin" element={<ResetPinPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Suspense>
    </LanguageProvider>
  );
}

export default App;
