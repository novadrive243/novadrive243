
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
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Calendar</CardTitle>
        <CardDescription>View and manage vehicle availability</CardDescription>
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
