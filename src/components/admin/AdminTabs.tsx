
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingsTable } from './BookingsTable';
import { VehiclesTable } from './VehiclesTable';
import { CustomersTable } from './CustomersTable';
import { AnalyticsCard } from './AnalyticsCard';
import { VehicleCalendar } from './VehicleCalendar';

interface AdminTabsProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
  isLoading: boolean;
}

export const AdminTabs = ({ 
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatDate, 
  formatCurrency,
  getVehicleDailyPrice,
  isLoading
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="bookings" className="mt-8">
      <TabsList className="grid grid-cols-5 bg-nova-gray/30 text-nova-white">
        <TabsTrigger value="bookings">
          {language === 'fr' ? 'Réservations' : 'Bookings'}
        </TabsTrigger>
        <TabsTrigger value="vehicles">
          {language === 'fr' ? 'Véhicules' : 'Vehicles'}
        </TabsTrigger>
        <TabsTrigger value="calendar">
          {language === 'fr' ? 'Calendrier' : 'Calendar'}
        </TabsTrigger>
        <TabsTrigger value="customers">
          {language === 'fr' ? 'Clients' : 'Customers'}
        </TabsTrigger>
        <TabsTrigger value="analytics">
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
      
      <TabsContent value="calendar" className="mt-4">
        <VehicleCalendar 
          vehicles={vehicles}
          bookings={bookings}
          language={language}
          isLoading={isLoading}
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
