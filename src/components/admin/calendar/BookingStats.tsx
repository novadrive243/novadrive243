
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface BookingStatsProps {
  bookedDatesCount: number;
  language: string;
}

export const BookingStats = ({ 
  bookedDatesCount, 
  language 
}: BookingStatsProps) => {
  const nextAvailableDate = bookedDatesCount > 0 
    ? new Date(Date.now() + (bookedDatesCount * 24 * 60 * 60 * 1000))
    : new Date();
  
  return (
    <Card className="bg-nova-black/30 border-nova-gold/20">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-nova-gold/70" />
            <div>
              <h4 className="text-nova-white/80 text-sm">
                {language === 'fr' ? 'Jours réservés' : 'Booked days'}
              </h4>
              <p className="text-nova-white text-2xl font-bold">
                {bookedDatesCount}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-nova-gold/70" />
            <div>
              <h4 className="text-nova-white/80 text-sm">
                {language === 'fr' ? 'Statut actuel' : 'Current status'}
              </h4>
              <p className="text-nova-white">
                {bookedDatesCount === 0 
                  ? (language === 'fr' ? 'Disponible maintenant' : 'Available now') 
                  : (language === 'fr' 
                      ? `Disponible à partir du ${nextAvailableDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}` 
                      : `Available from ${nextAvailableDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}`)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
