
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DriversHeader = () => {
  const { language } = useLanguage();
  
  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 mb-8">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Découvrez notre équipe d\'élite' : 'Discover our elite team'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-nova-white/80">
          {language === 'fr' 
            ? 'Notre équipe de chauffeurs professionnels est composée d\'experts formés pour vous offrir une expérience de conduite exceptionnelle. Chaque chauffeur est certifié et possède une connaissance approfondie des véhicules de luxe et des routes.'
            : 'Our team of professional drivers consists of experts trained to provide you with an exceptional driving experience. Each driver is certified and has in-depth knowledge of luxury vehicles and routes.'}
        </p>
      </CardContent>
    </Card>
  );
};
