
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Award, GraduationCap } from 'lucide-react';

interface DriverRecruitmentCardProps {
  onApplyClick?: () => void;
}

export function DriverRecruitmentCard({ onApplyClick }: DriverRecruitmentCardProps) {
  const { language } = useLanguage();
  
  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-nova-gold" />
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Rejoignez notre équipe' : 'Join our team'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-nova-white/80 mb-6">
          {language === 'fr' 
            ? 'Nous recherchons des chauffeurs professionnels passionnés et expérimentés pour rejoindre notre équipe d\'élite.' 
            : 'We are looking for passionate and experienced professional drivers to join our elite team.'}
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Briefcase className="h-5 w-5 text-nova-gold mt-0.5" />
            <div>
              <h3 className="text-nova-white font-medium">
                {language === 'fr' ? 'Expérience requise' : 'Required experience'}
              </h3>
              <p className="text-nova-white/70 text-sm">
                {language === 'fr' 
                  ? 'Minimum 3 ans d\'expérience en conduite professionnelle' 
                  : 'Minimum 3 years of professional driving experience'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-nova-gold mt-0.5" />
            <div>
              <h3 className="text-nova-white font-medium">
                {language === 'fr' ? 'Certifications' : 'Certifications'}
              </h3>
              <p className="text-nova-white/70 text-sm">
                {language === 'fr' 
                  ? 'Permis valide, formations en service client et sécurité appréciées' 
                  : 'Valid license, customer service and safety training appreciated'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-nova-gold mt-0.5" />
            <div>
              <h3 className="text-nova-white font-medium">
                {language === 'fr' ? 'Compétences' : 'Skills'}
              </h3>
              <p className="text-nova-white/70 text-sm">
                {language === 'fr' 
                  ? 'Maîtrise du français et de l\'anglais, autres langues appréciées' 
                  : 'Fluency in French and English, other languages appreciated'}
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-nova-gold text-nova-black hover:bg-nova-gold/90"
          onClick={onApplyClick}
        >
          {language === 'fr' ? 'Postuler maintenant' : 'Apply now'}
        </Button>
      </CardContent>
    </Card>
  );
}
