
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { RefreshCw, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/admin/LoadingState';
import { useLanguage } from '@/contexts/language-context';

type Ride = {
  id: string;
  start_location: string;
  end_location: string;
  start_time: string;
  end_time: string;
  price: number;
  status: 'completed' | 'scheduled' | 'cancelled';
  driver_id: string;
  user_id: string;
};

export const RidesHistory = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRideId, setExpandedRideId] = useState<string | null>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    setLoading(true);
    try {
      // Using completed_rides instead of rides which doesn't exist
      const { data, error } = await supabase
        .from('completed_rides')
        .select('*')
        .order('start_time', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching rides:', error);
        return;
      }

      // Type assertion to properly map the data
      setRides(data as unknown as Ride[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRideDetails = (rideId: string) => {
    setExpandedRideId(expandedRideId === rideId ? null : rideId);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{t('account.reservationHistory')}</CardTitle>
        <Button variant="ghost" onClick={fetchRides} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {language === 'fr' ? 'Actualiser' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <LoadingState language={language} />
        ) : (
          <div className="space-y-3">
            {rides.length === 0 ? (
              <p className="text-center py-4 text-gray-500">
                {language === 'fr' ? 'Aucune course complétée trouvée' : 'No completed rides found'}
              </p>
            ) : (
              rides.map((ride) => (
                <div key={ride.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {ride.start_location} {language === 'fr' ? 'à' : 'to'} {ride.end_location}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(ride.start_time).toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        {language === 'fr' 
                          ? ride.status === 'completed' ? 'complétée' 
                            : ride.status === 'scheduled' ? 'programmée' : 'annulée'
                          : ride.status}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleRideDetails(ride.id)}>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {expandedRideId === ride.id && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-xs">{language === 'fr' ? 'Prix' : 'Price'}: ${ride.price}</p>
                      <p className="text-xs">{language === 'fr' ? 'ID du chauffeur' : 'Driver ID'}: {ride.driver_id}</p>
                      <p className="text-xs">{language === 'fr' ? 'ID du client' : 'User ID'}: {ride.user_id}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
