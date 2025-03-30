
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export const RecruitmentSection = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-12 bg-nova-black/40 border-nova-gold/20 border rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-nova-white">
        {language === 'fr' ? 'Vous souhaitez rejoindre notre équipe ?' : 'Want to join our team?'}
      </h2>
      <p className="text-nova-white/80 mb-6">
        {language === 'fr' 
          ? 'Si vous êtes un chauffeur professionnel et que vous souhaitez rejoindre l\'équipe NovaDrive, envoyez-nous votre CV et une lettre de motivation.' 
          : 'If you are a professional driver and would like to join the NovaDrive team, send us your resume and cover letter.'}
      </p>
      <Button className="gold-btn">
        {language === 'fr' ? 'Postuler maintenant' : 'Apply now'}
      </Button>
    </div>
  );
};
