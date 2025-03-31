
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from './LoadingState';
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VehicleCalendarProps {
  vehicles: any[];
  bookings: any[];
  language: string;
  isLoading: boolean;
}

export const VehicleCalendar = ({ vehicles, bookings, language, isLoading }: VehicleCalendarProps) => {
  const { toast } = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Set first vehicle as selected by default when vehicles are loaded
  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0].id);
    }
  }, [vehicles, selectedVehicle]);

  // Update booked dates when selected vehicle or bookings change
  useEffect(() => {
    if (selectedVehicle && bookings.length > 0) {
      // Filter bookings for the selected vehicle
      const vehicleBookings = bookings.filter(booking => booking.vehicle_id === selectedVehicle);
      
      // Create an array of all dates between start_date and end_date for each booking
      const allBookedDates: Date[] = [];
      
      vehicleBookings.forEach(booking => {
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        
        // Add all dates between start and end (inclusive)
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          allBookedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      
      setBookedDates(allBookedDates);
    } else {
      setBookedDates([]);
    }
  }, [selectedVehicle, bookings]);

  // Update vehicle availability status in the database
  const updateVehicleAvailability = async (vehicleId: string, isAvailable: boolean) => {
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ available: isAvailable })
        .eq('id', vehicleId);
      
      if (error) throw error;
      
      toast({
        title: language === 'fr' 
          ? 'Statut mis à jour' 
          : 'Status Updated',
        description: language === 'fr'
          ? `Le véhicule est maintenant ${isAvailable ? 'disponible' : 'indisponible'}`
          : `Vehicle is now ${isAvailable ? 'available' : 'unavailable'}`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating vehicle availability:', error);
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr'
          ? 'Impossible de mettre à jour le statut du véhicule'
          : 'Failed to update vehicle status',
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
        <div className="w-[200px]">
          <Select 
            value={selectedVehicle || ''} 
            onValueChange={setSelectedVehicle}
          >
            <SelectTrigger className="border-nova-gold/50 bg-nova-black text-nova-white">
              <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'} />
            </SelectTrigger>
            <SelectContent className="bg-nova-black border-nova-gold/50 z-50">
              {vehicles.map(vehicle => (
                <SelectItem key={vehicle.id} value={vehicle.id} className="text-nova-white">
                  {vehicle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedVehicleData ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-16 rounded overflow-hidden mr-3">
                  <img 
                    src={selectedVehicleData.image_url} 
                    alt={selectedVehicleData.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-nova-white text-lg font-semibold">{selectedVehicleData.name}</h3>
                  <p className="text-nova-white/70 text-sm">{selectedVehicleData.category}</p>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <Badge className={`${selectedVehicleData.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {selectedVehicleData.available ? 
                    (language === 'fr' ? 'Disponible' : 'Available') : 
                    (language === 'fr' ? 'Non disponible' : 'Unavailable')}
                </Badge>
                <button 
                  onClick={() => updateVehicleAvailability(
                    selectedVehicleData.id, 
                    !selectedVehicleData.available
                  )}
                  disabled={isUpdating}
                  className="px-3 py-1 rounded text-sm bg-nova-gold/20 hover:bg-nova-gold/30 text-nova-gold"
                >
                  {isUpdating ? 
                    (language === 'fr' ? 'Mise à jour...' : 'Updating...') :
                    (language === 'fr' ? 'Changer' : 'Toggle')}
                </button>
              </div>
            </div>
            
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
            
            <div className="text-center pt-2">
              <p className="text-nova-white/70 text-sm">
                {bookedDates.length === 0 
                  ? (language === 'fr' ? 'Aucune réservation pour ce véhicule' : 'No bookings for this vehicle') 
                  : (language === 'fr' 
                      ? `${bookedDates.length} jour(s) réservé(s)` 
                      : `${bookedDates.length} day(s) booked`)}
              </p>
            </div>
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
