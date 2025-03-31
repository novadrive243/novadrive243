
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dashboard } from '@/components/admin/Dashboard';
import { VehiclesTable } from '@/components/admin/VehiclesTable';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { CustomersTable } from '@/components/admin/CustomersTable';
import { StaffManagement } from '@/components/admin/StaffManagement';
import { AdvancedAnalytics } from '@/components/admin/AdvancedAnalytics';
import { AdminAIAssistant } from '@/components/admin/AdminAIAssistant';
import { InventoryManager } from '@/components/admin/InventoryManager';
import { MaintenanceTracking } from '@/components/admin/MaintenanceTracking';
import { VehicleCalendar } from '@/components/admin/VehicleCalendar';
import { VehicleRatings } from '@/components/admin/VehicleRatings';
import { RidesHistory } from '@/components/admin/RidesHistory';
import { SessionsTracker } from '@/components/admin/SessionsTracker';
import { useLanguage } from '@/contexts/language-context';

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

  return (
    <Tabs defaultValue="dashboard" value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="ratings">Ratings</TabsTrigger>
        <TabsTrigger value="rides">Rides</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      
      {/* Dashboard */}
      <TabsContent value="dashboard">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Overview of all NovaDrive operations</CardDescription>
          </CardHeader>
          <CardContent>
            <Dashboard 
              bookings={bookings}
              vehicles={vehicles}
              profiles={profiles}
              monthlyRevenue={monthlyRevenue}
              availableVehicles={vehicles.filter(v => v.available).length}
              percentChange={{
                revenue: 12.5,
                bookings: 8.2,
                customers: 5.1,
                vehicles: -2.3
              }}
              language={language}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Vehicles */}
      <TabsContent value="vehicles">
        <Card>
          <CardHeader>
            <CardTitle>Vehicles</CardTitle>
            <CardDescription>Manage your fleet of vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <VehiclesTable 
              vehicles={vehicles} 
              language={language} 
              formatCurrency={formatCurrency} 
              getVehicleDailyPrice={getVehicleDailyPrice}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Bookings */}
      <TabsContent value="bookings">
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Manage customer bookings and reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingsTable 
              bookings={bookings}
              language={language}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Customers */}
      <TabsContent value="customers">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Manage customer accounts and information</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomersTable 
              profiles={profiles}
              language={language}
              formatDate={formatDate}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Staff */}
      <TabsContent value="staff">
        <Card>
          <CardHeader>
            <CardTitle>Staff Management</CardTitle>
            <CardDescription>Manage employees and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <StaffManagement 
              language={language}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Analytics */}
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>Detailed business analytics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <AdvancedAnalytics 
              bookings={bookings}
              vehicles={vehicles}
              profiles={profiles}
              language={language}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* AI Assistant */}
      <TabsContent value="ai-assistant">
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Get help with administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAIAssistant
              language={language}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Inventory */}
      <TabsContent value="inventory">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Manage parts and supplies inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryManager
              vehicles={vehicles}
              language={language}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Maintenance */}
      <TabsContent value="maintenance">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Tracking</CardTitle>
            <CardDescription>Track vehicle maintenance and service history</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceTracking
              vehicles={vehicles}
              language={language}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Calendar */}
      <TabsContent value="calendar">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Calendar</CardTitle>
            <CardDescription>View and manage vehicle availability</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleCalendar
              vehicles={vehicles}
              bookings={bookings}
              language={language}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Ratings */}
      <TabsContent value="ratings">
        <Card>
          <CardHeader>
            <CardTitle>Ratings & Reviews</CardTitle>
            <CardDescription>View customer ratings and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleRatings
              language={language}
              formatDate={formatDate}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Rides */}
      <TabsContent value="rides">
        <Card>
          <CardHeader>
            <CardTitle>Rides History</CardTitle>
            <CardDescription>View completed ride history</CardDescription>
          </CardHeader>
          <CardContent>
            <RidesHistory />
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Sessions */}
      <TabsContent value="sessions">
        <Card>
          <CardHeader>
            <CardTitle>User Sessions</CardTitle>
            <CardDescription>Track user login activity</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionsTracker />
          </CardContent>
          <CardFooter className="text-xs text-gray-500">
            Data is refreshed automatically every 5 minutes
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
