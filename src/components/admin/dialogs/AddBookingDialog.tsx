
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBookingForm } from './hooks/useBookingForm';
import { BookingForm } from './components/BookingForm';

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  language: string;
}

export const AddBookingDialog = ({ isOpen, onClose, refreshData, language }: AddBookingDialogProps) => {
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
    resetForm,
    handleSubmit
  } = useBookingForm(onClose, refreshData, language);

  // Reset form when dialog is opened
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-nova-gray border-nova-gold/30">
        <DialogHeader>
          <DialogTitle className="text-nova-white">
            {language === 'fr' ? 'Ajouter une réservation' : 'Add Booking'}
          </DialogTitle>
        </DialogHeader>
        
        <BookingForm
          userName={userName}
          setUserName={setUserName}
          userId={userId}
          setUserId={setUserId}
          vehicleId={vehicleId}
          setVehicleId={setVehicleId}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          loading={loading}
          language={language}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
