
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, BadgePercent } from "lucide-react";

export const PromotionsBanner = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handlePromotionClick = () => {
    navigate('/book');
  };
  
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/lovable-uploads/80016e66-251f-4c9d-bf53-482d6f029b83.png')",
          filter: "brightness(0.3) saturate(1.2)"
        }}
      ></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-nova-gold/20 to-nova-black/60 z-0 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          <div className="md:w-2/3">
            <Badge className="bg-nova-gold text-nova-black mb-4 px-3 py-1 text-sm font-bold uppercase flex items-center w-fit">
              <BadgePercent className="mr-1 h-4 w-4" />
              {language === 'fr' ? 'Offre Spéciale' : 'Special Offer'}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white border-2 border-nova-gold inline-block px-6 py-3 rounded-lg">
              {language === 'fr' 
                ? 'Économisez 20% sur les locations de week-end' 
                : 'Save 20% on Weekend Rentals'}
              <Sparkles className="inline-block ml-2 text-nova-gold h-6 w-6" />
            </h2>
            
            <p className="text-white/80 mb-4 max-w-2xl">
              {language === 'fr' 
                ? 'Profitez de notre offre spéciale week-end et bénéficiez d\'une réduction de 20% sur toutes nos voitures de luxe. Offre valable pour toute réservation effectuée avant la fin du mois.'
                : 'Take advantage of our special weekend offer and get a 20% discount on all our luxury cars. Offer valid for any booking made before the end of the month.'}
            </p>
            
            <div className="flex items-center text-nova-gold mb-6">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {language === 'fr' ? 'Offre limitée dans le temps' : 'Limited time offer'}
              </span>
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <Button
              onClick={handlePromotionClick}
              size="lg"
              className="gold-btn text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
            >
              {language === 'fr' ? 'Réserver Maintenant' : 'Book Now'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
