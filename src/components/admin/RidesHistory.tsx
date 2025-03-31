
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Refresh, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type SortField = 'start_time' | 'end_time' | 'fare' | 'rating';
type SortDirection = 'asc' | 'desc';

export const RidesHistory = ({ 
  language,
  formatCurrency
}: { 
  language: string;
  formatCurrency: (amount: number) => string;
}) => {
  const [rides, setRides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('start_time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { toast } = useToast();

  // Function to fetch rides data
  const fetchRides = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('completed_rides')
        .select(`
          *,
          users:user_id (email),
          drivers:driver_id (name),
          vehicles:vehicle_id (name)
        `)
        .order(sortField, { ascending: sortDirection === 'asc' });

      if (error) throw error;
      
      setRides(data || []);
    } catch (error: any) {
      console.error('Error fetching rides:', error);
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to real-time changes
  useEffect(() => {
    fetchRides();

    // Set up the subscription
    const subscription = supabase
      .channel('completed_rides_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'completed_rides' 
      }, () => {
        fetchRides();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sortField, sortDirection]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" /> 
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-nova-black border border-nova-gold/30 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-nova-gold">
          {language === 'fr' ? 'Historique des Courses' : 'Rides History'}
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchRides}
          className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          disabled={isLoading}
        >
          <Refresh className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {language === 'fr' ? 'Actualiser' : 'Refresh'}
        </Button>
      </div>

      <ScrollArea className="h-[500px] rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-nova-gold uppercase border-b border-nova-gold/30">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">
                  <button 
                    className="flex items-center text-nova-gold"
                    onClick={() => handleSort('start_time')}
                  >
                    {language === 'fr' ? 'Début' : 'Start Time'}
                    {getSortIcon('start_time')}
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button 
                    className="flex items-center text-nova-gold"
                    onClick={() => handleSort('end_time')}
                  >
                    {language === 'fr' ? 'Fin' : 'End Time'}
                    {getSortIcon('end_time')}
                  </button>
                </th>
                <th className="px-4 py-3">{language === 'fr' ? 'Client' : 'Customer'}</th>
                <th className="px-4 py-3">{language === 'fr' ? 'Chauffeur' : 'Driver'}</th>
                <th className="px-4 py-3">{language === 'fr' ? 'Véhicule' : 'Vehicle'}</th>
                <th className="px-4 py-3">
                  <button 
                    className="flex items-center text-nova-gold"
                    onClick={() => handleSort('fare')}
                  >
                    {language === 'fr' ? 'Prix' : 'Fare'}
                    {getSortIcon('fare')}
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button 
                    className="flex items-center text-nova-gold"
                    onClick={() => handleSort('rating')}
                  >
                    {language === 'fr' ? 'Évaluation' : 'Rating'}
                    {getSortIcon('rating')}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-5 text-center">
                    <div className="flex justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-nova-gold"></div>
                    </div>
                  </td>
                </tr>
              ) : rides.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-5 text-center text-nova-white/50">
                    {language === 'fr' ? 'Aucune course trouvée' : 'No rides found'}
                  </td>
                </tr>
              ) : (
                rides.map((ride) => (
                  <tr key={ride.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                    <td className="px-4 py-3 text-xs opacity-50">{ride.id.substring(0, 8)}...</td>
                    <td className="px-4 py-3">{formatDateTime(ride.start_time)}</td>
                    <td className="px-4 py-3">{formatDateTime(ride.end_time)}</td>
                    <td className="px-4 py-3">{ride.users?.email || '—'}</td>
                    <td className="px-4 py-3">{ride.drivers?.name || '—'}</td>
                    <td className="px-4 py-3">{ride.vehicles?.name || '—'}</td>
                    <td className="px-4 py-3">{formatCurrency(ride.fare || 0)}</td>
                    <td className="px-4 py-3">
                      {ride.rating ? (
                        <div className="flex items-center">
                          <span className="text-nova-gold">★</span>
                          <span className="ml-1">{ride.rating}/5</span>
                        </div>
                      ) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
};
