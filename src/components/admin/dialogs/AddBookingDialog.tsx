
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserSearchField } from './components/UserSearchField';
import { VehicleSelector } from './components/VehicleSelector';
import { DateRangePicker } from './components/DateRangePicker';
import { PriceEstimate } from './components/PriceEstimate';
import { calculateTotalPrice, createBookingNotification, updateVehicleAvailability } from './utils/booking-dialog-utils';

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  language: string;
}

export const AddBookingDialog = ({ isOpen, onClose, refreshData, language }: AddBookingDialogProps) => {
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
    if (isOpen) {
      setUserName('');
      setUserId(null);
      setVehicleId('');
      setStartDate(new Date());
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 3)));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Verify all required fields
      if (!userId || !vehicleId || !startDate || !endDate) {
        toast.error(language === 'fr' 
          ? 'Veuillez remplir tous les champs requis' 
          : 'Please fill in all required fields');
        setLoading(false);
        return;
      }
      
      // Calculate total price
      const totalPrice = calculateTotalPrice(vehicleId, startDate, endDate);
      
      // Create booking in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: userId,
          vehicle_id: vehicleId,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          total_price: totalPrice,
          status: 'pending'
        })
        .select();
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
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
                user_id: userId,
                vehicle_id: vehicleId
              }
            }
          });
        }
      } catch (logError) {
        console.error('Error logging admin activity:', logError);
      }
      
      // Create notification for the new booking
      await createBookingNotification(userName, vehicleId, startDate, endDate, language);
      
      // Update vehicle availability
      await updateVehicleAvailability(vehicleId, startDate, endDate);
      
      // Show success notification
      toast.success(language === 'fr' 
        ? 'Réservation créée avec succès' 
        : 'Booking created successfully');
      
      // Close dialog and refresh data
      onClose();
      refreshData();
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(language === 'fr' 
        ? `Erreur lors de la création de la réservation: ${error.message || ''}` 
        : `Error creating booking: ${error.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-nova-gray border-nova-gold/30">
        <DialogHeader>
          <DialogTitle className="text-nova-white">
            {language === 'fr' ? 'Ajouter une réservation' : 'Add Booking'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-nova-white">
          {/* User search field */}
          <UserSearchField 
            userName={userName}
            setUserName={setUserName}
            userId={userId}
            setUserId={setUserId}
            language={language}
          />
          
          {/* Vehicle selector */}
          <VehicleSelector 
            vehicleId={vehicleId}
            setVehicleId={setVehicleId}
            language={language}
          />
          
          {/* Date range picker */}
          <DateRangePicker 
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            language={language}
          />
          
          {/* Price estimate */}
          {vehicleId && startDate && endDate && (
            <PriceEstimate 
              vehicleId={vehicleId}
              startDate={startDate}
              endDate={endDate}
              language={language}
            />
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
              disabled={loading}
            >
              {language === 'fr' ? 'Annuler' : 'Cancel'}
            </Button>
            <Button 
              type="submit"
              className="bg-nova-gold text-nova-black hover:bg-nova-gold/90"
              disabled={loading}
            >
              {loading ? 
                (language === 'fr' ? 'Création...' : 'Creating...') : 
                (language === 'fr' ? 'Créer' : 'Create')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
