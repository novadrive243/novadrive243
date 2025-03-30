
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
      variant="outline"
      size="sm"
      className={`border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10 ${className}`}
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      {language === 'fr' ? 'Retour' : 'Back'}
    </Button>
  );
}
