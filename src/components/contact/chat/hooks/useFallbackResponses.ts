
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
        return 'Pour réserver un chauffeur, vous avez plusieurs options pratiques. Vous pouvez utiliser notre système de réservation en ligne sur notre site web, nous appeler au +243 999 999 999, ou utiliser notre application mobile. Nous vous demanderons votre adresse de départ et d\'arrivée, l\'heure souhaitée, et vos préférences concernant le véhicule. Nos chauffeurs sont disponibles 24h/24 et 7j/7.';
      } 
      // Réponses concernant les tarifs
      else if (lowercaseMessage.includes('tarif') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('coût')) {
        return 'Nos tarifs sont transparents et compétitifs. Pour un véhicule standard, comptez environ 50$ par jour ou 10$ par heure. Nos véhicules premium commencent à 80$ par jour, tandis que nos services VIP débutent à 120$ par jour. Des forfaits sont disponibles pour les réservations régulières ou de longue durée. N\'hésitez pas à demander un devis personnalisé pour votre trajet spécifique.';
      } 
      // Réponses concernant les zones de service
      else if (lowercaseMessage.includes('zone') || lowercaseMessage.includes('région') || lowercaseMessage.includes('area') || lowercaseMessage.includes('quartier')) {
        return 'Notre service couvre l\'ensemble de Kinshasa et ses environs, y compris tous les quartiers résidentiels et commerciaux. Nous desservons également l\'aéroport international de N\'Djili. Pour les trajets en dehors de la ville ou les excursions vers des destinations comme Kisantu ou Zongo, veuillez réserver à l\'avance. Nous pouvons également organiser des services dans d\'autres villes principales de la RDC sur demande spéciale.';
      }
      // Réponses concernant les véhicules
      else if (lowercaseMessage.includes('voiture') || lowercaseMessage.includes('véhicule') || lowercaseMessage.includes('auto') || lowercaseMessage.includes('car')) {
        return 'Notre flotte comprend une variété de véhicules pour répondre à tous vos besoins. Nous proposons des berlines confortables comme la Toyota Corolla, des SUV spacieux comme le Toyota RAV4 et le Mitsubishi Pajero, ainsi que des véhicules de luxe comme la Mercedes Classe E. Tous nos véhicules sont récents (moins de 3 ans), climatisés, et entretenus régulièrement pour garantir votre confort et votre sécurité.';
      }
      // Réponses concernant les chauffeurs
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('conducteur') || lowercaseMessage.includes('chauffeur')) {
        return 'Nos chauffeurs sont des professionnels expérimentés, recrutés selon un processus rigoureux. Ils parlent français et anglais, connaissent parfaitement la ville, et ont suivi une formation en service client. Ils sont toujours ponctuels, courtois et habillés en tenue professionnelle. Votre sécurité et votre confort sont leur priorité absolue.';
      }
      // Réponse par défaut
      else {
        return 'Merci pour votre message. Je suis l\'assistant virtuel de NovaDrive, à votre service pour répondre à toutes vos questions concernant nos services de chauffeur à Kinshasa. Que souhaitez-vous savoir sur nos véhicules, nos tarifs, ou le processus de réservation? Vous pouvez aussi nous contacter directement par téléphone au +243 999 999 999 ou par email à contact@novadrive.com pour une assistance personnalisée.';
      }
    } else {
      // Booking responses
      if (lowercaseMessage.includes('book') || lowercaseMessage.includes('driver') || lowercaseMessage.includes('reserve')) {
        return 'To book a driver, you have several convenient options. You can use our online booking system on our website, call us at +243 999 999 999, or use our mobile app. We\'ll need your pickup and drop-off addresses, preferred time, and vehicle preferences. Our drivers are available 24/7 to serve you.';
      } 
      // Pricing responses
      else if (lowercaseMessage.includes('rate') || lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('fee')) {
        return 'Our rates are transparent and competitive. For a standard vehicle, expect about $50 per day or $10 per hour. Our premium vehicles start at $80 per day, while our VIP services begin at $120 per day. Packages are available for regular or long-term bookings. Feel free to ask for a personalized quote for your specific journey.';
      } 
      // Service area responses
      else if (lowercaseMessage.includes('area') || lowercaseMessage.includes('region') || lowercaseMessage.includes('zone') || lowercaseMessage.includes('neighborhood')) {
        return 'Our service covers the entire city of Kinshasa and its surroundings, including all residential and commercial areas. We also service N\'Djili International Airport. For trips outside the city or excursions to destinations like Kisantu or Zongo, please book in advance. We can also arrange services in other major cities in the DRC upon special request.';
      }
      // Vehicle responses
      else if (lowercaseMessage.includes('car') || lowercaseMessage.includes('vehicle') || lowercaseMessage.includes('auto')) {
        return 'Our fleet includes a variety of vehicles to meet all your needs. We offer comfortable sedans like the Toyota Corolla, spacious SUVs like the Toyota RAV4 and Mitsubishi Pajero, as well as luxury vehicles like the Mercedes E-Class. All our vehicles are recent models (less than 3 years old), air-conditioned, and regularly maintained to ensure your comfort and safety.';
      }
      // Driver responses
      else if (lowercaseMessage.includes('driver') || lowercaseMessage.includes('chauffeur')) {
        return 'Our drivers are experienced professionals, recruited through a rigorous process. They speak French and English, know the city perfectly, and have undergone customer service training. They are always punctual, courteous, and dressed in professional attire. Your safety and comfort are their absolute priority.';
      }
      // Default response
      else {
        return 'Thank you for your message. I am NovaDrive\'s virtual assistant, at your service to answer all your questions about our chauffeur services in Kinshasa. What would you like to know about our vehicles, rates, or booking process? You can also contact us directly by phone at +243 999 999 999 or by email at contact@novadrive.com for personalized assistance.';
      }
    }
  }, [language]);

  return { getFallbackResponse };
};
