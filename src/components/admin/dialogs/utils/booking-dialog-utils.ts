
import { supabase } from '@/integrations/supabase/client';
import { updateVehicleAvailabilityFromBookings } from '@/components/admin/hooks/useVehicleAvailability';

// Calculate total price based on vehicle and dates
export const calculateTotalPrice = (vehicleId: string, startDate: Date, endDate: Date) => {
  // This is a placeholder function - in a real app, you would fetch the vehicle's price
  // and calculate based on the number of days
  const dailyRate = 100; // Default rate
  const days = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  return dailyRate * days;
};

// Function to search users by name
export const searchUsers = async (query: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('full_name', `%${query}%`)
      .limit(5);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

// Create a notification for a new booking
export const createBookingNotification = async (
  userName: string,
  vehicleId: string,
  startDate: Date,
  endDate: Date,
  language: string
) => {
  try {
    // Get vehicle details
    const { data: vehicle } = await supabase
      .from('vehicles')
      .select('name')
      .eq('id', vehicleId)
      .single();
      
    const vehicleName = vehicle?.name || 'Unknown';
    
    // Format dates
    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    
    // Create notification message
    const message = language === 'fr' 
      ? `Nouvelle réservation: ${vehicleName} pour ${userName} du ${formattedStartDate} au ${formattedEndDate}`
      : `New booking: ${vehicleName} for ${userName} from ${formattedStartDate} to ${formattedEndDate}`;
      
    // Log the notification to console
    console.log('Booking notification:', message);
    
    // Insert notification into admin_activity table
    try {
      await supabase
        .from('admin_activity')
        .insert({
          activity_type: 'booking_notification',
          details: {
            message,
            vehicle_name: vehicleName,
            user_name: userName,
            start_date: formattedStartDate,
            end_date: formattedEndDate
          }
        });
    } catch (error) {
      console.error('Error saving notification:', error);
    }
    
  } catch (error) {
    console.error('Error creating booking notification:', error);
  }
};

// Update vehicle availability based on booking dates
export const updateVehicleAvailability = async (
  vehicleId: string,
  startDate: Date,
  endDate: Date,
  language: string
) => {
  try {
    // Fetch all bookings for this vehicle
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('vehicle_id', vehicleId);
      
    if (bookingsError) throw bookingsError;
    
    // Fetch current vehicle data
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId);
      
    if (vehiclesError) throw vehiclesError;
    
    // Check if vehicle should be marked as unavailable
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if this new booking would make the vehicle unavailable today
    const newBookingIsToday = 
      (startDate <= today && endDate >= today) || 
      (startDate.toDateString() === today.toDateString());
    
    // Call the shared function to update vehicle availability
    await updateVehicleAvailabilityFromBookings(
      [...(bookings || []), { 
        vehicle_id: vehicleId, 
        start_date: startDate.toISOString(), 
        end_date: endDate.toISOString(),
        status: 'pending'
      }], 
      vehicles || [],
      language
    );
    
    console.log(`Vehicle availability updated for booking from ${startDate.toDateString()} to ${endDate.toDateString()}`);
  } catch (error) {
    console.error('Error updating vehicle availability:', error);
  }
};
