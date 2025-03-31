
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { fr, enUS } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

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
  
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: new Date(),
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
