
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DriversSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterLanguage: string;
  setFilterLanguage: (language: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const DriversSearch = ({
  searchTerm,
  setSearchTerm,
  filterLanguage,
  setFilterLanguage,
  showFilters,
  setShowFilters
}: DriversSearchProps) => {
  const { language } = useLanguage();
  
  return (
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
              <SelectItem value="all" className="text-nova-white">
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
  );
};
