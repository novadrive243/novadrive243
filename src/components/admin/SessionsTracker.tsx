
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
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface Session {
  id: string;
  user_id: string | null;
  session_id: string;
  ip_address: string | null;
  device_info: string | null;
  login_timestamp: string;
  logout_timestamp: string | null;
  is_active: boolean;
  full_name?: string | null;
}

export const SessionsTracker = ({ language }: { language: string }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        // Fetch sessions with user details joined
        const { data, error } = await supabase
          .from('user_sessions')
          .select(`
            *,
            profiles:user_id (
              full_name
            )
          `)
          .order('login_timestamp', { ascending: false })
          .limit(100);

        if (error) throw error;
        
        setSessions(data || []);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
    
    // Set up real-time subscription for new sessions
    const channel = supabase
      .channel('sessions-changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'user_sessions' 
      }, (payload) => {
        setSessions(prev => [payload.new as Session, ...prev].slice(0, 100));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true, 
        locale: language === 'fr' ? fr : enUS 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const parseDeviceInfo = (deviceInfoString: string | null) => {
    if (!deviceInfoString) return { userAgent: 'Unknown' };
    try {
      return JSON.parse(deviceInfoString);
    } catch (error) {
      return { userAgent: deviceInfoString };
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-nova-gold">
        {language === 'fr' ? 'Suivi des Sessions Utilisateurs' : 'User Session Tracking'}
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
                ? 'Historique récent des connexions utilisateurs' 
                : 'Recent user connection history'}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-nova-gold/10">
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Utilisateur' : 'User'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Appareil' : 'Device'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Date de connexion' : 'Login Time'}
                </TableHead>
                <TableHead className="text-nova-gold">
                  {language === 'fr' ? 'Statut' : 'Status'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-nova-white/60">
                    {language === 'fr' 
                      ? 'Aucune session trouvée' 
                      : 'No sessions found'}
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map(session => {
                  const deviceInfo = parseDeviceInfo(session.device_info);
                  return (
                    <TableRow key={session.id} className="hover:bg-nova-black/40">
                      <TableCell className="font-medium text-nova-white">
                        {session.profiles?.full_name || 
                         (session.user_id ? `User ${session.user_id.slice(0, 6)}...` : 'Anonymous')}
                      </TableCell>
                      <TableCell className="text-nova-white/80">
                        {deviceInfo.userAgent?.slice(0, 50)}...
                      </TableCell>
                      <TableCell className="text-nova-white/80">
                        {formatTime(session.login_timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={session.is_active ? "default" : "secondary"}>
                          {session.is_active 
                            ? (language === 'fr' ? 'Active' : 'Active') 
                            : (language === 'fr' ? 'Terminée' : 'Ended')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
