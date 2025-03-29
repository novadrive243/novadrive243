
import { Star } from 'lucide-react';
import React from 'react';

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="fill-nova-gold text-nova-gold h-4 w-4" />);
  }
  
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="relative">
        <Star className="text-nova-gold/30 h-4 w-4" />
        <Star className="absolute top-0 left-0 fill-nova-gold text-nova-gold h-4 w-4 clip-path-half" />
      </span>
    );
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-nova-gold/30 h-4 w-4" />);
  }
  
  return stars;
};
