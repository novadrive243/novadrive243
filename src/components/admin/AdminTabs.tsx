
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsTable } from './BookingsTable';
import { VehiclesTable } from './VehiclesTable';
import { CustomersTable } from './CustomersTable';
import { AnalyticsCard } from './AnalyticsCard';

interface AdminTabsProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
}

export const AdminTabs = ({ 
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatDate, 
  formatCurrency,
  getVehicleDailyPrice
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="bookings" className="mb-6">
      <TabsList className="bg-nova-gray/30 border border-nova-gold/20 p-1">
        <TabsTrigger 
          value="bookings"
          className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
        >
          {language === 'fr' ? 'Réservations' : 'Bookings'}
        </TabsTrigger>
        <TabsTrigger 
          value="vehicles"
          className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
        >
          {language === 'fr' ? 'Véhicules' : 'Vehicles'}
        </TabsTrigger>
        <TabsTrigger 
          value="customers"
          className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
        >
          {language === 'fr' ? 'Clients' : 'Customers'}
        </TabsTrigger>
        <TabsTrigger 
          value="analytics"
          className="data-[state=active]:bg-nova-gold data-[state=active]:text-nova-black"
        >
          {language === 'fr' ? 'Analyses' : 'Analytics'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="bookings" className="mt-4">
        <BookingsTable 
          bookings={bookings} 
          language={language} 
          formatDate={formatDate} 
          formatCurrency={formatCurrency} 
        />
      </TabsContent>
      
      <TabsContent value="vehicles" className="mt-4">
        <VehiclesTable 
          vehicles={vehicles} 
          language={language} 
          formatCurrency={formatCurrency} 
          getVehicleDailyPrice={getVehicleDailyPrice} 
        />
      </TabsContent>
      
      <TabsContent value="customers" className="mt-4">
        <CustomersTable 
          profiles={profiles} 
          language={language} 
          formatDate={formatDate} 
        />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsCard language={language} />
      </TabsContent>
    </Tabs>
  );
};
