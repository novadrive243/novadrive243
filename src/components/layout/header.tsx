
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { t } = useLanguage();
  
  const menuLinks = [
    { href: "/", label: t('header.home') },
    { href: "/about", label: t('header.about') },
    { href: "/services", label: t('header.services') },
    { href: "/pricing", label: t('header.pricing') || 'Pricing' },
    { href: "/contact", label: t('header.contact') },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nova-black/80 backdrop-blur-md border-b border-nova-gold/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/your-image.png" 
            alt="NovaDrive Logo" 
            className="h-10 mr-2"
            onError={(e) => {
              console.log("Image failed to load");
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-sfpro text-2xl font-bold gold-gradient-text">NovaDrive</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {menuLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href}
              className="text-nova-white hover:text-nova-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <Button asChild variant="default" className="gold-btn px-5 py-2 rounded-full ml-4">
            <Link to="/book">{t('header.bookNow')}</Link>
          </Button>
          
          <LanguageSwitcher />
        </nav>
        
        <div className="md:hidden flex items-center">
          <LanguageSwitcher className="mr-2" />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-nova-white hover:text-nova-gold">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-nova-black border-nova-gold/20">
              <nav className="flex flex-col space-y-4 mt-10">
                {menuLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    to={link.href}
                    className="text-nova-white hover:text-nova-gold transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Button asChild variant="default" className="gold-btn w-full mt-4">
                  <Link to="/book">{t('header.bookNow')}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
