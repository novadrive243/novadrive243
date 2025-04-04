import { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language-context';

// Tab components
import { VehiclesTab } from './tabs/VehiclesTab';
import { BookingsTab } from './tabs/BookingsTab';
import { CustomersTab } from './tabs/CustomersTab';
import { StaffTab } from './tabs/StaffTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { InventoryTab } from './tabs/InventoryTab';
import { MaintenanceTab } from './tabs/MaintenanceTab';
import { RidesTab } from './tabs/RidesTab';
import { SessionsTab } from './tabs/SessionsTab';
import { NotificationsTab } from './tabs/NotificationsTab';
import { CalendarTab } from './tabs/CalendarTab';

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
  isLoading: boolean;
  monthlyRevenue: number;
  refreshData: () => void;
}

export const AdminTabs = ({
  activeTab,
  setActiveTab,
  bookings,
  vehicles,
  profiles,
  language,
  formatDate,
  formatCurrency,
  getVehicleDailyPrice,
  isLoading,
  monthlyRevenue,
  refreshData
}: AdminTabsProps) => {
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL hash without page reload
    window.history.pushState(null, '', `#${value}`);
  };

  // Use bookings as default tab if no tab is selected
  useEffect(() => {
    if (activeTab === "dashboard") {
      setActiveTab("bookings");
    }
  }, [activeTab, setActiveTab]);

  // Show empty state messages when there's no data
  const isEmpty = bookings.length === 0 && vehicles.length === 0 && profiles.length === 0;

  // Render empty state if there's no data
  if (isEmpty && !isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4 p-8 text-center">
        <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-nova-white mb-4">
            {language === 'fr' ? 'Aucune donnée disponible' : 'No Data Available'}
          </h2>
          <p className="text-nova-white/80 mb-6">
            {language === 'fr' 
              ? 'Utilisez les boutons ci-dessous pour ajouter des véhicules, des clients ou des réservations au système.'
              : 'Use the buttons below to add vehicles, customers, or bookings to the system.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={refreshData}
              className="bg-nova-gold text-nova-black hover:bg-nova-gold/90 px-4 py-2 rounded-md transition-colors"
            >
              {language === 'fr' ? 'Rafraîchir les données' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="bookings" value={activeTab} onValueChange={handleTabChange} className="w-full space-y-4">
      {/* Tabs content */}
      <TabsContent value="bookings" className="mt-4">
        <BookingsTab 
          bookings={bookings}
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          refreshData={refreshData}
        />
      </TabsContent>
      
      <TabsContent value="vehicles" className="mt-4">
        <VehiclesTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
          getVehicleDailyPrice={getVehicleDailyPrice}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="mt-4">
        <CustomersTab 
          profiles={profiles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="staff" className="mt-4">
        <StaffTab 
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <AnalyticsTab 
          bookings={bookings}
          vehicles={vehicles}
          profiles={profiles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      <TabsContent value="inventory" className="mt-4">
        <InventoryTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      <TabsContent value="maintenance" className="mt-4">
        <MaintenanceTab 
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-4">
        <CalendarTab 
          vehicles={vehicles}
          bookings={bookings}
          language={language}
          isLoading={isLoading}
        />
      </TabsContent>
      
      <TabsContent value="rides" className="mt-4">
        <RidesTab />
      </TabsContent>
      
      <TabsContent value="sessions" className="mt-4">
        <SessionsTab />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-4">
        <NotificationsTab language={language} />
      </TabsContent>
    </Tabs>
  );
};
