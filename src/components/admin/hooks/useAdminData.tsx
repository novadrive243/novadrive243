
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminData } from './useDataFetching';
import { useSupabaseSubscription } from './useSupabaseSubscription';

export const useAdminData = (isAuthorized: boolean, language: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    
    const data = await fetchAdminData(language, toast);
    
    setBookings(data.bookings);
    setVehicles(data.vehicles);
    setProfiles(data.profiles);
    setMonthlyRevenue(data.monthlyRevenue);
    
    setIsLoading(false);
  }, [language, toast]);
  
  // Manual refresh function to be used by buttons
  const refreshData = () => {
    fetchData();
  };
  
  // Set up Supabase real-time subscriptions
  useSupabaseSubscription(isAuthorized, fetchData);
  
  // Initial data fetch
  useEffect(() => {
    if (!isAuthorized) return;
    fetchData();
  }, [isAuthorized, fetchData]);
  
  return {
    isLoading,
    bookings,
    vehicles,
    profiles,
    monthlyRevenue,
    availableVehicles: vehicles.filter(v => v.available).length,
    percentChange: {
      revenue: 0,
      bookings: 0,
      customers: 0,
      vehicles: 0
    },
    refreshData
  };
};
