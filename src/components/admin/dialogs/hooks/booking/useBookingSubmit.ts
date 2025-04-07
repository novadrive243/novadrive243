
import { useState } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface UseBookingSubmitProps {
  userName: string;
  userId: string | null;
  vehicleId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  language: string;
  onClose: () => void;
  refreshData: () => void;
}

export const useBookingSubmit = ({
  userName,
  userId,
  vehicleId,
  startDate,
  endDate,
  language,
  onClose,
  refreshData
}: UseBookingSubmitProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error(language === 'fr' ? 'Veuillez sélectionner les dates' : 'Please select dates');
      return;
    }

    if (!vehicleId) {
      toast.error(language === 'fr' ? 'Veuillez sélectionner un véhicule' : 'Please select a vehicle');
      return;
    }

    setLoading(true);

    try {
      // If no userId but we have a username, create a test profile
      let effectiveUserId = userId;
      if (!effectiveUserId && userName) {
        const testId = uuidv4();
        
        // Create test profile for demo purposes
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: testId,
            full_name: userName
          });
        
        if (profileError) {
          throw profileError;
        }
        effectiveUserId = testId;
      }

      if (!effectiveUserId) {
        throw new Error('No user ID available');
      }

      // Calculate price - in a real app this would be more sophisticated
      const pricePerDay = 100; // Default price
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = pricePerDay * days;

      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: effectiveUserId,
          vehicle_id: vehicleId,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          total_price: totalPrice,
        });

      if (bookingError) {
        throw bookingError;
      }

      toast.success(
        language === 'fr' 
          ? 'Réservation créée avec succès' 
          : 'Booking created successfully'
      );
      
      onClose();
      refreshData();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(
        language === 'fr' 
          ? 'Erreur lors de la création de la réservation' 
          : 'Error creating booking'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit
  };
};
