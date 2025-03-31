
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
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
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
        </div>
        <Button variant="outline" size="sm" className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Ajouter' : 'Add'}
        </Button>
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
