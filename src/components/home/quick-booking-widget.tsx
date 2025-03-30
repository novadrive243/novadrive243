
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Car, MapPin, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";

export const QuickBookingWidget = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  
  const vehicleCategories = [
    { value: "sedan", label: language === 'fr' ? 'Berline de Luxe' : 'Luxury Sedan' },
    { value: "suv", label: language === 'fr' ? 'SUV Premium' : 'Premium SUV' },
    { value: "sports", label: language === 'fr' ? 'Voiture de Sport' : 'Sports Car' },
    { value: "electric", label: language === 'fr' ? 'Véhicule Électrique' : 'Electric Vehicle' }
  ];
  
  const handleBooking = () => {
    let queryParams = new URLSearchParams();
    
    if (pickupDate) {
      queryParams.append('pickupDate', pickupDate.toISOString().split('T')[0]);
    }
    
    if (returnDate) {
      queryParams.append('returnDate', returnDate.toISOString().split('T')[0]);
    }
    
    if (location) {
      queryParams.append('location', location);
    }
    
    if (selectedVehicle) {
      queryParams.append('vehicle', selectedVehicle);
    }
    
    navigate(`/book?${queryParams.toString()}`);
  };
  
  return (
    <section className="py-16 bg-nova-gray/50 relative">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-4xl mx-auto border-2 border-nova-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-gradient-to-br from-nova-black to-nova-gray/90">
          <CardHeader className="text-center border-b border-nova-gold/20 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold gold-gradient-text">
              {language === 'fr' ? 'Réservation Rapide' : 'Quick Booking'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Location Input (simplified) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-nova-white/80 flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-nova-gold" />
                  {language === 'fr' ? 'Adresse' : 'Address'}
                </label>
                <div className="relative">
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'fr' ? 'Entrez votre adresse complète' : 'Enter your full address'}
                    className="bg-nova-gray/20 border-nova-gold/30 text-nova-white"
                  />
                </div>
              </div>
              
              {/* Vehicle Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-nova-white/80 flex items-center">
                  <Car className="mr-2 h-4 w-4 text-nova-gold" />
                  {language === 'fr' ? 'Catégorie de Véhicule' : 'Vehicle Category'}
                </label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger className="bg-nova-gray/20 border-nova-gold/30 text-nova-white">
                    <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select vehicle'} />
                  </SelectTrigger>
                  <SelectContent className="bg-nova-gray border-nova-gold/30">
                    {vehicleCategories.map((veh) => (
                      <SelectItem key={veh.value} value={veh.value} className="text-nova-white hover:bg-nova-gold/20">
                        {veh.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Pickup Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-nova-white/80 flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-nova-gold" />
                  {language === 'fr' ? 'Date de Prise en Charge' : 'Pickup Date'}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-nova-gray/20 border-nova-gold/30 text-nova-white"
                    >
                      {pickupDate ? (
                        format(pickupDate, "PPP", { locale: language === 'fr' ? fr : undefined })
                      ) : (
                        <span className="text-nova-white/50">
                          {language === 'fr' ? 'Sélectionner une date' : 'Select a date'}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-nova-gray border-nova-gold/30" align="start">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                      className="bg-nova-gray text-nova-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Return Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-nova-white/80 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-nova-gold" />
                  {language === 'fr' ? 'Date de Retour' : 'Return Date'}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-nova-gray/20 border-nova-gold/30 text-nova-white"
                    >
                      {returnDate ? (
                        format(returnDate, "PPP", { locale: language === 'fr' ? fr : undefined })
                      ) : (
                        <span className="text-nova-white/50">
                          {language === 'fr' ? 'Sélectionner une date' : 'Select a date'}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-nova-gray border-nova-gold/30" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => 
                        pickupDate ? date < pickupDate : false
                      }
                      className="bg-nova-gray text-nova-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button 
              onClick={handleBooking}
              className="gold-btn w-full py-6 text-lg font-bold"
            >
              {language === 'fr' ? 'Vérifier la Disponibilité' : 'Check Availability'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
