
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from './LoadingState';
import { VehicleSelector } from './calendar/VehicleSelector';
import { VehicleInfo } from './calendar/VehicleInfo';
import { VehicleCalendarDisplay } from './calendar/VehicleCalendarDisplay';
import { BookingStats } from './calendar/BookingStats';
import { useVehicleCalendar } from './calendar/useVehicleCalendar';

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
    updateVehicleAvailability
  } = useVehicleCalendar(vehicles, bookings, language);

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
  
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-nova-white text-xl">
          {language === 'fr' ? 'Calendrier de Disponibilité' : 'Availability Calendar'}
        </CardTitle>
        <VehicleSelector 
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          language={language}
        />
      </CardHeader>
      <CardContent>
        {selectedVehicleData ? (
          <div className="space-y-6">
            <VehicleInfo 
              selectedVehicleData={selectedVehicleData}
              language={language}
              isUpdating={isUpdating}
              updateVehicleAvailability={updateVehicleAvailability}
            />
            
            <VehicleCalendarDisplay 
              bookedDates={bookedDates}
              language={language}
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
      </CardContent>
    </Card>
  );
};
