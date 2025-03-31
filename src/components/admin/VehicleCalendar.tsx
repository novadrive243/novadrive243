
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from './LoadingState';
import { VehicleSelector } from './calendar/VehicleSelector';
import { VehicleInfo } from './calendar/VehicleInfo';
import { VehicleCalendarDisplay } from './calendar/VehicleCalendarDisplay';
import { BookingStats } from './calendar/BookingStats';
import { useVehicleCalendar } from './calendar/useVehicleCalendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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

  const [view, setView] = useState('month');

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
  
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-nova-white text-xl">
            {language === 'fr' ? 'Calendrier de Disponibilité' : 'Availability Calendar'}
          </CardTitle>
          <div className="mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-nova-gold/30 text-nova-white hover:bg-nova-gold/10 flex items-center gap-2"
                  size="sm"
                >
                  {language === 'fr' ? 'Options du calendrier' : 'Calendar options'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-nova-black border-nova-gold/30 text-nova-white">
                <DropdownMenuItem 
                  className="hover:bg-nova-gold/10 cursor-pointer"
                  onClick={() => setView('month')}
                >
                  {language === 'fr' ? 'Vue mensuelle' : 'Monthly view'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-nova-gold/10 cursor-pointer"
                  onClick={() => setView('week')}
                >
                  {language === 'fr' ? 'Vue hebdomadaire' : 'Weekly view'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-nova-gold/10 cursor-pointer"
                  onClick={() => setView('day')}
                >
                  {language === 'fr' ? 'Vue journalière' : 'Daily view'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
              view={view}
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
