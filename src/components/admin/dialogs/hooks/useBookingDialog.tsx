
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  calculateTotalPrice, 
  createBookingNotification, 
  updateVehicleAvailability 
} from '../utils/booking-dialog-utils';

export const useBookingDialog = (language: string, onClose: () => void, refreshData: () => void) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [loading, setLoading] = useState(false);

  // Reset form when dialog is opened
  useEffect(() => {
    setUserName('');
    setUserId(null);
    setVehicleId('');
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 3)));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { 
      userId, 
      vehicleId, 
      userName, 
      startDate: startDate?.toISOString(), 
      endDate: endDate?.toISOString() 
    });
    
    // Validate vehicleId and dates
    if (!vehicleId) {
      console.error("Missing required field: vehicleId is empty");
      toast.error(language === 'fr' 
        ? 'Veuillez sélectionner un véhicule' 
        : 'Please select a vehicle');
      return;
    }
    
    if (!startDate || !endDate) {
      console.error("Missing required field: dates are undefined", { startDate, endDate });
      toast.error(language === 'fr' 
        ? 'Veuillez sélectionner les dates de réservation' 
        : 'Please select booking dates');
      return;
    }
    
    // If userId is null but userName contains text, we create a test booking
    const isTestBooking = !userId && userName.trim() !== '';
    
    setLoading(true);
    
    try {
      // Calculate total price
      const totalPrice = calculateTotalPrice(vehicleId, startDate, endDate);
      console.log("Calculated price:", totalPrice);
      
      // Create booking in Supabase
      const bookingData: any = {
        vehicle_id: vehicleId,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        total_price: totalPrice,
        status: 'pending'
      };
      
      // Add user_id only if it's available, otherwise use a default test user_id
      if (userId) {
        bookingData.user_id = userId;
      } else {
        // For test bookings, we need to provide a user_id value
        // Use a default test ID from the profiles table or create a temporary one
        const { data: testUser } = await supabase
          .from('profiles')
          .select('id')
          .limit(1)
          .single();
          
        // If we have at least one user in the database, use that ID
        if (testUser && testUser.id) {
          bookingData.user_id = testUser.id;
          console.log("Using test user ID:", testUser.id);
        } else {
          // If there are no users in the database, we can't create a booking
          toast.error(language === 'fr' 
            ? 'Impossible de créer une réservation sans utilisateur. Veuillez d\'abord créer un compte utilisateur.' 
            : 'Unable to create booking without a user. Please create a user account first.');
          setLoading(false);
          return;
        }
      }
      
      console.log("Booking data being sent:", bookingData);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select();
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log("Booking created:", data);
      
      // Log the admin activity using the edge function
      try {
        const adminUser = await supabase.auth.getUser();
        const adminId = adminUser.data.user?.id;
        
        if (adminId) {
          // Use the edge function to log admin activity
          await supabase.functions.invoke('log-admin-activity', {
            body: {
              adminId: adminId,
              activityType: 'booking_created',
              details: {
                booking_id: data?.[0]?.id,
                vehicle_id: vehicleId,
                is_test_booking: isTestBooking
              }
            }
          });
        }
      } catch (logError) {
        console.error('Error logging admin activity:', logError);
        // Don't throw error for logging failure
      }
      
      // Create notification for the new booking
      await createBookingNotification(
        userId ? userName : 'Client Test', 
        vehicleId, 
        startDate, 
        endDate, 
        language
      );
      
      // Update vehicle availability
      await updateVehicleAvailability(vehicleId, startDate, endDate, language);
      
      // Show success notification
      toast.success(language === 'fr' 
        ? 'Réservation créée avec succès' 
        : 'Booking created successfully');
      
      // Close dialog and refresh data
      onClose();
      
      if (typeof refreshData === 'function') {
        console.log("Refreshing data after booking creation");
        refreshData();
      } else {
        console.error("refreshData is not a function:", refreshData);
      }
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(language === 'fr' 
        ? `Erreur lors de la création de la réservation: ${error.message || ''}` 
        : `Error creating booking: ${error.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    userName,
    setUserName,
    userId,
    setUserId,
    vehicleId,
    setVehicleId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    handleSubmit
  };
};
