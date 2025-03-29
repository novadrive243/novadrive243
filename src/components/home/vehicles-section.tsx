
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface VehicleCardProps {
  name: string;
  image: string;
  comfort: number;
  capacity: number;
  onClick: () => void;
}

function VehicleCard({ name, image, comfort, capacity, onClick }: VehicleCardProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="nova-card overflow-hidden hover:border-nova-gold/60 transition-all duration-300">
      <CardContent className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nova-black to-transparent h-1/3"></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-nova-white/70 mb-1">{t('vehicles.comfort')}</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < comfort ? 'text-nova-gold' : 'text-nova-white/30'}`}
                    fill={i < comfort ? '#D4AF37' : 'none'}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-nova-white/70 mb-1">{t('vehicles.capacity')}</p>
              <p className="text-nova-white">{capacity} persons</p>
            </div>
          </div>
          
          <Button 
            onClick={onClick} 
            className="gold-btn w-full"
          >
            {t('vehicles.select')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function VehiclesSection() {
  const { t } = useLanguage();
  
  const vehicles = [
    {
      id: 'chevrolet-tahoe',
      name: 'Chevrolet Tahoe',
      image: '/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png',
      comfort: 5,
      capacity: 6
    },
    {
      id: 'nissan-xterra',
      name: 'Nissan X-Terra',
      image: '/lovable-uploads/6a588e4a-4639-4bb2-800c-1d4ca6adb059.png',
      comfort: 4,
      capacity: 6
    },
    {
      id: 'toyota-fortuner',
      name: 'Toyota Fortuner',
      image: '/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png',
      comfort: 5,
      capacity: 6
    }
  ];
  
  const handleVehicleSelect = (id: string) => {
    console.log(`Vehicle selected: ${id}`);
    // Would typically navigate to booking page with this vehicle pre-selected
  };
  
  return (
    <section className="py-20 bg-nova-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gold-gradient-text">{t('vehicles.title')}</span>
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {t('vehicles.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              comfort={vehicle.comfort}
              capacity={vehicle.capacity}
              onClick={() => handleVehicleSelect(vehicle.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
