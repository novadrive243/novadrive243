
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingState } from './LoadingState';
import { User, Laptop, Smartphone, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const SessionsTracker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  
  useEffect(() => {
    const fetchUserSessions = async () => {
      setIsLoading(true);
      try {
        // Fetch real user sessions from the database
        const { data, error } = await supabase
          .from('user_sessions')
          .select(`
            id,
            user_id,
            session_id,
            device_info,
            login_timestamp,
            is_active,
            profiles(full_name)
          `)
          .eq('is_active', true)
          .order('login_timestamp', { ascending: false });
        
        if (error) {
          console.error('Error fetching sessions:', error);
          throw error;
        }
        
        setActiveSessions(data || []);
      } catch (error) {
        console.error('Failed to load session data:', error);
        // If we fail to load data, use empty array
        setActiveSessions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserSessions();
    
    // Set up a real-time subscription for user sessions
    const sessionsChannel = supabase
      .channel('user_sessions_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'user_sessions' }, 
        () => {
          fetchUserSessions();
        }
      )
      .subscribe();
    
    // Refresh sessions data every 2 minutes
    const interval = setInterval(fetchUserSessions, 2 * 60 * 1000);
    
    return () => {
      supabase.removeChannel(sessionsChannel);
      clearInterval(interval);
    };
  }, []);
  
  const getDeviceIcon = (deviceInfo: any) => {
    try {
      const parsed = typeof deviceInfo === 'string' ? JSON.parse(deviceInfo) : deviceInfo;
      const deviceType = parsed?.deviceType || 'desktop';
      
      switch (deviceType) {
        case 'mobile':
          return <Smartphone className="h-4 w-4 text-teal-400" />;
        case 'tablet':
          return <Laptop className="h-4 w-4 text-indigo-400" />;
        default:
          return <Laptop className="h-4 w-4 text-blue-400" />;
      }
    } catch (e) {
      return <Laptop className="h-4 w-4 text-gray-400" />;
    }
  };
  
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Unknown';
    }
  };
  
  const filterSessions = () => {
    if (selectedDevice === 'all') return activeSessions;
    
    return activeSessions.filter(session => {
      try {
        const deviceInfo = typeof session.device_info === 'string' 
          ? JSON.parse(session.device_info) 
          : session.device_info;
        const deviceType = deviceInfo?.deviceType || 'desktop';
        return deviceType === selectedDevice;
      } catch (e) {
        return false;
      }
    });
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-nova-white text-xl">Active Sessions</CardTitle>
        <CardDescription>
          Currently active user sessions across all devices
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="all" value={selectedDevice} onValueChange={setSelectedDevice}>
        <TabsList className="mb-4 mx-4">
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="tablet">Tablet</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedDevice}>
          <CardContent>
            <ScrollArea className="h-[320px] pr-4">
              {filterSessions().length > 0 ? (
                <div className="space-y-4">
                  {filterSessions().map((session) => (
                    <div key={session.id} className="flex items-start gap-4 p-3 rounded-lg bg-nova-black/40 border border-nova-gold/10">
                      <div className="bg-nova-gray/40 p-2 rounded-full">
                        <User className="h-5 w-5 text-nova-gold" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-nova-white">
                            {session.profiles?.full_name || `User: ${session.user_id?.substring(0, 8)}`}
                          </span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {getDeviceIcon(session.device_info)}
                          <span>
                            {(() => {
                              try {
                                const deviceInfo = typeof session.device_info === 'string' 
                                  ? JSON.parse(session.device_info) 
                                  : session.device_info;
                                return deviceInfo?.platform || 'Unknown device';
                              } catch (e) {
                                return 'Unknown device';
                              }
                            })()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-nova-gold/70" />
                          <span>
                            Last active: {formatTime(session.login_timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  No active sessions found
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
