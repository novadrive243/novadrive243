
import React from 'react';
import { calculateTotalPrice } from '../utils/booking-dialog-utils';

interface PriceEstimateProps {
  vehicleId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  language: string;
}

export const PriceEstimate = ({ vehicleId, startDate, endDate, language }: PriceEstimateProps) => {
  if (!vehicleId || !startDate || !endDate) return null;
  
  const totalPrice = calculateTotalPrice(vehicleId, startDate, endDate);
  
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
