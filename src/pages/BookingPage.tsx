
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
import { format, addHours, differenceInHours } from "date-fns";

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
  const [depositPaymentMethod, setDepositPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [installmentOption, setInstallmentOption] = useState<'full' | 'three_installments'>('full');
  
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
    
    // If not cash, set the deposit payment method to the same method
    if (methodId !== 'cash') {
      setDepositPaymentMethod(methodId);
    } else {
      // Clear deposit payment method when selecting cash
      setDepositPaymentMethod(null);
    }
  };
  
  const handleDepositPaymentMethodSelect = (methodId: string) => {
    setDepositPaymentMethod(methodId);
  };

  const handleInstallmentOptionSelect = (option: 'full' | 'three_installments') => {
    setInstallmentOption(option);
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

  const calculateDepositAmount = (): string => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const depositAmount = totalPrice * 0.25;
    return depositAmount.toFixed(2);
  };

  const calculateInstallmentAmount = (): string => {
    const totalPrice = parseFloat(calculateTotalPrice());
    const installmentAmount = totalPrice / 3;
    return installmentAmount.toFixed(2);
  };

  const isThreeInstallmentsEligible = (): boolean => {
    // Check if booking date is at least 24 hours away
    if (!date) return false;
    
    const bookingDateTime = new Date(date);
    const timeComponents = time.split(':');
    bookingDateTime.setHours(
      parseInt(timeComponents[0], 10),
      parseInt(timeComponents[1], 10)
    );
    
    const now = new Date();
    const hoursDifference = differenceInHours(bookingDateTime, now);
    
    // Eligible if booking is at least 24 hours away
    return hoursDifference >= 24;
  };

  const handleConfirmBooking = () => {
    // Validation: For cash payments, require deposit payment method
    if (paymentMethod === 'cash' && !depositPaymentMethod) {
      toast({
        title: language === 'fr' ? 'Erreur de paiement' : 'Payment Error',
        description: language === 'fr' 
          ? 'Veuillez sélectionner une méthode de paiement pour le dépôt.' 
          : 'Please select a payment method for the deposit.',
        variant: "destructive",
      });
      return;
    }
    
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
        depositPaymentMethod: paymentMethod === 'cash' ? depositPaymentMethod : paymentMethod,
        totalPrice: calculateTotalPrice(),
        depositAmount: calculateDepositAmount(),
        installmentOption,
        installmentAmount: installmentOption === 'three_installments' ? calculateInstallmentAmount() : '0',
        createdAt: new Date().toISOString()
      };
      
      console.log('Booking confirmed:', bookingDetails);
      
      let toastMessage = '';
      if (installmentOption === 'three_installments') {
        toastMessage = language === 'fr' 
          ? `Premier paiement de $${bookingDetails.installmentAmount} effectué. Les prochains paiements suivront selon le calendrier.`
          : `First payment of $${bookingDetails.installmentAmount} processed. Next payments will follow as scheduled.`;
      } else if (paymentMethod === 'cash') {
        toastMessage = language === 'fr' 
          ? `Dépôt requis: $${bookingDetails.depositAmount}. Votre chauffeur vous contactera bientôt.`
          : `Required deposit: $${bookingDetails.depositAmount}. Your driver will contact you soon.`;
      } else {
        toastMessage = language === 'fr' 
          ? `Paiement complet effectué. Votre chauffeur vous contactera bientôt.`
          : `Full payment processed. Your driver will contact you soon.`;
      }
      
      toast({
        title: language === 'fr' ? 'Réservation confirmée !' : 'Booking confirmed!',
        description: toastMessage,
        variant: "default",
      });
      
      setBookingStep(1);
      setPickup('');
      setSelectedVehicle(null);
      setPaymentMethod(null);
      setDepositPaymentMethod(null);
      setInstallmentOption('full');
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
              calculateDepositAmount={calculateDepositAmount}
              calculateInstallmentAmount={calculateInstallmentAmount}
              paymentMethod={paymentMethod}
              paymentMethods={paymentMethods}
              handlePaymentMethodSelect={handlePaymentMethodSelect}
              depositPaymentMethod={depositPaymentMethod}
              handleDepositPaymentMethodSelect={handleDepositPaymentMethodSelect}
              installmentOption={installmentOption}
              handleInstallmentOptionSelect={handleInstallmentOptionSelect}
              isThreeInstallmentsEligible={isThreeInstallmentsEligible}
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
