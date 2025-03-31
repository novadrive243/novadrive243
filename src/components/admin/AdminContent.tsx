
import React from 'react';
import { Dashboard } from '@/components/admin/Dashboard';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { LoadingState } from '@/components/admin/LoadingState';

interface AdminContentProps {
  isLoading: boolean;
  bookings: any[];
  vehicles: any[];
  profiles: any[];
  monthlyRevenue: number;
  availableVehicles: number;
  percentChange: {
    revenue: number;
    bookings: number;
    customers: number;
    vehicles: number;
  };
  language: string;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  getVehicleDailyPrice: (vehicleName: string) => number;
  activeTab: string;
  setActiveTab: (value: string) => void;
  refreshData: () => void;
}

export const AdminContent = ({
  isLoading,
  bookings,
  vehicles,
  profiles,
  monthlyRevenue,
  availableVehicles,
  percentChange,
  language,
  formatCurrency,
  formatDate,
  getVehicleDailyPrice,
  activeTab,
  setActiveTab,
  refreshData
}: AdminContentProps) => {
  return (
    <div className="container mx-auto">
      {isLoading ? (
        <LoadingState language={language} />
      ) : (
        <>
          <Dashboard 
            bookings={bookings}
            vehicles={vehicles}
            profiles={profiles}
            monthlyRevenue={monthlyRevenue}
            availableVehicles={availableVehicles}
            percentChange={percentChange}
            language={language}
            formatCurrency={formatCurrency}
          />
          
          <AdminTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bookings={bookings}
            vehicles={vehicles}
            profiles={profiles}
            language={language}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            getVehicleDailyPrice={getVehicleDailyPrice}
            isLoading={isLoading}
            monthlyRevenue={monthlyRevenue}
            refreshData={refreshData}
          />
        </>
      )}
    </div>
  );
};
