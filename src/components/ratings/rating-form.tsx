
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

interface RatingFormProps {
  onSubmit: (ratings: Record<string, number>, comment: string) => void;
  onCancel?: () => void;
  vehicleName?: string;
  bookingId?: string;
}

export function RatingForm({ onSubmit, onCancel, vehicleName, bookingId }: RatingFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [ratings, setRatings] = useState({
    service: 0,
    driver: 0,
    vehicle: 0
  });
  
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleSubmit = () => {
    // Validate that all ratings are provided
    if (Object.values(ratings).some(r => r === 0)) {
      toast({
        title: t('ratings.ratingRequired') || "Rating required",
        description: t('ratings.provideAllRatings') || "Please provide a rating for all categories",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(ratings, comment);
    setSubmitted(true);
    
    toast({
      title: t('ratings.thankYou') || "Thank you for your feedback!",
      description: t('ratings.feedbackHelps') || "Your feedback helps us improve our service.",
    });
  };
  
  if (submitted) {
    return (
      <Card className="bg-nova-black/40 border-nova-gold/20">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="h-8 w-8 text-nova-gold fill-nova-gold" />
            ))}
          </div>
          <h3 className="text-xl font-bold text-nova-white mb-2">{t('ratings.thankYou') || "Thank you for your feedback!"}</h3>
          <p className="text-nova-white/70">{t('ratings.feedbackHelps') || "Your feedback helps us improve our service."}</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-nova-black/40 border-nova-gold/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-nova-white">
          {vehicleName 
            ? t('ratings.rateVehicle') ? `${t('ratings.rateVehicle')} ${vehicleName}` : `Rate your experience with ${vehicleName}`
            : t('ratings.rateExperience') || "Rate your experience"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        <RatingCategory 
          title={t('ratings.serviceRating') || "Service Quality"}
          value={ratings.service}
          onChange={(value) => handleRatingChange('service', value)}
        />
        
        <RatingCategory 
          title={t('ratings.driverRating') || "Driver Professionalism"}
          value={ratings.driver}
          onChange={(value) => handleRatingChange('driver', value)}
        />
        
        <RatingCategory 
          title={t('ratings.vehicleRating') || "Vehicle Condition"}
          value={ratings.vehicle}
          onChange={(value) => handleRatingChange('vehicle', value)}
        />
        
        <div className="pt-2">
          <label className="block text-sm font-medium text-nova-white/70 mb-2">
            {t('ratings.leaveComment') || "Leave a comment"}
          </label>
          <Textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-nova-black/30 border-nova-gold/20 text-nova-white"
            placeholder={t('ratings.shareExperience') || "Share your experience..."}
            rows={4}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {onCancel && (
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
          >
            {t('ratings.cancel') || "Cancel"}
          </Button>
        )}
        <Button 
          variant="default" 
          onClick={handleSubmit}
          className="bg-nova-gold text-nova-black hover:bg-nova-gold/90 ml-auto"
        >
          {t('ratings.submit') || "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface RatingCategoryProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

function RatingCategory({ title, value, onChange }: RatingCategoryProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-nova-white/70">
          {title}
        </label>
        <span className="text-xs text-nova-white/50">
          {value > 0 ? `${value}/5` : ''}
        </span>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className="p-1"
            onClick={() => onChange(star)}
          >
            <Star 
              className={`h-6 w-6 ${star <= value ? 'text-nova-gold fill-nova-gold' : 'text-nova-gold/30'}`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
