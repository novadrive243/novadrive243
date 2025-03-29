
import React from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { VehiclesSection } from "@/components/home/vehicles-section";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-nova-black text-nova-white">
      <Header />
      <main>
        <HeroSection />
        <VehiclesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
