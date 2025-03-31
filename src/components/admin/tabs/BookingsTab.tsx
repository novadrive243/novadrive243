
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingsTable } from '@/components/admin/BookingsTable';

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
        <CardTitle>Bookings</CardTitle>
        <CardDescription>Manage customer bookings and reservations</CardDescription>
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
