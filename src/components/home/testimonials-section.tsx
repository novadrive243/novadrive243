import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Business Executive",
    rating: 5,
    comment: "NovaDrive exceeded all my expectations. The luxury vehicle was immaculate and the service was top-notch. My go-to for business trips now.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Travel Blogger",
    rating: 5,
    comment: "I've rented cars all over the world, but NovaDrive's attention to detail and customer service is unmatched. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Film Producer",
    rating: 5,
    comment: "When we needed luxury vehicles for our film shoot, NovaDrive delivered beyond our expectations. Professional, punctual, and perfect cars.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Emma Laurent",
    role: "Wedding Planner",
    rating: 5,
    comment: "My clients always request the best for their special day, and NovaDrive never disappoints. Elegant cars and seamless service.",
    image: "https://randomuser.me/api/portraits/women/29.jpg"
  },
];

const frenchTestimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Cadre d'Entreprise",
    rating: 5,
    comment: "NovaDrive a dépassé toutes mes attentes. Le véhicule de luxe était impeccable et le service était de premier ordre. C'est maintenant mon choix privilégié pour mes voyages d'affaires.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Blogueuse Voyage",
    rating: 5,
    comment: "J'ai loué des voitures partout dans le monde, mais l'attention aux détails et le service client de NovaDrive sont inégalés. Je recommande vivement !",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Producteur de Films",
    rating: 5,
    comment: "Lorsque nous avions besoin de véhicules de luxe pour notre tournage, NovaDrive a dépassé nos attentes. Des voitures professionnelles, ponctuelles et parfaites.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Emma Laurent",
    role: "Organisatrice de Mariages",
    rating: 5,
    comment: "Mes clients demandent toujours le meilleur pour leur jour spécial, et NovaDrive ne déçoit jamais. Des voitures élégantes et un service impeccable.",
    image: "https://randomuser.me/api/portraits/women/29.jpg"
  },
];

export const TestimonialsSection = () => {
  const { language } = useLanguage();
  const currentTestimonials = language === 'fr' ? frenchTestimonials : testimonials;
  
  return (
    <section className="py-16 bg-nova-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-nova-white">
            {language === 'fr' ? 'Ce Que Disent Nos Clients' : 'What Our Clients Say'}
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les expériences de nos clients satisfaits avec NovaDrive' 
              : 'Discover the experiences of our satisfied customers with NovaDrive'}
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {currentTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="border-none bg-gradient-to-br from-nova-gray/40 to-nova-black/60 shadow-lg h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="mb-4 text-nova-gold">
                      <Quote size={32} className="rotate-180" />
                    </div>
                    
                    <p className="text-nova-white/80 mb-6 flex-grow italic">
                      "{testimonial.comment}"
                    </p>
                    
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-nova-gold' : 'text-nova-white/30'}`}
                          fill={i < testimonial.rating ? '#D4AF37' : 'none'}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-nova-gold/50">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-nova-white">{testimonial.name}</h4>
                        <p className="text-sm text-nova-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
