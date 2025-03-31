
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';

interface BookingsTabProps {
  bookings: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
}

export const BookingsTab = ({
  bookings,
  language,
  formatDate,
  formatCurrency
}: BookingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'fr' ? 'Réservations' : 'Bookings'}
        </CardTitle>
        <CardDescription>
          {language === 'fr' 
            ? bookings.length > 0 
              ? 'Gérer les réservations et les réservations des clients' 
              : 'Aucune réservation disponible. Commencez à ajouter des réservations.'
            : bookings.length > 0 
              ? 'Manage customer bookings and reservations' 
              : 'No bookings available. Start adding bookings.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BookingsTable 
          bookings={bookings}
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </CardContent>
    </Card>
  );
};
