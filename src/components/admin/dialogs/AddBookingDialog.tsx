
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useBookingDialog } from './hooks/useBookingDialog';
import { BookingForm } from './components/BookingForm';

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  language: string;
}

export const AddBookingDialog = ({ isOpen, onClose, refreshData, language }: AddBookingDialogProps) => {
  console.log("AddBookingDialog rendered, refreshData:", !!refreshData);
  
  const {
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
  } = useBookingDialog(language, onClose, refreshData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-nova-gray border-nova-gold/30">
        <DialogHeader>
          <DialogTitle className="text-nova-white">
            {language === 'fr' ? 'Ajouter une réservation' : 'Add Booking'}
          </DialogTitle>
          <DialogDescription className="text-nova-white/70">
            {language === 'fr' 
              ? 'Remplissez le formulaire pour créer une nouvelle réservation. Vous pouvez créer une réservation pour un utilisateur existant ou une réservation test.'
              : 'Fill out the form to create a new booking. You can create a booking for an existing user or a test booking.'}
          </DialogDescription>
        </DialogHeader>
        
        <BookingForm
          userName={userName}
          setUserName={setUserName}
          userId={userId}
          setUserId={setUserId}
          vehicleId={vehicleId}
          setVehicleId={setVehicleId}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          loading={loading}
          onSubmit={handleSubmit}
          onClose={onClose}
          language={language}
        />
      </DialogContent>
    </Dialog>
  );
};
