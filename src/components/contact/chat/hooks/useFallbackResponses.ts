
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
        return 'Pour réserver un chauffeur, utilisez notre site web, appelez au +243 999 999 999, ou notre application mobile. Nos chauffeurs sont disponibles 24h/24 et 7j/7.';
      } 
      // Réponses concernant les tarifs
      else if (lowercaseMessage.includes('tarif') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('coût')) {
        return 'Nos tarifs: véhicule standard 50$ par jour ou 10$ par heure. Premium 80$ par jour. VIP 120$ par jour. Contactez-nous pour un devis personnalisé.';
      } 
      // Réponses concernant les zones de service
      else if (lowercaseMessage.includes('zone') || lowercaseMessage.includes('région') || lowercaseMessage.includes('area') || lowercaseMessage.includes('quartier')) {
        return 'Nous couvrons toute la ville de Kinshasa et ses environs, y compris l\'aéroport de N\'Djili. Pour les trajets hors ville, réservez à l\'avance.';
      }
      // Réponses concernant les véhicules
      else if (lowercaseMessage.includes('voiture') || lowercaseMessage.includes('véhicule') || lowercaseMessage.includes('auto') || lowercaseMessage.includes('car')) {
        return 'Notre flotte: berlines (Toyota Corolla), SUV (RAV4, Pajero) et véhicules de luxe (Mercedes). Tous climatisés et récents.';
      }
      // Réponses concernant les chauffeurs
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('conducteur') || lowercaseMessage.includes('chauffeur')) {
        return 'Nos chauffeurs sont professionnels, bilingues (français/anglais), et connaissent parfaitement la ville. Votre sécurité est notre priorité.';
      }
      // Réponse par défaut
      else {
        return 'Bonjour! Je suis l\'assistant NovaDrive. Comment puis-je vous aider concernant nos services de chauffeur à Kinshasa? Pour une assistance directe, appelez le +243 999 999 999.';
      }
    } else {
      // Booking responses
      if (lowercaseMessage.includes('book') || lowercaseMessage.includes('driver') || lowercaseMessage.includes('reserve')) {
        return 'To book a driver, use our website, call +243 999 999 999, or use our mobile app. Our drivers are available 24/7.';
      } 
      // Pricing responses
      else if (lowercaseMessage.includes('rate') || lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('fee')) {
        return 'Our rates: standard vehicle $50/day or $10/hour. Premium $80/day. VIP $120/day. Contact us for a personalized quote.';
      } 
      // Service area responses
      else if (lowercaseMessage.includes('area') || lowercaseMessage.includes('region') || lowercaseMessage.includes('zone') || lowercaseMessage.includes('neighborhood')) {
        return 'We cover all of Kinshasa and surroundings, including N\'Djili Airport. For trips outside the city, please book in advance.';
      }
      // Vehicle responses
      else if (lowercaseMessage.includes('car') || lowercaseMessage.includes('vehicle') || lowercaseMessage.includes('auto')) {
        return 'Our fleet: sedans (Toyota Corolla), SUVs (RAV4, Pajero) and luxury vehicles (Mercedes). All air-conditioned and recent models.';
      }
      // Driver responses
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('chauffeur')) {
        return 'Our drivers are professionals, bilingual (French/English), and know the city perfectly. Your safety is our priority.';
      }
      // Default response
      else {
        return 'Hello! I\'m NovaDrive\'s assistant. How can I help you with our chauffeur services in Kinshasa? For direct assistance, call +243 999 999 999.';
      }
    }
  }, [language]);

  return { getFallbackResponse };
};
