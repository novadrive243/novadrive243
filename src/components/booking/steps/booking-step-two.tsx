
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { vehicles } from '@/data/vehicles';
import { Card, CardContent } from '@/components/ui/card';
import { calculateVehiclePrice } from '../utils/booking-utils';

interface BookingStepTwoProps {
  vehicles: typeof vehicles;
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string | null) => void;
  durationType: 'hourly' | 'daily' | 'monthly';
  duration: number;
  days: number;
  months: number;
  getSelectedVehiclePrice: () => number;
  handleBookNow: () => void;
  isProcessing: boolean;
  setBookingStep: (step: 1 | 2) => void;
}

export function BookingStepTwo({
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  durationType,
  duration,
  days,
  months,
  getSelectedVehiclePrice,
  handleBookNow,
  isProcessing,
  setBookingStep
}: BookingStepTwoProps) {
  const { t } = useLanguage();
  
  // Get price label based on duration type
  const getPriceLabel = () => {
    switch (durationType) {
      case 'hourly': return t('booking.perHour') || 'per hour';
      case 'daily': return t('booking.perDay') || 'per day';
      case 'monthly': return t('booking.perMonth') || 'per month';
      default: return t('booking.perHour') || 'per hour';
    }
  };
  
  // Get price based on duration type for a vehicle
  const getPrice = (vehicle: typeof vehicles[0]) => {
    switch (durationType) {
      case 'hourly': return vehicle.price.hourly;
      case 'daily': return vehicle.price.daily;
      case 'monthly': return vehicle.price.daily * 30; // Monthly price based on daily rate
      default: return vehicle.price.hourly;
    }
  };
  
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setBookingStep(1)}
        className="mb-4 border-nova-gold/50 text-nova-gold"
      >
        {t('booking.back')}
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {vehicles.map((vehicle) => (
          <Card 
            key={vehicle.id}
            className={`cursor-pointer hover:bg-nova-gray/50 transition-colors ${
              selectedVehicle === vehicle.id ? 'border-nova-gold bg-nova-gray/50' : 'bg-nova-gray/20'
            }`}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-20 w-20 bg-nova-gray rounded-md overflow-hidden mr-4">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-nova-white">{vehicle.name}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <div className="text-nova-gold text-sm font-medium">
                      <span className="text-lg">${getPrice(vehicle)}</span> {getPriceLabel()}
                    </div>
                    <div className="text-nova-white/70 text-sm">
                      Capacity: {vehicle.capacity}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedVehicle && (
        <div className="bg-nova-gray/20 p-4 rounded mb-4">
          <h3 className="text-lg font-medium text-nova-white mb-2">{t('booking.summary')}</h3>
          <div className="flex justify-between text-nova-white/70 mb-1">
            <span>{t('booking.vehicle')}</span>
            <span>{vehicles.find(v => v.id === selectedVehicle)?.name}</span>
          </div>
          <div className="flex justify-between text-nova-white/70 mb-1">
            <span>{t('booking.duration')}</span>
            <span>
              {durationType === 'hourly' && `${duration} ${t('booking.hours')}`}
              {durationType === 'daily' && `${days} ${t('booking.days')}`}
              {durationType === 'monthly' && `${months} ${t('booking.months')}`}
            </span>
          </div>
          <div className="flex justify-between font-medium mt-2 pt-2 border-t border-nova-white/10">
            <span className="text-nova-white">{t('booking.totalPrice')}</span>
            <span className="text-nova-gold">${getSelectedVehiclePrice()}</span>
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleBookNow} 
        className="w-full bg-nova-gold hover:bg-nova-gold/90 text-nova-black"
        disabled={!selectedVehicle || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('booking.processing')}
          </span>
        ) : (
          t('booking.bookNow')
        )}
      </Button>
    </div>
  );
}
