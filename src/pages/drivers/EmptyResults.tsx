
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

interface EmptyResultsProps {
  resetFilters: () => void;
}

export const EmptyResults = ({ resetFilters }: EmptyResultsProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-8 text-center mt-8">
      <p className="text-nova-gold text-lg">
        {language === 'fr' 
          ? 'Aucun chauffeur ne correspond à votre recherche.' 
          : 'No drivers match your search.'}
      </p>
      <Button 
        variant="outline" 
        className="mt-4 border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
        onClick={resetFilters}
      >
        {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
      </Button>
    </div>
  );
};
