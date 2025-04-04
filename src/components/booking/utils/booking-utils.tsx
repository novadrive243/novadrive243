
import { Vehicle } from '@/data/vehicles';
import React from 'react';
import { Star } from 'lucide-react';

/**
 * Calculate the price based on the selected vehicle and duration
 * Implements tiered pricing for daily bookings
 */
export const calculateVehiclePrice = (
  vehicle: Vehicle | undefined,
  durationType: 'hourly' | 'daily',
  duration: number,
  days: number,
  months: number = 0 // Keeping this param for backward compatibility
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
        // If days >= 30, use monthly rate (flat fee)
        console.log(`Using monthly rate: ${vehicle.price.monthly}`);
        return vehicle.price.monthly;
      } else if (days >= 25) {
        // 25-29 days: specific daily rate × number of days
        let dailyRate;
        
        if (vehicle.id === 'toyota-fortuner') {
          dailyRate = 126; // $126 per day
        } else if (vehicle.id === 'nissan-xterra') {
          dailyRate = 168; // $168 per day
        } else if (vehicle.id === 'chevrolet-tahoe') {
          dailyRate = 290; // Updated to $290 per day
        } else {
          // Fallback using package calculation
          dailyRate = vehicle.price.twentyFiveDayPackage / 25;
        }
        
        console.log(`Using 25-29 day tier rate: ${dailyRate} × ${days} days = ${dailyRate * days}`);
        return dailyRate * days;
      } else if (days >= 15) {
        // 15-24 days: specific daily rate × number of days
        let dailyRate;
        
        if (vehicle.id === 'toyota-fortuner') {
          dailyRate = 130; // $130 per day
        } else if (vehicle.id === 'nissan-xterra') {
          dailyRate = 176; // $176 per day
        } else if (vehicle.id === 'chevrolet-tahoe') {
          dailyRate = 300; // Updated to $300 per day
        } else {
          // Fallback using package calculation
          dailyRate = vehicle.price.fifteenDayPackage / 15;
        }
        
        console.log(`Using 15-24 day tier rate: ${dailyRate} × ${days} days = ${dailyRate * days}`);
        return dailyRate * days;
      } else if (days >= 10) {
        // 10-14 days: specific daily rate × number of days
        let dailyRate;
        
        if (vehicle.id === 'toyota-fortuner') {
          dailyRate = 135; // $135 per day
        } else if (vehicle.id === 'nissan-xterra') {
          dailyRate = 180; // $180 per day
        } else if (vehicle.id === 'chevrolet-tahoe') {
          dailyRate = 315; // Updated to $315 per day
        } else {
          // Fallback using package calculation
          dailyRate = vehicle.price.tenDayPackage / 10;
        }
        
        console.log(`Using 10-14 day tier rate: ${dailyRate} × ${days} days = ${dailyRate * days}`);
        return dailyRate * days;
      } else {
        // 1-9 days: use standard daily rate
        console.log(`Using daily rate: ${vehicle.price.daily} × ${days} days = ${vehicle.price.daily * days}`);
        return vehicle.price.daily * days;
      }
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
    // 25-29 days tier
    if (vehicle.id === 'toyota-fortuner') {
      return 126; // $126 per day
    } else if (vehicle.id === 'nissan-xterra') {
      return 168; // $168 per day
    } else if (vehicle.id === 'chevrolet-tahoe') {
      return 290; // Updated to $290 per day
    } else {
      return vehicle.price.twentyFiveDayPackage / 25;
    }
  } else if (days >= 15) {
    // 15-24 days tier
    if (vehicle.id === 'toyota-fortuner') {
      return 130; // $130 per day
    } else if (vehicle.id === 'nissan-xterra') {
      return 176; // $176 per day
    } else if (vehicle.id === 'chevrolet-tahoe') {
      return 300; // Updated to $300 per day
    } else {
      return vehicle.price.fifteenDayPackage / 15;
    }
  } else if (days >= 10) {
    // 10-14 days tier
    if (vehicle.id === 'toyota-fortuner') {
      return 135; // $135 per day
    } else if (vehicle.id === 'nissan-xterra') {
      return 180; // $180 per day
    } else if (vehicle.id === 'chevrolet-tahoe') {
      return 315; // $315 per day
    } else {
      return vehicle.price.tenDayPackage / 10;
    }
  } else {
    // 1-9 days: standard daily rate
    return vehicle.price.daily;
  }
};

/**
 * Generate arrays for duration options
 */
export const generateDurationOptions = () => {
  // Hours options: 2, 3, 4, 5, 6, 7, 14, 21, 30
  // Updated to start at 2 hours instead of 1 to reflect the 2-hour minimum
  const hourOptions = [2, 3, 4, 5, 6, 7, 14, 21, 30];
  
  // Create an array with all days of the month (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  return { hourOptions, dayOptions };
};

/**
 * Render star rating component
 * Updated to properly display half stars
 */
export const renderStars = (rating: number): JSX.Element[] => {
  const stars: JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="fill-nova-gold text-nova-gold h-4 w-4" />);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="relative">
        <Star className="text-nova-white/30 h-4 w-4" />
        <Star className="absolute top-0 left-0 fill-nova-gold text-nova-gold h-4 w-4 clip-path-half" />
      </span>
    );
  }
  
  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-nova-white/30 h-4 w-4" />);
  }
  
  return stars;
};
