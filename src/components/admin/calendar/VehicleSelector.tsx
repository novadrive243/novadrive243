
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarFront } from 'lucide-react';

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
    <div className="w-[220px]">
      <Select 
        value={selectedVehicle || ''} 
        onValueChange={setSelectedVehicle}
      >
        <SelectTrigger className="border-nova-gold/50 bg-nova-black text-nova-white">
          <div className="flex items-center gap-2">
            <CarFront className="h-4 w-4 text-nova-gold" />
            <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-nova-black border-nova-gold/50 z-50">
          {vehicles.map(vehicle => (
            <SelectItem 
              key={vehicle.id} 
              value={vehicle.id} 
              className="text-nova-white hover:bg-nova-gold/10 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${vehicle.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {vehicle.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
