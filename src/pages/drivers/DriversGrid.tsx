
import React from 'react';
import { DriverProfileCard } from '@/components/drivers/driver-profile-card';
import { Driver } from '@/types/drivers';

interface DriversGridProps {
  drivers: Driver[];
  onContactClick: (driverId: string) => void;
  onViewProfileClick: (driverId: string) => void;
}

export const DriversGrid = ({ drivers, onContactClick, onViewProfileClick }: DriversGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {drivers.map(driver => (
        <DriverProfileCard 
          key={driver.id}
          driver={driver}
          onContactClick={onContactClick}
          onViewProfileClick={onViewProfileClick}
        />
      ))}
    </div>
  );
};
