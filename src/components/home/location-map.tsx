
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const LocationMap = () => {
  const { language } = useLanguage();
  
  const locations = [
    {
      id: 1,
      name: language === 'fr' ? 'Centre-Ville' : 'Downtown',
      address: language === 'fr' 
        ? '123 Boulevard Principal, Montréal, QC' 
        : '123 Main Boulevard, Montreal, QC',
      phone: '+1 (514) 555-1234',
      email: 'downtown@novadrive.com',
      hours: language === 'fr' 
        ? 'Lun-Ven: 8h-20h, Sam-Dim: 9h-18h' 
        : 'Mon-Fri: 8am-8pm, Sat-Sun: 9am-6pm'
    },
    {
      id: 2,
      name: language === 'fr' ? 'Aéroport' : 'Airport',
      address: language === 'fr' 
        ? 'Terminal 2, Aéroport International, QC' 
        : 'Terminal 2, International Airport, QC',
      phone: '+1 (514) 555-5678',
      email: 'airport@novadrive.com',
      hours: language === 'fr' 
        ? 'Tous les jours: 6h-23h' 
        : 'Daily: 6am-11pm'
    },
    {
      id: 3,
      name: language === 'fr' ? 'Quartier des Affaires' : 'Business District',
      address: language === 'fr' 
        ? '456 Ave des Finances, Tour Nord' 
        : '456 Finance Ave, North Tower',
      phone: '+1 (514) 555-9012',
      email: 'business@novadrive.com',
      hours: language === 'fr' 
        ? 'Lun-Ven: 7h-21h, Sam: 9h-17h' 
        : 'Mon-Fri: 7am-9pm, Sat: 9am-5pm'
    }
  ];
  
  return (
    <section className="py-16 bg-nova-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <MapPin className="inline-block mr-2 text-nova-gold h-8 w-8" />
            <span className="gold-gradient-text">
              {language === 'fr' ? 'Nos Emplacements' : 'Our Locations'}
            </span>
          </h2>
          {/* Removed the subtitle text about strategic locations */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="bg-nova-gray/20 border-nova-gold/20 hover:border-nova-gold/50 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-nova-gold">{location.name}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex">
                    <MapPin className="h-5 w-5 mr-3 text-nova-gold flex-shrink-0" />
                    <span className="text-nova-white/80">{location.address}</span>
                  </div>
                  
                  <div className="flex">
                    <Phone className="h-5 w-5 mr-3 text-nova-gold flex-shrink-0" />
                    <span className="text-nova-white/80">{location.phone}</span>
                  </div>
                  
                  <div className="flex">
                    <Mail className="h-5 w-5 mr-3 text-nova-gold flex-shrink-0" />
                    <span className="text-nova-white/80">{location.email}</span>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 mr-3 text-nova-gold flex-shrink-0" />
                    <span className="text-nova-white/80">{location.hours}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-nova-gray/30 mt-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11183.00761244815!2d-73.57223517969666!3d45.51263605128959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sDowntown%20Montreal%2C%20Montreal%2C%20QC!5e0!3m2!1sen!2sca!4v1593080934135!5m2!1sen!2sca" 
                    width="100%" 
                    height="150" 
                    frameBorder="0" 
                    style={{ border: 0, borderRadius: '0.5rem' }} 
                    allowFullScreen={false} 
                    aria-hidden="false" 
                    tabIndex={0}
                    title={`Map for ${location.name}`}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

