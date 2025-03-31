
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/language-context";
import { vehicles } from "@/data/vehicles";
import { CarFront, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeaturedCarousel = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Get only the premium vehicles
  const featuredVehicles = vehicles.filter(vehicle => vehicle.comfort >= 4);
  
  const handleBookNow = (vehicleId: string) => {
    navigate(`/book?vehicle=${vehicleId}`);
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-nova-black to-nova-gray/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <Award className="inline-block mr-2 text-nova-gold h-8 w-8" />
            <span className="border border-nova-gold px-3 py-1 rounded shadow-[0_0_10px_rgba(232,191,82,0.5)]">
              {language === 'fr' ? 'Véhicules Premium' : 'Premium Vehicles'}
            </span>
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez notre collection de véhicules d\'élite pour une expérience de conduite exceptionnelle' 
              : 'Discover our collection of elite vehicles for an exceptional driving experience'}
          </p>
        </div>
        
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-4"
        >
          <CarouselContent>
            {featuredVehicles.map((vehicle) => (
              <CarouselItem key={vehicle.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="nova-card overflow-hidden border-nova-gold/30 hover:border-nova-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute top-2 right-2 z-10 bg-nova-gold/90 text-nova-black px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-nova-black" /> Premium
                      </div>
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <CarFront className="mr-2 h-5 w-5 text-nova-gold" />
                        {vehicle.name}
                      </h3>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < vehicle.comfort ? 'text-nova-gold' : 'text-nova-white/30'}`}
                              fill={i < vehicle.comfort ? '#D4AF37' : 'none'}
                            />
                          ))}
                        </div>
                        <div className="text-nova-gold font-bold">
                          ${vehicle.price.daily}/day
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleBookNow(vehicle.id)}
                        className="w-full gold-btn flex items-center justify-center"
                      >
                        {language === 'fr' ? 'Réserver Maintenant' : 'Book Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative -left-0 translate-y-0 bg-nova-gold/20 hover:bg-nova-gold/40 text-nova-white border-none" />
            <CarouselNext className="relative -right-0 translate-y-0 bg-nova-gold/20 hover:bg-nova-gold/40 text-nova-white border-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
