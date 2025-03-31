
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
    <div className="text-center py-3 border-t border-nova-gold/20 mt-2">
      <p className="text-nova-white/70 text-sm">
        {bookedDatesCount === 0 
          ? (language === 'fr' ? 'Aucune réservation pour ce véhicule' : 'No bookings for this vehicle') 
          : (language === 'fr' 
              ? `${bookedDatesCount} jour${bookedDatesCount > 1 ? 's' : ''} réservé${bookedDatesCount > 1 ? 's' : ''}` 
              : `${bookedDatesCount} day${bookedDatesCount !== 1 ? 's' : ''} booked`)}
      </p>
    </div>
  );
};
