
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RidesHistory } from '@/components/admin/RidesHistory';
import { useLanguage } from '@/contexts/language-context';

export const RidesTab = () => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('account.reservationHistory')}</CardTitle>
        <CardDescription>{t('account.reservationHistory')}</CardDescription>
      </CardHeader>
      <CardContent>
        <RidesHistory />
      </CardContent>
    </Card>
  );
};
