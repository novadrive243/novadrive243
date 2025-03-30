
import React from 'react';

interface BookingHeaderProps {
  language: string;
  bookingStep: number;
}

export const BookingHeader = ({ language, bookingStep }: BookingHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6">
        <span className="text-nova-white bg-transparent border-2 border-nova-gold px-4 py-2 rounded-lg inline-block">
          {language === 'fr' ? 'Réserver un chauffeur' : 'Book a chauffeur'}
        </span>
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 1 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
            1
          </div>
          <div className={`h-1 w-8 ${bookingStep >= 2 ? 'bg-nova-gold' : 'bg-nova-gray'}`}></div>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 2 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
            2
          </div>
          <div className={`h-1 w-8 ${bookingStep >= 3 ? 'bg-nova-gold' : 'bg-nova-gray'}`}></div>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${bookingStep >= 3 ? 'bg-nova-gold text-nova-black' : 'bg-nova-gray text-nova-white/50'}`}>
            3
          </div>
        </div>
      </div>
    </>
  );
};
