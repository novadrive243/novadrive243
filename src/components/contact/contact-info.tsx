
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Instagram, Share2 } from "lucide-react";

const ContactInfo = () => {
  const { t } = useLanguage();
  
  const contactDetails = [
    {
      icon: <Phone className="text-nova-gold" />,
      title: t('contact.phone'),
      info: "+243 855971610",
      description: t('contact.phoneDescription')
    },
    {
      icon: <Mail className="text-nova-gold" />,
      title: t('contact.email'),
      info: "novadrive243@gmail.com",
      description: t('contact.emailDescription')
    },
    {
      icon: <MapPin className="text-nova-gold" />,
      title: t('contact.address'),
      info: t('contact.addressLine'),
      description: t('contact.addressDescription')
    }
  ];

  const socialMedia = [
    {
      icon: <Instagram className="text-nova-gold" />,
      platform: "Instagram",
      username: "novadrive243",
      url: "https://www.instagram.com/novadrive243"
    },
    {
      icon: <Share2 className="text-nova-gold" />,
      platform: "TikTok",
      username: "novadrive243",
      url: "https://www.tiktok.com/@novadrive243"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="nova-card">
        <h3 className="text-xl font-semibold mb-6">{t('contact.infoTitle')}</h3>
        <p className="text-nova-white/70 mb-6">
          {t('contact.infoDescription')}
        </p>
        
        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-nova-gray/20 rounded-md">
              <div className="mt-1 p-2 bg-nova-gray/30 rounded-full">
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-nova-gold">{item.title}</h4>
                <p className="text-nova-white font-medium">{item.info}</p>
                <p className="text-nova-white/70 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}

          {/* Social Media Links */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-nova-gold mb-4">{t('contact.socialMedia') || 'Social Media'}</h4>
            <div className="flex flex-col space-y-4">
              {socialMedia.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-nova-gray/20 rounded-md hover:bg-nova-gray/30 transition-colors"
                >
                  <div className="p-2 bg-nova-gray/30 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-medium text-nova-white">{item.platform}</span>
                    <p className="text-nova-white/70 text-sm">@{item.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Card className="overflow-hidden h-[300px] border-none">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15928.046371682293!2d15.275673!3d-4.311638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33a24229e473%3A0x72029c9a550155b8!2sKinshasa%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1654321012345!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="NovaDrive Location"
          className="w-full h-full"
        />
      </Card>
    </div>
  );
};

export default ContactInfo;
