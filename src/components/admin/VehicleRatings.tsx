
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Star, MessageSquare, Car, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface VehicleRatingProps {
  language: string;
  formatDate: (dateString: string) => string;
}

export function VehicleRatings({ language, formatDate }: VehicleRatingProps) {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const { data, error } = await supabase
          .from('vehicle_ratings')
          .select(`
            *,
            bookings:booking_id (
              vehicle_id,
              user_id,
              start_date,
              end_date
            ),
            vehicles:bookings(vehicle_id (
              name,
              category
            )),
            profiles:bookings(user_id (
              full_name
            ))
          `) as any; // Using type assertion to bypass type checking

        if (error) throw error;
        setRatings(data || []);
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError(language === 'fr' 
          ? 'Erreur lors du chargement des évaluations. Veuillez réessayer.' 
          : 'Error loading ratings. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchRatings();
  }, [language]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-nova-gold fill-nova-gold' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm text-nova-white/70">{rating}/5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <Card className="bg-nova-black/40 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Évaluations des véhicules' : 'Vehicle Ratings'}
          </CardTitle>
          <CardDescription className="text-nova-white/70">
            {language === 'fr' 
              ? 'Consultez ce que pensent vos clients de vos véhicules' 
              : 'See what your customers think about your vehicles'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-nova-black/40 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Évaluations des véhicules' : 'Vehicle Ratings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-400">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ratings.length === 0) {
    return (
      <Card className="bg-nova-black/40 border-nova-gold/20">
        <CardHeader>
          <CardTitle className="text-nova-white">
            {language === 'fr' ? 'Évaluations des véhicules' : 'Vehicle Ratings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-nova-gold/40 mx-auto mb-4" />
            <p className="text-nova-white/50">
              {language === 'fr' 
                ? 'Aucune évaluation disponible actuellement.' 
                : 'No ratings available at this time.'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-nova-black/40 border-nova-gold/20">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Évaluations des véhicules' : 'Vehicle Ratings'}
        </CardTitle>
        <CardDescription className="text-nova-white/70">
          {language === 'fr' 
            ? 'Consultez ce que pensent vos clients de vos véhicules' 
            : 'See what your customers think about your vehicles'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Table>
            <TableHeader>
              <TableRow className="border-nova-gold/20">
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Véhicule' : 'Vehicle'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Client' : 'Customer'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Date' : 'Date'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Véhicule' : 'Vehicle Rating'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Service' : 'Service Rating'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Chauffeur' : 'Driver Rating'}
                </TableHead>
                <TableHead className="text-nova-white">
                  {language === 'fr' ? 'Commentaire' : 'Comment'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((rating) => {
                const vehicleName = rating.vehicles?.[0]?.vehicle_id?.name || 'Unknown Vehicle';
                const vehicleCategory = rating.vehicles?.[0]?.vehicle_id?.category || 'Unknown';
                const customerName = rating.profiles?.[0]?.user_id?.full_name || 'Unknown Customer';
                const date = rating.created_at ? formatDate(rating.created_at) : 'Unknown Date';
                
                return (
                  <TableRow key={rating.id} className="border-nova-gold/10">
                    <TableCell className="font-medium text-nova-white flex items-center gap-2">
                      <Car className="h-4 w-4 text-nova-gold" />
                      <div>
                        <div>{vehicleName}</div>
                        <Badge variant="outline" className="mt-1 border-nova-gold/30 text-xs">
                          {vehicleCategory}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-nova-gold/70" />
                        {customerName}
                      </div>
                    </TableCell>
                    <TableCell className="text-nova-white/80">
                      {date}
                    </TableCell>
                    <TableCell>
                      {renderStars(rating.vehicle_rating)}
                    </TableCell>
                    <TableCell>
                      {renderStars(rating.service_rating)}
                    </TableCell>
                    <TableCell>
                      {renderStars(rating.driver_rating)}
                    </TableCell>
                    <TableCell className="text-nova-white/80 max-w-[200px]">
                      <div className="truncate">
                        {rating.comment || 
                          (language === 'fr' ? 'Pas de commentaire' : 'No comment')}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
