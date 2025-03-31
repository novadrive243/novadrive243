
import React from 'react';

export interface LoadingStateProps {
  language?: string;
}

export const LoadingState = ({ language = 'en' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-nova-gold"></div>
      <p className="mt-4 text-nova-white">
        {language === 'fr' ? 'Chargement...' : 'Loading...'}
      </p>
    </div>
  );
};
