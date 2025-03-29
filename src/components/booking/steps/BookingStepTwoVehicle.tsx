
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { calculateEffectiveDailyRate } from '../utils/booking-utils';

interface BookingStepTwoVehicleProps {
  language: string;
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string) => void;
  handleContinue: () => void;
  handlePrevious: () => void;
  renderStars: (rating: number) => JSX.Element[];
  durationType: 'hourly' | 'daily' | 'monthly';
}

export const BookingStepTwoVehicle = ({
  language,
  selectedVehicle,
  setSelectedVehicle,
  handleContinue,
  handlePrevious,
  renderStars,
  durationType
}: BookingStepTwoVehicleProps) => {
  
  // Get price label based on duration type
  const getPriceLabel = () => {
    switch (durationType) {
      case 'hourly': 
        return language === 'fr' ? 'par heure' : 'per hour';
      case 'daily': 
        return language === 'fr' ? 'par jour' : 'per day';
      case 'monthly': 
        return language === 'fr' ? 'par mois' : 'per month';
      default: 
        return language === 'fr' ? 'par heure' : 'per hour';
    }
  };
  
  // Get price based on duration type
  const getPrice = (vehicle: typeof vehicles[0]) => {
    switch (durationType) {
      case 'hourly': return vehicle.price.hourly;
      case 'daily': return calculateEffectiveDailyRate(vehicle, 1); // Show standard daily rate
      case 'monthly': return vehicle.price.monthly;
      default: return vehicle.price.hourly;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        onClick={handlePrevious} 
        variant="outline" 
        className="mb-4 border-nova-gold/50 text-nova-gold"
      >
        {language === 'fr' ? 'Retour' : 'Back'}
      </Button>
      
      <Card className="bg-nova-gray/30 border border-nova-gold/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-nova-white">
            {language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'}
          </h2>
          
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedVehicle === vehicle.id 
                    ? 'border-nova-gold bg-nova-gold/10' 
                    : 'border-nova-gray/50 hover:border-nova-gold/50'
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div className="flex items-center">
                  <div className="mr-4 h-16 w-16 bg-nova-black/50 rounded-md overflow-hidden">
                    <img 
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-nova-white font-medium">{vehicle.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-4">
                        {renderStars(vehicle.comfort)}
                      </div>
                      <span className="text-sm text-nova-white/70">
                        {language === 'fr' ? 'Capacité:' : 'Capacity:'} {vehicle.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-nova-gold font-bold">${getPrice(vehicle)}</p>
                    <p className="text-nova-white/70 text-xs">
                      {getPriceLabel()}
                    </p>
                    {selectedVehicle === vehicle.id && (
                      <CheckCircle className="h-5 w-5 text-nova-gold ml-auto mt-2" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleContinue} 
            className="w-full gold-btn mt-6"
            disabled={!selectedVehicle}
          >
            {language === 'fr' ? 'Continuer' : 'Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
