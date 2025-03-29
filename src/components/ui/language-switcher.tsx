
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className={`language-switcher ${className}`}
    >
      {language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
}
