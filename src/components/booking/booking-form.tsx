
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
import { BookingCompletedModal } from './BookingCompletedModal';

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
  
  // New state for completed booking
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    id: '',
    vehicleName: '',
    date: '',
    duration: '',
    totalPrice: ''
  });
  
  // Generate duration options
  const { hourOptions, dayOptions } = generateDurationOptions();
  
  useEffect(() => {
    const vehicleId = searchParams.get('vehicle');
    if (vehicleId && vehicles.some(v => v.id === vehicleId)) {
      setSelectedVehicle(vehicleId);
      setBookingStep(2);
    }

    // Get location from URL params if available
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setFromAddress(locationParam);
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
        const selectedVehicleObj = vehicles.find(v => v.id === selectedVehicle);
        const durationText = durationType === 'hourly' 
          ? `${duration} ${duration > 1 ? 'hours' : 'hour'}` 
          : `${days} ${days > 1 ? 'days' : 'day'}`;
        
        const bookingData = {
          id: Math.random().toString(36).substring(2, 15), // Generate a random ID for demo
          vehicleName: selectedVehicleObj?.name || '',
          date: date ? format(date, 'yyyy-MM-dd') + (bookingType === 'schedule' ? ` ${time}` : '') : '',
          duration: durationText,
          totalPrice: getSelectedVehiclePrice().toString()
        };
        
        // Set booking details for the modal
        setBookingDetails(bookingData);
        
        // Mark booking as completed to show rating modal
        setBookingCompleted(true);
        setIsProcessing(false);
      }, 2000);
    }
  };
  
  const handleCloseModal = () => {
    // Reset the form after closing the modal
    setBookingCompleted(false);
    setFromAddress('');
    setToAddress('');
    setBookingType('now');
    setSelectedVehicle(null);
    setBookingStep(1);
    setDurationType('hourly');
    setDuration(1);
    setDays(1);
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
    <>
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
          <div /> {/* Empty div to maintain layout */}
        </CardFooter>
      </Card>
      
      {/* Show booking completed modal with rating form when booking is completed */}
      {bookingCompleted && (
        <BookingCompletedModal
          open={bookingCompleted}
          onClose={handleCloseModal}
          bookingDetails={bookingDetails}
        />
      )}
    </>
  );
}
