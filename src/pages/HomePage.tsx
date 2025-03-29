
import React, { useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/home/hero-section";
import { VehiclesSection } from "@/components/home/vehicles-section";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is registered
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // Redirect to registration if not registered
      navigate("/register");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-nova-black text-nova-white">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <HeroSection />
        <VehiclesSection />
      </div>
    </div>
  );
};

export default HomePage;
