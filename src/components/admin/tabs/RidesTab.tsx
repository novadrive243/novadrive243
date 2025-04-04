
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RidesHistory } from '@/components/admin/RidesHistory';
import { useLanguage } from '@/contexts/language-context';

export const RidesTab = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="shadow-md bg-nova-black border-nova-gold/20">
      <CardHeader>
        <CardTitle className="text-xl text-nova-white">{t('account.reservationHistory')}</CardTitle>
        <CardDescription className="text-nova-white/70">
          {t('account.viewReservations')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RidesHistory />
      </CardContent>
    </Card>
  );
};
