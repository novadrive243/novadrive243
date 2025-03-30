
import React from 'react';
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
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
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
}

export const AdminTabs = ({ 
  activeTab,
  bookings, 
  vehicles, 
  profiles, 
  language, 
  formatDate, 
  formatCurrency,
  getVehicleDailyPrice,
  isLoading,
  monthlyRevenue = 0,
  refreshData
}: AdminTabsProps) => {
  return (
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshData}
          className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Actualiser' : 'Refresh'}
        </Button>
      </div>
      
      {/* Content based on active tab */}
      <div className="mt-4">
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
    </div>
  );
};
