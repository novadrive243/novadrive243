
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { Vehicle } from '@/data/vehicles';

interface BookingStepTwoProps {
  vehicles: Vehicle[];
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string) => void;
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
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-nova-white">{t('booking.selectVehicle')}</h3>
      
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all flex ${
              selectedVehicle === vehicle.id 
                ? 'border-nova-gold bg-nova-gold/10' 
                : 'border-nova-gold/30 bg-nova-gray/30 hover:bg-nova-gray/40'
            }`}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            <div className="w-24 h-24 mr-4 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">{vehicle.name}</h4>
              <div className="flex items-center mt-2">
                <Car className="w-4 h-4 mr-1 text-nova-gold" />
                <span className="text-sm text-nova-white/70">Premium</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-nova-white/70">Capacity: {vehicle.capacity} persons</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-nova-gold font-bold">${vehicle.price.hourly}</span>
              <p className="text-xs text-nova-white/70">{t('booking.perHour') || 'per hour'}</p>
              <p className="text-nova-gold font-bold mt-1">${vehicle.price.daily}</p>
              <p className="text-xs text-nova-white/70">{t('booking.perDay') || 'per day'}</p>
              <p className="text-nova-gold font-bold mt-1">${vehicle.price.monthly}</p>
              <p className="text-xs text-nova-white/70">{t('booking.perMonth') || 'per month'}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedVehicle && (
        <div className="mt-6 p-4 border border-nova-gold/30 rounded-lg bg-nova-gold/10">
          <div className="flex justify-between items-center">
            <span className="text-lg">
              {durationType === 'hourly'
                ? `${t('booking.estimatedPrice') || 'Estimated price'} (${duration} ${duration === 1 ? 'hour' : 'hours'})`
                : durationType === 'daily'
                  ? `${t('booking.estimatedPrice') || 'Estimated price'} (${days} ${days === 1 ? 'day' : 'days'})`
                  : `${t('booking.estimatedPrice') || 'Estimated price'} (${months} ${months === 1 ? 'month' : 'months'})`}
            </span>
            <span className="text-2xl font-bold text-nova-gold">${getSelectedVehiclePrice()}</span>
          </div>
        </div>
      )}
      
      <div className="w-full space-y-3 mt-6">
        <Button 
          onClick={handleBookNow} 
          className="gold-btn w-full"
          disabled={!selectedVehicle || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('booking.processing') || 'Processing...'}
            </span>
          ) : (
            t('booking.bookNow')
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setBookingStep(1)}
          className="w-full border-nova-gold/50 text-nova-white hover:bg-nova-black"
        >
          {t('booking.back') || 'Back'}
        </Button>
      </div>
    </div>
  );
}
