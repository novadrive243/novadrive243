
import React from 'react';
import { Label } from '@/components/ui/label';

interface DurationSelectorProps {
  durationType: 'hourly' | 'daily' | 'monthly';
  language: string;
  hours: number;
  setHours: (hours: number) => void;
  days: number;
  setDays: (days: number) => void;
  months: number;
  setMonths: (months: number) => void;
}

export const DurationSelector = ({
  durationType,
  language,
  hours,
  setHours,
  days,
  setDays,
  months,
  setMonths
}: DurationSelectorProps) => {
  return (
    <div className="mb-6">
      <Label htmlFor="duration" className="text-nova-white mb-2 block">
        {durationType === 'hourly' && (language === 'fr' ? 'Durée (heures)' : 'Duration (hours)')}
        {durationType === 'daily' && (language === 'fr' ? 'Durée (jours)' : 'Duration (days)')}
        {durationType === 'monthly' && (language === 'fr' ? 'Durée (mois)' : 'Duration (months)')}
      </Label>
      
      {durationType === 'hourly' && (
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
      )}
      
      {durationType === 'daily' && (
        <select
          id="duration-days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 14, 21, 30].map((value) => (
            <option key={value} value={value}>
              {value} {language === 'fr' ? 'jour(s)' : 'day(s)'}
            </option>
          ))}
        </select>
      )}
      
      {durationType === 'monthly' && (
        <select
          id="duration-months"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
        >
          {[1, 2, 3, 6, 12].map((value) => (
            <option key={value} value={value}>
              {value} {language === 'fr' ? 'mois' : 'month(s)'}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
