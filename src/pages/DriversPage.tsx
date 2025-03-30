
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { DriversHeader } from './drivers/DriversHeader';
import { DriversSearch } from './drivers/DriversSearch';
import { DriversGrid } from './drivers/DriversGrid';
import { EmptyResults } from './drivers/EmptyResults';
import { RecruitmentSection } from './drivers/RecruitmentSection';
import { driversData } from '@/data/drivers-data';

const DriversPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter drivers based on search term and language
  const filteredDrivers = driversData.filter(driver => {
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

  const resetFilters = () => {
    setSearchTerm('');
    setFilterLanguage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-nova-white pb-20">
      <div className="container px-4 py-10 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-nova-white">
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
        
        {filteredDrivers.length > 0 ? (
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
