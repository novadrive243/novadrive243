
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface VehicleCalendarDisplayProps {
  bookedDates: Date[];
  language: string;
}

export const VehicleCalendarDisplay = ({ 
  bookedDates, 
  language 
}: VehicleCalendarDisplayProps) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-full max-w-[350px] mx-auto">
        <Calendar
          mode="multiple"
          selected={bookedDates}
          className="rounded border border-nova-gold/20 bg-nova-black/50 w-full"
          classNames={{
            day_selected: "bg-red-500/80 text-white hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white",
            day_today: "bg-nova-gold/30 text-nova-white",
            months: "w-full",
            month: "w-full",
            table: "w-full",
            head_cell: "text-nova-white/70 w-8 font-normal text-[0.8rem]",
            cell: "h-8 w-8 text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
            day: "h-8 w-8 p-0 font-normal text-sm aria-selected:opacity-100",
            caption: "flex justify-center pt-1 relative items-center text-nova-white",
            caption_label: "text-sm font-medium text-nova-white",
            nav: "space-x-1 flex items-center text-nova-gold",
            nav_button: "h-7 w-7 bg-nova-black text-nova-gold p-0 opacity-70 hover:opacity-100 border border-nova-gold/30",
          }}
          disabled={bookedDates}
          footer={
            <div className="pt-3 border-t border-nova-gold/10">
              <p className="text-sm text-nova-white/70 text-center">
                {language === 'fr' 
                  ? 'Les dates en rouge sont réservées' 
                  : 'Red dates are booked'}
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};
