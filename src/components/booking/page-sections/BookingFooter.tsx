
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar as CalendarIcon, UserRound } from 'lucide-react';

interface BookingFooterProps {
  language: string;
}

export const BookingFooter = ({ language }: BookingFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-nova-black border-t border-nova-gold/20 p-2">
      <div className="flex justify-around items-center">
        <Link to="/home" className="flex flex-col items-center p-2 text-nova-white/70">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">
            {language === 'fr' ? 'Accueil' : 'Home'}
          </span>
        </Link>
        
        <Link to="/book" className="flex flex-col items-center p-2 text-nova-gold">
          <CalendarIcon className="h-6 w-6" />
          <span className="text-xs mt-1">
            {language === 'fr' ? 'Réservation' : 'Booking'}
          </span>
        </Link>
        
        <Link to="/account" className="flex flex-col items-center p-2 text-nova-white/70">
          <UserRound className="h-6 w-6" />
          <span className="text-xs mt-1">
            {language === 'fr' ? 'Compte' : 'Account'}
          </span>
        </Link>
      </div>
    </div>
  );
};
