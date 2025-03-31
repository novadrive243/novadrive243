
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
    <Tabs defaultValue="bookings" value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabTriggers activeTab={activeTab} />
      
      {/* Bookings */}
      <TabsContent value="bookings">
        <BookingsTab 
          bookings={bookings}
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      {/* Vehicles */}
      <TabsContent value="vehicles">
        <VehiclesTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
          getVehicleDailyPrice={getVehicleDailyPrice}
        />
      </TabsContent>
      
      {/* Customers */}
      <TabsContent value="customers">
        <CustomersTab 
          profiles={profiles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      {/* Staff */}
      <TabsContent value="staff">
        <StaffTab 
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      {/* Analytics */}
      <TabsContent value="analytics">
        <AnalyticsTab 
          bookings={bookings}
          vehicles={vehicles}
          profiles={profiles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      {/* Inventory */}
      <TabsContent value="inventory">
        <InventoryTab 
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
        />
      </TabsContent>
      
      {/* Maintenance */}
      <TabsContent value="maintenance">
        <MaintenanceTab 
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      </TabsContent>
      
      {/* Rides */}
      <TabsContent value="rides">
        <RidesTab />
      </TabsContent>
      
      {/* Sessions */}
      <TabsContent value="sessions">
        <SessionsTab />
      </TabsContent>
      
      {/* Notifications */}
      <TabsContent value="notifications">
        <NotificationsTab language={language} />
      </TabsContent>
    </Tabs>
  );
};
