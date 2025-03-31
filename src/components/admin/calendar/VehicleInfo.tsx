
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface VehicleInfoProps {
  selectedVehicleData: any;
  language: string;
  isUpdating: boolean;
  updateVehicleAvailability: (vehicleId: string, isAvailable: boolean) => Promise<void>;
}

export const VehicleInfo = ({ 
  selectedVehicleData, 
  language, 
  isUpdating, 
  updateVehicleAvailability 
}: VehicleInfoProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="h-12 w-16 rounded overflow-hidden mr-3">
          <img 
            src={selectedVehicleData.image_url} 
            alt={selectedVehicleData.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-nova-white text-lg font-semibold">{selectedVehicleData.name}</h3>
          <p className="text-nova-white/70 text-sm">{selectedVehicleData.category}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <Badge className={`${selectedVehicleData.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
          {selectedVehicleData.available ? 
            (language === 'fr' ? 'Disponible' : 'Available') : 
            (language === 'fr' ? 'Non disponible' : 'Unavailable')}
        </Badge>
        <button 
          onClick={() => updateVehicleAvailability(
            selectedVehicleData.id, 
            !selectedVehicleData.available
          )}
          disabled={isUpdating}
          className="px-3 py-1 rounded text-sm bg-nova-gold/20 hover:bg-nova-gold/30 text-nova-gold"
        >
          {isUpdating ? 
            (language === 'fr' ? 'Mise à jour...' : 'Updating...') :
            (language === 'fr' ? 'Changer' : 'Toggle')}
        </button>
      </div>
    </div>
  );
};
