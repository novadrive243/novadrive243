
import React from 'react';

interface BookingStatsProps {
  bookedDatesCount: number;
  language: string;
}

export const BookingStats = ({ 
  bookedDatesCount, 
  language 
}: BookingStatsProps) => {
  return (
    <div className="text-center pt-2">
      <p className="text-nova-white/70 text-sm">
        {bookedDatesCount === 0 
          ? (language === 'fr' ? 'Aucune réservation pour ce véhicule' : 'No bookings for this vehicle') 
          : (language === 'fr' 
              ? `${bookedDatesCount} jour(s) réservé(s)` 
              : `${bookedDatesCount} day(s) booked`)}
      </p>
    </div>
  );
};
