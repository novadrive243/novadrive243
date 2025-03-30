
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { RatingForm } from '@/components/ratings/rating-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Car, ArrowRight } from 'lucide-react';

interface BookingCompleteRatingProps {
  bookingId: string;
  vehicleName: string;
  onClose?: () => void;
}

export function BookingCompleteRating({ bookingId, vehicleName, onClose }: BookingCompleteRatingProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showRating, setShowRating] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const handleSubmitRating = async (ratings: Record<string, number>, comment: string) => {
    setLoading(true);
    
    try {
      // Submit the rating to Supabase
      const { error } = await supabase
        .from('vehicle_ratings')
        .insert({
          booking_id: bookingId,
          vehicle_rating: ratings.vehicle,
          service_rating: ratings.service,
          driver_rating: ratings.driver,
          comment: comment
        });
      
      if (error) throw error;
      
      // Hide the rating form
      setTimeout(() => {
        setShowRating(false);
        if (onClose) onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Impossible d'envoyer votre évaluation. Veuillez réessayer." 
          : "Unable to submit your rating. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSkip = () => {
    setShowRating(false);
    if (onClose) onClose();
  };
  
  if (!showRating) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-lg w-full">
        <Card className="bg-nova-black border-nova-gold/20">
          <CardHeader className="flex flex-row items-center gap-2">
            <Car className="h-6 w-6 text-nova-gold" />
            <CardTitle className="text-nova-white">
              {language === 'fr' ? 'Évaluez votre expérience' : 'Rate your experience'}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto text-nova-white/50 hover:text-nova-white"
              onClick={handleSkip}
            >
              {language === 'fr' ? 'Passer' : 'Skip'}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <RatingForm 
              onSubmit={handleSubmitRating} 
              vehicleName={vehicleName}
              bookingId={bookingId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
