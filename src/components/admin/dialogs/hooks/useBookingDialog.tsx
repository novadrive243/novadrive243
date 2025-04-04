
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
    console.log("Form submitted with:", { userId, vehicleId, startDate, endDate });
    
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
    
    // Si userId est null mais que le champ userName contient du texte, nous créons une réservation de test
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
      
      // Ajouter user_id seulement s'il est disponible
      if (userId) {
        bookingData.user_id = userId;
      } else if (isTestBooking) {
        // Pour les réservations de test, nous stockons le nom dans les métadonnées
        bookingData.metadata = { test_booking: true, customer_name: userName };
      } else {
        // Si aucun utilisateur n'est sélectionné, créer un utilisateur de test
        bookingData.metadata = { test_booking: true, customer_name: 'Client Test' };
      }
      
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
      await updateVehicleAvailability(vehicleId, startDate, endDate);
      
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
