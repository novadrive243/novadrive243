
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { VerifyAdminPinForm } from '@/components/auth/verify-admin-pin-form';

const LoginPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [showPinVerification, setShowPinVerification] = useState(false);
  
  useEffect(() => {
    // Check if admin PIN exists in localStorage
    const adminPin = localStorage.getItem('adminPin');
    if (adminPin) {
      setShowPinVerification(true);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-white border border-nova-gold px-3 py-1 rounded shadow-[0_0_10px_rgba(232,191,82,0.5)]">NovaDrive</span>
          </h1>
          <p className="text-white/70">
            Le Pouvoir du Mouvement
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          {showPinVerification ? (
            <VerifyAdminPinForm 
              onBackToLogin={() => setShowPinVerification(false)}
            />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
