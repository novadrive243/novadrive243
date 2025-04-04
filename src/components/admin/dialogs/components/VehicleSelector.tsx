
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { vehicles } from '@/data/vehicles';

interface VehicleSelectorProps {
  vehicleId: string;
  setVehicleId: (id: string) => void;
  language: string;
}

export const VehicleSelector = ({ vehicleId, setVehicleId, language }: VehicleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="vehicle">
        {language === 'fr' ? 'Véhicule' : 'Vehicle'}
      </Label>
      <Select value={vehicleId} onValueChange={setVehicleId}>
        <SelectTrigger className="bg-nova-black/50 border-nova-gold/30 text-nova-white">
          <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'} />
        </SelectTrigger>
        <SelectContent className="bg-nova-gray border-nova-gold/30">
          {vehicles.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id} className="text-nova-white hover:bg-nova-gold/20">
              {vehicle.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
