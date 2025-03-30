
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Star, Phone, Languages } from 'lucide-react';

interface DriverProfileCardProps {
  driver: {
    id: string;
    name: string;
    image?: string;
    experience: string;
    rating: number;
    languages: string[];
    certifications: string[];
    phone?: string;
  };
  onContactClick?: (driverId: string) => void;
  onViewProfileClick?: (driverId: string) => void;
}

export function DriverProfileCard({ driver, onContactClick, onViewProfileClick }: DriverProfileCardProps) {
  const { t } = useLanguage();

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-nova-gold fill-nova-gold' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 overflow-hidden hover:border-nova-gold/40 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-nova-gold/20">
            <AvatarImage src={driver.image} alt={driver.name} />
            <AvatarFallback className="bg-nova-gold/20 text-nova-gold">
              <User size={24} />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-nova-white">{driver.name}</CardTitle>
            <div className="flex mt-1">
              {renderStars(driver.rating)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-nova-white/70 text-sm min-w-[100px]">{t('drivers.experience')}:</span>
            <span className="text-nova-white">{driver.experience}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="text-nova-white/70 text-sm min-w-[100px]">{t('drivers.languages')}:</span>
            <div className="flex flex-wrap gap-1">
              {driver.languages.map(lang => (
                <Badge key={lang} variant="outline" className="bg-nova-gold/10 text-nova-gold border-nova-gold/20">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="text-nova-white/70 text-sm min-w-[100px]">{t('drivers.certifications')}:</span>
            <div className="flex flex-wrap gap-1">
              {driver.certifications.map(cert => (
                <Badge key={cert} variant="outline" className="bg-nova-black border-nova-gold/20 text-nova-white/80">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm"
          className="border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
          onClick={() => onViewProfileClick?.(driver.id)}
        >
          {t('drivers.viewProfile')}
        </Button>
        <Button 
          variant="default" 
          size="sm"
          className="bg-nova-gold text-nova-black hover:bg-nova-gold/90"
          onClick={() => onContactClick?.(driver.id)}
        >
          <Phone className="h-4 w-4 mr-2" />
          {t('drivers.contactDriver')}
        </Button>
      </CardFooter>
    </Card>
  );
}
