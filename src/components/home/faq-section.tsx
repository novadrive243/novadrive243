
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FaqSection = () => {
  const { language } = useLanguage();
  
  const faqsEn = [
    {
      question: "What documents do I need to rent a vehicle?",
      answer: "To rent a vehicle with NovaDrive, you'll only need a valid passport. No other documents are required."
    },
    {
      question: "Is there a security deposit required?",
      answer: "No, we don't require any security deposit for our vehicle rentals. You can enjoy a worry-free experience with no upfront deposit."
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer: "Yes, you can modify or cancel your reservation up to 48 hours before your scheduled pickup time without incurring any fees. Changes or cancellations made less than 48 hours before pickup may result in charges."
    },
    {
      question: "Do you offer unlimited mileage?",
      answer: "Most of our rental packages include unlimited mileage. However, some specialty and luxury vehicles may have mileage restrictions. The specific terms will be clearly outlined during the booking process."
    },
    {
      question: "What is your fuel policy?",
      answer: "Our vehicles are provided with a full tank of fuel, and we expect them to be returned with a full tank. If the vehicle is not returned with a full tank, a refueling charge will apply."
    },
    {
      question: "Do you offer airport pickup and drop-off?",
      answer: "Yes, we offer convenient airport pickup and drop-off services. Simply provide your flight details during booking, and our representative will meet you at the designated area."
    }
  ];
  
  const faqsFr = [
    {
      question: "Quels documents sont nécessaires pour louer un véhicule?",
      answer: "Pour louer un véhicule chez NovaDrive, vous aurez uniquement besoin d'un passeport valide. Aucun autre document n'est nécessaire."
    },
    {
      question: "Y a-t-il une caution requise?",
      answer: "Non, nous ne demandons aucune caution pour la location de nos véhicules. Vous pouvez profiter d'une expérience sans souci, sans dépôt initial."
    },
    {
      question: "Puis-je modifier ou annuler ma réservation?",
      answer: "Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 48 heures avant l'heure de prise en charge prévue sans frais. Les modifications ou annulations effectuées moins de 48 heures avant la prise en charge peuvent entraîner des frais."
    },
    {
      question: "Proposez-vous un kilométrage illimité?",
      answer: "La plupart de nos forfaits de location incluent un kilométrage illimité. Cependant, certains véhicules de spécialité et de luxe peuvent avoir des restrictions de kilométrage. Les conditions spécifiques seront clairement indiquées lors du processus de réservation."
    },
    {
      question: "Quelle est votre politique en matière de carburant?",
      answer: "Nos véhicules sont fournis avec un réservoir plein de carburant, et nous attendons qu'ils soient retournés avec un réservoir plein. Si le véhicule n'est pas retourné avec un réservoir plein, des frais de ravitaillement s'appliqueront."
    },
    {
      question: "Proposez-vous un service de prise en charge et de dépose à l'aéroport?",
      answer: "Oui, nous proposons des services pratiques de prise en charge et de dépose à l'aéroport. Fournissez simplement les détails de votre vol lors de la réservation, et notre représentant vous rencontrera à l'endroit désigné."
    }
  ];
  
  const faqs = language === 'fr' ? faqsFr : faqsEn;
  
  return (
    <section className="py-16 bg-nova-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <HelpCircle className="inline-block mr-2 text-nova-gold h-8 w-8" />
            <span className="gold-gradient-text">
              {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
            </span>
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Trouvez rapidement des réponses à vos questions les plus courantes' 
              : 'Quickly find answers to your most common questions'}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-nova-gold/20 py-2"
              >
                <AccordionTrigger className="text-nova-white hover:text-nova-gold transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-nova-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
