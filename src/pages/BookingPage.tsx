import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Star, MapPin, Calendar as CalendarIcon, Clock, CreditCard, Banknote, ArrowRight, CheckCircle, Home, UserRound } from "lucide-react";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { vehicles } from "@/data/vehicles";
import { useToast } from "@/hooks/use-toast";

const CarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-car"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.8 2 11 2 11.3V16c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
};

const BookingPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [durationType, setDurationType] = useState<'hourly' | 'daily' | 'monthly'>('hourly');
  const [hours, setHours] = useState(3); // in hours
  const [days, setDays] = useState(1); // in days
  const [months, setMonths] = useState(1); // in months
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
  
  const calculateTotalPrice = () => {
    const vehicle = getSelectedVehicle();
    if (!vehicle) return 0;
    
    let total = 0;
    switch (durationType) {
      case 'hourly':
        total = vehicle.price.hourly * hours;
        break;
      case 'daily':
        total = vehicle.price.daily * days;
        break;
      case 'monthly':
        total = vehicle.price.monthly * months;
        break;
      default:
        total = vehicle.price.hourly * hours;
    }
    
    // Apply 5% discount for online payment
    if (paymentMethod && paymentMethod !== 'cash') {
      total = total * 0.95;
    }
    
    return total.toFixed(2);
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create booking object for sending to backend (would be used in a real implementation)
      const bookingDetails = {
        date: date ? format(date, "yyyy-MM-dd") : '',
        time,
        durationType,
        duration: durationType === 'hourly' ? hours : durationType === 'daily' ? days : months,
        pickup,
        vehicleId: selectedVehicle,
        vehicleName: getSelectedVehicle()?.name,
        paymentMethod,
        totalPrice: calculateTotalPrice(),
        createdAt: new Date().toISOString()
      };
      
      console.log('Booking confirmed:', bookingDetails);
      
      // Show success toast
      toast({
        title: language === 'fr' ? 'Réservation confirmée !' : 'Booking confirmed!',
        description: language === 'fr' 
          ? 'Votre chauffeur vous contactera bientôt.' 
          : 'Your driver will contact you soon.',
        variant: "default",
      });
      
      // Reset the form and go back to step 1 for a new booking
      setBookingStep(1);
      setPickup('');
      setSelectedVehicle(null);
      setPaymentMethod(null);
      setDate(new Date());
      setTime('12:00');
      setDurationType('hourly');
      setHours(3);
      setDays(1);
      setMonths(1);
    }, 2000);
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-nova-gold text-nova-gold h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="text-nova-gold/30 h-4 w-4" />
          <Star className="absolute top-0 left-0 fill-nova-gold text-nova-gold h-4 w-4 clip-path-half" />
        </span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-nova-gold/30 h-4 w-4" />);
    }
    
    return stars;
  };

  const getDurationValue = () => {
    switch (durationType) {
      case 'hourly': return hours;
      case 'daily': return days;
      case 'monthly': return months;
      default: return hours;
    }
  };

  const getDurationLabel = () => {
    switch (durationType) {
      case 'hourly': 
        return `${hours} ${language === 'fr' ? 'heure(s)' : 'hour(s)'}`;
      case 'daily': 
        return `${days} ${language === 'fr' ? 'jour(s)' : 'day(s)'}`;
      case 'monthly': 
        return `${months} ${language === 'fr' ? 'mois' : 'month(s)'}`;
      default: 
        return `${hours} ${language === 'fr' ? 'heure(s)' : 'hour(s)'}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="gold-gradient-text">
              {language === 'fr' ? 'Réserver un chauffeur' : 'Book a chauffeur'}
            </span>
          </h1>
          
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 1 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
                1
              </div>
              <div className={`h-1 w-8 ${bookingStep >= 2 ? 'bg-nova-gold' : 'bg-nova-gray'}`}></div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 2 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
                2
              </div>
              <div className={`h-1 w-8 ${bookingStep >= 3 ? 'bg-nova-gold' : 'bg-nova-gray'}`}></div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 3 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
                3
              </div>
            </div>
          </div>
          
          {bookingStep === 1 && (
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
                    <div className="grid grid-cols-3 gap-2">
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
                      <Button
                        type="button"
                        variant={durationType === 'monthly' ? 'default' : 'outline'}
                        className={durationType === 'monthly' ? 'bg-nova-gold text-nova-black' : 'border-nova-gold/30 text-nova-white'}
                        onClick={() => setDurationType('monthly')}
                      >
                        {language === 'fr' ? 'Par mois' : 'Monthly'}
                      </Button>
                    </div>
                  </div>
                  
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
          )}
          
          {bookingStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <Button 
                onClick={handlePrevious} 
                variant="outline" 
                className="mb-4 border-nova-gold/50 text-nova-gold"
              >
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              
              <Card className="bg-nova-gray/30 border border-nova-gold/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-nova-white">
                    {language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'}
                  </h2>
                  
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div 
                        key={vehicle.id}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedVehicle === vehicle.id 
                            ? 'border-nova-gold bg-nova-gold/10' 
                            : 'border-nova-gray/50 hover:border-nova-gold/50'
                        }`}
                        onClick={() => handleVehicleSelect(vehicle.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-4 h-16 w-16 bg-nova-black/50 rounded-md overflow-hidden">
                            <img 
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-nova-white font-medium">{vehicle.name}</h3>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-4">
                                {renderStars(vehicle.comfort)}
                              </div>
                              <span className="text-sm text-nova-white/70">
                                {language === 'fr' ? 'Capacité:' : 'Capacity:'} {vehicle.capacity}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            {durationType === 'hourly' && (
                              <>
                                <p className="text-nova-gold font-bold">${vehicle.price.hourly}</p>
                                <p className="text-nova-white/70 text-xs">
                                  {language === 'fr' ? 'par heure' : 'per hour'}
                                </p>
                              </>
                            )}
                            {durationType === 'daily' && (
                              <>
                                <p className="text-nova-gold font-bold">${vehicle.price.daily}</p>
                                <p className="text-nova-white/70 text-xs">
                                  {language === 'fr' ? 'par jour' : 'per day'}
                                </p>
                              </>
                            )}
                            {durationType === 'monthly' && (
                              <>
                                <p className="text-nova-gold font-bold">${vehicle.price.monthly}</p>
                                <p className="text-nova-white/70 text-xs">
                                  {language === 'fr' ? 'par mois' : 'per month'}
                                </p>
                              </>
                            )}
                            {selectedVehicle === vehicle.id && (
                              <CheckCircle className="h-5 w-5 text-nova-gold ml-auto mt-2" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleContinue} 
                    className="w-full gold-btn mt-6"
                    disabled={!selectedVehicle}
                  >
                    {language === 'fr' ? 'Continuer' : 'Continue'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
          {bookingStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <Button 
                onClick={handlePrevious} 
                variant="outline" 
                className="mb-4 border-nova-gold/50 text-nova-gold"
              >
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
              
              <Card className="bg-nova-gray/30 border border-nova-gold/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-nova-white">
                    {language === 'fr' ? 'Paiement' : 'Payment'}
                  </h2>
                  
                  <div className="bg-nova-black/50 rounded-lg p-4 mb-6">
                    <h3 className="text-nova-white font-medium mb-2">
                      {language === 'fr' ? 'Résumé de la réservation' : 'Booking Summary'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-nova-white/70">
                          {language === 'fr' ? 'Date:' : 'Date:'}
                        </span>
                        <span className="text-nova-white">
                          {date ? format(date, "PPP", { locale: language === 'fr' ? fr : enUS }) : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-nova-white/70">
                          {language === 'fr' ? 'Heure:' : 'Time:'}
                        </span>
                        <span className="text-nova-white">{time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-nova-white/70">
                          {language === 'fr' ? 'Durée:' : 'Duration:'}
                        </span>
                        <span className="text-nova-white">
                          {getDurationLabel()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-nova-white/70">
                          {language === 'fr' ? 'Véhicule:' : 'Vehicle:'}
                        </span>
                        <span className="text-nova-white">
                          {getSelectedVehicle()?.name}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t border-nova-white/10">
                        <span className="text-nova-white">
                          {language === 'fr' ? 'Prix total:' : 'Total price:'}
                        </span>
                        <span className="text-nova-gold">
                          ${calculateTotalPrice()}
                        </span>
                      </div>
                      {paymentMethod && paymentMethod !== 'cash' && (
                        <div className="text-right text-xs text-nova-gold">
                          {language === 'fr' 
                            ? '(Remise de 5% appliquée pour paiement en ligne)' 
                            : '(5% discount applied for online payment)'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-nova-white font-medium mb-3">
                      {language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}
                    </h3>
                    
                    <Tabs defaultValue="online">
                      <TabsList className="grid grid-cols-2 w-full bg-nova-gray">
                        <TabsTrigger value="online" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          {language === 'fr' ? 'En ligne' : 'Online'}
                        </TabsTrigger>
                        <TabsTrigger value="cash" className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          {language === 'fr' ? 'Espèces' : 'Cash'}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="online" className="mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          {paymentMethods.filter(m => m.id !== 'cash').map((method) => (
                            <div 
                              key={method.id}
                              className={`p-3 rounded border cursor-pointer transition-all flex items-center ${
                                paymentMethod === method.id 
                                  ? 'border-nova-gold bg-nova-gold/10' 
                                  : 'border-nova-gray/50 hover:border-nova-gold/50'
                              }`}
                              onClick={() => handlePaymentMethodSelect(method.id)}
                            >
                              <span className="mr-2">{method.icon}</span>
                              <span className="text-nova-white text-sm">{method.name}</span>
                              {paymentMethod === method.id && (
                                <CheckCircle className="h-4 w-4 text-nova-gold ml-auto" />
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-nova-gold mt-2">
                          {language === 'fr' 
                            ? 'Remise de 5% pour paiement en ligne' 
                            : '5% discount for online payment'}
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="cash" className="mt-4">
                        <div 
                          className={`p-3 rounded border cursor-pointer transition-all flex items-center ${
                            paymentMethod === 'cash' 
                              ? 'border-nova-gold bg-nova-gold/10' 
                              : 'border-nova-gray/50 hover:border-nova-gold/50'
                          }`}
                          onClick={() => handlePaymentMethodSelect('cash')}
                        >
                          <span className="mr-2">💵</span>
                          <span className="text-nova-white text-sm">
                            {language === 'fr' ? 'Paiement en espèces' : 'Cash payment'}
                          </span>
                          {paymentMethod === 'cash' && (
                            <CheckCircle className="h-4 w-4 text-nova-gold ml-auto" />
                          )}
                        </div>
                        <p className="text-xs text-nova-white/70 mt-2">
                          {language === 'fr' 
                            ? 'Un dépôt de 25% est requis pour les réservations en espèces' 
                            : '25% deposit is required for cash bookings'}
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <Button 
                    className="w-full gold-btn"
                    disabled={!paymentMethod || isProcessing}
                    onClick={handleConfirmBooking}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {language === 'fr' ? 'Traitement en cours...' : 'Processing...'}
                      </span>
                    ) : (
                      <>
                        {language === 'fr' ? 'Confirmer la réservation' : 'Confirm booking'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-nova-black border-t border-nova-gold/20 p-2">
        <div className="flex justify-around items-center">
          <Link to="/home" className="flex flex-col items-center p-2 text-nova-white/70">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">
              {language === 'fr' ? 'Accueil' : 'Home'}
            </span>
          </Link>
          
          <Link to="/book" className="flex flex-col items-center p-2 text-nova-gold">
            <CalendarIcon className="h-6 w-6" />
            <span className="text-xs mt-1">
              {language === 'fr' ? 'Réservation' : 'Booking'}
            </span>
          </Link>
          
          <Link to="/account" className="flex flex-col items-center p-2 text-nova-white/70">
            <UserRound className="h-6 w-6" />
            <span className="text-xs mt-1">
              {language === 'fr' ? 'Compte' : 'Account'}
            </span>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
