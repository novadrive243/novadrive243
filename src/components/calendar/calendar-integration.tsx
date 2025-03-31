
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTimezone } from '@/hooks/use-timezone';

export interface BookingEvent {
  id: string;
  title: string;
  date: Date;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface CalendarIntegrationProps {
  events: BookingEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onAddToCalendar: (event: BookingEvent) => void;
}

export function CalendarIntegration({ 
  events, 
  selectedDate, 
  onDateChange,
  onAddToCalendar
}: CalendarIntegrationProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { formatKinshasaDate, toKinshasaTime } = useTimezone();
  
  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    toKinshasaTime(event.date).toDateString() === toKinshasaTime(selectedDate).toDateString()
  );
  
  // Get all dates that have events in Kinshasa timezone
  const eventDates = events.map(event => toKinshasaTime(event.date));
  
  // Function to handle adding event to calendar
  const handleAddToCalendar = (event: BookingEvent) => {
    onAddToCalendar(event);
    toast({
      title: t('calendar.addToCalendar'),
      description: `${event.title} added to your calendar.`,
    });
  };
  
  // Function to export .ics file
  const exportIcsFile = (event: BookingEvent) => {
    // This is a simplified version - in a real app you'd create a proper iCalendar file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
LOCATION:${event.location}
DTSTART:${toKinshasaTime(event.date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
DTEND:${new Date(toKinshasaTime(event.date).getTime() + 3600000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '')}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `novadrive-booking-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-nova-black/40 border-nova-gold/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-nova-white">{t('calendar.title')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            className="bg-nova-black/30 rounded-md p-3"
            modifiers={{
              booked: eventDates,
            }}
            modifiersStyles={{
              booked: {
                fontWeight: 'bold',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                color: '#d4af37',
                border: '1px solid rgba(212, 175, 55, 0.5)',
              }
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="bg-nova-black/40 border-nova-gold/20 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-nova-white">
            {selectedDateEvents.length > 0 
              ? `${t('calendar.upcoming')} (${selectedDateEvents.length})` 
              : t('calendar.upcoming')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {selectedDateEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-nova-white/50">
              <CalendarIcon className="h-12 w-12 mb-2 opacity-30" />
              <p>No bookings for this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <div 
                  key={event.id} 
                  className="p-3 rounded-md bg-nova-black/30 border border-nova-gold/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-nova-white">{event.title}</h4>
                      <p className="text-sm text-nova-white/70">{event.location}</p>
                      <p className="text-xs text-nova-white/50 mt-1">
                        {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Badge 
                      variant={event.status === 'upcoming' ? 'default' : 
                             event.status === 'completed' ? 'secondary' : 'destructive'}
                      className={event.status === 'upcoming' ? 'bg-nova-gold/80 text-nova-black' : ''}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
                      onClick={() => handleAddToCalendar(event)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {t('calendar.addToCalendar')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
                      onClick={() => exportIcsFile(event)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      .ics
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
