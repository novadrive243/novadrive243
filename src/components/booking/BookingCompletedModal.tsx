
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Car, Calendar, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingCompleteRating } from './BookingCompleteRating';

interface BookingCompletedModalProps {
  open: boolean;
  onClose: () => void;
  bookingDetails: {
    id: string;
    vehicleName: string;
    date: string;
    duration: string;
    totalPrice: string;
  };
}

export function BookingCompletedModal({ open, onClose, bookingDetails }: BookingCompletedModalProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Only show the rating component if we have a valid booking ID
  const showRating = open && bookingDetails.id && bookingDetails.id !== '';
  
  const handleViewAccount = () => {
    navigate('/account');
    onClose();
  };
  
  const handleBookAgain = () => {
    navigate('/');
    onClose();
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-nova-black border-nova-gold/20">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-nova-white flex items-center justify-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              {language === 'fr' ? 'Réservation confirmée !' : 'Booking Confirmed!'}
            </DialogTitle>
            <DialogDescription className="text-center text-nova-white/70">
              {language === 'fr' 
                ? 'Votre chauffeur vous contactera bientôt.' 
                : 'Your driver will contact you soon.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-nova-black/40 rounded-lg p-4 border border-nova-gold/10">
              <div className="flex items-center gap-3 mb-3">
                <Car className="h-5 w-5 text-nova-gold" />
                <span className="text-nova-white font-medium">{bookingDetails.vehicleName}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-nova-gold" />
                <span className="text-nova-white/80">{bookingDetails.date}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-5 w-5 flex items-center justify-center text-nova-gold">⏱</span>
                <span className="text-nova-white/80">{bookingDetails.duration}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-nova-gold/10 flex justify-between">
                <span className="text-nova-white/70">
                  {language === 'fr' ? 'Total' : 'Total'}:
                </span>
                <span className="text-nova-gold font-bold">${bookingDetails.totalPrice}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button 
              onClick={handleViewAccount} 
              variant="outline" 
              className="w-full border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
            >
              {language === 'fr' ? 'Voir mes réservations' : 'View My Bookings'}
            </Button>
            <Button 
              onClick={handleBookAgain}
              className="w-full bg-nova-gold text-nova-black hover:bg-nova-gold/90"
            >
              {language === 'fr' ? 'Réserver à nouveau' : 'Book Again'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Only show rating form if we have a completed booking with an ID */}
      {showRating && (
        <BookingCompleteRating 
          bookingId={bookingDetails.id}
          vehicleName={bookingDetails.vehicleName}
          onClose={onClose}
        />
      )}
    </>
  );
}
