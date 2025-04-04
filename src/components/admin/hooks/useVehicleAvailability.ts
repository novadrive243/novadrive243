
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Updates vehicle availability status based on current bookings
 */
export const updateVehicleAvailabilityFromBookings = async (
  fetchedBookings: any[], 
  fetchedVehicles: any[],
  language: string
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create a map of vehicle IDs to their current availability status
    const vehicleAvailabilityMap = new Map();
    fetchedVehicles.forEach(vehicle => {
      vehicleAvailabilityMap.set(vehicle.id, true); // Default to available
    });
    
    let updated = false;
    
    // Mark vehicles as unavailable if they have active bookings
    for (const booking of fetchedBookings) {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      
      // Check if booking is current (today falls between start and end dates)
      if (startDate <= today && endDate >= today && booking.status !== 'cancelled') {
        vehicleAvailabilityMap.set(booking.vehicle_id, false);
        
        // Update booking status to 'active' if it's currently 'pending'
        if (booking.status === 'pending') {
          await supabase
            .from('bookings')
            .update({ status: 'active' })
            .eq('id', booking.id);
          
          console.log(`Booking ${booking.id} status changed to 'active'`);
          updated = true;
        }
      }
      
      // Mark bookings as 'completed' if end date has passed
      if (endDate < today && booking.status === 'active') {
        await supabase
          .from('bookings')
          .update({ status: 'completed' })
          .eq('id', booking.id);
        
        console.log(`Booking ${booking.id} status changed to 'completed'`);
        updated = true;
      }
    }
    
    // Update vehicle availability in the database
    for (const [vehicleId, isAvailable] of vehicleAvailabilityMap.entries()) {
      const vehicle = fetchedVehicles.find(v => v.id === vehicleId);
      
      // Only update if the availability status has changed
      if (vehicle && vehicle.available !== isAvailable) {
        await supabase
          .from('vehicles')
          .update({ available: isAvailable })
          .eq('id', vehicleId);
          
        console.log(`Vehicle ${vehicle.name} availability changed to ${isAvailable ? 'available' : 'unavailable'}`);
        updated = true;
      }
    }

    // Only show sync notification if updates occurred
    if (updated) {
      toast.success(
        language === 'fr' ? 'Synchronisation terminée' : 'Synchronization complete', 
        {
          description: language === 'fr' 
            ? 'La disponibilité des véhicules et le statut des réservations ont été mis à jour'
            : 'Vehicle availability and booking status have been updated'
        }
      );
    }
    
  } catch (error) {
    console.error('Error updating vehicle availability:', error);
    toast.error(
      language === 'fr' ? 'Erreur de synchronisation' : 'Synchronization error', 
      {
        description: language === 'fr'
          ? 'Impossible de mettre à jour la disponibilité des véhicules'
          : 'Unable to update vehicle availability'
      }
    );
  }
};

/**
 * Function to update vehicle availability for a single booking
 */
export const forceRefreshVehicleAvailability = async (language: string) => {
  try {
    // Fetch all bookings and vehicles
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*');
      
    if (bookingsError) throw bookingsError;
    
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*');
      
    if (vehiclesError) throw vehiclesError;
    
    // Update availability based on fetched data
    await updateVehicleAvailabilityFromBookings(bookings || [], vehicles || [], language);
    
    // Show success notification
    toast.success(
      language === 'fr' ? 'Synchronisation forcée réussie' : 'Forced synchronization successful', 
      {
        description: language === 'fr'
          ? 'La disponibilité des véhicules a été mise à jour'
          : 'Vehicle availability has been updated'
      }
    );
    
  } catch (error) {
    console.error('Error in force refresh:', error);
    toast.error(language === 'fr' ? 'Erreur de synchronisation' : 'Synchronization error');
  }
};
