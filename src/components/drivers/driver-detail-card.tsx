
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Star, Phone, Languages, Calendar, Clock, Shield, Award, MapPin } from 'lucide-react';

interface DriverDetailCardProps {
  driver: {
    id: string;
    name: string;
    image?: string;
    experience: string;
    rating: number;
    languages: string[];
    certifications: string[];
    phone?: string;
    bio?: string;
    availability?: string;
    location?: string;
    specialties?: string[];
  };
  onContactClick?: (driverId: string) => void;
}

export function DriverDetailCard({ driver, onContactClick }: DriverDetailCardProps) {
  const { language } = useLanguage();

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'text-nova-gold fill-nova-gold' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-32 w-32 border-2 border-nova-gold/20">
            <AvatarImage src={driver.image} alt={driver.name} />
            <AvatarFallback className="bg-nova-gold/20 text-nova-gold">
              <User size={48} />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <CardTitle className="text-2xl md:text-3xl text-nova-white">{driver.name}</CardTitle>
            <div className="flex mt-2 justify-center md:justify-start">
              {renderStars(driver.rating)}
              <span className="ml-2 text-nova-white/80">{driver.rating}/5</span>
            </div>
            
            <p className="mt-4 text-nova-white/80">
              {driver.bio || (language === 'fr' 
                ? `Chauffeur professionnel avec ${driver.experience} d'expérience, spécialisé dans la conduite de véhicules de luxe.`
                : `Professional driver with ${driver.experience} of experience, specialized in driving luxury vehicles.`)}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {driver.specialties?.map(specialty => (
                <Badge key={specialty} variant="outline" className="bg-nova-gold/10 text-nova-gold border-nova-gold/20">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-nova-gold" />
              <div>
                <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Expérience' : 'Experience'}</h3>
                <p className="text-nova-white">{driver.experience}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5 text-nova-gold" />
              <div>
                <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Langues' : 'Languages'}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {driver.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="bg-nova-gold/10 text-nova-gold border-nova-gold/20">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-nova-gold" />
              <div>
                <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Certifications' : 'Certifications'}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {driver.certifications.map(cert => (
                    <Badge key={cert} variant="outline" className="bg-nova-black border-nova-gold/20 text-nova-white/80">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {driver.availability && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-nova-gold" />
                <div>
                  <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Disponibilité' : 'Availability'}</h3>
                  <p className="text-nova-white">{driver.availability}</p>
                </div>
              </div>
            )}
            
            {driver.location && (
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-nova-gold" />
                <div>
                  <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Région' : 'Location'}</h3>
                  <p className="text-nova-white">{driver.location}</p>
                </div>
              </div>
            )}
            
            {driver.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-nova-gold" />
                <div>
                  <h3 className="text-nova-white/70 text-sm">{language === 'fr' ? 'Contact' : 'Contact'}</h3>
                  <p className="text-nova-white">{driver.phone}</p>
                </div>
              </div>
            )}
            
            <div className="pt-6">
              <Button 
                className="w-full bg-nova-gold text-nova-black hover:bg-nova-gold/90"
                onClick={() => onContactClick?.(driver.id)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Contacter ce chauffeur' : 'Contact this driver'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
