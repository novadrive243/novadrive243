
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseSubscription = (isAuthorized: boolean, refreshFn: () => void) => {
  useEffect(() => {
    if (!isAuthorized) return;
    
    // Set up real-time subscriptions
    const bookingsChannel = supabase
      .channel('public:bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings' }, 
        () => {
          console.log('Bookings changed, refreshing data');
          refreshFn();
        }
      )
      .subscribe();
      
    const vehiclesChannel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vehicles' }, 
        () => {
          console.log('Vehicles changed, refreshing data');
          refreshFn();
        }
      )
      .subscribe();
      
    const profilesChannel = supabase
      .channel('public:profiles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' }, 
        () => {
          console.log('Profiles changed, refreshing data');
          refreshFn();
        }
      )
      .subscribe();
    
    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(vehiclesChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, [isAuthorized, refreshFn]);
};
