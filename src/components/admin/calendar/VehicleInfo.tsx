
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarFront, Wrench, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className="bg-nova-black/30 border-nova-gold/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-14 w-20 rounded overflow-hidden mr-3 border border-nova-gold/20">
              {selectedVehicleData.image_url ? (
                <img 
                  src={selectedVehicleData.image_url} 
                  alt={selectedVehicleData.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-nova-gray/20">
                  <CarFront className="h-8 w-8 text-nova-gold/50" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-nova-white text-lg font-semibold">{selectedVehicleData.name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-nova-gold/10 text-nova-gold border-nova-gold/30">
                  {selectedVehicleData.category || 'SUV'}
                </Badge>
                <Badge className={`${selectedVehicleData.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {selectedVehicleData.available ? 
                    (language === 'fr' ? 'Disponible' : 'Available') : 
                    (language === 'fr' ? 'Non disponible' : 'Unavailable')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="border-nova-gold/30 text-nova-white hover:bg-nova-gold/10"
              onClick={() => updateVehicleAvailability(
                selectedVehicleData.id, 
                !selectedVehicleData.available
              )}
              disabled={isUpdating}
            >
              <Calendar className="mr-1 h-4 w-4" />
              {isUpdating ? 
                (language === 'fr' ? 'Mise à jour...' : 'Updating...') :
                (language === 'fr' ? 'Changer statut' : 'Toggle status')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
