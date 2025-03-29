
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { t, language } = useLanguage();
  
  // Service tiers
  const serviceTiers = [
    {
      id: 'standard',
      name: language === 'fr' ? 'Standard' : 'Standard',
      description: language === 'fr' 
        ? 'Service chauffeur professionnel de qualité' 
        : 'High-quality professional chauffeur service',
      features: [
        language === 'fr' ? 'Chauffeur professionnel' : 'Professional chauffeur',
        language === 'fr' ? 'Véhicule confortable' : 'Comfortable vehicle',
        language === 'fr' ? 'Eau minérale offerte' : 'Complimentary mineral water',
        language === 'fr' ? 'Ponctualité garantie' : 'Punctuality guaranteed'
      ],
      icon: <Shield className="h-8 w-8 text-nova-gold" />,
      price: language === 'fr' ? 'À partir de 50$/h' : 'From $50/h',
      color: 'border-nova-gold/30'
    },
    {
      id: 'premium',
      name: language === 'fr' ? 'Premium' : 'Premium',
      description: language === 'fr' 
        ? 'Expérience de luxe et confort supérieur' 
        : 'Luxury experience with superior comfort',
      features: [
        language === 'fr' ? 'Véhicule haut de gamme' : 'High-end vehicle',
        language === 'fr' ? 'Chauffeur d\'élite' : 'Elite chauffeur',
        language === 'fr' ? 'Rafraîchissements et snacks' : 'Refreshments and snacks',
        language === 'fr' ? 'Service personnalisé' : 'Personalized service',
        language === 'fr' ? 'Wi-Fi embarqué' : 'Onboard Wi-Fi'
      ],
      icon: <Award className="h-8 w-8 text-nova-gold" />,
      price: language === 'fr' ? 'À partir de 75$/h' : 'From $75/h',
      color: 'border-nova-gold/50 bg-nova-gold/5'
    },
    {
      id: 'vip',
      name: language === 'fr' ? 'VIP' : 'VIP',
      description: language === 'fr' 
        ? 'Service exclusif pour une expérience inoubliable' 
        : 'Exclusive service for an unforgettable experience',
      features: [
        language === 'fr' ? 'Véhicule luxueux' : 'Luxurious vehicle',
        language === 'fr' ? 'Chauffeur VIP dédié' : 'Dedicated VIP chauffeur',
        language === 'fr' ? 'Service de conciergerie' : 'Concierge service',
        language === 'fr' ? 'Champagne et sélection de boissons' : 'Champagne and drink selection',
        language === 'fr' ? 'Traitement prioritaire' : 'Priority treatment',
        language === 'fr' ? 'Service disponible 24/7' : 'Service available 24/7'
      ],
      icon: <Sparkles className="h-8 w-8 text-nova-gold" />,
      price: language === 'fr' ? 'À partir de 100$/h' : 'From $100/h',
      color: 'border-nova-gold bg-nova-gold/10'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <section className="text-center py-10 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gold-gradient-text">
                {language === 'fr' ? 'Nos Services' : 'Our Services'}
              </span>
            </h1>
            <p className="text-nova-white/70 text-lg max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Découvrez notre gamme de services de chauffeur privé, conçus pour répondre à tous vos besoins avec élégance et professionnalisme.'
                : 'Discover our range of private chauffeur services, designed to meet all your needs with elegance and professionalism.'}
            </p>
          </section>
          
          {/* Services grid */}
          <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceTiers.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`bg-nova-gray/30 ${tier.color} transition-all hover:transform hover:-translate-y-1`}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2">{tier.icon}</div>
                    <CardTitle className="text-xl font-bold text-nova-white">{tier.name}</CardTitle>
                    <CardDescription className="text-nova-white/70">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-5 w-5 text-nova-gold mr-2 shrink-0" />
                          <span className="text-nova-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-nova-gold font-bold text-xl">{tier.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full gold-btn">
                      <Link to="/book">
                        {language === 'fr' ? 'Réserver maintenant' : 'Book now'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Additional Services */}
          <section className="py-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="gold-gradient-text">
                {language === 'fr' ? 'Services Additionnels' : 'Additional Services'}
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-nova-gray/30 border border-nova-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-nova-white">
                    {language === 'fr' ? 'Événements Spéciaux' : 'Special Events'}
                  </h3>
                  <p className="text-nova-white/70 mb-4">
                    {language === 'fr' 
                      ? 'Service de chauffeur pour mariages, soirées VIP et événements d\'entreprise.'
                      : 'Chauffeur service for weddings, VIP parties, and corporate events.'}
                  </p>
                  <Button variant="outline" className="border-nova-gold/50 text-nova-gold">
                    {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-nova-gray/30 border border-nova-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-nova-white">
                    {language === 'fr' ? 'Transferts Aéroport' : 'Airport Transfers'}
                  </h3>
                  <p className="text-nova-white/70 mb-4">
                    {language === 'fr' 
                      ? 'Service de transport de et vers l\'aéroport avec suivi des vols.'
                      : 'Transportation service to and from the airport with flight tracking.'}
                  </p>
                  <Button variant="outline" className="border-nova-gold/50 text-nova-gold">
                    {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Call to action */}
          <section className="py-12 text-center">
            <Card className="bg-nova-gold/10 border border-nova-gold max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-nova-white">
                  {language === 'fr' ? 'Besoin d\'un service sur mesure?' : 'Need a custom service?'}
                </h2>
                <p className="text-nova-white/90 mb-6">
                  {language === 'fr' 
                    ? 'Contactez-nous pour discuter de vos besoins spécifiques et nous créerons une solution adaptée juste pour vous.'
                    : 'Contact us to discuss your specific needs and we will create a tailored solution just for you.'}
                </p>
                <Button asChild className="gold-btn">
                  <Link to="/contact">
                    {language === 'fr' ? 'Contactez-nous' : 'Contact us'}
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
