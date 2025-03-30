
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-nova-black flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-nova-white border border-nova-gold px-3 py-1 rounded shadow-[0_0_10px_rgba(232,191,82,0.5)]">NovaDrive</span>
          </h1>
          <p className="text-nova-white/70">
            Le Pouvoir du Mouvement
          </p>
        </div>
        
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6">
          {/* Removed the translation here since we're handling it directly in LoginForm */}
          <LoginForm />
        </div>
        
        <div className="text-center mt-6">
          <Button 
            onClick={() => navigate('/register')}
            variant="outline" 
            className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          >
            {t('login.register') || 'Create Account'}
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-nova-white/50 text-sm">
            &copy; {new Date().getFullYear()} NovaDrive. {t('login.rights') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
