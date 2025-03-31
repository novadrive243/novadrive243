
import React from 'react';
import { LoadingState } from './LoadingState';
import { VehicleSelector } from './calendar/VehicleSelector';
import { VehicleInfo } from './calendar/VehicleInfo';
import { VehicleCalendarDisplay } from './calendar/VehicleCalendarDisplay';
import { BookingStats } from './calendar/BookingStats';
import { useVehicleCalendar } from './calendar/useVehicleCalendar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface VehicleCalendarProps {
  vehicles: any[];
  bookings: any[];
  language: string;
  isLoading: boolean;
}

export const VehicleCalendar = ({ vehicles, bookings, language, isLoading }: VehicleCalendarProps) => {
  const { 
    selectedVehicle,
    setSelectedVehicle,
    bookedDates,
    isUpdating,
    updateVehicleAvailability,
    calendarView,
    setCalendarView
  } = useVehicleCalendar(vehicles, bookings, language);

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <VehicleSelector 
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          language={language}
        />
      </div>
      
      {selectedVehicleData ? (
        <div className="space-y-4">
          <VehicleInfo 
            selectedVehicleData={selectedVehicleData}
            language={language}
            isUpdating={isUpdating}
            updateVehicleAvailability={updateVehicleAvailability}
          />
          
          <div className="flex justify-between items-center">
            <ToggleGroup type="single" value={calendarView} onValueChange={(value) => value && setCalendarView(value as 'month' | 'week' | 'day')}>
              <ToggleGroupItem value="month" className="text-nova-white border-nova-gold/30 data-[state=on]:bg-nova-gold/20">
                {language === 'fr' ? 'Mois' : 'Month'}
              </ToggleGroupItem>
              <ToggleGroupItem value="week" className="text-nova-white border-nova-gold/30 data-[state=on]:bg-nova-gold/20">
                {language === 'fr' ? 'Semaine' : 'Week'}
              </ToggleGroupItem>
              <ToggleGroupItem value="day" className="text-nova-white border-nova-gold/30 data-[state=on]:bg-nova-gold/20">
                {language === 'fr' ? 'Jour' : 'Day'}
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Button variant="outline" size="sm" className="text-nova-white border-nova-gold/30 hover:bg-nova-gold/10">
              <RefreshCw className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Rafraîchir' : 'Refresh'}
            </Button>
          </div>
          
          <VehicleCalendarDisplay 
            bookedDates={bookedDates}
            language={language}
            view={calendarView}
          />
          
          <BookingStats 
            bookedDatesCount={bookedDates.length}
            language={language}
          />
        </div>
      ) : (
        <div className="text-center p-8 text-nova-white/70">
          {language === 'fr' ? 'Aucun véhicule sélectionné' : 'No vehicle selected'}
        </div>
      )}
    </div>
  );
};
