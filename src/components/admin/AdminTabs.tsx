
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingsTable } from './BookingsTable';
import { VehiclesTable } from './VehiclesTable';
import { CustomersTable } from './CustomersTable';
import { AnalyticsCard } from './AnalyticsCard';
import { VehicleCalendar } from './VehicleCalendar';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { MaintenanceTracking } from './MaintenanceTracking';
import { StaffManagement } from './StaffManagement';
import { InventoryManager } from './InventoryManager';
import { PromotionManager } from './PromotionManager';

interface AdminTabsProps {
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
  isLoading: boolean;
  monthlyRevenue?: number;
}

export const AdminTabs = ({ 
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatDate, 
  formatCurrency,
  getVehicleDailyPrice,
  isLoading,
  monthlyRevenue = 0
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="bookings" className="mt-8">
      <TabsList className="grid grid-cols-8 bg-nova-gray/30 text-nova-white">
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
        <TabsTrigger value="maintenance">
          {language === 'fr' ? 'Maintenance' : 'Maintenance'}
        </TabsTrigger>
        <TabsTrigger value="staff">
          {language === 'fr' ? 'Personnel' : 'Staff'}
        </TabsTrigger>
        <TabsTrigger value="promotions">
          {language === 'fr' ? 'Promotions' : 'Promotions'}
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
        <InventoryManager
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
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
        <div className="space-y-8">
          <AnalyticsCard 
            language={language} 
            bookings={bookings}
            vehicles={vehicles}
            profiles={profiles}
            monthlyRevenue={monthlyRevenue}
          />
          
          <AdvancedAnalytics 
            bookings={bookings}
            vehicles={vehicles}
            profiles={profiles}
            language={language}
            formatCurrency={formatCurrency}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="maintenance" className="mt-4">
        <MaintenanceTracking 
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="staff" className="mt-4">
        <StaffManagement 
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="promotions" className="mt-4">
        <PromotionManager 
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
    </Tabs>
  );
};
