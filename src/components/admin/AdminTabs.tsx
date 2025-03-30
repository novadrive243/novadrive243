
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
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
  refreshData: () => void;
  activeTab: string;
}

// Updated component to work with sidebar navigation
export const AdminTabs = ({ 
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatDate, 
  formatCurrency,
  getVehicleDailyPrice,
  isLoading,
  monthlyRevenue = 0,
  refreshData,
  activeTab
}: AdminTabsProps) => {
  return (
    <div className="mt-8">
      {/* Tab Content */}
      {activeTab === "bookings" && (
        <BookingsTable 
          bookings={bookings} 
          language={language} 
          formatDate={formatDate} 
          formatCurrency={formatCurrency} 
        />
      )}
      
      {activeTab === "vehicles" && (
        <InventoryManager
          vehicles={vehicles}
          language={language}
          formatCurrency={formatCurrency}
        />
      )}
      
      {activeTab === "calendar" && (
        <VehicleCalendar 
          vehicles={vehicles}
          bookings={bookings}
          language={language}
          isLoading={isLoading}
        />
      )}
      
      {activeTab === "customers" && (
        <CustomersTable 
          profiles={profiles} 
          language={language} 
          formatDate={formatDate}
        />
      )}
      
      {activeTab === "analytics" && (
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
      )}
      
      {activeTab === "maintenance" && (
        <MaintenanceTracking 
          vehicles={vehicles}
          language={language}
          formatDate={formatDate}
        />
      )}
      
      {activeTab === "staff" && (
        <StaffManagement 
          language={language}
          formatDate={formatDate}
        />
      )}
      
      {activeTab === "promotions" && (
        <PromotionManager 
          language={language}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};
