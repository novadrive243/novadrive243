
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';

interface BookingStepOneDetailsProps {
  language: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  durationType: 'hourly' | 'daily';
  setDurationType: (durationType: 'hourly' | 'daily') => void;
  hours: number;
  setHours: (hours: number) => void;
  days: number;
  setDays: (days: number) => void;
  pickup: string;
  setPickup: (pickup: string) => void;
  handleContinue: () => void;
}

export const BookingStepOneDetails = ({
  language,
  date,
  setDate,
  time,
  setTime,
  durationType,
  setDurationType,
  hours,
  setHours,
  days,
  setDays,
  pickup,
  setPickup,
  handleContinue
}: BookingStepOneDetailsProps) => {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="bg-nova-gray/30 border border-nova-gold/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-nova-white">
            {language === 'fr' ? 'Détails de la réservation' : 'Booking Details'}
          </h2>
          
          <div className="mb-6">
            <Label htmlFor="date" className="text-nova-white mb-2 block">
              {language === 'fr' ? 'Date' : 'Date'}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left border-nova-gold/50 text-nova-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-nova-gold" />
                  {date ? (
                    format(date, "PPP", {
                      locale: language === 'fr' ? fr : enUS
                    })
                  ) : (
                    <span>{language === 'fr' ? 'Sélectionner une date' : 'Pick a date'}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-nova-gray border-nova-gold/30 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto border-nova-gold/20"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="time" className="text-nova-white mb-2 block">
              {language === 'fr' ? 'Heure' : 'Time'}
            </Label>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-nova-gold mr-2" />
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
              >
                {Array.from({ length: 14 }, (_, i) => i + 7).map((hour) => (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <Label className="text-nova-white mb-2 block">
              {language === 'fr' ? 'Type de durée' : 'Duration Type'}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={durationType === 'hourly' ? 'default' : 'outline'}
                className={durationType === 'hourly' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30 text-nova-white'}
                onClick={() => setDurationType('hourly')}
              >
                {language === 'fr' ? 'Par heure' : 'Hourly'}
              </Button>
              <Button
                type="button"
                variant={durationType === 'daily' ? 'default' : 'outline'}
                className={durationType === 'daily' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30 text-nova-white'}
                onClick={() => setDurationType('daily')}
              >
                {language === 'fr' ? 'Par jour' : 'Daily'}
              </Button>
            </div>
          </div>
          
          <DurationSelector 
            durationType={durationType}
            language={language}
            hours={hours}
            setHours={setHours}
            days={days}
            setDays={setDays}
          />
          
          <div className="mb-6">
            <Label htmlFor="pickup" className="text-nova-white mb-2 block">
              {language === 'fr' ? 'Lieu de prise en charge' : 'Pickup Location'}
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-nova-gold" />
              <Input 
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder={language === 'fr' ? 'Adresse de départ' : 'Pickup address'}
                className="pl-10 border-nova-gold/50 bg-nova-black text-nova-white"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleContinue} 
            className="w-full gold-btn"
            disabled={!date || !pickup}
          >
            {language === 'fr' ? 'Continuer' : 'Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { DurationSelector } from "../form-parts/DurationSelector";
