
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { vehicles } from '@/data/vehicles';
import { BookingStepOne } from './steps/booking-step-one';
import { BookingStepTwo } from './steps/booking-step-two';
import { calculateVehiclePrice, generateDurationOptions } from './utils/booking-utils';
import { format } from 'date-fns';

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
  const [durationType, setDurationType] = useState<'hourly' | 'daily'>('hourly');
  const [duration, setDuration] = useState<number>(1); // Default: 1 hour
  const [days, setDays] = useState<number>(1); // Default: 1 day
  
  // Generate duration options
  const { hourOptions, dayOptions } = generateDurationOptions();
  
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
      }, 2000);
    }
  };
  
  const getDurationValue = () => {
    switch (durationType) {
      case 'hourly': return duration;
      case 'daily': return days;
      default: return duration;
    }
  };
  
  const getSelectedVehiclePrice = () => {
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    if (!vehicle) return 0;
    return calculateVehiclePrice(vehicle, durationType, duration, days, 0);
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
          <BookingStepOne 
            fromAddress={fromAddress}
            setFromAddress={setFromAddress}
            toAddress={toAddress}
            setToAddress={setToAddress}
            bookingType={bookingType}
            setBookingType={setBookingType}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            durationType={durationType}
            setDurationType={setDurationType}
            duration={duration}
            setDuration={setDuration}
            days={days}
            setDays={setDays}
            hourOptions={hourOptions}
            dayOptions={dayOptions}
            handleContinue={handleContinue}
            selectedVehicle={selectedVehicle}
          />
        ) : (
          <BookingStepTwo 
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            durationType={durationType}
            duration={duration}
            days={days}
            getSelectedVehiclePrice={getSelectedVehiclePrice}
            handleBookNow={handleBookNow}
            isProcessing={isProcessing}
            setBookingStep={setBookingStep}
          />
        )}
      </CardContent>
      
      <CardFooter>
        {bookingStep === 1 ? (
          <div /> // Empty div to maintain layout when step one content includes the button
        ) : (
          <div /> // Empty div to maintain layout when step two content includes the buttons
        )}
      </CardFooter>
    </Card>
  );
}
