
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { VehiclesSection } from '@/components/home/vehicles-section';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-nova-black text-nova-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VehiclesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
