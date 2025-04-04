
import { supabase } from '@/integrations/supabase/client';

/**
 * Updates vehicle availability status based on current bookings
 */
export const updateVehicleAvailabilityFromBookings = async (
  fetchedBookings: any[], 
  fetchedVehicles: any[]
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create a map of vehicle IDs to their current availability status
    const vehicleAvailabilityMap = new Map();
    fetchedVehicles.forEach(vehicle => {
      vehicleAvailabilityMap.set(vehicle.id, true); // Default to available
    });
    
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
        }
      }
      
      // Mark bookings as 'completed' if end date has passed
      if (endDate < today && booking.status === 'active') {
        await supabase
          .from('bookings')
          .update({ status: 'completed' })
          .eq('id', booking.id);
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
          
        // Log the vehicle status change
        console.log(`Vehicle ${vehicle.name} availability changed to ${isAvailable ? 'available' : 'unavailable'}`);
      }
    }
  } catch (error) {
    console.error('Error updating vehicle availability:', error);
  }
};
