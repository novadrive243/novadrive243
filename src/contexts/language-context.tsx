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
      pricing: 'Tarifs',
      contact: 'Contact',
      bookNow: 'Réserver maintenant',
      drivers: 'Votre chauffeur',
      book: 'Réservation',
      login: 'Connexion',
      register: 'Inscription',
      signOut: 'Déconnexion',
      account: 'Mon compte',
      admin: 'Administration'
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
    pricing: {
      title: 'Nos Tarifs',
      bookNow: 'Réserver',
      perDay: 'par jour',
      perHour: 'par heure',
      hourRange: 'De 7h à 21h',
      nightSupplement: 'Supplément après 21h',
      standard: {
        title: 'Standard'
      },
      premium: {
        title: 'Premium'
      },
      vip: {
        title: 'VIP'
      }
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est prête à vous aider pour toutes vos demandes de service chauffeur à Kinshasa',
      formTitle: 'Envoyez-nous un message',
      infoTitle: 'Informations de contact',
      infoDescription: 'Vous pouvez nous contacter par téléphone, email ou en personne. Notre équipe est disponible pour vous servir.',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom complet',
      emailLabel: 'Email',
      emailPlaceholder: 'votre.email@exemple.com',
      subjectLabel: 'Sujet',
      subjectPlaceholder: 'Sujet de votre message',
      messageLabel: 'Message',
      messagePlaceholder: 'Écrivez votre message ici...',
      sendButton: 'Envoyer le message',
      messageSent: 'Message envoyé avec succès!',
      phone: 'Téléphone',
      phoneDescription: 'Disponible 7j/7 de 7h à 21h',
      email: 'Email',
      emailDescription: 'Nous répondons dans les 24 heures',
      address: 'Adresse',
      addressLine: 'Kinshasa, République Démocratique du Congo',
      addressDescription: 'Notre bureau principal',
      chatTitle: 'Assistant NovaDrive',
      chatPlaceholder: 'Écrivez votre message ici...',
      chatClose: 'Fermer',
      chatSendButton: 'Envoyer'
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
    },
    loyalty: {
      title: 'Programme de Fidélité',
      points: 'Points',
      level: 'Niveau',
      rewards: 'Récompenses',
      history: 'Historique',
      earnedPoints: 'Points gagnés',
      nextLevel: 'Prochain niveau',
      bronze: 'Bronze',
      silver: 'Argent',
      gold: 'Or',
      platinum: 'Platine'
    },
    drivers: {
      title: 'Nos Chauffeurs',
      experience: 'Expérience',
      rating: 'Évaluation',
      languages: 'Langues',
      certifications: 'Certifications',
      viewProfile: 'Voir profil',
      contactDriver: 'Contacter'
    },
    notifications: {
      title: 'Notifications',
      all: 'Toutes',
      unread: 'Non lues',
      markAsRead: 'Marquer comme lu',
      deleteAll: 'Supprimer tout',
      booking: 'Réservation',
      promotion: 'Promotion',
      system: 'Système'
    },
    ratings: {
      title: 'Évaluations',
      rateExperience: 'Évaluez votre expérience',
      leaveComment: 'Laissez un commentaire',
      submit: 'Soumettre',
      thankYou: 'Merci pour votre évaluation!',
      serviceRating: 'Qualité du service',
      driverRating: 'Performance du chauffeur',
      vehicleRating: 'Condition du véhicule'
    },
    calendar: {
      title: 'Calendrier',
      sync: 'Synchroniser',
      upcoming: 'À venir',
      past: 'Passé',
      addToCalendar: 'Ajouter au calendrier',
      reminder: 'Rappel'
    },
    emergency: {
      title: 'Contact d\'urgence',
      call: 'Appeler',
      message: 'Message',
      emergencyServices: 'Services d\'urgence',
      companySupport: 'Support NovaDrive',
      police: 'Police',
      ambulance: 'Ambulance',
      roadside: 'Assistance routière'
    },
    account: {
      title: 'Mon Compte',
      profile: 'Profil',
      userName: 'Utilisateur NovaDrive',
      member: 'Membre depuis 2024',
      favoriteVehicle: 'Favori: Toyota Fortuner',
      logout: 'Déconnexion',
      reservations: 'Réservations',
      contact: 'Contact',
      reservationHistory: 'Historique des réservations',
      noReservations: 'Vous n\'avez pas d\'historique de réservation',
      contactUs: 'Contactez-nous',
      phone: 'Téléphone',
      email: 'Email',
      instagram: 'Instagram',
      loyaltyProgram: 'Programme de Fidélité',
      favoriteDrivers: 'Chauffeurs Favoris',
      notifications: 'Notifications',
      myRatings: 'Mes Évaluations',
      emergencyContacts: 'Contacts d\'urgence',
      calendarSync: 'Synchronisation du Calendrier'
    }
  },
  en: {
    header: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      pricing: 'Pricing',
      contact: 'Contact',
      bookNow: 'Book Now',
      drivers: 'Our Drivers',
      book: 'Book',
      login: 'Login',
      register: 'Register',
      signOut: 'Sign Out',
      account: 'My Account',
      admin: 'Admin'
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
    pricing: {
      title: 'Our Pricing',
      bookNow: 'Book Now',
      perDay: 'per day',
      perHour: 'per hour',
      hourRange: 'From 7am to 9pm',
      nightSupplement: 'Night supplement after 9pm',
      standard: {
        title: 'Standard'
      },
      premium: {
        title: 'Premium'
      },
      vip: {
        title: 'VIP'
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Our team is ready to help you with all your chauffeur service requests in Kinshasa',
      formTitle: 'Send us a message',
      infoTitle: 'Contact Information',
      infoDescription: 'You can reach us by phone, email, or in person. Our team is available to serve you.',
      nameLabel: 'Name',
      namePlaceholder: 'Your full name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Subject of your message',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      sendButton: 'Send Message',
      messageSent: 'Message sent successfully!',
      phone: 'Phone',
      phoneDescription: 'Available 7 days a week from 7am to 9pm',
      email: 'Email',
      emailDescription: 'We reply within 24 hours',
      address: 'Address',
      addressLine: 'Kinshasa, Democratic Republic of Congo',
      addressDescription: 'Our main office',
      chatTitle: 'NovaDrive Assistant',
      chatPlaceholder: 'Type your message here...',
      chatClose: 'Close',
      chatSendButton: 'Send'
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
    },
    loyalty: {
      title: 'Loyalty Program',
      points: 'Points',
      level: 'Level',
      rewards: 'Rewards',
      history: 'History',
      earnedPoints: 'Earned points',
      nextLevel: 'Next level',
      bronze: 'Bronze',
      silver: 'Silver',
      gold: 'Gold',
      platinum: 'Platinum'
    },
    drivers: {
      title: 'Our Drivers',
      experience: 'Experience',
      rating: 'Rating',
      languages: 'Languages',
      certifications: 'Certifications',
      viewProfile: 'View profile',
      contactDriver: 'Contact'
    },
    notifications: {
      title: 'Notifications',
      all: 'All',
      unread: 'Unread',
      markAsRead: 'Mark as read',
      deleteAll: 'Delete all',
      booking: 'Booking',
      promotion: 'Promotion',
      system: 'System'
    },
    ratings: {
      title: 'Ratings',
      rateExperience: 'Rate your experience',
      leaveComment: 'Leave a comment',
      submit: 'Submit',
      thankYou: 'Thank you for your rating!',
      serviceRating: 'Service quality',
      driverRating: 'Driver performance',
      vehicleRating: 'Vehicle condition'
    },
    calendar: {
      title: 'Calendar',
      sync: 'Sync',
      upcoming: 'Upcoming',
      past: 'Past',
      addToCalendar: 'Add to calendar',
      reminder: 'Reminder'
    },
    emergency: {
      title: 'Emergency Contact',
      call: 'Call',
      message: 'Message',
      emergencyServices: 'Emergency services',
      companySupport: 'NovaDrive support',
      police: 'Police',
      ambulance: 'Ambulance',
      roadside: 'Roadside assistance'
    },
    account: {
      title: 'My Account',
      profile: 'Profile',
      userName: 'NovaDrive User',
      member: 'Member since 2024',
      favoriteVehicle: 'Favorite: Toyota Fortuner',
      logout: 'Logout',
      reservations: 'Reservations',
      contact: 'Contact',
      reservationHistory: 'Reservation History',
      noReservations: 'You have no reservation history',
      contactUs: 'Contact Us',
      phone: 'Phone',
      email: 'Email',
      instagram: 'Instagram',
      loyaltyProgram: 'Loyalty Program',
      favoriteDrivers: 'Favorite Drivers',
      notifications: 'Notifications',
      myRatings: 'My Ratings',
      emergencyContacts: 'Emergency Contacts',
      calendarSync: 'Calendar Sync'
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
