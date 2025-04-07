
import { useEffect } from 'react';
import { useBookingState } from './booking/useBookingState';
import { useBookingSubmit } from './booking/useBookingSubmit';

export const useBookingDialog = (language: string, onClose: () => void, refreshData: () => void) => {
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
    resetForm
  } = useBookingState();

  const { loading, handleSubmit } = useBookingSubmit({
    userName,
    userId,
    vehicleId,
    startDate,
    endDate,
    language,
    onClose,
    refreshData
  });

  // Reset form when dialog is opened
  useEffect(() => {
    resetForm();
  }, []);

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
