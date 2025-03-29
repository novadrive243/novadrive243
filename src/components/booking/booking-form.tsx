import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Car } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { useSearchParams } from 'react-router-dom';

export function BookingForm() {
  const { t } = useLanguage();
  const [bookingStep, setBookingStep] = useState<1 | 2>(1);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [bookingType, setBookingType] = useState<'now' | 'schedule'>('now');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const vehicleId = searchParams.get('vehicle');
    if (vehicleId && vehicles.some(v => v.id === vehicleId)) {
      setSelectedVehicle(vehicleId);
      setBookingStep(2);
    }
  }, [searchParams]);
  
  const handleContinue = () => {
    if (fromAddress && toAddress) {
      setBookingStep(2);
    }
  };
  
  const handleBookNow = () => {
    if (selectedVehicle) {
      console.log('Booking confirmed:', {
        fromAddress,
        toAddress,
        bookingType,
        date: date ? format(date, 'yyyy-MM-dd') : null,
        time: bookingType === 'schedule' ? time : null,
        vehicle: selectedVehicle,
      });
      // Would typically submit to API or navigate to confirmation
      alert('Booking successful! A confirmation will be sent to you.');
    }
  };
  
  const getSelectedVehiclePrice = () => {
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    return vehicle ? vehicle.price.hourly : 0;
  };
  
  return (
    <Card className="nova-card max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <span className="gold-gradient-text">{t('booking.title')}</span>
        </CardTitle>
        <CardDescription>
          {bookingStep === 1 
            ? t('booking.enterDetails') || "Enter your trip details" 
            : t('booking.selectVehicle') || "Select your preferred vehicle"}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {bookingStep === 1 ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="from">{t('booking.fromLabel')}</Label>
              <Input 
                id="from" 
                placeholder={t('booking.fromPlaceholder')}
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
                className="bg-nova-gray/30 border-nova-gold/30 placeholder:text-nova-white/50"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="to">{t('booking.toLabel')}</Label>
              <Input 
                id="to" 
                placeholder={t('booking.toPlaceholder')}
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="bg-nova-gray/30 border-nova-gold/30 placeholder:text-nova-white/50"
              />
            </div>
            
            <Tabs 
              defaultValue="now" 
              onValueChange={(value) => setBookingType(value as 'now' | 'schedule')}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 bg-nova-gray/30">
                <TabsTrigger value="now">{t('booking.now')}</TabsTrigger>
                <TabsTrigger value="schedule">{t('booking.schedule')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="now">
                <div className="p-4 text-center text-nova-white/70">
                  Your driver will arrive as soon as possible.
                </div>
              </TabsContent>
              
              <TabsContent value="schedule">
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-nova-gray/30 border-nova-gold/30"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-nova-gold" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-nova-gray/95 border-nova-gold/30">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Time</Label>
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-nova-white">{t('booking.selectVehicle')}</h3>
            
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex ${
                    selectedVehicle === vehicle.id 
                      ? 'border-nova-gold bg-nova-gold/10' 
                      : 'border-nova-gold/30 bg-nova-gray/30 hover:bg-nova-gray/40'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <div className="w-24 h-24 mr-4 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{vehicle.name}</h4>
                    <div className="flex items-center mt-2">
                      <Car className="w-4 h-4 mr-1 text-nova-gold" />
                      <span className="text-sm text-nova-white/70">Premium</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-nova-white/70">Capacity: {vehicle.capacity} persons</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-nova-gold font-bold">${vehicle.price.hourly}</span>
                    <p className="text-xs text-nova-white/70">{t('booking.perHour') || 'per hour'}</p>
                    <p className="text-nova-gold font-bold mt-1">${vehicle.price.daily}</p>
                    <p className="text-xs text-nova-white/70">{t('booking.perDay') || 'per day'}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedVehicle && (
              <div className="mt-6 p-4 border border-nova-gold/30 rounded-lg bg-nova-gold/10">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{t('booking.estimatedHourlyPrice') || 'Estimated hourly price'}</span>
                  <span className="text-2xl font-bold text-nova-gold">${getSelectedVehiclePrice()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {bookingStep === 1 ? (
          <Button 
            onClick={handleContinue} 
            className="gold-btn w-full"
            disabled={!fromAddress || !toAddress}
          >
            {t('booking.continue')}
          </Button>
        ) : (
          <div className="w-full space-y-3">
            <Button 
              onClick={handleBookNow} 
              className="gold-btn w-full"
              disabled={!selectedVehicle}
            >
              {t('booking.bookNow')}
            </Button>
            <Button
              variant="outline"
              onClick={() => setBookingStep(1)}
              className="w-full border-nova-gold/50 text-nova-white hover:bg-nova-black"
            >
              {t('booking.back') || 'Back'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
