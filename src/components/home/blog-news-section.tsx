
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Rise of Luxury Electric Vehicles in 2024",
    excerpt: "Explore how electric vehicles are dominating the luxury car segment with cutting-edge technology and sustainable luxury.",
    author: "James Reynolds",
    date: "2024-03-15",
    image: "/lovable-uploads/8337e561-5a74-4d76-8fac-6fb00b629bad.png"
  },
  {
    id: 2,
    title: "Top 5 Scenic Drives Around Montreal",
    excerpt: "Discover the most breathtaking routes around Montreal perfect for enjoying your luxury vehicle rental.",
    author: "Sophie Laurent",
    date: "2024-02-28",
    image: "/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png"
  },
  {
    id: 3,
    title: "Ultimate Guide to Car Care for Luxury Vehicles",
    excerpt: "Learn professional tips and tricks to maintain the pristine condition of high-end vehicles.",
    author: "Michael Chen",
    date: "2024-02-10",
    image: "/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png"
  }
];

const blogPostsFr = [
  {
    id: 1,
    title: "L'essor des Véhicules Électriques de Luxe en 2024",
    excerpt: "Découvrez comment les véhicules électriques dominent le segment des voitures de luxe avec une technologie de pointe et un luxe durable.",
    author: "James Reynolds",
    date: "2024-03-15",
    image: "/lovable-uploads/8337e561-5a74-4d76-8fac-6fb00b629bad.png"
  },
  {
    id: 2,
    title: "Les 5 Routes Panoramiques Autour de Montréal",
    excerpt: "Découvrez les itinéraires les plus époustouflants autour de Montréal, parfaits pour profiter de votre location de véhicule de luxe.",
    author: "Sophie Laurent",
    date: "2024-02-28",
    image: "/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png"
  },
  {
    id: 3,
    title: "Guide Ultime d'Entretien pour Véhicules de Luxe",
    excerpt: "Apprenez des conseils et astuces professionnels pour maintenir l'état impeccable des véhicules haut de gamme.",
    author: "Michael Chen",
    date: "2024-02-10",
    image: "/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png"
  }
];

export const BlogNewsSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const posts = language === 'fr' ? blogPostsFr : blogPosts;
  
  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'fr'
      ? date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <section className="py-16 bg-nova-gray/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <BookOpen className="inline-block mr-2 text-nova-gold h-8 w-8" />
            <span className="gold-gradient-text">
              {language === 'fr' ? 'Blog & Actualités' : 'Blog & News'}
            </span>
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Restez informé avec nos derniers articles et actualités du monde automobile' 
              : 'Stay informed with our latest articles and news from the automotive world'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-nova-black border-nova-gold/20 hover:border-nova-gold/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <CardHeader className="p-5 pb-0">
                <h3 className="text-xl font-semibold text-nova-white mb-3">{post.title}</h3>
              </CardHeader>
              
              <CardContent className="p-5 pt-3 flex-grow">
                <p className="text-nova-white/70 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center text-sm text-nova-white/60 space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-nova-gold" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-nova-gold" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Button variant="outline" className="text-nova-gold border-nova-gold/50 hover:bg-nova-gold/10 w-full">
                  {language === 'fr' ? 'Lire Plus' : 'Read More'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
