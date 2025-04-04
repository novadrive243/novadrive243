
import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { LoadingState } from './LoadingState';
import { VehicleSelector } from './calendar/VehicleSelector';
import { VehicleInfo } from './calendar/VehicleInfo';
import { VehicleCalendarDisplay } from './calendar/VehicleCalendarDisplay';
import { BookingStats } from './calendar/BookingStats';
import { useVehicleCalendar } from './calendar/useVehicleCalendar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown, RefreshCw } from 'lucide-react';

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
    setCalendarView,
    refreshCalendarData
  } = useVehicleCalendar(vehicles, bookings, language);

  // Ensure all vehicles are displayed properly
  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0].id);
    }
  }, [vehicles, selectedVehicle, setSelectedVehicle]);

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-nova-gold" />
          <h2 className="text-xl font-bold text-nova-white">
            {language === 'fr' ? 'Calendrier des Véhicules' : 'Vehicle Calendar'}
          </h2>
        </div>
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
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-nova-white border-nova-gold/30 hover:bg-nova-gold/10"
              onClick={refreshCalendarData}
            >
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
