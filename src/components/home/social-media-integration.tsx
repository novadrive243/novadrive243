
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export const SocialMediaIntegration = () => {
  const { language } = useLanguage();
  
  const socialMedia = [
    { 
      name: 'Instagram', 
      icon: <Instagram className="h-6 w-6" />, 
      url: 'https://instagram.com', 
      color: 'hover:text-pink-500 hover:border-pink-500' 
    },
    { 
      name: 'Facebook', 
      icon: <Facebook className="h-6 w-6" />, 
      url: 'https://facebook.com', 
      color: 'hover:text-blue-600 hover:border-blue-600' 
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="h-6 w-6" />, 
      url: 'https://twitter.com', 
      color: 'hover:text-blue-400 hover:border-blue-400' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="h-6 w-6" />, 
      url: 'https://linkedin.com', 
      color: 'hover:text-blue-700 hover:border-blue-700' 
    },
    { 
      name: 'YouTube', 
      icon: <Youtube className="h-6 w-6" />, 
      url: 'https://youtube.com', 
      color: 'hover:text-red-600 hover:border-red-600' 
    },
  ];
  
  return (
    <section className="py-12 bg-nova-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-nova-gold mb-3">
            {language === 'fr' ? 'Suivez-Nous' : 'Follow Us'}
          </h3>
          <p className="text-nova-white/70 max-w-md mx-auto">
            {language === 'fr' 
              ? 'Rejoignez notre communauté sur les réseaux sociaux pour les dernières nouvelles et promotions' 
              : 'Join our community on social media for the latest news and promotions'}
          </p>
        </div>
        
        <div className="flex justify-center space-x-5">
          {socialMedia.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 border-2 border-nova-white/20 rounded-full flex items-center justify-center text-nova-white transition-all duration-300 ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="overflow-hidden rounded-lg aspect-square hover:opacity-90 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e13f3b95a12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
              alt="Social media post 1" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg aspect-square hover:opacity-90 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1604048606947-d0ea89f75a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtYm9yZ2hpbml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
              alt="Social media post 2" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg aspect-square hover:opacity-90 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnRzJTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
              alt="Social media post 3" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg aspect-square hover:opacity-90 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwY2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
              alt="Social media post 4" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
