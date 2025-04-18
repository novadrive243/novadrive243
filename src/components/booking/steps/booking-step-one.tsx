
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DurationSelector } from '../form-parts/DurationSelector';

interface BookingStepOneProps {
  fromAddress: string;
  setFromAddress: (value: string) => void;
  toAddress: string;
  setToAddress: (value: string) => void;
  bookingType: 'now' | 'schedule';
  setBookingType: (value: 'now' | 'schedule') => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  durationType: 'hourly' | 'daily';
  setDurationType: (type: 'hourly' | 'daily') => void;
  duration: number;
  setDuration: (duration: number) => void;
  days: number;
  setDays: (days: number) => void;
  hourOptions: number[];
  dayOptions: number[];
  handleContinue: () => void;
  selectedVehicle: string | null;
}

export function BookingStepOne({
  fromAddress,
  setFromAddress,
  toAddress,
  setToAddress,
  bookingType,
  setBookingType,
  date,
  setDate,
  time,
  setTime,
  durationType,
  setDurationType,
  duration,
  setDuration,
  days,
  setDays,
  hourOptions,
  dayOptions,
  handleContinue,
  selectedVehicle
}: BookingStepOneProps) {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="from">{language === 'fr' ? 'Adresse de départ' : 'Pickup Address'}</Label>
        <Input 
          id="from" 
          placeholder={language === 'fr' ? 'Entrez votre adresse complète' : 'Enter your full address'}
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="bg-nova-gray/30 border-nova-gold/30 placeholder:text-nova-white/50"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="to">{language === 'fr' ? 'Adresse de destination' : 'Destination Address'}</Label>
        <Input 
          id="to" 
          placeholder={language === 'fr' ? 'Entrez votre adresse complète' : 'Enter your full address'}
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="bg-nova-gray/30 border-nova-gold/30 placeholder:text-nova-white/50"
        />
      </div>
      
      <Tabs 
        defaultValue={bookingType} 
        onValueChange={(value) => setBookingType(value as 'now' | 'schedule')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 bg-nova-gray/30">
          <TabsTrigger value="now">{t('booking.now')}</TabsTrigger>
          <TabsTrigger value="schedule">{t('booking.schedule')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="now">
          <div className="p-4 text-center text-nova-white/70">
            {t('booking.arriveAsSoonAsPossible') || "Your driver will arrive as soon as possible."}
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('booking.date') || "Date"}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-nova-gray/30 border-nova-gold/30"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-nova-gold" />
                      {date ? format(date, 'PPP') : <span>{t('booking.pickDate') || "Pick a date"}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-nova-gray/95 border-nova-gold/30">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>{t('booking.time') || "Time"}</Label>
                <div className="flex">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-nova-gray/30 border-nova-gold/30"
                  >
                    <Clock className="mr-2 h-4 w-4 text-nova-gold" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-transparent border-none outline-none"
                    />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Duration Type - Hourly or Daily */}
            <div className="mt-4">
              <Label className="mb-2 block">{t('booking.durationType') || "Duration Type"}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={durationType === 'hourly' ? 'default' : 'outline'}
                  className={durationType === 'hourly' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30'}
                  onClick={() => setDurationType('hourly')}
                >
                  {t('booking.hourly') || 'Hourly'}
                </Button>
                <Button
                  type="button"
                  variant={durationType === 'daily' ? 'default' : 'outline'}
                  className={durationType === 'daily' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30'}
                  onClick={() => setDurationType('daily')}
                >
                  {t('booking.daily') || 'Daily'}
                </Button>
              </div>
            </div>
            
            {/* Duration Selector based on the duration type */}
            <DurationSelector 
              durationType={durationType}
              duration={duration}
              setDuration={setDuration}
              days={days}
              setDays={setDays}
              hourOptions={hourOptions}
              dayOptions={dayOptions}
              language={language}
              selectedVehicle={selectedVehicle}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={handleContinue} 
        className="gold-btn w-full mt-6"
        disabled={!fromAddress || !toAddress}
      >
        {t('booking.continue')}
      </Button>
    </div>
  );
}
