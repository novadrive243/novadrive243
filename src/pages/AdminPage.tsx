import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/language-context";
import { Button } from '@/components/ui/button';
import { vehicles as frontendVehicles } from '@/data/vehicles';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Menu } from 'lucide-react';

// Admin Components
import { Dashboard } from '@/components/admin/Dashboard';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { LoadingState } from '@/components/admin/LoadingState';
import { useAdminData } from '@/components/admin/useAdminData';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const AdminPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bookings");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  // Load admin data with the custom hook
  const { 
    isLoading, 
    bookings, 
    vehicles, 
    profiles, 
    monthlyRevenue,
    availableVehicles,
    percentChange,
    refreshData
  } = useAdminData(isAuthorized, language);
  
  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      // Redirect to login page if not authenticated as admin
      navigate('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);
  
  // Function to toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Function to toggle sidebar visibility
  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: language === 'fr' ? 'Déconnexion réussie' : 'Logout Successful',
      description: language === 'fr' ? 'Vous avez été déconnecté' : 'You have been logged out',
    });
    navigate('/login');
  };
  
  if (!isAuthorized) {
    return null; // Don't render anything while checking authorization
  }

  // Helper functions for formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getVehicleDailyPrice = (vehicleName: string) => {
    const frontendVehicle = frontendVehicles.find(v => v.name === vehicleName);
    return frontendVehicle ? frontendVehicle.price.daily : 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-nova-black text-nova-white">
      <Header />
      
      <div className="flex-grow pt-20 pb-0">
        {/* Sidebar */}
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          language={language}
          collapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          visible={sidebarVisible}
        />
        
        {/* Sidebar toggle button - positioned slightly higher and to the right */}
        <button
          onClick={toggleSidebarVisibility}
          className="fixed z-30 left-4 top-32 p-2 bg-nova-gold/80 text-nova-black hover:bg-nova-gold rounded-md shadow-md"
          aria-label={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
        >
          <Menu size={20} />
        </button>
        
        {/* Main content */}
        <div className="transition-all duration-300 px-6 pb-16">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6 mt-4">
              <h1 className="text-xl sm:text-2xl font-bold gold-gradient-text">
                {language === 'fr' ? 'Tableau de Bord Admin' : 'Admin Dashboard'}
              </h1>
              <Button 
                variant="outline" 
                className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Déconnexion' : 'Logout'}
              </Button>
            </div>
            
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
