
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Moon } from "lucide-react";

const PricingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 gold-gradient-text">
            {t('pricing.title') || 'Our Pricing'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chevrolet Tahoe */}
            <Card className="nova-card overflow-hidden hover:border-nova-gold/60 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png" 
                    alt="Chevrolet Tahoe" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-nova-gold">Chevrolet Tahoe</h2>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <Calendar className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">400$ par jour</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">60$ par heure</p>
                        <p className="text-sm text-nova-white/70">De 7h à 21h</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Moon className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Supplément après 21h</p>
                        <p className="text-sm text-nova-white/70">+20$ par heure</p>
                      </div>
                    </li>
                  </ul>
                  
                  <button className="gold-btn px-6 py-3 rounded-full w-full">
                    {t('pricing.bookNow') || 'Book Now'}
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Nissan X-Terra */}
            <Card className="nova-card overflow-hidden hover:border-nova-gold/60 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/6a588e4a-4639-4bb2-800c-1d4ca6adb059.png" 
                    alt="Nissan X-Terra" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-nova-gold">Nissan X-Terra</h2>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <Calendar className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">200$ par jour</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">35$ par heure</p>
                        <p className="text-sm text-nova-white/70">De 7h à 21h</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Moon className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Supplément après 21h</p>
                        <p className="text-sm text-nova-white/70">+20$ par heure</p>
                      </div>
                    </li>
                  </ul>
                  
                  <button className="gold-btn px-6 py-3 rounded-full w-full">
                    {t('pricing.bookNow') || 'Book Now'}
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Toyota Fortuner */}
            <Card className="nova-card overflow-hidden hover:border-nova-gold/60 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src="/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png" 
                    alt="Toyota Fortuner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-nova-gold">Toyota Fortuner</h2>
                  
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <Calendar className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">150$ par jour</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">25$ par heure</p>
                        <p className="text-sm text-nova-white/70">De 7h à 21h</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Moon className="w-5 h-5 text-nova-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Supplément après 21h</p>
                        <p className="text-sm text-nova-white/70">+20$ par heure</p>
                      </div>
                    </li>
                  </ul>
                  
                  <button className="gold-btn px-6 py-3 rounded-full w-full">
                    {t('pricing.bookNow') || 'Book Now'}
                  </button>
                </div>
              </CardContent>
            </Card>
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
                <p>Un supplément de 20$ par heure s'applique pour les services après 21h00.</p>
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
