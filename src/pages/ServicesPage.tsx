
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Droplet, Battery, Clock, MapPin, Sparkles, Coffee, UserCheck, Shield, 
         Check, Award, Plane, BookCheck, Phone, Users, Heart, AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { language } = useLanguage();
  
  // Services content
  const content = {
    fr: {
      title: "Nos Services & Conforts à Bord",
      subtitle: "Avec NovaDrive, chaque trajet devient une expérience de confort, de sécurité et de distinction. Nous mettons à disposition des prestations soignées, pensées pour répondre aux besoins des passagers les plus exigeants.",
      serviceNotice: {
        standard: "Standard pour tous les véhicules",
        premium: "Inclus uniquement pour la Chevrolet Tahoe",
        vip: "Services payants disponibles pour tous les véhicules"
      },
      sections: [
        {
          title: "Accommodations standards",
          icon: <Check className="h-8 w-8 text-nova-gold" />,
          notice: "Standard pour tous les véhicules",
          items: [
            { text: "Connexion Wifi à bord pour rester connecté en tout temps", icon: <Wifi /> },
            { text: "Bouteille d'eau fraîche offerte", icon: <Droplet /> },
            { text: "Chargeur pour téléphone disponible dans chaque véhicule", icon: <Battery /> },
            { text: "Transport vers zones éloignées (sur demande)", icon: <MapPin /> },
            { text: "Service ponctuel et discret", icon: <Clock /> }
          ]
        },
        {
          title: "Conforts Premium",
          icon: <Award className="h-8 w-8 text-nova-gold" />,
          notice: "Inclus uniquement pour la Chevrolet Tahoe",
          items: [
            { text: "Serviettes rafraîchissantes", icon: <Heart /> },
            { text: "Collation sucrée ou salée offerte", icon: <Coffee /> },
            { text: "Service personnalisé avec chauffeur formé", icon: <UserCheck /> },
            { text: "Silence, propreté irréprochable", icon: <Sparkles /> }
          ]
        },
        {
          title: "Services VIP",
          icon: <Shield className="h-8 w-8 text-nova-gold" />,
          notice: "Services payants disponibles pour tous les véhicules",
          items: [
            { text: "Protocole aéroportuaire : prise en charge complète à l'aéroport, accueil personnalisé, assistance bagages", icon: <Plane /> },
            { text: "Check-in sans déplacement : nous effectuons votre enregistrement à l'aéroport à votre place, le jour de votre départ", icon: <BookCheck /> },
            { text: "Service de conciergerie sur demande : réservations, conseils, assistance logistique", icon: <Phone /> },
            { text: "Formules abonnement mensuel & chauffeur attitré pour les clients réguliers ou entreprises", icon: <Users /> },
            { text: "Bodyguard privé : possibilité de voyager avec un agent de sécurité personnel, discret, formé et expérimenté, sur demande pour les personnalités, dirigeants ou événements sensibles", icon: <Shield /> }
          ]
        }
      ],
      cta: "Réserver maintenant"
    },
    en: {
      title: "Our Services & On-Board Comforts",
      subtitle: "With NovaDrive, every journey becomes an experience of comfort, security, and distinction. We provide carefully curated services designed to meet the needs of the most demanding passengers.",
      serviceNotice: {
        standard: "Standard for all vehicles",
        premium: "Included only with Chevrolet Tahoe",
        vip: "Paid services available for all vehicles"
      },
      sections: [
        {
          title: "Standard Accommodations",
          icon: <Check className="h-8 w-8 text-nova-gold" />,
          notice: "Standard for all vehicles",
          items: [
            { text: "On-board WiFi connection to stay connected at all times", icon: <Wifi /> },
            { text: "Complimentary fresh water bottle", icon: <Droplet /> },
            { text: "Phone charger available in each vehicle", icon: <Battery /> },
            { text: "Transportation to remote areas (upon request)", icon: <MapPin /> },
            { text: "Punctual and discreet service", icon: <Clock /> }
          ]
        },
        {
          title: "Premium Comforts",
          icon: <Award className="h-8 w-8 text-nova-gold" />,
          notice: "Included only with Chevrolet Tahoe",
          items: [
            { text: "Refreshing towels", icon: <Heart /> },
            { text: "Sweet or savory snacks offered", icon: <Coffee /> },
            { text: "Personalized service with trained chauffeur", icon: <UserCheck /> },
            { text: "Silence, impeccable cleanliness", icon: <Sparkles /> }
          ]
        },
        {
          title: "VIP Services",
          icon: <Shield className="h-8 w-8 text-nova-gold" />,
          notice: "Paid services available for all vehicles",
          items: [
            { text: "Airport protocol: complete airport handling, personalized welcome, baggage assistance", icon: <Plane /> },
            { text: "Check-in without travel: we handle your airport check-in on your behalf on the day of your departure", icon: <BookCheck /> },
            { text: "Concierge service on request: reservations, advice, logistical assistance", icon: <Phone /> },
            { text: "Monthly subscription plans & dedicated chauffeur for regular clients or businesses", icon: <Users /> },
            { text: "Private bodyguard: possibility to travel with a discreet, trained and experienced personal security agent, on request for personalities, executives or sensitive events", icon: <Shield /> }
          ]
        }
      ],
      cta: "Book Now"
    }
  };
  
  const { title, subtitle, sections, cta } = content[language];
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <section className="text-center py-10 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient-text">{title}</span>
            </h1>
            <p className="text-nova-white/70 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          </section>
          
          {/* Services sections */}
          {sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold text-nova-gold border-b-2 border-nova-gold pb-2">
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-nova-gray/20 border border-nova-gold/20 rounded-lg p-6">
                {/* Service availability notice */}
                <div className="mb-4 flex items-center gap-2 text-nova-gold">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm italic">{section.notice}</p>
                </div>
                
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-nova-gold mr-3 mt-1">{item.icon}</span>
                      <span className="text-nova-white/90">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
          
          {/* Call to action */}
          <section className="py-12 text-center">
            <Card className="bg-nova-gold/10 border border-nova-gold max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-nova-white">
                  {language === 'fr' ? 'Prêt à vivre l\'expérience NovaDrive?' : 'Ready to experience NovaDrive?'}
                </h2>
                <p className="text-nova-white/90 mb-6">
                  {language === 'fr' 
                    ? 'Découvrez le luxe, le confort et la sécurité avec nos services de chauffeur privé.'
                    : 'Discover luxury, comfort, and safety with our private chauffeur services.'}
                </p>
                <Button asChild className="gold-btn">
                  <Link to="/book">
                    {cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
