
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gold-gradient-text">{t('home.welcome') || 'Welcome to NovaDrive'}</span>
              </h1>
              <p className="text-nova-white/70 text-lg mb-8">
                {t('home.slogan') || 'Le Pouvoir du Mouvement'}
              </p>
              
              <Button asChild className="gold-btn">
                <Link to="/book">{t('home.bookNow') || 'Book Now'}</Link>
              </Button>
            </div>
            
            {/* Active reservations */}
            <div className="mt-16 bg-nova-black/50 border border-nova-gold/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-nova-white mb-4">{t('home.activeReservations') || 'Active Reservations'}</h2>
              
              <div className="text-center py-8">
                <p className="text-nova-white/50">
                  {t('home.noReservations') || 'You have no active reservations'}
                </p>
                <Button asChild variant="outline" className="mt-4 border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10">
                  <Link to="/book">{t('home.createReservation') || 'Create a Reservation'}</Link>
                </Button>
              </div>
            </div>
            
            {/* Services preview */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-nova-white mb-6">{t('home.ourServices') || 'Our Services'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-nova-black/50 border border-nova-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-nova-white mb-2">{t('home.standardService') || 'Standard'}</h3>
                  <p className="text-nova-white/70 mb-4">{t('home.standardDesc') || 'Comfortable and reliable transportation'}</p>
                  <Button asChild variant="outline" className="w-full border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10">
                    <Link to="/services">{t('home.learnMore') || 'Learn More'}</Link>
                  </Button>
                </div>
                <div className="bg-nova-black/50 border border-nova-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-nova-white mb-2">{t('home.premiumService') || 'Premium'}</h3>
                  <p className="text-nova-white/70 mb-4">{t('home.premiumDesc') || 'Enhanced comfort with added amenities'}</p>
                  <Button asChild variant="outline" className="w-full border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10">
                    <Link to="/services">{t('home.learnMore') || 'Learn More'}</Link>
                  </Button>
                </div>
                <div className="bg-nova-black/50 border border-nova-gold/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-nova-white mb-2">{t('home.vipService') || 'VIP'}</h3>
                  <p className="text-nova-white/70 mb-4">{t('home.vipDesc') || 'Exclusive luxury experience'}</p>
                  <Button asChild variant="outline" className="w-full border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10">
                    <Link to="/services">{t('home.learnMore') || 'Learn More'}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
