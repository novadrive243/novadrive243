
import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
type Language = 'fr' | 'en';

// Translation data
type TranslationData = {
  [key: string]: string | TranslationData;
};

// All translations
const translations: Record<Language, TranslationData> = {
  fr: {
    header: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      contact: 'Contact',
      bookNow: 'Réserver maintenant'
    },
    hero: {
      title: 'Le Pouvoir du Mouvement',
      subtitle: 'Service chauffeur de luxe à Kinshasa',
      cta: 'Réserver un chauffeur'
    },
    booking: {
      title: 'Réserver votre chauffeur',
      fromLabel: 'De',
      fromPlaceholder: 'Adresse de départ',
      toLabel: 'À',
      toPlaceholder: 'Adresse d\'arrivée',
      now: 'Maintenant',
      schedule: 'Planifier',
      continue: 'Continuer',
      selectVehicle: 'Sélectionner un véhicule',
      estimatedPrice: 'Prix estimé',
      bookNow: 'Réserver maintenant'
    },
    vehicles: {
      title: 'Nos véhicules',
      subtitle: 'Découvrez notre flotte de véhicules de luxe',
      comfort: 'Confort',
      capacity: 'Capacité',
      select: 'Sélectionner'
    },
    footer: {
      company: 'Entreprise',
      about: 'À propos',
      careers: 'Carrières',
      contact: 'Contact',
      services: 'Services',
      chauffeur: 'Service chauffeur',
      vehicles: 'Véhicules',
      pricing: 'Tarification',
      legal: 'Légal',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      slogan: 'NovaDrive offre des services de chauffeur privé de luxe à Kinshasa, avec une flotte de véhicules prestigieux.',
      rights: 'Tous droits réservés.'
    }
  },
  en: {
    header: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      bookNow: 'Book Now'
    },
    hero: {
      title: 'The Power of Movement',
      subtitle: 'Luxury chauffeur service in Kinshasa',
      cta: 'Book a chauffeur'
    },
    booking: {
      title: 'Book your chauffeur',
      fromLabel: 'From',
      fromPlaceholder: 'Pickup address',
      toLabel: 'To',
      toPlaceholder: 'Destination address',
      now: 'Now',
      schedule: 'Schedule',
      continue: 'Continue',
      selectVehicle: 'Select a vehicle',
      estimatedPrice: 'Estimated price',
      bookNow: 'Book Now'
    },
    vehicles: {
      title: 'Our vehicles',
      subtitle: 'Discover our luxury vehicle fleet',
      comfort: 'Comfort',
      capacity: 'Capacity',
      select: 'Select'
    },
    footer: {
      company: 'Company',
      about: 'About',
      careers: 'Careers',
      contact: 'Contact',
      services: 'Services',
      chauffeur: 'Chauffeur service',
      vehicles: 'Vehicles',
      pricing: 'Pricing',
      legal: 'Legal',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      slogan: 'NovaDrive provides luxury private chauffeur services in Kinshasa, with a fleet of prestigious vehicles.',
      rights: 'All rights reserved.'
    }
  }
};

// Get a nested translation value by key path
function getNestedTranslation(obj: TranslationData, path: string): string {
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
    result = result[key];
  }
  
  if (typeof result !== 'string') {
    console.warn(`Translation key does not resolve to a string: ${path}`);
    return path;
  }
  
  return result;
}

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get browser language or default to French
  const getBrowserLanguage = (): Language => {
    const lang = navigator.language.split('-')[0];
    return lang === 'en' ? 'en' : 'fr';
  };
  
  // Initialize with browser language or stored preference
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang as Language) || getBrowserLanguage();
  });
  
  // Update local storage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);
  
  // Translation function
  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key);
  };
  
  const value = {
    language,
    setLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
