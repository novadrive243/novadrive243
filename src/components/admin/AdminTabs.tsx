
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
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Users2, 
  Tag,
  ListTodo
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
}

// Updated component to show tabs in a responsive way
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
  refreshData
}: AdminTabsProps) => {
  const [activeTab, setActiveTab] = React.useState("bookings");

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        {/* On small screens, show a menu button that opens tabs in a sheet */}
        <div className="sm:hidden w-full flex justify-between items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10">
                {language === 'fr' ? 'Menu' : 'Menu'}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-nova-black border-nova-gold/20 text-nova-white">
              <nav className="flex flex-col gap-2 mt-6">
                {/* Mobile Tab Navigation */}
                <Button 
                  variant={activeTab === "bookings" ? "default" : "ghost"} 
                  className={activeTab === "bookings" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("bookings")}
                >
                  <ListTodo className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Réservations' : 'Bookings'}
                </Button>
                
                <Button 
                  variant={activeTab === "vehicles" ? "default" : "ghost"} 
                  className={activeTab === "vehicles" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("vehicles")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Véhicules' : 'Vehicles'}
                </Button>
                
                <Button 
                  variant={activeTab === "calendar" ? "default" : "ghost"} 
                  className={activeTab === "calendar" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("calendar")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Calendrier' : 'Calendar'}
                </Button>
                
                <Button 
                  variant={activeTab === "customers" ? "default" : "ghost"} 
                  className={activeTab === "customers" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("customers")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Clients' : 'Customers'}
                </Button>
                
                <Button 
                  variant={activeTab === "analytics" ? "default" : "ghost"} 
                  className={activeTab === "analytics" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("analytics")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Analyses' : 'Analytics'}
                </Button>
                
                <Button 
                  variant={activeTab === "maintenance" ? "default" : "ghost"} 
                  className={activeTab === "maintenance" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("maintenance")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Maintenance' : 'Maintenance'}
                </Button>
                
                <Button 
                  variant={activeTab === "staff" ? "default" : "ghost"} 
                  className={activeTab === "staff" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("staff")}
                >
                  <Users2 className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Personnel' : 'Staff'}
                </Button>
                
                <Button 
                  variant={activeTab === "promotions" ? "default" : "ghost"} 
                  className={activeTab === "promotions" ? "bg-nova-gold text-nova-black" : "hover:bg-nova-gold/10 text-nova-white"}
                  onClick={() => handleTabChange("promotions")}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Promotions' : 'Promotions'}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Current Tab Label on mobile */}
          <div className="font-medium text-nova-gold">
            {activeTab === "bookings" && (language === 'fr' ? 'Réservations' : 'Bookings')}
            {activeTab === "vehicles" && (language === 'fr' ? 'Véhicules' : 'Vehicles')}
            {activeTab === "calendar" && (language === 'fr' ? 'Calendrier' : 'Calendar')}
            {activeTab === "customers" && (language === 'fr' ? 'Clients' : 'Customers')}
            {activeTab === "analytics" && (language === 'fr' ? 'Analyses' : 'Analytics')}
            {activeTab === "maintenance" && (language === 'fr' ? 'Maintenance' : 'Maintenance')}
            {activeTab === "staff" && (language === 'fr' ? 'Personnel' : 'Staff')}
            {activeTab === "promotions" && (language === 'fr' ? 'Promotions' : 'Promotions')}
          </div>
          
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
        
        {/* Desktop Tabs List */}
        <TabsList className="hidden sm:grid sm:grid-cols-4 md:grid-cols-8 bg-nova-gray/30 text-nova-white">
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
        
        {/* Desktop Refresh Button */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshData}
          className="hidden sm:flex border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Actualiser' : 'Refresh'}
        </Button>
      </div>
      
      {/* Tab Content */}
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
