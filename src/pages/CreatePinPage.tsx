
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { CreatePinForm } from "@/components/auth/create-pin-form";

const CreatePinPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gold-gradient-text">NovaDrive</span>
          </h1>
          <p className="text-nova-white/70">
            {t('createPin.slogan') || 'Le Pouvoir du Mouvement'}
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-nova-white mb-2">
            {t('createPin.title') || 'Create PIN'}
          </h2>
          <p className="text-nova-white/70 mb-6">
            {t('createPin.subtitle') || 'Create a 6-digit PIN to secure your account'}
          </p>
          
          <CreatePinForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-nova-white/50 text-sm">
            &copy; {new Date().getFullYear()} NovaDrive. {t('createPin.rights') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePinPage;
