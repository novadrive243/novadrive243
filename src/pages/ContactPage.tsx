
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from "@/contexts/language-context";
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';
import ContactChat from '@/components/contact/contact-chat';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-nova-black">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-nova-white border-2 border-nova-gold inline-block px-6 py-3 rounded-lg">
                {t('contact.title')}
              </h1>
              <p className="text-nova-white/70 text-lg">
                {t('contact.subtitle')}
              </p>
              
              {/* Chat Dialog Trigger */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-8 gold-btn flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {language === 'fr' ? 'Chat avec nous' : 'Chat with us'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-nova-gold" />
                      {t('contact.chatTitle')}
                    </DialogTitle>
                  </DialogHeader>
                  {/* Chat interface inside dialog */}
                  <div className="h-[60vh] flex flex-col">
                    {/* We'll embed the chat functionality directly */}
                    <iframe 
                      src="/contact" 
                      className="w-full h-full border-none"
                      title="Chat"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <ContactChat />
      
      <Footer />
    </div>
  );
};

export default ContactPage;
