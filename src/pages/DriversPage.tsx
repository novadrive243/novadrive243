
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { DriversHeader } from './drivers/DriversHeader';
import { DriversSearch } from './drivers/DriversSearch';
import { DriversGrid } from './drivers/DriversGrid';
import { EmptyResults } from './drivers/EmptyResults';
import { RecruitmentSection } from './drivers/RecruitmentSection';
import { supabase } from '@/integrations/supabase/client';
import { Driver } from '@/types/drivers';
import { useToast } from '@/hooks/use-toast';

const DriversPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('drivers')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setDrivers(data);
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
        toast({
          title: language === 'fr' ? 'Erreur' : 'Error',
          description: language === 'fr' 
            ? 'Impossible de charger les chauffeurs. Veuillez réessayer.' 
            : 'Failed to load drivers. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDrivers();
  }, [language, toast]);
  
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = !filterLanguage || filterLanguage === 'all' || driver.languages.includes(filterLanguage);
    return matchesSearch && matchesLanguage;
  });

  const handleContactClick = (driverId: string) => {
    console.log(`Contact driver ${driverId}`);
  };

  const handleViewProfileClick = (driverId: string) => {
    console.log(`View profile of driver ${driverId}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterLanguage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-nova-white pb-20">
      <div className="container px-4 py-10 mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          {language === 'fr' ? 'Nos Chauffeurs Professionnels' : 'Our Professional Drivers'}
        </h1>
        
        <DriversHeader />
        
        <DriversSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterLanguage={filterLanguage}
          setFilterLanguage={setFilterLanguage}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nova-gold"></div>
          </div>
        ) : filteredDrivers.length > 0 ? (
          <DriversGrid 
            drivers={filteredDrivers} 
            onContactClick={handleContactClick}
            onViewProfileClick={handleViewProfileClick}
          />
        ) : (
          <EmptyResults resetFilters={resetFilters} />
        )}
        
        <RecruitmentSection />
      </div>
    </div>
  );
};

export default DriversPage;
