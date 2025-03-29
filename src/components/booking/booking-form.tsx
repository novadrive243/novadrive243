
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
import { CalendarIcon, Clock, Car, Check } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export function BookingForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [bookingStep, setBookingStep] = useState<1 | 2>(1);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [bookingType, setBookingType] = useState<'now' | 'schedule'>('now');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [durationType, setDurationType] = useState<'hourly' | 'daily' | 'monthly'>('hourly');
  const [duration, setDuration] = useState<number>(1); // Default: 1 hour
  const [days, setDays] = useState<number>(1); // Default: 1 day
  const [months, setMonths] = useState<number>(1); // Default: 1 month
  
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
      setIsProcessing(true);
      
      // Simulate API call
      setTimeout(() => {
        const bookingDetails = {
          fromAddress,
          toAddress,
          bookingType,
          date: date ? format(date, 'yyyy-MM-dd') : null,
          time: bookingType === 'schedule' ? time : null,
          vehicle: selectedVehicle,
          vehicleName: vehicles.find(v => v.id === selectedVehicle)?.name,
          durationType,
          duration: getDurationValue(),
          price: getSelectedVehiclePrice(),
        };
        
        console.log('Booking confirmed:', bookingDetails);
        
        // Show success notification
        toast({
          title: t('booking.successTitle') || "Booking successful!",
          description: t('booking.successMessage') || "A confirmation will be sent to you.",
          variant: "default",
        });
        
        // Reset form
        setIsProcessing(false);
        setFromAddress('');
        setToAddress('');
        setBookingType('now');
        setSelectedVehicle(null);
        setBookingStep(1);
        setDurationType('hourly');
        setDuration(1);
        setDays(1);
        setMonths(1);
      }, 2000);
    }
  };
  
  const getDurationValue = () => {
    switch (durationType) {
      case 'hourly': return duration;
      case 'daily': return days;
      case 'monthly': return months;
      default: return duration;
    }
  };
  
  const getSelectedVehiclePrice = () => {
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    if (!vehicle) return 0;
    
    switch (durationType) {
      case 'hourly': return vehicle.price.hourly * duration;
      case 'daily': return vehicle.price.daily * days;
      case 'monthly': return vehicle.price.monthly * months;
      default: return vehicle.price.hourly * duration;
    }
  };

  // Generate arrays for the duration options
  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 14, 21, 30];
  
  // Create an array with all days of the month (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Create an array with all months of the year (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  
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
                            className="pointer-events-auto"
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
                  
                  {/* Duration Type - Hourly, Daily or Monthly */}
                  <div className="mt-4">
                    <Label className="mb-2 block">Duration Type</Label>
                    <div className="grid grid-cols-3 gap-2">
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
                      <Button
                        type="button"
                        variant={durationType === 'monthly' ? 'default' : 'outline'}
                        className={durationType === 'monthly' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30'}
                        onClick={() => setDurationType('monthly')}
                      >
                        {t('booking.monthly') || 'Monthly'}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Duration Selector based on the duration type */}
                  {durationType === 'hourly' && (
                    <div>
                      <Label htmlFor="duration">Hours</Label>
                      <Select
                        value={duration.toString()}
                        onValueChange={(value) => setDuration(parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
                          <ScrollArea className="h-60">
                            <SelectGroup>
                              {hourOptions.map((hour) => (
                                <SelectItem key={hour} value={hour.toString()} className="text-nova-white hover:bg-nova-gold/20">
                                  {hour} {hour === 1 ? 'hour' : 'hours'}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {durationType === 'daily' && (
                    <div>
                      <Label htmlFor="days">Days</Label>
                      <Select
                        value={days.toString()}
                        onValueChange={(value) => setDays(parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
                          <ScrollArea className="h-60">
                            <SelectGroup>
                              {dayOptions.map((day) => (
                                <SelectItem key={day} value={day.toString()} className="text-nova-white hover:bg-nova-gold/20">
                                  {day} {day === 1 ? 'jour' : 'jours'}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {durationType === 'monthly' && (
                    <div>
                      <Label htmlFor="months">Months</Label>
                      <Select
                        value={months.toString()}
                        onValueChange={(value) => setMonths(parseInt(value))}
                      >
                        <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
                          <SelectValue placeholder="Select months" />
                        </SelectTrigger>
                        <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
                          <ScrollArea className="h-60">
                            <SelectGroup>
                              {monthOptions.map((month) => (
                                <SelectItem key={month} value={month.toString()} className="text-nova-white hover:bg-nova-gold/20">
                                  {month} {month === 1 ? 'mois' : 'mois'}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
                    <p className="text-nova-gold font-bold mt-1">${vehicle.price.monthly}</p>
                    <p className="text-xs text-nova-white/70">{t('booking.perMonth') || 'per month'}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedVehicle && (
              <div className="mt-6 p-4 border border-nova-gold/30 rounded-lg bg-nova-gold/10">
                <div className="flex justify-between items-center">
                  <span className="text-lg">
                    {durationType === 'hourly'
                      ? `${t('booking.estimatedPrice') || 'Estimated price'} (${duration} ${duration === 1 ? 'hour' : 'hours'})`
                      : durationType === 'daily'
                        ? `${t('booking.estimatedPrice') || 'Estimated price'} (${days} ${days === 1 ? 'day' : 'days'})`
                        : `${t('booking.estimatedPrice') || 'Estimated price'} (${months} ${months === 1 ? 'month' : 'months'})`}
                  </span>
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
              disabled={!selectedVehicle || isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('booking.processing') || 'Processing...'}
                </span>
              ) : (
                t('booking.bookNow')
              )}
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
