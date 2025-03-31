
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleSelectorProps {
  vehicles: any[];
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string) => void;
  language: string;
}

export const VehicleSelector = ({ 
  vehicles, 
  selectedVehicle, 
  setSelectedVehicle, 
  language 
}: VehicleSelectorProps) => {
  return (
    <div className="w-[200px]">
      <Select 
        value={selectedVehicle || ''} 
        onValueChange={setSelectedVehicle}
      >
        <SelectTrigger className="border-nova-gold/50 bg-nova-black text-nova-white">
          <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'} />
        </SelectTrigger>
        <SelectContent className="bg-nova-black border-nova-gold/50 z-50">
          {vehicles.map(vehicle => (
            <SelectItem key={vehicle.id} value={vehicle.id} className="text-nova-white">
              {vehicle.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
