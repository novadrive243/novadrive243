
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  language: string;
}

export const LoadingState = ({ language }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-nova-gold" />
      <span className="ml-2 text-nova-white">
        {language === 'fr' ? 'Chargement...' : 'Loading...'}
      </span>
    </div>
  );
};
