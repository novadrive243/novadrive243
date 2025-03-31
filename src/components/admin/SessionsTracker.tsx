
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Refresh, ArrowUpDown, ArrowUp, ArrowDown, Check, X, Globe, Laptop, Smartphone, Tablet } from 'lucide-react';

type SortField = 'login_timestamp' | 'is_active';
type SortDirection = 'asc' | 'desc';

type Session = {
  id: string;
  session_id: string;
  user_id: string | null;
  login_timestamp: string;
  logout_timestamp: string | null;
  is_active: boolean;
  device_info: string;
  ip_address: string | null;
  user?: {
    email: string;
  };
};

export const SessionsTracker = ({ 
  language 
}: { 
  language: string 
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('login_timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    desktop: 0,
    mobile: 0,
    tablet: 0,
  });
  const { toast } = useToast();

  // Function to fetch sessions data
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select(`
          *,
          user:user_id (email)
        `)
        .order(sortField, { ascending: sortDirection === 'asc' });

      if (error) throw error;
      
      const sessionsData = data || [];
      setSessions(sessionsData);

      // Calculate stats
      const active = sessionsData.filter(s => s.is_active).length;
      let desktop = 0, mobile = 0, tablet = 0;

      sessionsData.forEach(session => {
        if (!session.device_info) return;
        
        try {
          const deviceInfo = JSON.parse(session.device_info);
          const userAgent = deviceInfo.userAgent || '';
          
          if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
            mobile++;
          } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
            tablet++;
          } else {
            desktop++;
          }
        } catch (e) {
          desktop++; // Default to desktop if parsing fails
        }
      });

      setStats({
        total: sessionsData.length,
        active,
        desktop,
        mobile, 
        tablet,
      });
      
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
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
    fetchSessions();

    // Set up the subscription
    const subscription = supabase
      .channel('user_sessions_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'user_sessions' 
      }, () => {
        fetchSessions();
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

  // Get device icon
  const getDeviceIcon = (session: Session) => {
    if (!session.device_info) return <Globe className="h-4 w-4" />;
    
    try {
      const deviceInfo = JSON.parse(session.device_info);
      const userAgent = deviceInfo.userAgent || '';
      
      if (userAgent.includes('Mobile') || userAgent.includes('Android')) {
        return <Smartphone className="h-4 w-4" />;
      } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
        return <Tablet className="h-4 w-4" />;
      } else {
        return <Laptop className="h-4 w-4" />;
      }
    } catch (e) {
      return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card className="bg-nova-black/40 border-nova-gold/20 p-4">
          <div className="text-xl font-semibold text-nova-white">{stats.total}</div>
          <div className="text-sm text-nova-white/60">
            {language === 'fr' ? 'Sessions totales' : 'Total Sessions'}
          </div>
        </Card>
        <Card className="bg-nova-black/40 border-nova-gold/20 p-4">
          <div className="text-xl font-semibold text-nova-gold">{stats.active}</div>
          <div className="text-sm text-nova-white/60">
            {language === 'fr' ? 'Sessions actives' : 'Active Sessions'}
          </div>
        </Card>
        <Card className="bg-nova-black/40 border-nova-gold/20 p-4">
          <div className="text-xl font-semibold text-blue-400">{stats.desktop}</div>
          <div className="text-sm text-nova-white/60">
            {language === 'fr' ? 'Ordinateurs' : 'Desktop'}
          </div>
        </Card>
        <Card className="bg-nova-black/40 border-nova-gold/20 p-4">
          <div className="text-xl font-semibold text-green-400">{stats.mobile}</div>
          <div className="text-sm text-nova-white/60">
            {language === 'fr' ? 'Mobile' : 'Mobile'}
          </div>
        </Card>
        <Card className="bg-nova-black/40 border-nova-gold/20 p-4">
          <div className="text-xl font-semibold text-purple-400">{stats.tablet}</div>
          <div className="text-sm text-nova-white/60">
            {language === 'fr' ? 'Tablettes' : 'Tablet'}
          </div>
        </Card>
      </div>
      
      <div className="bg-nova-black border border-nova-gold/30 rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-nova-gold">
            {language === 'fr' ? 'Suivi des Sessions' : 'Sessions Tracker'}
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSessions}
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
                      onClick={() => handleSort('login_timestamp')}
                    >
                      {language === 'fr' ? 'Date de connexion' : 'Login Time'}
                      {getSortIcon('login_timestamp')}
                    </button>
                  </th>
                  <th className="px-4 py-3">{language === 'fr' ? 'Utilisateur' : 'User'}</th>
                  <th className="px-4 py-3">{language === 'fr' ? 'Appareil' : 'Device'}</th>
                  <th className="px-4 py-3">
                    <button 
                      className="flex items-center text-nova-gold"
                      onClick={() => handleSort('is_active')}
                    >
                      {language === 'fr' ? 'Statut' : 'Status'}
                      {getSortIcon('is_active')}
                    </button>
                  </th>
                  <th className="px-4 py-3">{language === 'fr' ? 'Date de déconnexion' : 'Logout Time'}</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-nova-gold"></div>
                      </div>
                    </td>
                  </tr>
                ) : sessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center text-nova-white/50">
                      {language === 'fr' ? 'Aucune session trouvée' : 'No sessions found'}
                    </td>
                  </tr>
                ) : (
                  sessions.map((session) => (
                    <tr key={session.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                      <td className="px-4 py-3 text-xs opacity-50">{session.session_id.substring(0, 8)}...</td>
                      <td className="px-4 py-3">{formatDateTime(session.login_timestamp)}</td>
                      <td className="px-4 py-3">{session.user?.email || 'Anonymous'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {getDeviceIcon(session)}
                          <span className="ml-2">
                            {(() => {
                              if (!session.device_info) return 'Unknown';
                              try {
                                const deviceInfo = JSON.parse(session.device_info);
                                return deviceInfo.platform || 'Unknown';
                              } catch (e) {
                                return 'Unknown';
                              }
                            })()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {session.is_active ? (
                          <div className="flex items-center text-green-500">
                            <Check className="h-4 w-4 mr-1" />
                            <span>{language === 'fr' ? 'Actif' : 'Active'}</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <X className="h-4 w-4 mr-1" />
                            <span>{language === 'fr' ? 'Terminé' : 'Ended'}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {session.logout_timestamp 
                          ? formatDateTime(session.logout_timestamp)
                          : session.is_active
                            ? '—'
                            : language === 'fr' ? 'Session expirée' : 'Session expired'
                        }
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
