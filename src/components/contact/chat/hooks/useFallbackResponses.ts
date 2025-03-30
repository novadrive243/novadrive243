
import { useCallback } from 'react';

/**
 * A hook to provide fallback responses when OpenAI API fails
 * 
 * @param language Current language ('fr' or 'en')
 * @returns Functions to get fallback responses
 */
export const useFallbackResponses = (language: 'fr' | 'en') => {
  // Use fallback responses if API fails
  const getFallbackResponse = useCallback((userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Using language-specific responses
    if (language === 'fr') {
      // Réponses concernant les réservations
      if (lowercaseMessage.includes('réserv') || lowercaseMessage.includes('chauffeur') || lowercaseMessage.includes('book')) {
        return 'Réservez un chauffeur via notre site, app ou au +243 999 999 999. Disponible 24/7.';
      } 
      // Réponses concernant les tarifs
      else if (lowercaseMessage.includes('tarif') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('coût')) {
        return 'Tarifs: standard 50$/jour, premium 80$/jour, VIP 120$/jour. Contactez-nous pour un devis.';
      } 
      // Réponses concernant les zones de service
      else if (lowercaseMessage.includes('zone') || lowercaseMessage.includes('région') || lowercaseMessage.includes('area') || lowercaseMessage.includes('quartier')) {
        return 'Nous couvrons Kinshasa et ses environs. Pour les trajets hors ville, réservez à l\'avance.';
      }
      // Réponses concernant les véhicules
      else if (lowercaseMessage.includes('voiture') || lowercaseMessage.includes('véhicule') || lowercaseMessage.includes('auto') || lowercaseMessage.includes('car')) {
        return 'Notre flotte: berlines, SUV et véhicules de luxe. Tous climatisés et récents.';
      }
      // Réponses concernant les chauffeurs
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('conducteur') || lowercaseMessage.includes('chauffeur')) {
        return 'Chauffeurs professionnels, bilingues et connaissant parfaitement Kinshasa. Votre sécurité est prioritaire.';
      }
      // Réponses concernant le programme de fidélité
      else if (lowercaseMessage.includes('fidélité') || lowercaseMessage.includes('points') || lowercaseMessage.includes('loyalty')) {
        return 'Notre programme de fidélité offre des points pour chaque trajet. Accédez à des avantages exclusifs selon votre niveau.';
      }
      // Réponses concernant les évaluations
      else if (lowercaseMessage.includes('évaluation') || lowercaseMessage.includes('note') || lowercaseMessage.includes('rating')) {
        return 'Évaluez votre expérience après chaque trajet. Vos retours nous aident à améliorer nos services.';
      }
      // Réponses concernant les urgences
      else if (lowercaseMessage.includes('urgence') || lowercaseMessage.includes('emergency') || lowercaseMessage.includes('aide')) {
        return 'En cas d\'urgence, contactez notre service 24/7 au +243 999 999 999 ou utilisez la fonction d\'urgence dans l\'app.';
      }
      // Réponse par défaut
      else {
        return 'Bonjour! Comment puis-je vous aider avec nos services? Appelez le +243 999 999 999 pour assistance directe.';
      }
    } else {
      // Booking responses
      if (lowercaseMessage.includes('book') || lowercaseMessage.includes('driver') || lowercaseMessage.includes('reserve')) {
        return 'Book a driver via our website, app or call +243 999 999 999. Available 24/7.';
      } 
      // Pricing responses
      else if (lowercaseMessage.includes('rate') || lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('fee')) {
        return 'Rates: standard $50/day, premium $80/day, VIP $120/day. Contact us for a custom quote.';
      } 
      // Service area responses
      else if (lowercaseMessage.includes('area') || lowercaseMessage.includes('region') || lowercaseMessage.includes('zone') || lowercaseMessage.includes('neighborhood')) {
        return 'We cover all of Kinshasa and surroundings. For trips outside the city, please book in advance.';
      }
      // Vehicle responses
      else if (lowercaseMessage.includes('car') || lowercaseMessage.includes('vehicle') || lowercaseMessage.includes('auto')) {
        return 'Our fleet: sedans, SUVs and luxury vehicles. All air-conditioned and recent models.';
      }
      // Driver responses
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('chauffeur')) {
        return 'Our drivers are professional, bilingual and know Kinshasa perfectly. Your safety is our priority.';
      }
      // Loyalty program responses
      else if (lowercaseMessage.includes('loyalty') || lowercaseMessage.includes('points') || lowercaseMessage.includes('rewards')) {
        return 'Our loyalty program offers points for every ride. Access exclusive benefits based on your level.';
      }
      // Rating responses
      else if (lowercaseMessage.includes('rating') || lowercaseMessage.includes('review') || lowercaseMessage.includes('feedback')) {
        return 'Rate your experience after each ride. Your feedback helps us improve our services.';
      }
      // Emergency responses
      else if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('help') || lowercaseMessage.includes('urgent')) {
        return 'In case of emergency, contact our 24/7 service at +243 999 999 999 or use the emergency feature in the app.';
      }
      // Default response
      else {
        return 'Hello! How can I help with our chauffeur services? Call +243 999 999 999 for direct assistance.';
      }
    }
  }, [language]);

  return { getFallbackResponse };
};
