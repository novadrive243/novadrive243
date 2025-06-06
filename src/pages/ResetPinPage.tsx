
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { ResetPinForm } from "@/components/auth/reset-pin-form";

const ResetPinPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gold-gradient-text">NovaDrive</span>
          </h1>
          <p className="text-nova-white/70">
            {t('resetPin.slogan') || 'Le Pouvoir du Mouvement'}
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-nova-white mb-2">
            {t('resetPin.title') || 'Reset PIN'}
          </h2>
          <p className="text-nova-white/70 mb-6">
            {t('resetPin.subtitle') || 'Please enter your email to reset your PIN'}
          </p>
          
          <ResetPinForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-nova-white/50 text-sm">
            &copy; {new Date().getFullYear()} NovaDrive. {t('resetPin.rights') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPinPage;
