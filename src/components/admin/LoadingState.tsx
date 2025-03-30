
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  language: string;
}

export const LoadingState = ({ language }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-nova-gold mb-2" />
      <span className="text-nova-white">
        {language === 'fr' ? 'Chargement...' : 'Loading...'}
      </span>
    </div>
  );
};
