
import React from 'react';
import { Label } from '@/components/ui/label';
import { calculateEffectiveDailyRate } from '../utils/booking-utils';
import { vehicles } from '@/data/vehicles';

interface DurationSelectorProps {
  durationType: 'hourly' | 'daily';
  language?: string;
  hours?: number;
  setHours?: (hours: number) => void;
  days?: number;
  setDays?: (days: number) => void;
  selectedVehicle?: string | null;
  duration?: number;
  setDuration?: (value: number) => void;
  hourOptions?: number[];
  dayOptions?: number[];
}

export const DurationSelector = ({
  durationType,
  language,
  hours,
  setHours,
  days,
  setDays,
  selectedVehicle,
  duration,
  setDuration,
  hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 12, 24],
  dayOptions
}: DurationSelectorProps) => {
  // Generate all available options for days (1-31)
  const allDays = dayOptions || Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Get the selected vehicle object
  const vehicleObject = selectedVehicle ? vehicles.find(v => v.id === selectedVehicle) : undefined;
  
  // Get tier information for the current day selection
  const getDayTierInfo = (day: number): string => {
    if (!vehicleObject) return '';
    
    if (day >= 30) {
      return language === 'fr' ? '(Tarif mensuel)' : '(Monthly rate)';
    } else if (day >= 25) {
      return language === 'fr' ? '(Forfait 25 jours)' : '(25-day package)';
    } else if (day >= 15) {
      return language === 'fr' ? '(Forfait 15 jours)' : '(15-day package)';
    } else if (day >= 10) {
      return language === 'fr' ? '(Forfait 10 jours)' : '(10-day package)';
    }
    return '';
  };
  
  // Handle the hourly selection when using BookingForm component
  if (durationType === 'hourly' && setDuration) {
    return (
      <div>
        <Label htmlFor="duration">Hours</Label>
        <select
          id="duration-hours"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
        >
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>
              {hour} {language ? (language === 'fr' ? 'heure(s)' : 'hour(s)') : 'hour(s)'}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  // Handle the hourly selection when using BookingPage component
  if (durationType === 'hourly' && setHours) {
    return (
      <div className="mb-6">
        <Label htmlFor="duration" className="text-nova-white mb-2 block">
          {language === 'fr' ? 'Durée (heures)' : 'Duration (hours)'}
        </Label>
        <select
          id="duration-hours"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 12, 24].map((value) => (
            <option key={value} value={value}>
              {value} {language === 'fr' ? 'heure(s)' : 'hour(s)'}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  // Handle the daily selection when using BookingForm component
  if (durationType === 'daily' && setDuration) {
    return (
      <div>
        <Label htmlFor="days">Days</Label>
        <select
          id="duration-days"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
        >
          {allDays.map((day) => (
            <option key={day} value={day}>
              {day} {language ? (language === 'fr' ? 'jour(s)' : 'day(s)') : 'day(s)'}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  // Handle the daily selection when using BookingPage component
  if (durationType === 'daily' && setDays) {
    return (
      <div className="mb-6">
        <Label htmlFor="duration" className="text-nova-white mb-2 block">
          {language === 'fr' ? 'Durée (jours)' : 'Duration (days)'}
        </Label>
        <div>
          <select
            id="duration-days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
          >
            {allDays.map((value) => (
              <option key={value} value={value}>
                {value} {language === 'fr' ? 'jour(s)' : 'day(s)'} {getDayTierInfo(value)}
              </option>
            ))}
          </select>
          
          {selectedVehicle && vehicleObject && (
            <div className="mt-2 text-xs text-nova-gold">
              {language === 'fr' 
                ? `Prix par jour: $${calculateEffectiveDailyRate(vehicleObject, days).toFixed(2)}` 
                : `Per day price: $${calculateEffectiveDailyRate(vehicleObject, days).toFixed(2)}`}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Default empty state in case of incorrect props
  return <div>Please provide the correct duration type and handlers</div>;
};
