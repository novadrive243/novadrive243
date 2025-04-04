
import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RidesHistory } from '@/components/admin/RidesHistory';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { forceRefreshVehicleAvailability } from '@/components/admin/hooks/useVehicleAvailability';
import { toast } from 'sonner';

export const RidesTab = () => {
  const { t, language } = useLanguage();
  
  // Function to force refresh data
  const forceRefresh = useCallback(async () => {
    try {
      toast.loading(language === 'fr' ? 'Rafraîchissement des données...' : 'Refreshing data...');
      
      // Update vehicle availability based on bookings using the imported function
      await forceRefreshVehicleAvailability(language);
      
      // Force refresh the rides history component
      window.dispatchEvent(new CustomEvent('refetch-rides'));
      
      toast.dismiss();
      
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
