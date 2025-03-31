
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Star } from 'lucide-react';

interface CompletedRide {
  id: string;
  booking_id: string | null;
  user_id: string | null;
  driver_id: string | null;
  vehicle_id: string | null;
  start_location: string | null;
  end_location: string | null;
  start_time: string;
  end_time: string;
  distance: number | null;
  fare: number;
  payment_method: string | null;
  status: string | null;
  rating: number | null;
  feedback: string | null;
  created_at: string;
  driver_name?: string;
  vehicle_name?: string;
  user_name?: string;
}

export const RidesHistory = ({ 
  language, 
  formatCurrency 
}: { 
  language: string;
  formatCurrency: (amount: number) => string;
}) => {
  const [rides, setRides] = useState<CompletedRide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      setIsLoading(true);
      try {
        // Fetch completed rides with joined data
        const { data, error } = await supabase
          .from('completed_rides')
          .select(`
            *,
            drivers:driver_id (name),
            vehicles:vehicle_id (name),
            profiles:user_id (full_name)
          `)
          .order('end_time', { ascending: false })
          .limit(50);

        if (error) throw error;
        
        // Transform the data to include the joined fields
        const transformedData = data?.map(ride => ({
          ...ride,
          driver_name: ride.drivers?.name,
          vehicle_name: ride.vehicles?.name,
          user_name: ride.profiles?.full_name
        })) || [];
        
        setRides(transformedData);
      } catch (error) {
        console.error('Error fetching rides:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRides();
    
    // Set up real-time subscription for new rides
    const channel = supabase
      .channel('rides-changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'completed_rides' 
      }, (payload) => {
        // When a new ride is added, refetch to get the joined data
        fetchRides();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, language === 'fr' ? 'dd MMM yyyy HH:mm' : 'MMM dd, yyyy HH:mm', {
        locale: language === 'fr' ? fr : enUS
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const renderRating = (rating: number | null) => {
    if (!rating) return 'N/A';
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-nova-gold">
        {language === 'fr' ? 'Historique des Courses' : 'Ride History'}
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nova-gold"></div>
        </div>
      ) : (
        <div className="border border-nova-gold/20 rounded-lg overflow-hidden">
          <Table>
            <TableCaption>
              {language === 'fr' 
                ? 'Historique des courses récentes' 
                : 'Recent ride history'}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-nova-gold/10">
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Client' : 'Customer'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Chauffeur' : 'Driver'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Véhicule' : 'Vehicle'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Date' : 'Date'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Tarif' : 'Fare'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Évaluation' : 'Rating'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-nova-white/60">
                    {language === 'fr' 
                      ? 'Aucune course trouvée' 
                      : 'No rides found'}
                  </TableCell>
                </TableRow>
              ) : (
                rides.map(ride => (
                  <TableRow key={ride.id} className="hover:bg-nova-black/40">
                    <TableCell className="font-medium text-nova-white">
                      {ride.user_name || 'Anonymous'}
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      {ride.driver_name || 'N/A'}
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      {ride.vehicle_name || 'N/A'}
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      {formatDate(ride.end_time)}
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      {formatCurrency(ride.fare)}
                    </TableCell>
                    <TableCell>
                      {renderRating(ride.rating)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
