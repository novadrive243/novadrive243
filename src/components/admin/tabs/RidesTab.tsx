
import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RidesHistory } from '@/components/admin/RidesHistory';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const RidesTab = () => {
  const { t, language } = useLanguage();
  
  // Function to force refresh data
  const forceRefresh = useCallback(async () => {
    try {
      toast.loading(language === 'fr' ? 'Rafraîchissement des données...' : 'Refreshing data...');
      
      // Fetch bookings to check if any status needs to be updated
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*');
      
      if (bookingsError) throw bookingsError;
      
      // Get current date without time
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let updated = false;
      
      // Update booking statuses based on dates
      for (const booking of bookings || []) {
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        
        // Update booking status if needed
        if (startDate <= today && endDate >= today && booking.status === 'pending') {
          // Update to active
          await supabase
            .from('bookings')
            .update({ status: 'active' })
            .eq('id', booking.id);
          updated = true;
        } else if (endDate < today && booking.status === 'active') {
          // Update to completed
          await supabase
            .from('bookings')
            .update({ status: 'completed' })
            .eq('id', booking.id);
          updated = true;
        }
      }
      
      // Update vehicle availability based on current bookings
      const { data: vehicles } = await supabase.from('vehicles').select('*');
      
      if (vehicles) {
        for (const vehicle of vehicles) {
          const { data: activeBookings } = await supabase
            .from('bookings')
            .select('*')
            .eq('vehicle_id', vehicle.id)
            .or(`status.eq.pending,status.eq.active`)
            .lte('start_date', today.toISOString().split('T')[0])
            .gte('end_date', today.toISOString().split('T')[0]);
          
          const shouldBeAvailable = !(activeBookings && activeBookings.length > 0);
          
          if (shouldBeAvailable !== vehicle.available) {
            await supabase
              .from('vehicles')
              .update({ available: shouldBeAvailable })
              .eq('id', vehicle.id);
            updated = true;
          }
        }
      }
      
      toast.dismiss();
      if (updated) {
        toast.success(
          language === 'fr' ? 'Données mises à jour' : 'Data updated', 
          { description: language === 'fr' ? 'Les statuts ont été mis à jour' : 'Statuses have been updated' }
        );
      } else {
        toast.success(
          language === 'fr' ? 'Aucune mise à jour nécessaire' : 'No updates needed',
          { description: language === 'fr' ? 'Tout est déjà à jour' : 'Everything is already up to date' }
        );
      }
      
      // Force refresh the rides history component
      window.dispatchEvent(new CustomEvent('refetch-rides'));
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.dismiss();
      toast.error(
        language === 'fr' ? 'Erreur' : 'Error',
        { description: language === 'fr' ? 'Impossible de rafraîchir les données' : 'Unable to refresh data' }
      );
    }
  }, [language]);
  
  return (
    <Card className="shadow-md bg-nova-black border-nova-gold/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-nova-white">{t('account.reservationHistory')}</CardTitle>
          <CardDescription className="text-nova-white/70">
            {t('account.viewReservations')}
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
          onClick={forceRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Synchroniser' : 'Sync'}
        </Button>
      </CardHeader>
      <CardContent>
        <RidesHistory />
      </CardContent>
    </Card>
  );
};
