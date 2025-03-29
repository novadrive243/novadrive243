
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";

const PricingPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 gold-gradient-text">
            {t('pricing.title') || 'Our Pricing'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Standard Package */}
            <div className="nova-card flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4 text-nova-gold">
                {t('pricing.standard.title') || 'Standard'}
              </h2>
              <p className="text-3xl font-bold mb-6">$99<span className="text-base font-normal">/hour</span></p>
              <ul className="mb-8 text-left space-y-3 flex-grow">
                <li>✓ Professional chauffeur</li>
                <li>✓ Luxury sedan</li>
                <li>✓ Complimentary water</li>
                <li>✓ Up to 3 passengers</li>
              </ul>
              <button className="gold-btn px-6 py-3 rounded-full w-full mt-auto">
                {t('pricing.bookNow') || 'Book Now'}
              </button>
            </div>
            
            {/* Premium Package */}
            <div className="nova-card flex flex-col h-full border-nova-gold">
              <h2 className="text-2xl font-bold mb-4 text-nova-gold">
                {t('pricing.premium.title') || 'Premium'}
              </h2>
              <p className="text-3xl font-bold mb-6">$149<span className="text-base font-normal">/hour</span></p>
              <ul className="mb-8 text-left space-y-3 flex-grow">
                <li>✓ Professional chauffeur</li>
                <li>✓ Luxury SUV</li>
                <li>✓ Complimentary beverages</li>
                <li>✓ Up to 6 passengers</li>
                <li>✓ Wi-Fi included</li>
              </ul>
              <button className="gold-btn px-6 py-3 rounded-full w-full mt-auto">
                {t('pricing.bookNow') || 'Book Now'}
              </button>
            </div>
            
            {/* VIP Package */}
            <div className="nova-card flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4 text-nova-gold">
                {t('pricing.vip.title') || 'VIP'}
              </h2>
              <p className="text-3xl font-bold mb-6">$299<span className="text-base font-normal">/hour</span></p>
              <ul className="mb-8 text-left space-y-3 flex-grow">
                <li>✓ Elite chauffeur</li>
                <li>✓ Premium limousine</li>
                <li>✓ Premium bar service</li>
                <li>✓ Up to 8 passengers</li>
                <li>✓ Wi-Fi included</li>
                <li>✓ Red carpet service</li>
              </ul>
              <button className="gold-btn px-6 py-3 rounded-full w-full mt-auto">
                {t('pricing.bookNow') || 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
