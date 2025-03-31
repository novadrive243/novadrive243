
import React from 'react';
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
    <div className="w-full h-full">
      <VehicleCalendar
        vehicles={vehicles}
        bookings={bookings}
        language={language}
        isLoading={isLoading}
      />
    </div>
  );
};
