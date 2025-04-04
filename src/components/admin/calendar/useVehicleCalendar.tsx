
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTimezone } from '@/hooks/use-timezone';

export const useVehicleCalendar = (
  vehicles: any[], 
  bookings: any[],
  language: string
) => {
  const { toast } = useToast();
  const { toKinshasaTime } = useTimezone();
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

  // Function to update booked dates based on selected vehicle
  const updateBookedDates = useCallback(() => {
    if (selectedVehicle && bookings.length > 0) {
      // Filter bookings for the selected vehicle
      const vehicleBookings = bookings.filter(booking => booking.vehicle_id === selectedVehicle);
      
      // Create an array of all dates between start_date and end_date for each booking
      const allBookedDates: Date[] = [];
      
      vehicleBookings.forEach(booking => {
        if (booking.start_date && booking.end_date) {
          const startDate = toKinshasaTime(new Date(booking.start_date));
          const endDate = toKinshasaTime(new Date(booking.end_date));
          
          // Add all dates between start and end (inclusive)
          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            allBookedDates.push(toKinshasaTime(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
      
      setBookedDates(allBookedDates);
    } else {
      setBookedDates([]);
    }
  }, [selectedVehicle, bookings, toKinshasaTime]);

  // Update booked dates when selected vehicle or bookings change
  useEffect(() => {
    updateBookedDates();
  }, [updateBookedDates]);

  // Refresh calendar data
  const refreshCalendarData = () => {
    updateBookedDates();
    toast({
      title: language === 'fr' ? 'Calendrier mis à jour' : 'Calendar updated',
      description: language === 'fr' 
        ? 'Les données du calendrier ont été rafraîchies' 
        : 'Calendar data has been refreshed',
    });
  };

  // Update vehicle availability status in the database
  const updateVehicleAvailability = async (vehicleId: string, isAvailable: boolean) => {
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ available: isAvailable })
        .eq('id', vehicleId);
      
      if (error) throw error;
      
      // Log the change for admin activity using the edge function
      try {
        const adminUser = await supabase.auth.getUser();
        const adminId = adminUser.data.user?.id;
        
        if (adminId) {
          // Use the edge function to log admin activity
          const { error: logError } = await supabase.functions.invoke('log-admin-activity', {
            body: {
              adminId: adminId,
              activityType: 'vehicle_status_change',
              details: {
                vehicle_id: vehicleId,
                new_status: isAvailable ? 'available' : 'unavailable'
              }
            }
          });
          
          if (logError) {
            console.error('Error logging admin activity:', logError);
          }
        }
      } catch (logError) {
        console.error('Error logging admin activity:', logError);
      }
      
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
    setCalendarView,
    refreshCalendarData
  };
};
