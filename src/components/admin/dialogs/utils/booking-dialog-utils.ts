
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { vehicles } from '@/data/vehicles';
import { toast } from 'sonner';

// Calculate the price based on vehicle and dates
export const calculateTotalPrice = (
  vehicleId: string, 
  startDate: Date | undefined, 
  endDate: Date | undefined
) => {
  if (!vehicleId || !startDate || !endDate) return 0;
  
  const selectedVehicle = vehicles.find(v => v.id === vehicleId);
  if (!selectedVehicle) return 0;
  
  const daysDiff = Math.max(1, Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ));
  
  return calculateVehiclePrice(
    selectedVehicle,
    'daily',
    daysDiff,
    daysDiff
  );
};

// Function imported from booking-utils.ts
export const calculateVehiclePrice = (
  vehicle: any,
  type: 'hourly' | 'daily' | 'monthly',
  days: number,
  hours: number
) => {
  if (type === 'hourly') {
    return vehicle.price.hourly * hours;
  } else if (type === 'daily') {
    // Check if package pricing applies
    if (days >= 25) {
      return vehicle.price.twentyFiveDayPackage;
    } else if (days >= 15) {
      return vehicle.price.fifteenDayPackage;
    } else if (days >= 10) {
      return vehicle.price.tenDayPackage;
    } else {
      return vehicle.price.daily * days;
    }
  } else if (type === 'monthly') {
    return vehicle.price.monthly;
  }
  
  return 0;
};

// Create a notification for new booking
export const createBookingNotification = async (
  userName: string,
  vehicleId: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  language: string
) => {
  try {
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    const vehicleName = selectedVehicle ? selectedVehicle.name : 'Vehicle';
    
    // Format dates for notification message
    const formattedStartDate = format(
      startDate || new Date(), 
      'PP', 
      { locale: language === 'fr' ? fr : undefined }
    );
    const formattedEndDate = format(
      endDate || new Date(), 
      'PP', 
      { locale: language === 'fr' ? fr : undefined }
    );
    
    // Create notification content
    const notificationTitle = language === 'fr' 
      ? `Nouvelle réservation - ${vehicleName}` 
      : `New booking - ${vehicleName}`;
      
    const notificationMessage = language === 'fr'
      ? `Réservation créée pour ${userName} du ${formattedStartDate} au ${formattedEndDate}`
      : `Booking created for ${userName} from ${formattedStartDate} to ${formattedEndDate}`;
    
    // Use toast for notification
    toast.success(notificationTitle, {
      description: notificationMessage
    });
    
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

// Check for existing bookings and update vehicle availability
export const updateVehicleAvailability = async (vehicleId: string, startDate: Date | undefined, endDate: Date | undefined) => {
  try {
    if (!vehicleId || !startDate || !endDate) return;
    
    // Update vehicle availability based on booking dates
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single();
    
    if (vehicleError) throw vehicleError;
    
    // Check if there are any existing bookings for this vehicle in this date range
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .neq('status', 'cancelled')
      .or(`start_date.lte.${endDate.toISOString().split('T')[0]},end_date.gte.${startDate.toISOString().split('T')[0]}`);
    
    if (checkError) throw checkError;
    
    // If there are bookings (including this new one) that overlap with today,
    // we should mark the vehicle as unavailable
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const hasCurrentBooking = existingBookings && existingBookings.some(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      return (bookingStart <= today && bookingEnd >= today);
    });
    
    // Update vehicle availability if needed
    if (hasCurrentBooking && vehicle.available) {
      await supabase
        .from('vehicles')
        .update({ available: false })
        .eq('id', vehicleId);
      
      console.log(`Vehicle ${vehicleId} marked as unavailable due to current booking`);
    }
    
    // Log the number of bookings in this period
    console.log(`Vehicle has ${existingBookings?.length || 0} bookings in this period`);
    
  } catch (error) {
    console.error('Error updating vehicle availability:', error);
  }
};

// Search for users matching the query
export const searchUsers = async (query: string) => {
  if (query.length < 2) return [];
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .ilike('full_name', `%${query}%`)
      .limit(5);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};
