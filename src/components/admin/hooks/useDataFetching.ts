
import { supabase } from '@/integrations/supabase/client';
import { vehicles as frontendVehicles } from '@/data/vehicles';
import { updateVehicleAvailabilityFromBookings } from './useVehicleAvailability';
import { Toast } from '@/components/ui/toast';

export const fetchAdminData = async (language: string, toast: any) => {
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
    
    // Calculate monthly revenue from actual bookings
    const totalRevenue = formattedBookings.reduce((sum, booking) => sum + Number(booking.total_price), 0);
    
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
    
    if (formattedBookings.length > 0 || mappedVehicles.length > 0 || (profilesData && profilesData.length > 0)) {
      toast({
        title: language === 'fr' ? "Données mises à jour" : "Data Refreshed",
        description: language === 'fr' 
          ? "Les données ont été mises à jour avec succès" 
          : "The data has been successfully refreshed"
      });
    }
    
    return {
      bookings: formattedBookings,
      vehicles: mappedVehicles,
      profiles: profilesData || [],
      monthlyRevenue: totalRevenue,
      availableVehicles: mappedVehicles.filter(v => v.available).length
    };
    
  } catch (error) {
    console.error('Error fetching data:', error);
    toast({
      variant: "destructive",
      title: language === 'fr' ? "Erreur de chargement" : "Loading Error",
      description: language === 'fr' 
        ? "Impossible de charger les données" 
        : "Failed to load data"
    });
    
    return {
      bookings: [],
      vehicles: [],
      profiles: [],
      monthlyRevenue: 0,
      availableVehicles: 0
    };
  }
};
