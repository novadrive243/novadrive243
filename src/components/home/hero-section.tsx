
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-nova-black z-0 opacity-70"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ 
          backgroundImage: "url('/lovable-uploads/65d17b10-d820-4eba-b913-99b9b12e7c35.png')"
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-down">
            <span className="bg-gold-gradient text-transparent bg-clip-text">NovaDrive</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            {t('hero.title')}
          </h2>
          <p className="text-xl md:text-2xl text-nova-white/90 mb-8 animate-slide-down" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>
          <Button 
            asChild 
            size="lg" 
            className="gold-btn text-lg px-8 py-6 rounded-full animate-slide-down"
            style={{ animationDelay: '0.3s' }}
          >
            <Link to="/book">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Gold bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient"></div>
    </section>
  );
}
