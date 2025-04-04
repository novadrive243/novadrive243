
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addDays, format, isAfter, isBefore, isSameDay, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, addWeeks, subWeeks, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VehicleCalendarDisplayProps {
  bookedDates: Date[];
  bookingsData: any[];
  language: string;
  view: 'day' | 'week' | 'month';
}

export const VehicleCalendarDisplay: React.FC<VehicleCalendarDisplayProps> = ({
  bookedDates,
  bookingsData,
  language,
  view
}) => {
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const locale = language === 'fr' ? fr : enUS;
  
  // Helper function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };
  
  // Get booking info for a specific date
  const getBookingInfo = (date: Date) => {
    return bookingsData.find(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      return (
        isSameDay(date, bookingStart) || 
        isSameDay(date, bookingEnd) || 
        (isAfter(date, bookingStart) && isBefore(date, bookingEnd))
      );
    });
  };
  
  // Navigation handlers
  const goToPreviousPeriod = () => {
    if (view === 'day') {
      setDisplayMonth(subDays(displayMonth, 1));
    } else if (view === 'week') {
      setDisplayMonth(subWeeks(displayMonth, 1));
    } else {
      setDisplayMonth(subMonths(displayMonth, 1));
    }
  };
  
  const goToNextPeriod = () => {
    if (view === 'day') {
      setDisplayMonth(addDays(displayMonth, 1));
    } else if (view === 'week') {
      setDisplayMonth(addWeeks(displayMonth, 1));
    } else {
      setDisplayMonth(addMonths(displayMonth, 1));
    }
  };
  
  const goToToday = () => {
    setDisplayMonth(new Date());
  };
  
  // Get days to display based on view
  const getDaysToDisplay = () => {
    if (view === 'day') {
      return [displayMonth];
    } else if (view === 'week') {
      const start = startOfWeek(displayMonth, { locale });
      const end = endOfWeek(displayMonth, { locale });
      return eachDayOfInterval({ start, end });
    } else {
      const start = startOfMonth(displayMonth);
      const end = endOfMonth(displayMonth);
      return eachDayOfInterval({ start, end });
    }
  };
  
  // Format the current view period for display
  const formatViewPeriod = () => {
    if (view === 'day') {
      return format(displayMonth, 'PPP', { locale });
    } else if (view === 'week') {
      const start = startOfWeek(displayMonth, { locale });
      const end = endOfWeek(displayMonth, { locale });
      return `${format(start, 'MMM d', { locale })} - ${format(end, 'MMM d, yyyy', { locale })}`;
    } else {
      return format(displayMonth, 'MMMM yyyy', { locale });
    }
  };

  const days = getDaysToDisplay();
  
  return (
    <Card className="bg-nova-gray border-nova-gold/10 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-nova-gold" />
          <h3 className="text-lg font-semibold text-nova-white">
            {formatViewPeriod()}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-nova-white border-nova-gold/20 hover:bg-nova-gold/10"
            onClick={goToPreviousPeriod}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-nova-white border-nova-gold/20 hover:bg-nova-gold/10"
            onClick={goToToday}
          >
            {language === 'fr' ? 'Aujourd\'hui' : 'Today'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-nova-white border-nova-gold/20 hover:bg-nova-gold/10"
            onClick={goToNextPeriod}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`grid ${view === 'month' ? 'grid-cols-7' : view === 'week' ? 'grid-cols-7' : 'grid-cols-1'} gap-1`}>
        {/* Weekday headers for week and month views */}
        {(view === 'week' || view === 'month') && (
          <>
            {eachDayOfInterval({
              start: startOfWeek(new Date(), { locale }),
              end: endOfWeek(new Date(), { locale })
            }).map((day, i) => (
              <div key={`header-${i}`} className="text-center py-2 text-xs font-medium text-nova-white/70">
                {format(day, 'EEE', { locale })}
              </div>
            ))}
          </>
        )}
        
        {/* Calendar days */}
        {days.map((day, i) => {
          const isBooked = isDateBooked(day);
          const isToday = isSameDay(day, new Date());
          const bookingInfo = getBookingInfo(day);
          const customerName = bookingInfo?.customer_name || bookingInfo?.user_details?.full_name || "";
          
          return (
            <div 
              key={`day-${i}`}
              className={`
                relative min-h-[80px] p-2 border rounded
                ${isToday ? 'border-nova-gold' : 'border-nova-gray-dark/50'}
                ${isBooked ? 'bg-nova-gold/10' : 'bg-nova-black/20'}
              `}
            >
              <div className="text-right mb-1">
                <span className={`text-sm font-medium ${isToday ? 'text-nova-gold' : 'text-nova-white/80'}`}>
                  {format(day, 'd', { locale })}
                </span>
              </div>
              
              {isBooked && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-nova-gold/80 text-nova-black text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                        {customerName || (language === 'fr' ? 'Réservé' : 'Booked')}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
                      <p>{customerName ? customerName : (language === 'fr' ? 'Réservé' : 'Booked')}</p>
                      {bookingInfo && (
                        <p className="text-xs text-nova-gold">
                          {format(new Date(bookingInfo.start_date), 'PP', { locale })} - {format(new Date(bookingInfo.end_date), 'PP', { locale })}
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
