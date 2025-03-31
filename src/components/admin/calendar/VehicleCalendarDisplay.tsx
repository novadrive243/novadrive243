
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { fr, enUS } from 'date-fns/locale';

interface VehicleCalendarDisplayProps {
  bookedDates: Date[];
  language: string;
  view?: string;
}

export const VehicleCalendarDisplay = ({ 
  bookedDates, 
  language,
  view = 'month'
}: VehicleCalendarDisplayProps) => {
  // Convert booked dates to Date objects if they're not already
  const bookedDateObjects = bookedDates.map(date => 
    date instanceof Date ? date : new Date(date)
  );
  
  // Function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDateObjects.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  // Calculate the number of months to display based on the view
  // We only support 'month' view directly, but we can adjust the behavior for others
  const getCalendarConfig = () => {
    // Default configuration with common props
    const config = {
      mode: "range" as const,
      selected: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 7))
      },
      className: "rounded-md text-nova-white",
      classNames: {
        day_today: "bg-nova-gold/20 text-nova-white",
        day_selected: "bg-nova-gold text-nova-black hover:bg-nova-gold/80",
        day_disabled: "text-nova-white/30",
        day_range_middle: "bg-nova-gold/30 text-nova-white rounded-none", 
      },
      modifiers: {
        booked: bookedDateObjects
      },
      modifiersClassNames: {
        booked: "bg-red-500/20 text-red-200 relative before:absolute before:inset-0 before:border-2 before:border-red-500/40 before:rounded-full before:scale-75"
      },
      fromMonth: new Date(),
      disabled: (date: Date) => false,
      fixedWeeks: true,
      weekStartsOn: 1,
      locale: language === 'fr' ? fr : enUS
    };

    // For "week" or "day" views, we can adjust other parameters, 
    // but since react-day-picker doesn't directly support these views, 
    // we'll have to handle them differently in a more comprehensive implementation
    // For now, we'll just adjust the number of months displayed

    return config;
  };

  return (
    <div className="rounded-md border border-nova-gold/20 p-4 bg-nova-gray/10">
      <Calendar
        {...getCalendarConfig()}
      />
      {/* We could add a note about the view mode here if needed */}
      {view !== 'month' && (
        <div className="mt-2 text-xs text-nova-white/50 text-center">
          {language === 'fr' 
            ? `Vue ${view === 'week' ? 'hebdomadaire' : 'journalière'} (aperçu limité)`
            : `${view === 'week' ? 'Weekly' : 'Daily'} view (limited preview)`}
        </div>
      )}
    </div>
  );
};
