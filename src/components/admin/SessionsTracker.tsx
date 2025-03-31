
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingState } from './LoadingState';
import { User, Laptop, Smartphone, Clock } from 'lucide-react';

export const SessionsTracker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      // Mock data
      const mockSessions = [
        {
          id: '1',
          user_id: 'u1',
          device_info: JSON.stringify({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            platform: 'Windows',
            deviceType: 'desktop'
          }),
          created_at: new Date().toISOString(),
          last_active: new Date().toISOString(),
          is_active: true
        },
        {
          id: '2',
          user_id: 'u2',
          device_info: JSON.stringify({
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
            platform: 'iOS',
            deviceType: 'mobile'
          }),
          created_at: new Date(Date.now() - 3600000).toISOString(),
          last_active: new Date(Date.now() - 1800000).toISOString(),
          is_active: true
        },
        {
          id: '3',
          user_id: 'u3',
          device_info: JSON.stringify({
            userAgent: 'Mozilla/5.0 (Linux; Android 12)',
            platform: 'Android',
            deviceType: 'mobile'
          }),
          created_at: new Date(Date.now() - 7200000).toISOString(),
          last_active: new Date(Date.now() - 3600000).toISOString(),
          is_active: true
        }
      ];
      
      setActiveSessions(mockSessions);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const getDeviceIcon = (deviceInfo: any) => {
    try {
      const parsed = JSON.parse(deviceInfo);
      const deviceType = parsed.deviceType || 'desktop';
      
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
        const deviceInfo = JSON.parse(session.device_info);
        const deviceType = deviceInfo.deviceType || 'desktop';
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
                          <span className="font-medium text-nova-white">User: {session.user_id}</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {getDeviceIcon(session.device_info)}
                          <span>
                            {(() => {
                              try {
                                const deviceInfo = JSON.parse(session.device_info);
                                return deviceInfo.platform || 'Unknown device';
                              } catch (e) {
                                return 'Unknown device';
                              }
                            })()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-nova-gold/70" />
                          <span>Last active: {formatTime(session.last_active)}</span>
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
