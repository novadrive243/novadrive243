
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-white border border-nova-gold px-3 py-1 rounded shadow-[0_0_10px_rgba(232,191,82,0.5)]">NovaDrive</span>
          </h1>
          <p className="text-white/70">
            Le Pouvoir du Mouvement
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {t('register.title') || 'Create Your Account'}
          </h2>
          
          <RegisterForm />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} NovaDrive. {t('register.rights') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
