
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationsManager } from '@/components/admin/NotificationsManager';

interface NotificationsTabProps {
  language: string;
}

export const NotificationsTab = ({
  language
}: NotificationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'fr' ? 'Gestion des Notifications' : 'Notifications Management'}</CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? 'Créer et gérer les notifications système' 
            : 'Create and manage system notifications'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationsManager language={language} />
      </CardContent>
    </Card>
  );
};
