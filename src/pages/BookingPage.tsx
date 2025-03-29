
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

// Add CarIcon component to replace the missing Car icon reference
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [duration, setDuration] = useState(3); // in hours
  const [pickup, setPickup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  
  // Mock vehicles data
  const vehicles = [
    {
      id: "v1",
      name: "Toyota Fortuner",
      type: "SUV",
      comfort: 3.5,
      capacity: 5,
      price: 50, // per hour
      image: "/lovable-uploads/your-image.png" // would be a proper image path in a real app
    },
    {
      id: "v2",
      name: "Mercedes-Benz E-Class",
      type: "Sedan",
      comfort: 4.5,
      capacity: 4,
      price: 70, // per hour
      image: "/lovable-uploads/your-image.png"
    },
    {
      id: "v3",
      name: "Lexus LX 570",
      type: "Luxury SUV",
      comfort: 5,
      capacity: 7,
      price: 90, // per hour
      image: "/lovable-uploads/your-image.png"
    }
  ];
  
  // Payment methods
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
    
    let total = vehicle.price * duration;
    
    // Apply 5% discount for online payment
    if (paymentMethod && paymentMethod !== 'cash') {
      total = total * 0.95;
    }
    
    return total;
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
          
          {/* Booking Steps */}
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
          
          {/* Step 1: Date, Time, Location */}
          {bookingStep === 1 && (
            <div className="max-w-lg mx-auto">
              <Card className="bg-nova-gray/30 border border-nova-gold/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-nova-white">
                    {language === 'fr' ? 'Détails de la réservation' : 'Booking Details'}
                  </h2>
                  
                  {/* Date Picker */}
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
                  
                  {/* Time Picker */}
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
                  
                  {/* Duration */}
                  <div className="mb-6">
                    <Label htmlFor="duration" className="text-nova-white mb-2 block">
                      {language === 'fr' ? 'Durée (heures)' : 'Duration (hours)'}
                    </Label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="flex h-10 w-full rounded-md border border-nova-gold/50 bg-nova-black px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-nova-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 12, 24].map((hours) => (
                        <option key={hours} value={hours}>
                          {hours} {language === 'fr' ? 'heure(s)' : 'hour(s)'}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Pickup Location */}
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
          
          {/* Step 2: Vehicle Selection */}
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
                          <div className="mr-4 h-16 w-16 bg-nova-gray rounded-md flex items-center justify-center">
                            <CarIcon />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-nova-white font-medium">{vehicle.name}</h3>
                            <p className="text-nova-white/70 text-sm">{vehicle.type}</p>
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
                            <p className="text-nova-gold font-bold">${vehicle.price}</p>
                            <p className="text-nova-white/70 text-xs">
                              {language === 'fr' ? 'par heure' : 'per hour'}
                            </p>
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
          
          {/* Step 3: Payment */}
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
                  
                  {/* Booking Summary */}
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
                          {duration} {language === 'fr' ? 'heure(s)' : 'hour(s)'}
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
                  
                  {/* Payment Methods */}
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
                    disabled={!paymentMethod}
                  >
                    {language === 'fr' ? 'Confirmer la réservation' : 'Confirm booking'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
        </div>
      </main>
      
      {/* Tab Navigation */}
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
