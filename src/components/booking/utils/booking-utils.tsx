import { Vehicle } from '@/data/vehicles';
import React from 'react';
import { Star } from 'lucide-react';

/**
 * Calculate the price based on the selected vehicle and duration
 * Implements tiered pricing for daily bookings
 */
export const calculateVehiclePrice = (
  vehicle: Vehicle | undefined,
  durationType: 'hourly' | 'daily' | 'monthly',
  duration: number,
  days: number,
  months: number
): number => {
  if (!vehicle) return 0;
  
  // Add some debugging
  console.log(`Calculating price for vehicle: ${vehicle.name}`);
  console.log(`Duration type: ${durationType}, Days: ${days}`);
  
  switch (durationType) {
    case 'hourly': 
      return vehicle.price.hourly * duration;
    case 'daily': 
      // Apply tiered pricing based on number of days
      console.log('Vehicle price structure:', vehicle.price);
      
      if (days >= 30) {
        // If days >= 30, use monthly rate
        console.log(`Using monthly rate: ${vehicle.price.monthly}`);
        return vehicle.price.monthly;
      } else if (days >= 25) {
        // 25+ days: use 25-day package price
        console.log(`Using 25-day package: ${vehicle.price.twentyFiveDayPackage}`);
        return vehicle.price.twentyFiveDayPackage;
      } else if (days >= 15) {
        // 15+ days: use 15-day package price
        console.log(`Using 15-day package: ${vehicle.price.fifteenDayPackage}`);
        return vehicle.price.fifteenDayPackage;
      } else if (days >= 10) {
        // 10+ days: use 10-day package price
        console.log(`Using 10-day package: ${vehicle.price.tenDayPackage}`);
        return vehicle.price.tenDayPackage;
      } else {
        // 1-9 days: use standard daily rate
        console.log(`Using daily rate: ${vehicle.price.daily * days}`);
        return vehicle.price.daily * days;
      }
    case 'monthly': 
      // Use fixed monthly price
      return vehicle.price.monthly * months;
    default: 
      return vehicle.price.hourly * duration;
  }
};

/**
 * Calculate the effective daily rate based on number of days
 */
export const calculateEffectiveDailyRate = (
  vehicle: Vehicle | undefined,
  days: number
): number => {
  if (!vehicle) return 0;
  
  if (days >= 30) {
    // For monthly rates, we show the monthly price divided by 30
    return vehicle.price.monthly / 30;
  } else if (days >= 25) {
    return vehicle.price.twentyFiveDayPackage / 25;
  } else if (days >= 15) {
    return vehicle.price.fifteenDayPackage / 15;
  } else if (days >= 10) {
    return vehicle.price.tenDayPackage / 10;
  } else {
    return vehicle.price.daily;
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

/**
 * Render star rating component
 */
export const renderStars = (rating: number): JSX.Element[] => {
  const stars: JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="fill-nova-gold text-nova-gold h-4 w-4" />);
  }
  
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="relative">
        <Star className="text-nova-gold/30 h-4 w-4" />
        <Star className="absolute top-0 left-0 fill-nova-gold text-nova-gold h-4 w-4 clip-path-half" />
      </span>
    );
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-nova-gold/30 h-4 w-4" />);
  }
  
  return stars;
};
