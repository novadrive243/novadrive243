
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VehiclesTable } from '@/components/admin/VehiclesTable';

interface VehiclesTabProps {
  vehicles: any[];
  language: string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
}

export const VehiclesTab = ({
  vehicles,
  language,
  formatCurrency,
  getVehicleDailyPrice
}: VehiclesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicles</CardTitle>
        <CardDescription>Manage your fleet of vehicles</CardDescription>
      </CardHeader>
      <CardContent>
        <VehiclesTable 
          vehicles={vehicles} 
          language={language} 
          formatCurrency={formatCurrency} 
          getVehicleDailyPrice={getVehicleDailyPrice}
        />
      </CardContent>
    </Card>
  );
};
