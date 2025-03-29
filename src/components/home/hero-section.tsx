
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-nova-black z-0 opacity-50"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ 
          backgroundImage: "url('/lovable-uploads/06e63a55-32c9-4efa-b61b-83012b46f61c.png')"
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gold-gradient text-white px-6 py-2 rounded-lg shadow-[0_0_20px_rgba(232,191,82,0.6)] border border-nova-gold/30">NovaDrive</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t('hero.title')}
          </h2>
          <p className="text-xl md:text-2xl text-nova-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>
          <Button 
            asChild 
            size="lg" 
            className="gold-btn text-lg px-8 py-6 rounded-full animate-fade-in"
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
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gold-gradient"></div>
    </section>
  );
}
