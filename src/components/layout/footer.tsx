
import React from 'react';
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();
  
  const currentYear = 2025; // Updating to 2025 instead of dynamic year
  
  const footerSections = [
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: "/about" },
        { label: t('footer.careers'), href: "/careers" },
        { label: t('footer.contact'), href: "/contact" },
      ]
    },
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.chauffeur'), href: "/services" },
        { label: t('footer.vehicles'), href: "/vehicles" },
        { label: t('footer.pricing'), href: "/pricing" },
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: "/terms" },
        { label: t('footer.privacy'), href: "/terms" },  // Utilise la même page car les deux sont combinés
      ]
    }
  ];
  
  return (
    <footer className="bg-nova-black border-t border-nova-gold/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-sfpro text-2xl font-bold text-white px-3 py-1 rounded shadow-[0_0_10px_rgba(232,191,82,0.5)] bg-nova-black border border-nova-gold">NovaDrive</span>
            </Link>
            <p className="text-nova-white/70 max-w-xs">
              {t('footer.slogan')}
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-nova-white font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-nova-white/70 hover:text-nova-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-nova-gold/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-nova-white/50 text-sm">
              &copy; {currentYear} NovaDrive243. {t('footer.rights')}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://www.instagram.com/novadrive243" target="_blank" rel="noopener noreferrer" className="text-nova-white/70 hover:text-nova-gold">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@novadrive243" target="_blank" rel="noopener noreferrer" className="text-nova-white/70 hover:text-nova-gold">
                TikTok
              </a>
              <a href="mailto:info@novadrive243.com" className="text-nova-white/70 hover:text-nova-gold">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
