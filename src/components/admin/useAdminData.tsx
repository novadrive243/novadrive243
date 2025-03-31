
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { vehicles as frontendVehicles } from '@/data/vehicles';

export const useAdminData = (isAuthorized: boolean, language: string) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // Function to update vehicle availability based on bookings
  const updateVehicleAvailabilityFromBookings = async (fetchedBookings: any[], fetchedVehicles: any[]) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Create a map of vehicle IDs to their current availability status
      const vehicleAvailabilityMap = new Map();
      fetchedVehicles.forEach(vehicle => {
        vehicleAvailabilityMap.set(vehicle.id, true); // Default to available
      });
      
      // Mark vehicles as unavailable if they have active bookings
      for (const booking of fetchedBookings) {
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        
        // Check if booking is current (today falls between start and end dates)
        if (startDate <= today && endDate >= today && booking.status !== 'cancelled') {
          vehicleAvailabilityMap.set(booking.vehicle_id, false);
          
          // Update booking status to 'active' if it's currently 'pending'
          if (booking.status === 'pending') {
            await supabase
              .from('bookings')
              .update({ status: 'active' })
              .eq('id', booking.id);
          }
        }
        
        // Mark bookings as 'completed' if end date has passed
        if (endDate < today && booking.status === 'active') {
          await supabase
            .from('bookings')
            .update({ status: 'completed' })
            .eq('id', booking.id);
        }
      }
      
      // Update vehicle availability in the database
      for (const [vehicleId, isAvailable] of vehicleAvailabilityMap.entries()) {
        const vehicle = fetchedVehicles.find(v => v.id === vehicleId);
        
        // Only update if the availability status has changed
        if (vehicle && vehicle.available !== isAvailable) {
          await supabase
            .from('vehicles')
            .update({ available: isAvailable })
            .eq('id', vehicleId);
        }
      }
    } catch (error) {
      console.error('Error updating vehicle availability:', error);
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch bookings with user and vehicle info
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles(full_name),
          vehicles(name)
        `)
        .order('created_at', { ascending: false });
      
      if (bookingsError) throw bookingsError;
      
      // Format bookings data
      const formattedBookings = bookingsData ? bookingsData.map(booking => ({
        ...booking,
        user: booking.profiles,
        vehicle: booking.vehicles
      })) : [];
      
      setBookings(formattedBookings);
      
      // Calculate monthly revenue from actual bookings
      const totalRevenue = formattedBookings.reduce((sum, booking) => sum + Number(booking.total_price), 0);
      setMonthlyRevenue(totalRevenue);
      
      // Fetch vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('name', { ascending: true });
      
      if (vehiclesError) throw vehiclesError;
      
      // Match Supabase vehicles with frontend vehicles for consistency
      const mappedVehicles = vehiclesData ? vehiclesData.map(dbVehicle => {
        // Find matching frontend vehicle for additional data
        const frontendMatch = frontendVehicles.find(v => v.name === dbVehicle.name);
        
        return {
          ...dbVehicle,
          // Use frontend image if database image_url is not available
          image_url: dbVehicle.image_url || (frontendMatch ? frontendMatch.image : ''),
          // Ensure we have category data
          category: dbVehicle.category || 'SUV'
        };
      }) : [];
      
      setVehicles(mappedVehicles);
      
      // Update vehicle availability based on current bookings
      if (mappedVehicles.length > 0 && formattedBookings.length > 0) {
        await updateVehicleAvailabilityFromBookings(formattedBookings, mappedVehicles);
      }
      
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      setProfiles(profilesData || []);
      
      if (formattedBookings.length > 0 || mappedVehicles.length > 0 || (profilesData && profilesData.length > 0)) {
        toast({
          title: language === 'fr' ? "Données mises à jour" : "Data Refreshed",
          description: language === 'fr' 
            ? "Les données ont été mises à jour avec succès" 
            : "The data has been successfully refreshed"
        });
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur de chargement" : "Loading Error",
        description: language === 'fr' 
          ? "Impossible de charger les données" 
          : "Failed to load data"
      });
    } finally {
      setIsLoading(false);
    }
  }, [language, toast]);
  
  // Manual refresh function to be used by buttons
  const refreshData = () => {
    fetchData();
  };
  
  useEffect(() => {
    if (!isAuthorized) return;
    
    fetchData();
    
    // Set up real-time subscriptions
    const bookingsChannel = supabase
      .channel('public:bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' }, 
        () => {
          console.log('Bookings changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
      
    const vehiclesChannel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vehicles' }, 
        () => {
          console.log('Vehicles changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
      
    const profilesChannel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        () => {
          console.log('Profiles changed, refreshing data');
          fetchData();
        }
      )
      .subscribe();
    
    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(vehiclesChannel);
      supabase.removeChannel(profilesChannel);
    };
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
