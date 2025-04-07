
import { useState } from 'react';

export const useBookingState = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );

  // Reset form to initial state
  const resetForm = () => {
    setUserName('');
    setUserId(null);
    setVehicleId('');
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 3)));
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
    resetForm
  };
};
