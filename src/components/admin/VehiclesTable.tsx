
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehiclesTableProps {
  vehicles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
}

export const VehiclesTable = ({ vehicles, language, formatCurrency, getVehicleDailyPrice }: VehiclesTableProps) => {
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Gestion des Véhicules' : 'Vehicle Management'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vehicles.length > 0 ? (
          <Table>
            <TableHeader className="border-b border-nova-gold/30">
              <TableRow>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Image' : 'Image'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Nom' : 'Name'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Catégorie' : 'Category'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Prix par jour' : 'Price per day'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Disponible' : 'Available'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                  <TableCell>
                    <div className="h-12 w-16 rounded overflow-hidden">
                      <img 
                        src={vehicle.image_url} 
                        alt={vehicle.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-nova-white">{vehicle.name}</TableCell>
                  <TableCell className="text-nova-white">{vehicle.category}</TableCell>
                  <TableCell className="text-nova-white">
                    {formatCurrency(getVehicleDailyPrice(vehicle.name) || Number(vehicle.price_per_day))}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vehicle.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {vehicle.available ? 
                        (language === 'fr' ? 'Disponible' : 'Available') : 
                        (language === 'fr' ? 'Non disponible' : 'Unavailable')}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8 text-nova-white/70">
            {language === 'fr' ? 'Aucun véhicule trouvé' : 'No vehicles found'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
