
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/contexts/language-context";
import { vehicles as frontendVehicles } from '@/data/vehicles';
import { Menu } from 'lucide-react';

// Admin Components
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminContent } from '@/components/admin/AdminContent';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAdminData } from '@/components/admin/useAdminData';
import { useAdminFormat } from '@/hooks/use-admin-format';

const AdminPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAuthorized, setIsAuthorized] = useState(false);
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

  // Get formatting functions
  const { formatCurrency, formatDate } = useAdminFormat();
  
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

  const getVehicleDailyPrice = (vehicleName: string) => {
    const frontendVehicle = frontendVehicles.find(v => v.name === vehicleName);
    return frontendVehicle ? frontendVehicle.price.daily : 0;
  };
  
  if (!isAuthorized) {
    return null; // Don't render anything while checking authorization
  }

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
        
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebarVisibility}
          className="fixed z-30 left-4 top-32 p-2 bg-nova-gold/80 text-nova-black hover:bg-nova-gold rounded-md shadow-md"
          aria-label={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
        >
          <Menu size={20} />
        </button>
        
        {/* Main content */}
        <div className="transition-all duration-300 px-6 pb-16">
          <AdminHeader language={language} />
          
          <AdminContent
            isLoading={isLoading}
            bookings={bookings}
            vehicles={vehicles}
            profiles={profiles}
            monthlyRevenue={monthlyRevenue}
            availableVehicles={availableVehicles}
            percentChange={percentChange}
            language={language}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            getVehicleDailyPrice={getVehicleDailyPrice}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            refreshData={refreshData}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
