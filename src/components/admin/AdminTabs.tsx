
import { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language-context';

// Tab components
import { TabTriggers } from './tabs/TabTriggers';
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

  return (
    <Tabs defaultValue="bookings" value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
      <TabTriggers activeTab={activeTab} />
      
      {/* Tabs content with increased top margin for better spacing */}
      <TabsContent value="bookings" className="mt-6">
        <BookingsTab 
          bookings={bookings}
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      <TabsContent value="vehicles" className="mt-6">
        <VehiclesTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
          getVehicleDailyPrice={getVehicleDailyPrice}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="mt-6">
        <CustomersTab 
          profiles={profiles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="staff" className="mt-6">
        <StaffTab 
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <AnalyticsTab 
          bookings={bookings}
          vehicles={vehicles}
          profiles={profiles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      <TabsContent value="inventory" className="mt-6">
        <InventoryTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      <TabsContent value="maintenance" className="mt-6">
        <MaintenanceTab 
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      <TabsContent value="rides" className="mt-6">
        <RidesTab />
      </TabsContent>
      
      <TabsContent value="sessions" className="mt-6">
        <SessionsTab />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-6">
        <NotificationsTab language={language} />
      </TabsContent>
    </Tabs>
  );
};
