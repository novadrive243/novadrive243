
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { fr, enUS } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, User } from 'lucide-react';
import { useTimezone } from '@/hooks/use-timezone';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VehicleCalendarDisplayProps {
  bookedDates: Date[];
  bookingsData?: any[];
  language: string;
  view?: string;
}

export const VehicleCalendarDisplay = ({ 
  bookedDates, 
  bookingsData = [],
  language,
  view = 'month'
}: VehicleCalendarDisplayProps) => {
  const { toKinshasaTime } = useTimezone();
  
  // Convert booked dates to Date objects in Kinshasa timezone if they're not already
  const bookedDateObjects = bookedDates.map(date => 
    date instanceof Date ? toKinshasaTime(date) : toKinshasaTime(new Date(date))
  );
  
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: toKinshasaTime(new Date()),
    to: undefined
  });
  
  // Function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDateObjects.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Function to get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return bookingsData.filter(booking => {
      const bookingStartDate = new Date(booking.start_date);
      const bookingEndDate = new Date(booking.end_date);
      return date >= bookingStartDate && date <= bookingEndDate;
    });
  };
  
  // Custom day component to show customer name tooltips
  const renderDay = (day: Date) => {
    const bookingsForDate = getBookingsForDate(day);
    if (bookingsForDate.length === 0) return null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="sr-only">Booking info</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
            <div className="space-y-1 max-w-xs">
              <div className="font-semibold">
                {language === 'fr' ? 'Réservations pour cette date:' : 'Bookings for this date:'}
              </div>
              {bookingsForDate.map((booking: any, index: number) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <User className="h-3 w-3" /> {booking.userName || 'Client'}
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="border border-nova-gold/20 bg-nova-gray/10">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4 text-sm text-nova-white/70">
          <Info size={16} />
          <span>
            {language === 'fr' 
              ? 'Cliquez pour sélectionner une plage de dates'
              : 'Click to select a date range'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className="bg-nova-gold/20 text-nova-gold border-nova-gold/40">
              {language === 'fr' ? 'Disponible' : 'Available'}
            </Badge>
            <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/40">
              {language === 'fr' ? 'Réservé' : 'Booked'}
            </Badge>
            <Badge variant="outline" className="bg-nova-gold text-nova-black border-nova-gold">
              {language === 'fr' ? 'Sélectionné' : 'Selected'}
            </Badge>
          </div>
          
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            className="rounded-md text-nova-white"
            classNames={{
              day_today: "bg-nova-gold/20 text-nova-white",
              day_selected: "bg-nova-gold text-nova-black hover:bg-nova-gold/80",
              day_disabled: "text-nova-white/30",
              day_range_middle: "bg-nova-gold/30 text-nova-white rounded-none",
              day_range_end: "bg-nova-gold text-nova-black rounded-r-md",
              day_range_start: "bg-nova-gold text-nova-black rounded-l-md"
            }}
            modifiers={{
              booked: bookedDateObjects
            }}
            modifiersClassNames={{
              booked: "bg-red-500/20 text-red-200 relative before:absolute before:inset-0 before:border-2 before:border-red-500/40 before:rounded-full before:scale-75"
            }}
            components={{
              Day: ({ date, ...props }) => {
                const dayComponent = <div {...props} />;
                return isDateBooked(date) ? (
                  <div className="relative">
                    {dayComponent}
                    {renderDay(date)}
                  </div>
                ) : (
                  dayComponent
                );
              }
            }}
            fromMonth={new Date()}
            disabled={isDateBooked}
            fixedWeeks={true}
            weekStartsOn={1}
            locale={language === 'fr' ? fr : enUS}
          />
          
          {view !== 'month' && (
            <div className="mt-2 text-xs text-nova-white/50 text-center">
              {language === 'fr' 
                ? `Vue ${view === 'week' ? 'hebdomadaire' : 'journalière'} (aperçu limité)`
                : `${view === 'week' ? 'Weekly' : 'Daily'} view (limited preview)`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
