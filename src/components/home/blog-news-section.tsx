
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Kinshasa's New Road Infrastructure Project Set to Transform Urban Transport",
    excerpt: "Learn about the major infrastructure developments happening across Kinshasa that will improve traffic flow and transportation in the city.",
    author: "Jean Mutombo",
    date: "2024-06-10",
    image: "/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png"
  },
  {
    id: 2,
    title: "Luxury Travel Trends in Central Africa for 2024",
    excerpt: "Discover how luxury travel is evolving in Central Africa with new expectations from business executives and diplomats visiting the region.",
    author: "Marie Nzuzi",
    date: "2024-05-22",
    image: "/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png"
  },
  {
    id: 3,
    title: "Electric Vehicles Making Inroads in the DRC Market",
    excerpt: "The future of transportation in DRC is changing with new electric vehicle options becoming increasingly available for premium transportation services.",
    author: "Philippe Lumumba",
    date: "2024-05-05",
    image: "/lovable-uploads/8337e561-5a74-4d76-8fac-6fb00b629bad.png"
  }
];

const blogPostsFr = [
  {
    id: 1,
    title: "Le Nouveau Projet d'Infrastructure Routière de Kinshasa Transformera le Transport Urbain",
    excerpt: "Découvrez les grands développements d'infrastructure en cours à Kinshasa qui amélioreront la fluidité du trafic et le transport dans la ville.",
    author: "Jean Mutombo",
    date: "2024-06-10",
    image: "/lovable-uploads/d46547d7-848f-40e6-8df3-826987faa8ef.png"
  },
  {
    id: 2,
    title: "Tendances du Voyage de Luxe en Afrique Centrale pour 2024",
    excerpt: "Découvrez comment le voyage de luxe évolue en Afrique centrale avec de nouvelles attentes des cadres d'entreprise et des diplomates visitant la région.",
    author: "Marie Nzuzi",
    date: "2024-05-22",
    image: "/lovable-uploads/a564e144-c5d6-4636-8cba-43b5410310a6.png"
  },
  {
    id: 3,
    title: "Les Véhicules Électriques Font leur Entrée sur le Marché Congolais",
    excerpt: "L'avenir du transport en RDC évolue avec de nouvelles options de véhicules électriques de plus en plus disponibles pour les services de transport haut de gamme.",
    author: "Philippe Lumumba",
    date: "2024-05-05",
    image: "/lovable-uploads/8337e561-5a74-4d76-8fac-6fb00b629bad.png"
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
              {language === 'fr' ? 'Actualités & Tendances' : 'News & Trends'}
            </span>
          </h2>
          <p className="text-nova-white/70 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Restez informé des derniers développements qui affectent le transport et la mobilité en RDC' 
              : 'Stay informed about the latest developments affecting transportation and mobility in DRC'}
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
