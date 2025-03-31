
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { RefreshCw, User, Clock, DeviceTablet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/admin/LoadingState';

type UserSession = {
  id: string;
  session_id: string;
  user_id: string | null;
  login_timestamp: string;
  logout_timestamp: string | null;
  is_active: boolean;
  device_info: string;
  ip_address: string | null;
  user_details?: {
    email: string;
  } | null;
};

export const SessionsTracker = () => {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .order('login_timestamp', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      // Fetch user details separately since they might not be joined
      if (data) {
        const sessionsWithUserDetails = await Promise.all(
          data.map(async (session) => {
            if (session.user_id) {
              const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id, full_name')
                .eq('id', session.user_id)
                .single();

              if (!userError && userData) {
                return {
                  ...session,
                  user_details: {
                    email: userData.full_name || 'Unknown'
                  }
                };
              }
            }
            return {
              ...session,
              user_details: null
            };
          })
        );
        
        setSessions(sessionsWithUserDetails);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDeviceInfo = (deviceInfo: string) => {
    try {
      const parsed = JSON.parse(deviceInfo);
      return parsed.platform || "Unknown device";
    } catch {
      return "Unknown device";
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Active Sessions</CardTitle>
        <Button variant="ghost" onClick={fetchSessions} disabled={loading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {loading ? (
          <LoadingState language="en" />
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-2">
                    <User className="h-5 w-5 text-nova-gold mt-0.5" />
                    <div>
                      <h3 className="font-medium">
                        {session.user_details?.email || 'Anonymous User'}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(session.login_timestamp)}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <DeviceTablet className="h-3 w-3 mr-1" />
                        {session.device_info ? formatDeviceInfo(session.device_info) : 'Unknown device'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${session.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {session.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
