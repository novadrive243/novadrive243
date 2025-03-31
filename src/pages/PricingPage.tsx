
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Moon, Clock3 } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-nova-white">
            {t('pricing.title') || 'Our Pricing'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map(vehicle => (
              <Card key={vehicle.id} className="nova-card overflow-hidden hover:border-nova-gold/60 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-nova-gold">{vehicle.name}</h2>
                    
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start">
                        <Calendar className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">${vehicle.price.daily} par jour</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">${vehicle.price.hourly} par heure</p>
                          <p className="text-sm text-nova-white/70">De 7h à 21h (minimum 2h)</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Moon className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Supplément après 21h</p>
                          <p className="text-sm text-nova-white/70">Frais fixe de +20$</p>
                        </div>
                      </li>
                    </ul>
                    
                    <Link to={`/book?vehicle=${vehicle.id}`} className="gold-btn px-6 py-3 rounded-full w-full block text-center">
                      {t('pricing.bookNow') || 'Book Now'}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 nova-card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-nova-gold text-center">Informations supplémentaires</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-nova-gold mt-2 mr-3"></div>
                <p>Les heures de service standard sont de 7h00 à 21h00.</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-nova-gold mt-2 mr-3"></div>
                <p>Un supplément fixe de 20$ s'applique pour les services après 21h00.</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-nova-gold mt-2 mr-3"></div>
                <p>Durée minimum de réservation : 2 heures.</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-nova-gold mt-2 mr-3"></div>
                <p>Les tarifs journaliers sont calculés sur une base de 24 heures.</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-nova-gold mt-2 mr-3"></div>
                <p>Des frais supplémentaires peuvent s'appliquer pour les trajets en dehors de la ville.</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
