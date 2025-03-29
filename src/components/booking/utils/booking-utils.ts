
import { Vehicle } from '@/data/vehicles';

/**
 * Calculate the price based on the selected vehicle and duration
 */
export const calculateVehiclePrice = (
  vehicle: Vehicle | undefined,
  durationType: 'hourly' | 'daily' | 'monthly',
  duration: number,
  days: number,
  months: number
): number => {
  if (!vehicle) return 0;
  
  switch (durationType) {
    case 'hourly': return vehicle.price.hourly * duration;
    case 'daily': return vehicle.price.daily * days;
    case 'monthly': return vehicle.price.monthly * months;
    default: return vehicle.price.hourly * duration;
  }
};

/**
 * Generate arrays for duration options
 */
export const generateDurationOptions = () => {
  // Hours options: 1, 2, 3, 4, 5, 6, 7, 14, 21, 30
  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 14, 21, 30];
  
  // Create an array with all days of the month (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Create an array with all months of the year (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  
  return { hourOptions, dayOptions, monthOptions };
};
