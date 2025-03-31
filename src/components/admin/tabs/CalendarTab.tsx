
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleCalendar } from '@/components/admin/VehicleCalendar';

interface CalendarTabProps {
  vehicles: any[];
  bookings: any[];
  language: string;
  isLoading: boolean;
}

export const CalendarTab = ({
  vehicles,
  bookings,
  language,
  isLoading
}: CalendarTabProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-nova-white">
          {language === 'fr' ? 'Calendrier des Véhicules' : 'Vehicle Calendar'}
        </CardTitle>
        <CardDescription className="text-nova-white/70">
          {language === 'fr' 
            ? 'Consultez et gérez la disponibilité des véhicules' 
            : 'View and manage vehicle availability'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VehicleCalendar
          vehicles={vehicles}
          bookings={bookings}
          language={language}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
