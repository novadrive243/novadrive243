
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  name: string;
  image_url: string;
  comfort: number;
  capacity: number;
  price_per_day: number;
}

interface VehicleCardProps {
  name: string;
  image: string;
  comfort: number;
  capacity: number;
  price: number;
  onClick: () => void;
}

function VehicleCard({ name, image, comfort, capacity, price, onClick }: VehicleCardProps) {
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
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-nova-white/70">{t('vehicles.dailyRate')}</p>
              <p className="text-nova-gold font-semibold">${price}/day</p>
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vehicles')
          .select('id, name, image_url, price_per_day');
        
        if (error) throw error;
        
        // Convert data and add default values for comfort and capacity
        const formattedVehicles = data.map(vehicle => ({
          ...vehicle,
          comfort: 5, // Default comfort level
          capacity: 5  // Default capacity
        }));
        
        setVehicles(formattedVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast({
          title: "Error",
          description: "Failed to load vehicles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, [toast]);
  
  const handleVehicleSelect = (id: string) => {
    navigate(`/book?vehicle=${id}`);
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="nova-card overflow-hidden animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] bg-nova-gray/20"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-6 bg-nova-gray/20 rounded"></div>
                    <div className="flex justify-between">
                      <div className="w-1/3 h-4 bg-nova-gray/20 rounded"></div>
                      <div className="w-1/3 h-4 bg-nova-gray/20 rounded"></div>
                    </div>
                    <div className="h-10 bg-nova-gray/20 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                name={vehicle.name}
                image={vehicle.image_url || '/placeholder.svg'}
                comfort={vehicle.comfort}
                capacity={vehicle.capacity}
                price={vehicle.price_per_day}
                onClick={() => handleVehicleSelect(vehicle.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
