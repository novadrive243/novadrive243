
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/hooks/use-toast";
import { vehicles } from "@/data/vehicles";
import { BookingHeader } from '@/components/booking/page-sections/BookingHeader';
import { BookingFooter } from '@/components/booking/page-sections/BookingFooter';
import { BookingStepOneDetails } from '@/components/booking/steps/BookingStepOneDetails';
import { BookingStepTwoVehicle } from '@/components/booking/steps/BookingStepTwoVehicle';
import { BookingStepThreePayment } from '@/components/booking/steps/BookingStepThreePayment';
import { renderStars, calculateVehiclePrice } from '@/components/booking/utils/booking-utils';
import { format } from "date-fns";

const BookingPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [durationType, setDurationType] = useState<'hourly' | 'daily'>('hourly');
  const [hours, setHours] = useState(3); // in hours
  const [days, setDays] = useState(1); // in days
  const [pickup, setPickup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const paymentMethods = [
    { id: "visa", name: "Visa", icon: "💳" },
    { id: "mastercard", name: "Mastercard", icon: "💳" },
    { id: "applepay", name: "Apple Pay", icon: "🍎" },
    { id: "paypal", name: "PayPal", icon: "🅿️" },
    { id: "airtel", name: "Airtel Money", icon: "📱" },
    { id: "mpesa", name: "M-Pesa", icon: "📱" },
    { id: "orange", name: "Orange Money", icon: "📱" },
    { id: "cash", name: "Cash", icon: "💵" }
  ];
  
  const handleContinue = () => {
    setBookingStep(bookingStep + 1);
  };
  
  const handlePrevious = () => {
    setBookingStep(bookingStep - 1);
  };
  
  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };
  
  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
  };
  
  const getSelectedVehicle = () => {
    return vehicles.find(v => v.id === selectedVehicle);
  };
  
  const calculateTotalPrice = (): string => {
    const vehicle = getSelectedVehicle();
    if (!vehicle) return "0";
    
    const total = calculateVehiclePrice(vehicle, durationType, hours, days, 0);
    
    let finalPrice = total;
    if (paymentMethod && paymentMethod !== 'cash') {
      finalPrice = total * 0.95; // 5% discount for online payment
    }
    
    return finalPrice.toFixed(2);
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      const bookingDetails = {
        date: date ? format(date, "yyyy-MM-dd") : '',
        time,
        durationType,
        duration: durationType === 'hourly' ? hours : days,
        pickup,
        vehicleId: selectedVehicle,
        vehicleName: getSelectedVehicle()?.name,
        paymentMethod,
        totalPrice: calculateTotalPrice(),
        depositAmount: paymentMethod === 'cash' ? (parseFloat(calculateTotalPrice()) * 0.25).toFixed(2) : '0',
        createdAt: new Date().toISOString()
      };
      
      console.log('Booking confirmed:', bookingDetails);
      
      toast({
        title: language === 'fr' ? 'Réservation confirmée !' : 'Booking confirmed!',
        description: language === 'fr' 
          ? `${paymentMethod === 'cash' ? `Dépôt requis: $${bookingDetails.depositAmount}. ` : ''}Votre chauffeur vous contactera bientôt.` 
          : `${paymentMethod === 'cash' ? `Required deposit: $${bookingDetails.depositAmount}. ` : ''}Your driver will contact you soon.`,
        variant: "default",
      });
      
      setBookingStep(1);
      setPickup('');
      setSelectedVehicle(null);
      setPaymentMethod(null);
      setDate(new Date());
      setTime('12:00');
      setDurationType('hourly');
      setHours(3);
      setDays(1);
    }, 2000);
  };

  const getDurationLabel = () => {
    switch (durationType) {
      case 'hourly': 
        return `${hours} ${language === 'fr' ? 'heure(s)' : 'hour(s)'}`;
      case 'daily': 
        return `${days} ${language === 'fr' ? 'jour(s)' : 'day(s)'}`;
      default: 
        return `${hours} ${language === 'fr' ? 'heure(s)' : 'hour(s)'}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4">
          <BookingHeader language={language} bookingStep={bookingStep} />
          
          {bookingStep === 1 && (
            <BookingStepOneDetails
              language={language}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              durationType={durationType}
              setDurationType={setDurationType}
              hours={hours}
              setHours={setHours}
              days={days}
              setDays={setDays}
              pickup={pickup}
              setPickup={setPickup}
              handleContinue={handleContinue}
            />
          )}
          
          {bookingStep === 2 && (
            <BookingStepTwoVehicle
              language={language}
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={handleVehicleSelect}
              handleContinue={handleContinue}
              handlePrevious={handlePrevious}
              renderStars={renderStars}
              durationType={durationType}
            />
          )}
          
          {bookingStep === 3 && (
            <BookingStepThreePayment
              language={language}
              date={date}
              time={time}
              durationType={durationType}
              getDurationLabel={getDurationLabel}
              getSelectedVehicle={getSelectedVehicle}
              calculateTotalPrice={calculateTotalPrice}
              paymentMethod={paymentMethod}
              paymentMethods={paymentMethods}
              handlePaymentMethodSelect={handlePaymentMethodSelect}
              handlePrevious={handlePrevious}
              handleConfirmBooking={handleConfirmBooking}
              isProcessing={isProcessing}
            />
          )}
        </div>
      </main>
      
      <BookingFooter language={language} />
      
      <Footer />
    </div>
  );
};

export default BookingPage;
