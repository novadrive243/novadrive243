
import React from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/contexts/language-context";

const TermsPage = () => {
  const { t, language } = useLanguage();
  
  // Déterminer quel contenu afficher en fonction de la langue
  const content = language === 'fr' ? frenchContent : englishContent;
  
  return (
    <div className="flex flex-col min-h-screen bg-nova-black text-nova-white">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gold-gradient text-transparent bg-clip-text">
            {language === 'fr' ? 'Conditions d\'utilisation & Politique de confidentialité' : 'Terms of Use & Privacy Policy'}
          </h1>
          
          <div className="space-y-12 nova-card p-6 md:p-8">
            {/* Conditions d'utilisation */}
            <section>
              <h2 className="text-2xl font-bold text-nova-gold mb-6">{content.termsTitle}</h2>
              <div className="space-y-4">
                {content.termsContent.map((paragraph, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-medium text-nova-white">{paragraph.title}</h3>
                    <p className="text-nova-white/80 leading-relaxed">{paragraph.text}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="border-t border-nova-gold/20 my-8"></div>
            
            {/* Politique de confidentialité */}
            <section>
              <h2 className="text-2xl font-bold text-nova-gold mb-6">{content.privacyTitle}</h2>
              <div className="space-y-4">
                {content.privacyContent.map((paragraph, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-medium text-nova-white">{paragraph.title}</h3>
                    <p className="text-nova-white/80 leading-relaxed">{paragraph.text}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="text-center mt-8 pt-8 border-t border-nova-gold/20">
              <p className="text-nova-white/70">
                {content.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Contenu en anglais
const englishContent = {
  termsTitle: "Terms of Use",
  termsContent: [
    {
      title: "Acceptance of Terms",
      text: "By accessing and using NovaDrive's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our services."
    },
    {
      title: "Service Description",
      text: "NovaDrive provides premium chauffeur and transportation services in Kinshasa. Our services include private transfers, hourly bookings, and custom transportation solutions as described on our website and mobile application."
    },
    {
      title: "User Obligations",
      text: "When using our services, you agree to provide accurate information, be present at the agreed pickup location on time, and behave respectfully towards our drivers and staff. Any damage to our vehicles caused by users will result in additional charges."
    },
    {
      title: "Booking and Cancellation",
      text: "Bookings must be made through our official channels. Cancellations must be made at least 4 hours before the scheduled service to receive a full refund. Late cancellations may be subject to a cancellation fee of up to 50% of the booking value."
    },
    {
      title: "Intellectual Property",
      text: "All content on our website and application, including logos, images, text, and design, is the property of NovaDrive and is protected by copyright laws. You may not reproduce, distribute, or use our content without explicit permission."
    }
  ],
  privacyTitle: "Privacy Policy",
  privacyContent: [
    {
      title: "Information Collection",
      text: "We collect personal information such as name, contact details, and payment information when you register and use our services. We may also collect data about your usage patterns and preferences to improve our services."
    },
    {
      title: "Use of Information",
      text: "Your personal information is used to provide and improve our services, process payments, communicate with you about bookings, and send you promotional offers if you've opted in. We do not sell your personal data to third parties."
    },
    {
      title: "Data Security",
      text: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security."
    },
    {
      title: "Cookies and Tracking",
      text: "Our website uses cookies and similar technologies to enhance user experience, analyze usage patterns, and provide personalized content. You can manage cookie preferences through your browser settings."
    },
    {
      title: "Your Rights",
      text: "You have the right to access, correct, or delete your personal information. You may also withdraw consent for processing your data for marketing purposes. To exercise these rights, please contact us at novadrive243@gmail.com."
    }
  ],
  lastUpdate: "Last updated: July 2023"
};

// Contenu en français
const frenchContent = {
  termsTitle: "Conditions d'Utilisation",
  termsContent: [
    {
      title: "Acceptation des Conditions",
      text: "En accédant et en utilisant les services de NovaDrive, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services."
    },
    {
      title: "Description du Service",
      text: "NovaDrive fournit des services premium de chauffeur et de transport à Kinshasa. Nos services incluent des transferts privés, des réservations à l'heure et des solutions de transport personnalisées, tels que décrits sur notre site web et notre application mobile."
    },
    {
      title: "Obligations de l'Utilisateur",
      text: "En utilisant nos services, vous acceptez de fournir des informations exactes, d'être présent au lieu de prise en charge convenu à l'heure prévue et de vous comporter respectueusement envers nos chauffeurs et notre personnel. Tout dommage causé à nos véhicules par les utilisateurs entraînera des frais supplémentaires."
    },
    {
      title: "Réservation et Annulation",
      text: "Les réservations doivent être effectuées via nos canaux officiels. Les annulations doivent être effectuées au moins 4 heures avant le service prévu pour recevoir un remboursement complet. Les annulations tardives peuvent être soumises à des frais d'annulation pouvant atteindre 50% de la valeur de la réservation."
    },
    {
      title: "Propriété Intellectuelle",
      text: "Tout le contenu de notre site web et de notre application, y compris les logos, images, textes et design, est la propriété de NovaDrive et est protégé par les lois sur le droit d'auteur. Vous ne pouvez pas reproduire, distribuer ou utiliser notre contenu sans autorisation explicite."
    }
  ],
  privacyTitle: "Politique de Confidentialité",
  privacyContent: [
    {
      title: "Collecte d'Informations",
      text: "Nous collectons des informations personnelles telles que votre nom, vos coordonnées et vos informations de paiement lorsque vous vous inscrivez et utilisez nos services. Nous pouvons également collecter des données sur vos habitudes d'utilisation et vos préférences pour améliorer nos services."
    },
    {
      title: "Utilisation des Informations",
      text: "Vos informations personnelles sont utilisées pour fournir et améliorer nos services, traiter les paiements, communiquer avec vous concernant les réservations et vous envoyer des offres promotionnelles si vous y avez consenti. Nous ne vendons pas vos données personnelles à des tiers."
    },
    {
      title: "Sécurité des Données",
      text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, altération ou divulgation non autorisés. Cependant, aucune transmission internet n'est entièrement sécurisée, et nous ne pouvons garantir une sécurité absolue."
    },
    {
      title: "Cookies et Suivi",
      text: "Notre site web utilise des cookies et des technologies similaires pour améliorer l'expérience utilisateur, analyser les modèles d'utilisation et fournir un contenu personnalisé. Vous pouvez gérer les préférences de cookies via les paramètres de votre navigateur."
    },
    {
      title: "Vos Droits",
      text: "Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également retirer votre consentement au traitement de vos données à des fins marketing. Pour exercer ces droits, veuillez nous contacter à novadrive243@gmail.com."
    }
  ],
  lastUpdate: "Dernière mise à jour : Juillet 2023"
};

export default TermsPage;
