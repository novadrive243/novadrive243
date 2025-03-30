
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
      if (lowercaseMessage.includes('réserv') || lowercaseMessage.includes('chauffeur') || lowercaseMessage.includes('book')) {
        return 'Pour réserver un chauffeur, rendez-vous sur notre page de réservation ou appelez-nous au +243 999 999 999. Nous vous demanderons vos coordonnées et vos préférences de trajet.';
      } else if (lowercaseMessage.includes('tarif') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('cost')) {
        return 'Nos tarifs varient selon le type de véhicule et la durée. Vous pouvez consulter notre page de tarification pour plus de détails. Souhaitez-vous que je vous y dirige?';
      } else if (lowercaseMessage.includes('zone') || lowercaseMessage.includes('région') || lowercaseMessage.includes('area')) {
        return 'Nous desservons toute la ville de Kinshasa et ses environs. Pour les trajets en dehors de la ville, veuillez nous contacter à l\'avance pour vérifier la disponibilité.';
      } else {
        return 'Merci pour votre message. Si vous avez des questions spécifiques, n\'hésitez pas à demander. Vous pouvez aussi nous contacter directement par téléphone ou email pour une assistance personnalisée.';
      }
    } else {
      if (lowercaseMessage.includes('book') || lowercaseMessage.includes('driver')) {
        return 'To book a driver, go to our booking page or call us at +243 999 999 999. We will ask for your details and travel preferences.';
      } else if (lowercaseMessage.includes('rate') || lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
        return 'Our rates vary depending on the type of vehicle and duration. You can check our pricing page for more details. Would you like me to direct you there?';
      } else if (lowercaseMessage.includes('area') || lowercaseMessage.includes('region') || lowercaseMessage.includes('zone')) {
        return 'We serve the entire city of Kinshasa and its surroundings. For trips outside the city, please contact us in advance to check availability.';
      } else {
        return 'Thank you for your message. If you have any specific questions, feel free to ask. You can also contact us directly by phone or email for personalized assistance.';
      }
    }
  }, [language]);

  return { getFallbackResponse };
};
