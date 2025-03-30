
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DriverProfileCard } from '@/components/drivers/driver-profile-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMobile } from '@/hooks/use-mobile';

const DriversPage = () => {
  const { t, language } = useLanguage();
  const isMobile = useMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for drivers
  const drivers = [
    {
      id: "1",
      name: "Jean Dupont",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      experience: "5 ans",
      rating: 4.8,
      languages: ["Français", "Anglais", "Espagnol"],
      certifications: ["Conduite VIP", "Secourisme"],
      phone: "+33 6 12 34 56 78"
    },
    {
      id: "2",
      name: "Marie Laurent",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      experience: "7 ans",
      rating: 4.9,
      languages: ["Français", "Anglais", "Italien"],
      certifications: ["Conduite défensive", "Service client premium"],
      phone: "+33 6 23 45 67 89"
    },
    {
      id: "3",
      name: "Mohammed Al-Fayed",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      experience: "10 ans",
      rating: 5.0,
      languages: ["Français", "Anglais", "Arabe"],
      certifications: ["Conduite VIP", "Sécurité personnelle"],
      phone: "+33 6 34 56 78 90"
    },
    {
      id: "4",
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      experience: "3 ans",
      rating: 4.7,
      languages: ["Français", "Anglais"],
      certifications: ["Service client premium"],
      phone: "+33 6 45 67 89 01"
    },
    {
      id: "5",
      name: "Carlos Rodriguez",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      experience: "8 ans",
      rating: 4.8,
      languages: ["Français", "Espagnol", "Portugais"],
      certifications: ["Conduite sportive", "Secourisme"],
      phone: "+33 6 56 78 90 12"
    }
  ];

  // Filter drivers based on search term and language
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = !filterLanguage || driver.languages.includes(filterLanguage);
    return matchesSearch && matchesLanguage;
  });

  const handleContactClick = (driverId: string) => {
    // In a real app, this would open contact options or redirect to a contact form
    console.log(`Contact driver ${driverId}`);
  };

  const handleViewProfileClick = (driverId: string) => {
    // In a real app, this would show more details about the driver
    console.log(`View profile of driver ${driverId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-nova-white pb-20">
      <div className="container px-4 py-10 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient-text">
          {language === 'fr' ? 'Nos Chauffeurs Professionnels' : 'Our Professional Drivers'}
        </h1>
        
        <Card className="bg-nova-black/40 border-nova-gold/20 mb-8">
          <CardHeader>
            <CardTitle className="text-nova-white">
              {language === 'fr' ? 'Découvrez notre équipe d\'élite' : 'Discover our elite team'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-nova-white/80">
              {language === 'fr' 
                ? 'Notre équipe de chauffeurs professionnels est composée d\'experts formés pour vous offrir une expérience de conduite exceptionnelle. Chaque chauffeur est certifié et possède une connaissance approfondie des véhicules de luxe et des routes.'
                : 'Our team of professional drivers consists of experts trained to provide you with an exceptional driving experience. Each driver is certified and has in-depth knowledge of luxury vehicles and routes.'}
            </p>
            
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nova-gold h-4 w-4" />
                  <Input 
                    placeholder={language === 'fr' ? 'Rechercher un chauffeur...' : 'Search for a driver...'}
                    className="pl-10 bg-nova-black border-nova-gold/20 text-nova-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-nova-gold/20 text-nova-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2 text-nova-gold" />
                  {language === 'fr' ? 'Filtres' : 'Filters'}
                </Button>
                
                {showFilters && (
                  <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                    <SelectTrigger className="w-[180px] bg-nova-black border-nova-gold/20 text-nova-white">
                      <SelectValue placeholder={language === 'fr' ? 'Langue' : 'Language'} />
                    </SelectTrigger>
                    <SelectContent className="bg-nova-gray border-nova-gold/20">
                      <SelectItem value="" className="text-nova-white">
                        {language === 'fr' ? 'Toutes les langues' : 'All languages'}
                      </SelectItem>
                      <SelectItem value="Français" className="text-nova-white">Français</SelectItem>
                      <SelectItem value="Anglais" className="text-nova-white">Anglais</SelectItem>
                      <SelectItem value="Espagnol" className="text-nova-white">Espagnol</SelectItem>
                      <SelectItem value="Italien" className="text-nova-white">Italien</SelectItem>
                      <SelectItem value="Arabe" className="text-nova-white">Arabe</SelectItem>
                      <SelectItem value="Portugais" className="text-nova-white">Portugais</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map(driver => (
            <DriverProfileCard 
              key={driver.id}
              driver={driver}
              onContactClick={handleContactClick}
              onViewProfileClick={handleViewProfileClick}
            />
          ))}
        </div>
        
        {filteredDrivers.length === 0 && (
          <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-8 text-center mt-8">
            <p className="text-nova-gold text-lg">
              {language === 'fr' 
                ? 'Aucun chauffeur ne correspond à votre recherche.' 
                : 'No drivers match your search.'}
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
              onClick={() => {
                setSearchTerm('');
                setFilterLanguage('');
              }}
            >
              {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
            </Button>
          </div>
        )}
        
        <div className="mt-12 bg-nova-black/40 border-nova-gold/20 border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-nova-white">
            {language === 'fr' ? 'Vous souhaitez rejoindre notre équipe ?' : 'Want to join our team?'}
          </h2>
          <p className="text-nova-white/80 mb-6">
            {language === 'fr' 
              ? 'Si vous êtes un chauffeur professionnel et que vous souhaitez rejoindre l\'équipe NovaDrive, envoyez-nous votre CV et une lettre de motivation.' 
              : 'If you are a professional driver and would like to join the NovaDrive team, send us your resume and cover letter.'}
          </p>
          <Button className="gold-btn">
            {language === 'fr' ? 'Postuler maintenant' : 'Apply now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
