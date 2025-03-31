import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { RefreshCw, Globe, User as UserIcon, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/admin/LoadingState';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Session = {
  id: string;
  session_id: string;
  login_timestamp: string;
  logout_timestamp: string | null;
  is_active: boolean;
  ip_address: string | null;
  device_info: string | null;
  user_id: string | null;
  user: { email: string };
};

export function SessionsTracker() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Query sessions
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*, user_id(email)')
        .order('login_timestamp', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching sessions:', error);
        return;
      }

      // Ensure the data is properly cast to Session array (with necessary type adjustments)
      const typedData = data.map(session => ({
        ...session,
        user: { email: session.user_id?.email || 'Unknown' } 
      })) as Session[];
      
      setSessions(typedData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sessions Tracker</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchSessions}
          disabled={loading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState />
        ) : (
          <ScrollArea className="h-[400px] w-full space-y-2">
            {sessions.map((session) => (
              <div key={session.id} className="border rounded-md p-2">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{session.user?.email}</span>
                  <Badge variant="secondary">{session.is_active ? 'Active' : 'Inactive'}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Login: {new Date(session.login_timestamp).toLocaleString()}</span>
                </div>
                {session.logout_timestamp && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Logout: {new Date(session.logout_timestamp).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>IP Address: {session.ip_address || 'Unknown'}</span>
                </div>
                {session.device_info && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Device Info: {session.device_info}</span>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
