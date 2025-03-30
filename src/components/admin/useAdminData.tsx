
import { useState, useEffect } from 'react';
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

  const fetchData = async () => {
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
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (bookingsError) throw bookingsError;
      
      // Format bookings data
      const formattedBookings = bookingsData.map(booking => ({
        ...booking,
        user: booking.profiles,
        vehicle: booking.vehicles
      }));
      
      setBookings(formattedBookings);
      
      // Calculate monthly revenue
      const totalRevenue = bookingsData.reduce((sum, booking) => sum + Number(booking.total_price), 0);
      setMonthlyRevenue(totalRevenue);
      
      // Fetch vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('name', { ascending: true });
      
      if (vehiclesError) throw vehiclesError;
      
      // Match Supabase vehicles with frontend vehicles for consistency
      const mappedVehicles = vehiclesData.map(dbVehicle => {
        // Find matching frontend vehicle for additional data
        const frontendMatch = frontendVehicles.find(v => v.name === dbVehicle.name);
        
        return {
          ...dbVehicle,
          // Use frontend image if database image_url is not available
          image_url: dbVehicle.image_url || (frontendMatch ? frontendMatch.image : ''),
          // Ensure we have category data
          category: dbVehicle.category || 'SUV'
        };
      });
      
      setVehicles(mappedVehicles);
      
      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      setProfiles(profilesData);
      
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
  }, [isAuthorized]);
  
  return {
    isLoading,
    bookings,
    vehicles,
    profiles,
    monthlyRevenue,
    availableVehicles: vehicles.filter(v => v.available).length,
    percentChange: {
      revenue: 12.5,
      bookings: 8.2,
      customers: 5.1,
      vehicles: -2.3
    }
  };
};
