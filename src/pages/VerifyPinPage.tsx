
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { VerifyPinForm } from "@/components/auth/verify-pin-form";

const VerifyPinPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gold-gradient-text">NovaDrive</span>
          </h1>
          <p className="text-nova-white/70">
            {t('verifyPin.slogan') || 'Le Pouvoir du Mouvement'}
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-nova-white mb-2">
            {t('verifyPin.title') || 'Enter PIN'}
          </h2>
          <p className="text-nova-white/70 mb-6">
            {t('verifyPin.subtitle') || 'Please enter your 6-digit PIN to continue'}
          </p>
          
          <VerifyPinForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-nova-white/50 text-sm">
            &copy; {new Date().getFullYear()} NovaDrive. {t('verifyPin.rights') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPinPage;
