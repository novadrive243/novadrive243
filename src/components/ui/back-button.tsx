
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button
      onClick={handleGoBack}
      variant="ghost"
      size="sm"
      className={`text-nova-gold hover:bg-transparent hover:text-nova-gold/80 absolute top-4 left-4 px-2 py-1 ${className}`}
    >
      <ChevronLeft className="mr-1 h-5 w-5" />
      {language === 'fr' ? 'Retour' : 'Back'}
    </Button>
  );
}
