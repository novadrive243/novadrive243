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

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('start_time', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching rides:', error);
        return;
      }

      setRides(data as Ride[]);
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
        <CardTitle>Rides History</CardTitle>
        <Button variant="ghost" onClick={fetchRides} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-3">
            {rides.map((ride) => (
              <div key={ride.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {ride.start_location} to {ride.end_location}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {new Date(ride.start_time).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{ride.status}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => toggleRideDetails(ride.id)}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {expandedRideId === ride.id && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-xs">Price: ${ride.price}</p>
                    <p className="text-xs">Driver ID: {ride.driver_id}</p>
                    <p className="text-xs">User ID: {ride.user_id}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
