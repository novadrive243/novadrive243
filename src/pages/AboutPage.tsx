
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/contexts/language-context';

const AboutPage = () => {
  const { language } = useLanguage();
  
  const content = {
    fr: {
      title: "À propos de NovaDrive",
      subtitle: "Service de chauffeur de luxe pour Kinshasa",
      mission: {
        title: "Notre Mission",
        text: "NovaDrive est né d'une vision simple : offrir à Kinshasa un service de chauffeur privé qui allie luxe, sécurité et fiabilité. Nous nous engageons à transformer chaque trajet en une expérience premium, où le confort et la ponctualité ne sont jamais compromis."
      },
      values: {
        title: "Nos Valeurs",
        items: [
          {
            title: "Excellence",
            text: "Nous visons l'excellence dans chaque aspect de notre service, de la sélection des véhicules à la formation de nos chauffeurs."
          },
          {
            title: "Élégance",
            text: "Nous croyons que le luxe réside dans les détails, c'est pourquoi nous attachons une importance particulière à l'esthétique et au raffinement."
          },
          {
            title: "Fiabilité",
            text: "La ponctualité et la fiabilité sont au cœur de notre engagement envers nos clients, vous pouvez compter sur nous à tout moment."
          }
        ]
      },
      fleet: {
        title: "Notre Flotte",
        text: "Notre flotte se compose exclusivement de véhicules haut de gamme, soigneusement entretenus pour garantir confort et sécurité. Chaque véhicule est équipé d'aménités premium pour rendre votre trajet aussi agréable que possible."
      }
    },
    en: {
      title: "About NovaDrive",
      subtitle: "Luxury chauffeur service for Kinshasa",
      mission: {
        title: "Our Mission",
        text: "NovaDrive was born from a simple vision: to provide Kinshasa with a private chauffeur service that combines luxury, safety, and reliability. We are committed to transforming every journey into a premium experience, where comfort and punctuality are never compromised."
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Excellence",
            text: "We aim for excellence in every aspect of our service, from vehicle selection to chauffeur training."
          },
          {
            title: "Elegance",
            text: "We believe that luxury lies in the details, which is why we pay special attention to aesthetics and refinement."
          },
          {
            title: "Reliability",
            text: "Punctuality and reliability are at the heart of our commitment to our customers - you can count on us at any time."
          }
        ]
      },
      fleet: {
        title: "Our Fleet",
        text: "Our fleet consists exclusively of high-end vehicles, carefully maintained to ensure comfort and safety. Each vehicle is equipped with premium amenities to make your journey as pleasant as possible."
      }
    }
  };
  
  const { title, subtitle, mission, values, fleet } = content[language];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gold-gradient-text">{title}</span>
            </h1>
            <p className="text-xl text-nova-white/80 mb-12">{subtitle}</p>
            
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-nova-gold">{mission.title}</h2>
              <p className="text-lg text-nova-white/80 leading-relaxed">{mission.text}</p>
            </section>
            
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-nova-gold">{values.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.items.map((value, index) => (
                  <div key={index} className="nova-card">
                    <h3 className="text-xl font-medium mb-3 text-nova-white">{value.title}</h3>
                    <p className="text-nova-white/70">{value.text}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-nova-gold">{fleet.title}</h2>
              <p className="text-lg text-nova-white/80 leading-relaxed mb-8">{fleet.text}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png" 
                    alt="Chevrolet Tahoe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/6a588e4a-4639-4bb2-800c-1d4ca6adb059.png" 
                    alt="Nissan X-Terra" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Toyota Patrol" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
