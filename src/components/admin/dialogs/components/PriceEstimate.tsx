
import React, { useEffect, useState } from 'react';
import { calculateTotalPrice } from '../utils/booking-dialog-utils';

interface PriceEstimateProps {
  vehicleId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  language: string;
}

export const PriceEstimate = ({ vehicleId, startDate, endDate, language }: PriceEstimateProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  useEffect(() => {
    if (vehicleId && startDate && endDate) {
      const price = calculateTotalPrice(vehicleId, startDate, endDate);
      setTotalPrice(price);
    }
  }, [vehicleId, startDate, endDate]);
  
  if (!vehicleId || !startDate || !endDate) return null;
  
  return (
    <div className="py-2 border-t border-nova-gold/20">
      <div className="flex justify-between items-center">
        <span>
          {language === 'fr' ? 'Prix total estimé:' : 'Estimated total price:'}
        </span>
        <span className="font-semibold text-nova-gold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
