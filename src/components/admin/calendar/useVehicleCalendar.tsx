
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useVehicleCalendar = (
  vehicles: any[], 
  bookings: any[],
  language: string
) => {
  const { toast } = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

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

  return {
    selectedVehicle,
    setSelectedVehicle,
    bookedDates,
    isUpdating,
    updateVehicleAvailability,
    calendarView,
    setCalendarView
  };
};
