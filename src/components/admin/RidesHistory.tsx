
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { RefreshCw, ChevronDown, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/admin/LoadingState';
import { useLanguage } from '@/contexts/language-context';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

type Ride = {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  vehicle_id: string;
  user_id: string;
  vehicle?: { name: string };
  profiles?: { full_name: string };
};

export const RidesHistory = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRideId, setExpandedRideId] = useState<string | null>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    fetchRides();
    
    // Listen for refetch events from parent components
    const handleRefetch = () => {
      console.log("Refetching rides from event");
      fetchRides();
    };
    
    window.addEventListener('refetch-rides', handleRefetch);
    
    return () => {
      window.removeEventListener('refetch-rides', handleRefetch);
    };
  }, []);

  const fetchRides = async () => {
    setLoading(true);
    try {
      // Utiliser la table bookings au lieu de completed_rides
      const { data, error } = await supabase
        .from('bookings')
        .select('*, vehicles(name), profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching rides:', error);
        toast.error(language === 'fr' ? 'Erreur lors du chargement des réservations' : 'Error loading rides');
        return;
      }

      console.log('Fetched rides data:', data);
      
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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'active':
        return 'bg-green-500/20 text-green-500';
      case 'completed':
        return 'bg-blue-500/20 text-blue-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    if (language === 'fr') {
      switch (status) {
        case 'pending': return 'en attente';
        case 'active': return 'active';
        case 'completed': return 'terminée';
        case 'cancelled': return 'annulée';
        default: return status;
      }
    }
    return status;
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
              <Alert variant="info">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>
                  {language === 'fr' ? 'Aucune réservation trouvée' : 'No rides found'}
                </AlertTitle>
                <AlertDescription>
                  {language === 'fr' 
                    ? 'Utilisez le bouton "Ajouter" dans l\'onglet réservations pour créer une nouvelle réservation.' 
                    : 'Use the "Add" button in the bookings tab to create a new booking.'}
                </AlertDescription>
              </Alert>
            ) : (
              rides.map((ride) => (
                <div key={ride.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {ride.vehicle?.name || (language === 'fr' ? 'Véhicule inconnu' : 'Unknown vehicle')}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {language === 'fr' ? 'Client: ' : 'Client: '}
                        {ride.profiles?.full_name || (language === 'fr' ? 'Client test' : 'Test client')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(ride.start_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                        {' - '}
                        {new Date(ride.end_date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusBadgeColor(ride.status)}>
                        {getStatusText(ride.status)}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleRideDetails(ride.id)}>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {expandedRideId === ride.id && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-xs">{language === 'fr' ? 'Prix' : 'Price'}: ${ride.total_price}</p>
                      <p className="text-xs">{language === 'fr' ? 'ID du véhicule' : 'Vehicle ID'}: {ride.vehicle_id}</p>
                      <p className="text-xs">{language === 'fr' ? 'ID du client' : 'User ID'}: {ride.user_id || (language === 'fr' ? '(Client test)' : '(Test client)')}</p>
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
